"use client";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import {
  IconUser,
  IconRobot,
  IconSend,
  IconX,
  IconSparkles,
} from "@tabler/icons-react";
import { motion, AnimatePresence } from "framer-motion";

interface ChatMessage {
  sender: "user" | "bot";
  text: string;
}

function ChatbotButton({ onClick }: { onClick: () => void }) {
  return (
    <motion.button
      onClick={onClick}
      className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full shadow-2xl flex items-center justify-center border-2 border-primary/30 hover:scale-105 transition-transform duration-200 focus:outline-none focus:ring-2 focus:ring-primary/50"
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
        className="relative w-80 h-96 bg-gradient-to-br from-background/95 to-secondary/80 shadow-2xl rounded-2xl flex flex-col border border-primary/20 backdrop-blur-xl resize overflow-hidden min-w-[320px] min-h-[300px] max-w-[90vw] max-h-[80vh]"
        style={{ resize: "both" }}
      >
        <div className="flex items-center justify-between px-4 py-3 border-b border-primary/10 bg-gradient-to-r from-primary/10 to-accent/10 rounded-t-2xl cursor-move">
          <div className="flex items-center space-x-2">
            <Image
              src="/alternative-logo.png"
              alt="BinggBot Logo"
              width={24}
              height={24}
              className="w-6 h-6 object-contain"
            />
            <span className="font-bold text-lg bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              BinggBot
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-primary text-xl font-bold p-1 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50"
            aria-label="Close Chatbot"
          >
            <IconX className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
          <AnimatePresence>
            {messages.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex-1 flex flex-col items-center justify-center text-center px-4"
              >
                <IconSparkles className="w-12 h-12 text-primary/50 mb-4" />
                <div className="text-foreground font-semibold mb-2">
                  Hello there! 👋
                </div>
                <div className="text-muted-foreground text-sm">
                  I&apos;m BinggBot. How can I help you today?
                </div>
                <div className="mt-4 flex flex-wrap gap-2 justify-center">
                  {[
                    "What are your features?",
                    "How do I get started?",
                    "Who created you?",
                  ].map((suggestion) => (
                    <motion.button
                      key={suggestion}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="text-xs px-3 py-1.5 bg-background/50 border border-primary/20 text-foreground/80 rounded-full hover:bg-primary/20 transition-colors duration-200"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {suggestion}
                    </motion.button>
                  ))}
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
                    <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center">
                      <IconRobot className="w-4 h-4 text-white" />
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] ${
                      msg.sender === "user" ? "order-1" : ""
                    }`}
                  >
                    <div
                      className={`${
                        msg.sender === "user"
                          ? "bg-primary/10 text-primary rounded-2xl rounded-tr-md"
                          : "bg-accent/10 text-accent rounded-2xl rounded-tl-md"
                      } px-3 py-2 text-sm`}
                    >
                      <p>{msg.text}</p>
                    </div>
                  </div>
                  {msg.sender === "user" && (
                    <div className="flex-shrink-0 w-8 h-8 bg-muted-foreground rounded-full flex items-center justify-center order-2">
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
                <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center">
                  <IconRobot className="w-4 h-4 text-white" />
                </div>
                <div className="bg-accent/10 text-accent px-3 py-2 rounded-2xl rounded-tl-md">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-accent/80 rounded-full animate-bounce" />
                    <div
                      className="w-2 h-2 bg-accent/60 rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    />
                    <div
                      className="w-2 h-2 bg-accent/40 rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <div ref={messageEndRef} />
        </div>

        <div className="p-3 border-t border-primary/10 bg-background/80 rounded-b-2xl flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
            className="flex-1 border border-primary/20 px-3 py-2 rounded-xl text-sm text-foreground bg-background placeholder:text-muted-foreground focus:outline-none focus:border-primary"
            placeholder="Type your message..."
          />
          <button
            onClick={onSend}
            className="px-4 py-2 bg-gradient-to-r from-primary to-accent text-white rounded-xl font-semibold shadow hover:scale-105 transition-transform"
            disabled={isLoading || !input.trim()}
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
        body: JSON.stringify({ message: input }),
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
