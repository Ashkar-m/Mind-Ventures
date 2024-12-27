

import { useEffect, useState, useRef } from "react";

function Chat({ userId, receiverId }) {
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");
    const wsUrl = `ws://127.0.0.1:8000/ws/chat`;
    const socketRef = useRef(null);

    useEffect(() => {
        socketRef.current = new WebSocket(wsUrl);

        socketRef.current.onopen = () => console.log("WebSocket connected");
        socketRef.current.onclose = () => console.log("WebSocket disconnected");

        socketRef.current.onmessage = (event) => {
            const data = JSON.parse(event.data);
            setMessages((prevMessages) => [...prevMessages, data]);
        };

        return () => {
            socketRef.current.close();
        };
    }, [wsUrl]);

    const sendMessage = () => {
        if (message.trim() && socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
            socketRef.current.send(JSON.stringify({
                message,
                reciever_id: receiverId,
            }));
            setMessage("");
        }
    };

    return (
        <div>
            <div>
                {messages.map((msg, idx) => (
                    <div key={idx}>
                        <strong>{msg.sender_id === userId ? "You" : "Mentor"}:</strong> {msg.message}
                    </div>
                ))}
            </div>
            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
            />
            <button onClick={sendMessage}>Send</button>
        </div>
    );
}

export default Chat;
