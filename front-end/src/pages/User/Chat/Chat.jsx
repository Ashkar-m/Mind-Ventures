// // import { useEffect, useState } from "react";


// // function Chat({ userId, recieverId }){
// //     const [messages, setMessages] = useState([]);
// //     const [message, setMessage] = useState("");
// //     const wsUrl = `ws://127.0.0.1:8000/ws/chat`;

// //     useEffect(() => {
// //         const socket = new WebSocket(wsUrl);

// //         socket.onopen = () => console.log("webSocket connected");
// //         socket.console = () => console.log("WebSocket disconnected");
        
// //         socket.onmessage = (event) => {
// //             const data = JSON.parse(event.data);
// //             setMessage((prevMessages) => [...prevMessages, data]);
// //         };

// //         return () => socket.close();
// //     }, [wsUrl])
// //     const sendMessage = () => {
// //         if (message.trim()) {
// //             const socket = new WebSocket(wsUrl);
// //             socket.send(JSON.stringify({
// //                 message,
// //                 reciever_id: recieverId,
// //             }));
// //             setMessage("")
// //         }
// //     };


// //     return (
// //         <div>
// //             <div>
// //                 {messages.map((msg, idx) => (
// //                     <div key={idx}>
// //                         <strong>{msg.sender_id === userId ? "You" : "Mentor"}:</strong> {msg.message}

// //                     </div>
// //                 ))}
                
// //             </div>
// //             <input
// //                 type="text"
// //                 value={message}
// //                 onChange={(e) => setMessage(e.target.value)}
// //             />
// //             <button onClick={sendMessage}>Send</button>
// //         </div>
// //     )
// // }

// // export default Chat;


// import { useEffect, useState } from "react";

// function Chat({ userId, receiverId }) {
//     const [messages, setMessages] = useState([]);
//     const [message, setMessage] = useState("");
//     const wsUrl = `ws://127.0.0.1:8000/ws/chat`;

//     useEffect(() => {
//         const socket = new WebSocket(wsUrl);

//         socket.onopen = () => console.log("WebSocket connected");

//         socket.onclose = () => console.log("WebSocket disconnected");

//         socket.onmessage = (event) => {
//             const data = JSON.parse(event.data);
//             setMessages((prevMessages) => [...prevMessages, data]);
//         };

//         // Cleanup WebSocket connection on component unmount
//         return () => socket.close();
//     }, [wsUrl]);

//     const sendMessage = () => {
//         if (message.trim()) {
//             const socket = new WebSocket(wsUrl); // Create a new instance only if needed
//             socket.onopen = () => {
//                 socket.send(JSON.stringify({
//                     message,
//                     receiver_id: receiverId,
//                 }));
//                 setMessage("");
//             };
//         }
//     };

//     return (
//         <div>
//             <div>
//                 {messages.map((msg, idx) => (
//                     <div key={idx}>
//                         <strong>{msg.sender_id === userId ? "You" : "Mentor"}:</strong> {msg.message}
//                     </div>
//                 ))}
//             </div>
//             <input
//                 type="text"
//                 value={message}
//                 onChange={(e) => setMessage(e.target.value)}
//             />
//             <button onClick={sendMessage}>Send</button>
//         </div>
//     );
// }

// export default Chat;



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
