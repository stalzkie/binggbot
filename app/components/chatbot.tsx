"use client";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import {
  IconUser,
  IconRobot,
  IconSend,
  IconX,
  IconSparkles,
  IconSun,
  IconMoon,
} from "@tabler/icons-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";

interface ChatMessage {
  sender: "user" | "bot";
  text: string;
}

function ChatbotButton({ onClick }: { onClick: () => void }) {
  return (
    <motion.button
      onClick={onClick}
      className="w-16 h-16 rounded-full shadow-2xl flex items-center justify-center border-2 transition-transform duration-200 focus:outline-none hover:scale-105
                 bg-gradient-to-br from-blue-600 to-emerald-500 border-blue-500/30
                 dark:from-blue-500 dark:to-emerald-400 dark:border-blue-400/30"
      aria-label="Open Chatbot"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring", duration: 0.5 }}
    >
      <Image
        src="/alternative-logo.png"
        alt="BinggBot Logo"
        width={36}
        height={36}
        className="w-9 h-9 object-contain drop-shadow-md"
      />
    </motion.button>
  );
}

function ThemeToggleSmall() {
  const { theme, setTheme } = useTheme();
  const toggle = () => setTheme(theme === "dark" ? "light" : "dark");

  return (
    <button
      onClick={toggle}
      className="p-1.5 rounded-md border text-sm transition-colors
                 border-neutral-200 hover:bg-neutral-100
                 dark:border-neutral-700 dark:hover:bg-neutral-800"
      aria-label="Toggle theme"
      title="Toggle theme"
    >
      <span className="sr-only">Toggle theme</span>
      <IconSun className="w-4 h-4 block dark:hidden" />
      <IconMoon className="w-4 h-4 hidden dark:block" />
    </button>
  );
}

