'use client'

import dynamic from 'next/dynamic'

// 🛠 Fix: add `.then(mod => mod.default)` to resolve the default export
const ChatBot = dynamic(() => import('./chatbot').then(mod => mod.default), { ssr: false })

export default function ClientChatWrapper() {
  return <ChatBot />
}
