"use client";
import { useState } from 'react';
import Image from 'next/image';


const SUGGESTED_QUESTIONS = [
    "Tell me about yourself",
    "Projects you made",
    "Why should I hire you?",
    "Show your backend skills",
    "What's your tech stack?"
];

export default function ChatWindow({ onClose }: { onClose?: () => void }) {
    const [messages, setMessages] = useState<{ role: string, content: string }[]>([]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSendMessage = async (msg: string) => {
        if (!msg.trim()) return;
        console.log(messages);

        const newMessages = [...messages, { role: "user", content: msg }];

        console.log(newMessages);
        setMessages(newMessages);
        setInput("");
        setIsLoading(true);

        try {
            const res = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: msg, history: messages.map(m => ({ role: m.role, content: m.content })) }),
            });

            if (!res.body) throw new Error("No response body");

            const reader = res.body.getReader();
            const decoder = new TextDecoder();
            let assistantMessage = "";

            setIsLoading(false);
            setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;
                assistantMessage += decoder.decode(value, { stream: true });
                setMessages((prev) => {
                    const newMsgs = [...prev];
                    newMsgs[newMsgs.length - 1].content = assistantMessage;
                    return newMsgs;
                });
            }
        } catch (e) {
            console.error(e);
            setIsLoading(false);
        }
    };

    return (
        <div
            className="w-[340px] md:w-[400px] h-[500px] flex flex-col rounded-xl overflow-hidden border border-white/10 bg-[#1c1c1e] shadow-2xl"
        >
            {/* Chat Header */}
            <div className="window-handle cursor-grab active:cursor-grabbing flex items-center px-4 py-3 border-b border-white/[0.07] bg-[#2a2a2c] relative">
                <div className="flex gap-[7px]">
                    <button
                        onClick={onClose}
                        className="w-3 h-3 rounded-full bg-[#FF5F57] flex items-center justify-center transition-all hover:brightness-110 active:brightness-75"
                        title="Close"
                    />
                    <div className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
                    <div className="w-3 h-3 rounded-full bg-[#28C840]" />
                </div>
                <div className="flex items-center gap-2 absolute left-1/2 -translate-x-1/2">
                    <Image src="/icons/askai.svg" alt="Ask Me" width={20} height={20} />
                    <span className="text-[13px] font-medium text-white/90">Ask Me</span>
                </div>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 bg-[#1a1a1c] overflow-y-auto p-4 flex flex-col gap-3 min-h-[250px] scrollbar-thin scrollbar-thumb-white/20">
                {messages.length === 0 ? (
                    <div className="flex flex-col items-start gap-2 h-full">
                        <span className="text-[14px] font-medium text-white/80 mb-2">👋 Ask me anything!</span>
                        {SUGGESTED_QUESTIONS.map((q, idx) => (
                            <button
                                key={idx}
                                onClick={() => handleSendMessage(q)}
                                className="
                                        bg-white/[0.06]
                                        border border-white/[0.08]
                                        text-[#E5E5E7]
                                        text-sm
                                        rounded-full
                                        px-2.5 py-1
                                        transition-all duration-200
                                        hover:bg-white/[0.12]
                                        hover:border-white/[0.15]
"                            >
                                • {q}
                            </button>
                        ))}
                    </div>
                ) : (
                    messages.map((m, idx) => (
                        <div key={idx} className={`max-w-[85%] break-words whitespace-pre-wrap rounded-2xl px-4 py-2 text-[13px] leading-relaxed ${m.role === 'user' ? 'bg-[#0A84FF] text-white self-end rounded-br-sm' : 'bg-white/10 text-white/90 self-start rounded-bl-sm border border-white/5'}`}>
                            {m.content}
                        </div>
                    ))
                )}
                {isLoading && (
                    <div className="bg-white/10 self-start rounded-2xl rounded-bl-sm border border-white/5 px-4 py-2 flex items-center gap-1">
                        <div className="w-1.5 h-1.5 bg-white/50 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                        <div className="w-1.5 h-1.5 bg-white/50 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                        <div className="w-1.5 h-1.5 bg-white/50 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                )}
            </div>

            {/* Chat Input */}
            <div className="p-3 border-t border-white/[0.07] bg-[#1c1c1e]">
                <form onSubmit={(e) => { e.preventDefault(); handleSendMessage(input); }} className="relative flex items-center">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Type a message..."
                        className="w-full bg-white/5 border border-white/10 rounded-full pl-4 pr-10 py-2 text-[13px] text-white placeholder-white/40 focus:outline-none focus:border-white/20 transition-colors"
                    />
                    <button
                        type="submit"
                        disabled={!input.trim() || isLoading}
                        className="absolute right-2 p-1.5 rounded-full bg-[#0A84FF] text-white disabled:opacity-50 disabled:bg-white/10 transition-colors"
                    >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" /></svg>
                    </button>
                </form>
            </div>
        </div>
    );
}
