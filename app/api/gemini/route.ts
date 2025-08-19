import { GoogleGenerativeAI } from '@google/generative-ai'
import { NextResponse } from 'next/server'
import fs from 'fs'
export const runtime = 'nodejs';
import path from 'path'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)

type Locale = 'tl' | 'ceb' | 'hil' | 'en'

const LOCALE_LABEL: Record<Locale, string> = {
  tl: 'Tagalog/Filipino',
  ceb: 'Bisaya/Cebuano',
  hil: 'Hiligaynon/Ilonggo',
  en: 'English',
}

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}))
    const message: string = body?.message ?? ''
    const locale: Locale | undefined = ['tl', 'ceb', 'hil', 'en'].includes(body?.locale)
      ? body.locale
      : undefined

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { reply: '⚠️ Please provide a valid `message` string.' },
        { status: 400 }
      )
    }

    // Load local knowledge
    const filePath = path.resolve(process.cwd(), 'app/data/knowledge.txt');
    const context = fs.existsSync(filePath)
      ? fs.readFileSync(filePath, 'utf-8')
      : 'No knowledge base found.'

    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' })

    // ===== System preamble with Option 3 (preferred locale) =====
    const localeDirective = locale
      ? `PREFERRED LOCALE:
- A preferred locale is provided by the UI. Always reply in **${LOCALE_LABEL[locale]}** unless the user explicitly asks for a different language.
- If the user mixes languages, keep the reply primarily in ${LOCALE_LABEL[locale]} while mirroring their mix naturally.`
      : `LANGUAGE:
- Detect the user's language (Tagalog/Filipino, Bisaya/Cebuano, Hiligaynon/Ilonggo, or English).
- Reply in the same language the user used. If the user mixes English (Taglish/Bisaya-English/Hiliglish), mirror their mix naturally.`

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
`.trim()

    // Few-shot examples to keep tone natural in each dialect
    const examples = [
      // Tagalog
      {
        user: 'Magkano po ang chatbot ninyo? May monthly ba ito?',
        assistant:
          'Para sa standalone Chatbot, ₱3,400 one-time (~$60) at ₱1,700/month (~$30). Kung kasama ang landing page, ₱5,700 one-time (~$100) at ₱1,700/month. Kasama na ang basic updates at support.',
      },
      // Cebuano/Bisaya
      {
        user: 'Makahimo ba ang bot og tubag sa FAQs? Pwede ba sa Messenger?',
        assistant:
          'Oo, makatubag ang chatbot sa FAQs (oras sa tindahan, presyo, promos, etc.). Pwede nato i-integrate sa Messenger ug sa imong landing page para mas dali ang pangutana sa customers.',
      },
      // Hiligaynon/Ilonggo
      {
        user: 'Pwede bala ma-update dayon ang list sang products kung out-of-stock?',
        assistant:
          'Oo, may ara kita sang simple dashboard. Kung i-unavailable mo ang isa ka item, indi na na ipakita sang chatbot kag i-explain niya nga out-of-stock subong.',
      },
      // Code-switch example (Taglish)
      {
        user: 'Pwede ba mag-setup ng bookings sa salon via chatbot?',
        assistant:
          'Pwede. We can enable a simple booking flow sa chatbot—pipili si customer ng service at time, then we send a confirmation. Optional integration sa existing calendar or form kung meron.',
      },
    ]

    // Compose final prompt (system preamble + examples + user message)
    const prompt =
      [
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
      ].join('\n')

    const result = await model.generateContent(prompt)
    const reply = result.response.text()

    return NextResponse.json({
      reply,
      meta: { forcedLocale: locale ? LOCALE_LABEL[locale] : null },
    })
  } catch (error) {
    console.error('Gemini API Error:', error)
    return NextResponse.json(
      { reply: '⚠️ An error occurred while processing your request.' },
      { status: 500 }
    )
  }
}