function ChatbotWindow({
  messages,
  input,
  setInput,
  onSend,
  onClose,
  isLoading,
}: {
  messages: ChatMessage[];
  input: string;
  setInput: (v: string) => void;
  onSend: () => void;
  onClose: () => void;
  isLoading: boolean;
}) {
  const messageEndRef = useRef<HTMLDivElement | null>(null);

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") onSend();
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion);
  };

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  return (
    <motion.div
      className="fixed bottom-6 right-6 z-50"
      drag
      dragConstraints={{ top: -500, left: -500, right: 500, bottom: 500 }}
      dragElastic={0.2}
      dragTransition={{ bounceStiffness: 600, bounceDamping: 10 }}
      initial={{ scale: 0.8, opacity: 0, y: 20 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      exit={{ scale: 0.8, opacity: 0, y: 20 }}
      transition={{ type: "spring", duration: 0.4 }}
    >
      <div
        className="relative w-80 h-96 rounded-2xl flex flex-col backdrop-blur-xl resize overflow-hidden min-w-[320px] min-h-[300px] max-w-[90vw] max-h-[80vh]
                   border shadow-2xl
                   bg-white/90 border-neutral-200
                   dark:bg-neutral-900/90 dark:border-neutral-700"
        style={{ resize: "both" }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b rounded-t-2xl cursor-move
                        border-neutral-200 bg-neutral-50/60
                        dark:border-neutral-700 dark:bg-neutral-800/60">
          <div className="flex items-center space-x-2">
            <Image
              src="/alternative-logo.png"
              alt="BinggBot Logo"
              width={24}
              height={24}
              className="w-6 h-6 object-contain"
            />
            <span className="font-bold text-lg
                             bg-clip-text text-transparent
                             bg-gradient-to-r from-blue-600 to-emerald-500
                             dark:from-blue-400 dark:to-emerald-400">
              BinggBot
            </span>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggleSmall />
            <button
              onClick={onClose}
              className="p-1 rounded-full transition-colors
                         text-neutral-600 hover:bg-neutral-100
                         dark:text-neutral-300 dark:hover:bg-neutral-800"
              aria-label="Close Chatbot"
            >
              <IconX className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
          <AnimatePresence>
            {messages.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex-1 flex flex-col items-center justify-center text-center px-4"
              >
                <IconSparkles className="w-12 h-12 text-blue-600/60 dark:text-blue-400/60 mb-4" />
                <div className="font-semibold mb-2 text-neutral-900 dark:text-neutral-100">
                  Hello there!
                </div>
                <div className="text-sm text-neutral-600 dark:text-neutral-400">
                  I&apos;m BinggBot. How can I help you today?
                </div>
                <div className="mt-4 flex flex-wrap gap-2 justify-center">
                  {["What are your features?", "How do I get started?", "Who created you?"].map(
                    (suggestion) => (
                      <motion.button
                        key={suggestion}
                        onClick={() => handleSuggestionClick(suggestion)}
                        className="text-xs px-3 py-1.5 rounded-full border transition-colors
                                   bg-white/70 border-neutral-200 text-neutral-700 hover:bg-neutral-100
                                   dark:bg-neutral-900/70 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-800"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {suggestion}
                      </motion.button>
                    )
                  )}
                </div>
              </motion.div>
            ) : (
              messages.map((msg, i) => (
                <motion.div
                  key={i}
                  className={`flex items-start gap-3 ${
                    msg.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {msg.sender === "bot" && (
                    <div
                      className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center
                                 bg-gradient-to-r from-blue-600 to-emerald-500
                                 dark:from-blue-500 dark:to-emerald-400"
                    >
                      <IconRobot className="w-4 h-4 text-white" />
                    </div>
                  )}
                  <div className={`max-w-[80%] ${msg.sender === "user" ? "order-1" : ""}`}>
                    <div
                      className={`px-3 py-2 text-sm rounded-2xl ${
                        msg.sender === "user"
                          ? "rounded-tr-md bg-blue-600/10 text-blue-700 dark:bg-blue-400/10 dark:text-blue-300"
                          : "rounded-tl-md bg-emerald-600/10 text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-300"
                      }`}
                    >
                      <p>{msg.text}</p>
                    </div>
                  </div>
                  {msg.sender === "user" && (
                    <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center
                                    bg-neutral-400 dark:bg-neutral-600 order-2">
                      <IconUser className="w-4 h-4 text-white" />
                    </div>
                  )}
                </motion.div>
              ))
            )}
            {isLoading && (
              <motion.div
                className="flex items-start gap-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div
                  className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center
                             bg-gradient-to-r from-blue-600 to-emerald-500
                             dark:from-blue-500 dark:to-emerald-400"
                >
                  <IconRobot className="w-4 h-4 text-white" />
                </div>
                <div className="px-3 py-2 rounded-2xl rounded-tl-md
                                bg-emerald-600/10 text-emerald-700
                                dark:bg-emerald-400/10 dark:text-emerald-300">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 rounded-full animate-bounce bg-emerald-500/80 dark:bg-emerald-300/80" />
                    <div
                      className="w-2 h-2 rounded-full animate-bounce bg-emerald-500/60 dark:bg-emerald-300/60"
                      style={{ animationDelay: "0.1s" }}
                    />
                    <div
                      className="w-2 h-2 rounded-full animate-bounce bg-emerald-500/40 dark:bg-emerald-300/40"
                      style={{ animationDelay: "0.2s" }}
                    />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <div ref={messageEndRef} />
        </div>

        {/* Input */}
        <div className="p-3 border-t rounded-b-2xl flex gap-2
                        border-neutral-200 bg-white/80
                        dark:border-neutral-700 dark:bg-neutral-900/80">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
            className="flex-1 px-3 py-2 rounded-xl text-sm outline-none transition-colors
                       border bg-white placeholder:text-neutral-400 text-neutral-900
                       focus:border-blue-500
                       border-neutral-200
                       dark:bg-neutral-900 dark:text-neutral-100 dark:placeholder:text-neutral-500 dark:border-neutral-700 dark:focus:border-blue-400"
            placeholder="Type your message..."
          />
          <button
            onClick={onSend}
            className="px-4 py-2 rounded-xl font-semibold shadow transition-transform disabled:opacity-60 disabled:cursor-not-allowed
                       bg-gradient-to-r from-blue-600 to-emerald-500 text-white hover:scale-105
                       dark:from-blue-500 dark:to-emerald-400"
            disabled={isLoading || !input.trim()}
            aria-label="Send"
            title="Send"
          >
            <IconSend className="w-5 h-5" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const toggleChat = () => setIsOpen((v) => !v);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;
    const userMessage: ChatMessage = {
      sender: "user",
      text: input,
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/gemini", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage.text }),
      });
      if (!res.ok) {
        setMessages((prev) => [
          ...prev,
          { sender: "bot", text: "Sorry, something went wrong." },
        ]);
        return;
      }
      const data = await res.json();
      setMessages((prev) => [...prev, { sender: "bot", text: data.reply }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "Sorry, something went wrong." },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <ChatbotWindow
            messages={messages}
            input={input}
            setInput={setInput}
            onSend={sendMessage}
            onClose={toggleChat}
            isLoading={isLoading}
          />
        )}
      </AnimatePresence>
      <div className="fixed bottom-6 right-6 z-50">
        {!isOpen && <ChatbotButton onClick={toggleChat} />}
      </div>
    </>
  );
}
