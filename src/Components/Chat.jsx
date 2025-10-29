import React, { useEffect, useRef, useState } from 'react'
import Input from './Input'
import { BiSend } from 'react-icons/bi';

const Chat = () => {
    const [messages, setMessages] = useState([
        { role: "ai", content: "Hey there 👋! How can I help you today?" },
    ]);
    const [input, setInput] = useState("");
    const chatEndRef = useRef(null);

    // Auto-scroll to latest message
    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    // Send message handler
    const handleSend = async () => {
        if (!input.trim()) return;

        const newMessage = { role: "user", content: input.trim() };
        setMessages((prev) => [...prev, newMessage]);
        setInput("");

        // Simulate AI typing / Connect your API here
        setTimeout(() => {
            const aiReply = {
                role: "ai",
                content: "This is a sample AI response 🤖 (connect your backend here).",
            };
            setMessages((prev) => [...prev, aiReply]);
            console.log(input);
            
        }, 800);
    };

    // Handle Enter key
    const handleKeyPress = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <div className="flex flex-col h-full max-w-4xl mx-auto ">
            {/* Header */}
            
            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {messages.map((msg, i) => (
                    <div
                        key={i}
                        className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"
                            }`}
                    >
                        <div
                            className={`max-w-xs md:max-w-md px-4 py-2 rounded-2xl shadow-sm ${msg.role === "user"
                                    ? "bg-violet-600 text-white rounded-br-none"
                                    : "bg-gray-400 text-gray-800 rounded-bl-none"
                                }`}
                        >
                            {msg.content}
                        </div>
                    </div>
                ))}
                <div ref={chatEndRef} />
            </div>

            {/* Input Area */}
          <Input input={input} setInput={setInput} handleSend={handleSend} handleKeyPress={handleKeyPress} />
        </div>
    );
}

export default Chat