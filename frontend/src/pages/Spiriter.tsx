import { useState } from "react";
import { Send, Bot } from "lucide-react";
import { cn } from "../lib/utils";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
  id: string;
  type: "user" | "bot";
  content: string;
  timestamp: Date;
}

export function Spiriter() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "bot",
      content:
        "Hi! I'm Spiriter, your fantasy cricket assistant. I can help you build the best team and answer questions about player statistics. How can I help you today?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = () => {
    if (!input.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newMessage]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: "bot",
        content:
          "I understand you want help with team selection. Based on current form and statistics, I recommend focusing on top-order batsmen and all-rounders for a balanced team composition.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-24 md:pt-4">
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-4 bg-blue-600 text-white flex items-center">
              <Bot className="h-6 w-6 mr-2" />
              <h1 className="text-xl font-semibold">Spiriter</h1>
            </div>

            <div className="h-[calc(100vh-300px)] overflow-y-auto p-4">
              <AnimatePresence>
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className={cn(
                      "mb-4 max-w-[80%] rounded-lg p-4",
                      message.type === "user"
                        ? "ml-auto bg-blue-600 text-white"
                        : "bg-gray-100 text-gray-900"
                    )}
                  >
                    <p>{message.content}</p>
                    <span className="text-xs opacity-70 mt-1 block">
                      {message.timestamp.toLocaleTimeString()}
                    </span>
                  </motion.div>
                ))}
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex space-x-2 mb-4"
                  >
                    <div className="bg-gray-200 rounded-full h-2 w-2 animate-bounce" />
                    <div className="bg-gray-200 rounded-full h-2 w-2 animate-bounce delay-100" />
                    <div className="bg-gray-200 rounded-full h-2 w-2 animate-bounce delay-200" />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="p-4 border-t">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSend()}
                  placeholder="Ask Spiriter anything..."
                  className="flex-1 px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSend}
                  disabled={!input.trim()}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="h-5 w-5" />
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
