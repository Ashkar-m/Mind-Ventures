import { useEffect, useState } from "react";


function Chat({ userId, recieverId }){
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");
    const wsUrl = `ws://127.0.0.1:8000/ws/chat`;

    useEffect(() => {
        const socket = new WebSocket(wsUrl);

        socket.onopen = () => console.log("webSocket connected");
        socket.console = () => console.log("WebSocket disconnected");
        
        socket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            setMessage((prevMessages) => [...prevMessages, data]);
        };

        return () => socket.close();
    }, [wsUrl])
    const sendMessage = () => {
        if (message.trim()) {
            const socket = new WebSocket(wsUrl);
            socket.send(JSON.stringify({
                message,
                reciever_id: recieverId,
            }));
            setMessage("")
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
    )
}

export default Chat;