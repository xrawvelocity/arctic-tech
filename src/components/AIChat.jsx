import { useState, useEffect, useRef } from "react";
import { generatePrompt } from "../utils/chatPrompt";

const AIChat = () => {
    const [chatOpen, setChatOpen] = useState(false)
    const [messages, setMessages] = useState([
        {
            sender: "assistant",
            text: "Hello! Welcome to ArticTech's customer support. How can I assist you today?",
        },
    ]);
    const [messageInput, setMessageInput] = useState("");

    const chatBodyRef = useRef();

    async function onSubmit() {
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                message: generatePrompt(messageInput, messages),
            }),
        }

        try {
            const response = await fetch("http://localhost:8000/completions", options);

            console.log('response', response)

            const data = await response.json();

            console.log('data', data)

            if (response.status !== 200) {
                throw (
                    data.error ||
                    new Error(`Request failed with status ${response.status}`)
                );
            }

            setMessages([
                ...messages,
                {
                    text: messageInput,
                    sender: "human",
                },
                {
                    text: data.choices[0].message.content,
                    sender: "assistant",
                },
            ]);
            setMessageInput("");
        } catch (error) {
            // Consider implementing your own error handling logic here
            console.error(error);
            alert(error.message);
        }
    }

    const handleInputChange = (e) => {
        setMessageInput(e.target.value);
    };

    const handleInputKeyDown = (e) => {
        if (e.key === "Enter") {
            handleSendMessage();
        }
    };

    const handleSendMessage = async () => {
        if (messageInput.trim() !== "") {
            await onSubmit();
        }
    };

    useEffect(() => {
        if (messages.length > 0) {
            chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
        }
    }, [messages]);

    
        return (
            <>
                <div className={`chatContainer ${chatOpen ? 'show' : 'hide'}`}>
                    <div className="chatHeader">
                        <h3>Customer Support Chat</h3>
                        <button className="closeChatButton" onClick={()=> setChatOpen(false)}>X</button>
                    </div>
                    <div className="chatBody" ref={chatBodyRef}>
                        {messages.map((message, index) => (
                            <div
                                key={index}
                                className={`messageContainer ${
                                    message.sender === "assistant"
                                        ? "botMessageContainer"
                                        : "userMessageContainer"
                                }`}
                            >
                                <div
                                    className={`messageBubble ${
                                        message.sender === "assistant"
                                            ? "botMessageBubble"
                                            : "userMessageBubble"
                                    }`}
                                >
                                    {message.text}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="inputContainer">
                        <input
                            type="text"
                            placeholder="Type your message..."
                            value={messageInput}
                            onChange={handleInputChange}
                            onKeyDown={handleInputKeyDown}
                            className="chatInput"
                        />
                        <button
                            onClick={handleSendMessage}
                            className="sendButton"
                        >
                            Send
                        </button>
                    </div>
                </div>
                <div className={`chatButton ${chatOpen ? 'hide' : 'show'}`} onClick={()=> setChatOpen(true)}>💬</div>
                </>
        );

        
    
}

export default AIChat