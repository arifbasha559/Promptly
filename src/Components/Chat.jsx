import React, { useEffect, useRef, useState } from "react";
import Input from "./Input";
import { FaRegCopy, FaRobot, FaUser } from "react-icons/fa6";
import fetchApi from "../api/fetchapi";
import ReactMarkdown from "react-markdown";
import { HiClipboardCheck, HiOutlineClipboardCopy } from "react-icons/hi";
import { BiClipboard } from "react-icons/bi";
import { FaCopy } from "react-icons/fa";
import { AiFillDislike, AiOutlineDislike, AiOutlineLike } from "react-icons/ai";

function typeEffect(text, setMessages, delay = 20) {
    let i = 0;
    const interval = setInterval(() => {
        setMessages((prev) => {
            const last = prev[prev.length - 1];
            const isTyping = i < text.length;
            const displayText = text.slice(0, i) + (isTyping ? "|" : ""); // ▋ acts as cursor

            if (last.role === "ai") {
                const updated = [...prev];
                updated[updated.length - 1].content = displayText;
                return updated;
            } else {
                return [...prev, { role: "ai", content: displayText }];
            }
        });

        i++;
        if (i > text.length) clearInterval(interval);
    }, delay);
}


const Chat = () => {
    const [messages, setMessages] = useState([
        { role: "ai", content: "Hey there 👋! How can I help you today?" },
    ]);

    const models = ["Pollinations", "ContentAI", "Gemini"];
    const [input, setInput] = useState("");
    const [model, setModel] = useState(models[0]);
    const chatEndRef = useRef(null);

    // Auto-scroll
    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    // Send message handler
    const handleSend = async () => {
        if (!input.trim()) return;

        const userMessage = { role: "user", content: input.trim() };
        setMessages((prev) => [...prev, userMessage]);
        setInput("");

        // Placeholder AI "typing..."
        setMessages((prev) => [...prev, { role: "ai", content: "Thinking 🤖..." }]);

        try {
            const aiResponse = await fetchApi(input, model);
            typeEffect(aiResponse, setMessages, 25);
            // eslint-disable-next-line no-unused-vars
        } catch (err) {
            setMessages((prev) => [
                ...prev.slice(0, -1),
                { role: "ai", content: "⚠️ Failed to fetch response. Please try again." },
            ]);
        }
    };

    // Enter key handler
    const handleKeyPress = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };
    const copyToClipboard = async (text) => {
        if (!text) return false;
        try {
            if (navigator.clipboard && navigator.clipboard.writeText) {
                await navigator.clipboard.writeText(text);
            } else {
                // fallback
                const ta = document.createElement("textarea");
                ta.value = text;
                ta.style.position = "fixed";
                ta.style.left = "-9999px";
                document.body.appendChild(ta);
                ta.select();
                document.execCommand("copy");
                document.body.removeChild(ta);
            }
            return true;
        } catch (err) {
            console.error("Copy failed", err);
            return false;
        }
    };

    const [copied, setCopied] = useState(false);
    const [copiedIndex, setCopiedIndex] = useState(null);
    const CodeBlock = ({ children }) => {

        // children can be an array; join strings to get code text
        const codeText = Array.isArray(children)
            ? children.map((c) => (typeof c === "string" ? c : "")).join("")
            : typeof children === "string"
                ? children
                : "";

        const handleCopy = async () => {
            const ok = await copyToClipboard(codeText);
            if (ok) {
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
            }
        };
        return (
            <div className="relative my-3 ">
                <pre className="bg-gray-900  outline-none  rounded-lg p-3 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
                    <p className="mb-2">Code</p>
                    <code className="font-mono text-sm leading-relaxed whitespace-pre p-3">
                        {codeText}
                    </code>
                </pre>

                {/* Copy button */}
                <button
                    onClick={handleCopy}
                    className="absolute top-2 right-2 flex items-center gap-1 bg-black/40 hover:bg-white/10 text-gray-200 px-2 py-1 rounded-md text-xs transition"
                    aria-label="Copy code"
                    title={copied ? "Copied!" : "Copy code"}
                >

                    <span className="flex items-center gap-1 ">
                        <HiOutlineClipboardCopy className="h-4 w-4" />
                        <span>Copy</span>
                    </span>

                </button>
            </div>
        );
    }
    return (
        <div className="flex flex-col relative h-[calc(100vh-40px)]  max-w-11/12 sm:max-w-xl md:max-w-3xl mx-auto">
            {/* Chat Messages */}
            <div className="flex-1 p-4 space-y-3 relative">
                {messages.length == 1 &&
                    (
                        <div className="absolute w-full h-full flex justify-center items-center top-0 left-0 opacity-75 drop-shadow-xs drop-shadow-red-600 select-none pointer-events-none">
                            <div className="text-center text-gray-400 text-xs mt-3 px-4">
                                ⚠️ <b className="text-red-400">Privacy Notice:</b> <br />
                                Messages in this chat are <b>not saved, logged, or shared</b>. <br />
                                Please <b>avoid sending personal, sensitive, or confidential information</b>. <br />
                                All chat data is cleared once you close or refresh this window.
                            </div>
                        </div>
                    )}
                {messages.map((msg, i) => (
                    <div
                        key={i}
                        className={`flex gap-2 items-start ${msg.role === "user" ? "justify-end" : "justify-start"
                            }`}
                    >

                        {msg.role === "ai" && (
                            <div title={model} className="bg-[#383840]  rounded-full rounded-tr-none">
                                <FaRobot className="m-2.5" />
                            </div>
                        )}
                        <div>

                            <div className={`max-w-full h-fit flex flex-col items-start gap-2 mb-4 ${msg.role === "user" ? "justify-end" : "justify-start"
                                } `}>
                                <div
                                    className={`  px-4 py-2  rounded-2xl text-wrap wrap-break-word whitespace-pre-linea	 shadow-sm text-sm ${msg.role === "user"
                                        ? "bg-violet-600 text-white rounded-tr-none ml-auto "
                                        : "hover:bg-[#2E2E33] pb-4 text-gray-100 rounded-tl-none mr-auto  text-justify"
                                        }`}
                                >
                                    {(msg.content.endsWith("▋")) ? (
                                        <div className="typing-cursor">{msg.content.slice(0, -1)}asdad</div>
                                    ) : (
                                        msg.role === "ai" ?
                                            <ReactMarkdown components={{
                                                h1: ({ ...props }) => (
                                                    <h1 className="text-2xl font-bold text-violet-400 mt-2 mb-2" {...props} />
                                                ),
                                                h2: ({ ...props }) => (
                                                    <h2 className="text-xl font-semibold text-violet-400 mt-2 mb-1" {...props} />
                                                ),
                                                h3: ({ ...props }) => (
                                                    <h3 className="text-lg font-semibold text-violet-300 my-2" {...props} />
                                                ),
                                                h4: ({ ...props }) => (
                                                    <h4 className="text-base font-semibold  mb-1" {...props} />
                                                ),
                                                p: ({ ...props }) => (
                                                    <p className=" leading-relaaxed wrap-break-word py-1" {...props} />
                                                ),
                                                ul: ({ ...props }) => (
                                                    <ul className="list-disc list-inside ml-4  space-y-2" {...props} />
                                                ),
                                                ol: ({ ...props }) => (
                                                    <ol className="list-decimal list-inside ml-4  " {...props} />
                                                ),
                                                li: ({ ...props }) => <li className="" {...props} />,
                                                a: ({ ...props }) => (
                                                    <a
                                                        className="text-blue-400 hover:underline hover:text-blue-300"
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        {...props}
                                                    />
                                                ),
                                                code: ({ inline, children, ...props }) => {
                                                    if (inline) {
                                                        return (
                                                            <pre
                                                                className="bg-gray-800  rounded  px-1 py-0.5 text-sm font-mono"
                                                                {...props}
                                                            >
                                                                {children}
                                                            </pre>
                                                        );
                                                    }
                                                    // block code: render CodeBlock
                                                    return <CodeBlock>{children}</CodeBlock>;
                                                },
                                                blockquote: ({ ...props }) => (
                                                    <blockquote
                                                        className="border-l-4 border-violet-500 pl-3 italic text-gray-300 my-2"
                                                        {...props}
                                                    />
                                                ),
                                                hr: () => <hr className="border-gray-700 my-3" />,
                                                strong: ({ ...props }) => (
                                                    <strong className="font-semibold " {...props} />
                                                ),
                                                em: ({ ...props }) => <em className="italic " {...props} />,
                                                table: ({ ...props }) => (
                                                    <table className="border border-gray-700 my-2 w-full text-left text-gray-200" {...props} />
                                                ),
                                                thead: ({ ...props }) => <thead className="bg-gray-800" {...props} />,
                                                tbody: ({ ...props }) => <tbody {...props} />,
                                                tr: ({ ...props }) => <tr className="border-b border-gray-700" {...props} />,
                                                th: ({ ...props }) => (
                                                    <th className="px-3 py-2 font-semibold text-gray-100" {...props} />
                                                ),
                                                td: ({ ...props }) => <td className="px-3 py-2" {...props} />,
                                            }}

                                            >
                                                {msg.content}
                                            </ReactMarkdown>
                                            : ""
                                    )}

                                    {msg.role === "user" &&

                                        msg.content.trim()
                                    }
                                </div>

                                {i !== 0 && (
                                    <div className={`flex gap-2 pl-3 ${msg.role === "user" ? "ml-auto" : "justify-start"
                                        } `}>

                                        <button
                                            onClick={() => {
                                                setCopiedIndex(i);
                                                copyToClipboard(msg.content);
                                                setTimeout(() => setCopiedIndex(null), 1000); // reset only that one
                                            }}
                                            className={`text-gray-400 cursor-pointer  hover:text-white transition-colors ${msg.role === "user" ? "ml-auto" : "justify-start"
                                                } `}
                                            title="Copy message"
                                        >
                                            {copiedIndex === i ? <FaCopy /> : <FaRegCopy />}
                                        </button>
                                        {
                                            msg.role !== "user" && (
                                                <>

                                                    <button

                                                        className={`text-gray-400 cursor-pointer  hover:text-white transition-colors ${msg.role === "user" ? "ml-auto" : "justify-start"
                                                            } `}
                                                        title="Copy message"
                                                    >
                                                        <AiOutlineLike />
                                                    </button>
                                                    <button

                                                        className={`text-gray-400 cursor-pointer  hover:text-white transition-colors ${msg.role === "user" ? "ml-auto" : "justify-start"
                                                            } `}
                                                        title="Copy message"
                                                    >
                                                        <AiOutlineDislike />
                                                    </button>
                                                </>
                                            )
                                        }
                                    </div>
                                )}
                            </div>
                        </div>
                        {
                            msg.role === "user" && (
                                <div className="bg-[#2A2A2E] rounded-full rounded-tl-none">
                                    <FaUser className="m-2.5" />
                                </div>
                            )
                        }
                    </div >
                ))}
                <div ref={chatEndRef} />
            </div>

            {/* Input Area */}
            <div className="sticky bottom-0 bg-[#1B1B1F] pb-4 px-4"
            >
                <Input
                    input={input}
                    setInput={setInput}
                    handleSend={handleSend}
                    handleKeyPress={handleKeyPress}
                    model={model}
                    models={models}
                    setModel={setModel}
                />
            </div>
        </div>
    );
};

export default Chat;
