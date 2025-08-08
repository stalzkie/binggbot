
"use client";
import { useState } from "react";
import Image from "next/image";

function ChatbotButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full shadow-2xl flex items-center justify-center border-2 border-primary/30 hover:scale-105 transition-transform duration-200"
      aria-label="Open Chatbot"
    >
      <Image
        src="/alternative-logo.png"
        alt="BinggBot Logo"
        width={36}
        height={36}
        className="w-9 h-9 object-contain drop-shadow-md"
      />
    </button>
  );
}

function ChatbotWindow({ messages, input, setInput, onSend, onClose }: {
  messages: string[];
  input: string;
  setInput: (v: string) => void;
  onSend: () => void;
  onClose: () => void;
}) {
  return (
    <div className="w-80 h-96 bg-gradient-to-br from-background/95 to-secondary/80 shadow-2xl rounded-2xl flex flex-col border border-primary/20 backdrop-blur-xl">
      <div className="flex items-center justify-between px-4 py-3 border-b border-primary/10 bg-gradient-to-r from-primary/10 to-accent/10 rounded-t-2xl">
        <div className="flex items-center space-x-2">
          <Image
            src="/alternative-logo.png"
            alt="BinggBot Logo"
            width={24}
            height={24}
            className="w-6 h-6 object-contain"
          />
          <span className="font-bold text-lg bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">BinggBot</span>
        </div>
        <button onClick={onClose} className="text-muted-foreground hover:text-primary text-xl font-bold px-2 py-1 rounded transition-colors">✖</button>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {messages.length === 0 ? (
          <div className="text-muted-foreground text-center text-sm mt-8">Start a conversation with BinggBot!</div>
        ) : (
          messages.map((msg, i) => (
            <div key={i} className={msg.startsWith("🧑") ? "text-right" : "text-left"}>
              <span className={msg.startsWith("🧑") ? "inline-block bg-primary/10 text-primary px-3 py-2 rounded-xl" : "inline-block bg-accent/10 text-accent px-3 py-2 rounded-xl"}>{msg.replace("🧑:", "You:").replace("🤖:", "BinggBot:")}</span>
            </div>
          ))
        )}
      </div>
      <div className="p-3 border-t border-primary/10 bg-background/80 rounded-b-2xl flex gap-2">
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === "Enter" && onSend()}
          className="flex-1 border border-primary/20 px-3 py-2 rounded-xl text-sm text-foreground bg-background placeholder:text-muted-foreground focus:outline-none focus:border-primary"
          placeholder="Type your message..."
        />
        <button
          onClick={onSend}
          className="px-4 py-2 bg-gradient-to-r from-primary to-accent text-white rounded-xl font-semibold shadow hover:scale-105 transition-transform"
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState("");

  const toggleChat = () => setIsOpen(v => !v);

  const sendMessage = async () => {
    if (!input.trim()) return;
    setMessages(prev => [...prev, `🧑: ${input}`]);
    setInput("");
    try {
      const res = await fetch("/api/gemini", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input })
      });
      if (!res.ok) {
        setMessages(prev => [...prev, `🤖: Sorry, something went wrong.`]);
        return;
      }
      const data = await res.json();
      setMessages(prev => [...prev, `🤖: ${data.reply}`]);
    } catch {
      setMessages(prev => [...prev, `🤖: Sorry, something went wrong.`]);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4">
      {isOpen ? (
        <ChatbotWindow
          messages={messages}
          input={input}
          setInput={setInput}
          onSend={sendMessage}
          onClose={toggleChat}
        />
      ) : (
        <ChatbotButton onClick={toggleChat} />
      )}
    </div>
  );
}
