// app/api/chat/route.ts
export const runtime = 'nodejs';

import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';

// ===== Env & model =====
const GEMINI_KEY = process.env.GEMINI_API_KEY!;
const KB_URL = process.env.KB_URL || '';            // e.g. https://<your>.public.blob.vercel-storage.com/knowledge.txt
const KB_BEARER = process.env.KB_BEARER || '';      // optional Authorization Bearer token
const KB_TEXT = process.env.KB_TEXT || '';          // optional fallback: put KB directly in an env var
const KB_CACHE_SECONDS = Number(process.env.KB_CACHE_SECONDS ?? 300);

const genAI = new GoogleGenerativeAI(GEMINI_KEY);

// ===== In-memory cache (per serverless instance) =====
type KBCache = { content: string; fetchedAt: number } | null;
declare global {
  // eslint-disable-next-line no-var
  var __binggbotKB: KBCache | undefined;
}
const getCachedKB = () => globalThis.__binggbotKB ?? null;
const setCachedKB = (content: string) =>
  (globalThis.__binggbotKB = { content, fetchedAt: Date.now() });
const isFresh = (entry: KBCache) =>
  !!entry && Date.now() - entry.fetchedAt < KB_CACHE_SECONDS * 1000;

// ===== Load knowledge: Blob URL -> Env var -> default =====
async function loadKnowledge(): Promise<string> {
  const cached = getCachedKB();
  if (isFresh(cached)) return cached!.content;

  // 1) Fetch from Blob/URL if provided
  if (KB_URL) {
    const res = await fetch(KB_URL, {
      headers: KB_BEARER ? { Authorization: `Bearer ${KB_BEARER}` } : undefined,
      cache: 'no-store',
    });
    if (!res.ok) {
      console.error('KB fetch failed:', res.status, res.statusText);
    } else {
      const txt = await res.text();
      setCachedKB(txt);
      return txt;
    }
  }

  // 2) Fallback to env var KB_TEXT
  if (KB_TEXT) {
    setCachedKB(KB_TEXT);
    return KB_TEXT;
  }

  // 3) Nothing configured
  return 'No knowledge base configured.';
}

// ===== Types =====
type Locale = 'tl' | 'ceb' | 'hil' | 'en';
const LOCALE_LABEL: Record<Locale, string> = {
  tl: 'Tagalog/Filipino',
  ceb: 'Bisaya/Cebuano',
  hil: 'Hiligaynon/Ilonggo',
  en: 'English',
};

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const message: string = body?.message ?? '';
    const locale: Locale | undefined = (['tl', 'ceb', 'hil', 'en'] as const).includes(body?.locale)
      ? body.locale
      : undefined;

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { reply: '⚠️ Please provide a valid `message` string.' },
        { status: 400 }
      );
    }

    // Load KB from Blob/URL or env
    const context = await loadKnowledge();

    // ===== Prompt framing =====
    const localeDirective = locale
      ? `PREFERRED LOCALE:
- A preferred locale is provided by the UI. Always reply in **${LOCALE_LABEL[locale]}** unless the user explicitly asks for a different language.
- If the user mixes languages, keep the reply primarily in ${LOCALE_LABEL[locale]} while mirroring their mix naturally.`
      : `LANGUAGE:
- Detect the user's language (Tagalog/Filipino, Bisaya/Cebuano, Hiligaynon/Ilonggo, or English).
- Reply in the same language the user used. If the user mixes English (Taglish/Bisaya-English/Hiliglish), mirror their mix naturally.`;

    const systemPreamble = `
You are BinggBot, a multilingual Filipino-first business assistant.

${localeDirective}

SCOPE:
- Use the **knowledge base** below as primary source. If something isn’t in it, you may answer briefly if it’s clearly related to customer service, sales, marketing, chatbots, AI, or SMEs.
- Keep answers concise, factual, and helpful. Include concrete steps/examples when possible.

STYLE:
- Be polite, professional, and conversational (avoid overly formal textbook phrasing).
- If you must say you don’t know, offer the closest helpful alternative or ask for a needed detail.

KNOWLEDGE BASE (Ground truth):
${context}
`.trim();

    // Few-shot examples (tone shaping)
    const examples = [
      {
        user: 'Magkano po ang chatbot ninyo? May monthly ba ito?',
        assistant:
          'Para sa standalone Chatbot, ₱3,400 one-time (~$60) at ₱1,700/month (~$30). Kung kasama ang landing page, ₱5,700 one-time (~$100) at ₱1,700/month. Kasama na ang basic updates at support.',
      },
      {
        user: 'Makahimo ba ang bot og tubag sa FAQs? Pwede ba sa Messenger?',
        assistant:
          'Oo, makatubag ang chatbot sa FAQs (oras sa tindahan, presyo, promos, etc.). Pwede nato i-integrate sa Messenger ug sa imong landing page para mas dali ang pangutana sa customers.',
      },
      {
        user: 'Pwede bala ma-update dayon ang list sang products kung out-of-stock?',
        assistant:
          'Oo, may ara kita sang simple dashboard. Kung i-unavailable mo ang isa ka item, indi na na ipakita sang chatbot kag i-explain niya nga out-of-stock subong.',
      },
      {
        user: 'Pwede ba mag-setup ng bookings sa salon via chatbot?',
        assistant:
          'Pwede. We can enable a simple booking flow sa chatbot—pipili si customer ng service at time, then we send a confirmation. Optional integration sa existing calendar or form kung meron.',
      },
    ];

    const prompt = [
      systemPreamble,
      '',
      'EXAMPLES:',
      ...examples.map(
        (ex, i) => `Example ${i + 1}
User: ${ex.user}
Assistant: ${ex.assistant}
`
      ),
      '—',
      'Now answer the user below following the LANGUAGE/SCOPE/STYLE rules.',
      `User: ${message}`,
    ].join('\n');

    // ===== Generate =====
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' });
    const generationConfig = { temperature: 0.6, topP: 0.9, topK: 40 };
    const result = await model.generateContent({
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      generationConfig,
    });
    const reply = result.response.text();

    return NextResponse.json({
      reply,
      meta: {
        forcedLocale: locale ? LOCALE_LABEL[locale] : null,
        kbSource: KB_URL ? 'blob:url' : (KB_TEXT ? 'env:KB_TEXT' : 'none'),
        kbCacheSeconds: KB_CACHE_SECONDS,
      },
    });
  } catch (error) {
    console.error('Gemini API Error:', error);
    return NextResponse.json(
      { reply: '⚠️ An error occurred while processing your request.' },
      { status: 500 }
    );
  }
}
