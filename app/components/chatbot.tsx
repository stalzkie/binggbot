'use client'

import { useState } from 'react'
import Image from 'next/image'

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<string[]>([])
  const [input, setInput] = useState('')

  const toggleChat = () => setIsOpen(!isOpen)

  const sendMessage = async () => {
    if (!input.trim()) return

    setMessages(prev => [...prev, `🧑: ${input}`])
    setInput('')

    const res = await fetch('/api/gemini', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: input })
    })

    if (!res.ok) {
    setMessages(prev => [...prev, `🤖: Sorry, something went wrong.`])
    return
    }
    
    const data = await res.json()
    setMessages(prev => [...prev, `🤖: ${data.reply}`])
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {isOpen ? (
        <div className="w-80 h-96 bg-white shadow-lg rounded-lg flex flex-col border border-gray-300">
          <div className="flex justify-between items-center px-3 py-2 bg-gray-100 border-b">
            <div className="flex items-center space-x-2">
              <Image
                src="/alternative-logo.png"
                alt="BinggBot Logo"
                width={24}
                height={24}
                className="w-6 h-6 object-contain"
              />
              <p className="font-semibold text-black">BinggBot</p>
            </div>
            <button onClick={toggleChat} className="text-black">✖</button>
          </div>
          <div className="flex-1 overflow-y-auto p-3 text-sm">
            {messages.map((msg, i) => (
              <div key={i} className="mb-2 whitespace-pre-wrap text-black">{msg}</div>
            ))}
          </div>
          <div className="p-2 border-t flex gap-2">
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && sendMessage()}
              className="flex-1 border px-2 py-1 rounded text-sm text-black placeholder-gray-400"
              placeholder="Ask me anything..."
            />
            <button onClick={sendMessage} className="px-3 bg-blue-500 text-white rounded text-sm">Send</button>
          </div>
        </div>
      ) : (
        <button
          onClick={toggleChat}
          className="w-14 h-14 bg-blue-600 text-white rounded-full shadow-lg flex items-center justify-center p-2"
        >
          <Image
            src="/alternative-logo.png"
            alt="BinggBot"
            width={32}
            height={32}
            className="w-8 h-8 object-contain filter brightness-110"
          />
        </button>
      )}
    </div>
  )
}
