import { GoogleGenerativeAI } from '@google/generative-ai'
import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)

export async function POST(req: Request) {
  try {
    const { message } = await req.json()

    // Read the local knowledge file
    const filePath = path.resolve(process.cwd(), 'app/data/knowledge.txt')
    let context = ''

    if (fs.existsSync(filePath)) {
      context = fs.readFileSync(filePath, 'utf-8')
    } else {
      context = 'No knowledge base found.'
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' })

    const prompt = `
Use only the following knowledge base to answer the user question:

${context}

User Question:
${message}
    `.trim()

    const result = await model.generateContent(prompt)
    const reply = result.response.text()

    return NextResponse.json({ reply })
  } catch (error) {
    console.error('Gemini API Error:', error)
    return NextResponse.json({ reply: '⚠️ An error occurred while processing your request.' }, { status: 500 })
  }
}
