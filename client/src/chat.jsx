import React, { useRef, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";


function Chat() {
    const [room, setRoom] = useState("room 1"); // default room
    const [connected, setConnected] = useState(false);
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const ws = useRef(null);
    const location = useLocation();
    const username = location.state?.username || "client";

    useEffect(() => {
        // Only connect when user clicks Join Room
        if (!connected) return;
        ws.current = new WebSocket("ws://localhost:3001");

        ws.current.onopen = () => {
            console.log("Connected to WebSocket server");
            // Send join message after connection is open
            ws.current.send(JSON.stringify());
        };

        ws.current.onmessage = async (e) => {
            let data;
            if (e.data instanceof Blob) {
                const text = await e.data.text();
                data = JSON.parse(text);
            } else {
                data = JSON.parse(e.data);
            }
            setMessages((prev) => [...prev, data]);
            console.log(setMessages)
        };

        ws.current.onclose = () => {
            setConnected(false);
        };

        // Cleanup on unmount
        return () => {
            if (ws.current) ws.current.close();
        };
    }, [room, connected]);

    const handleJoinRoom = () => {
        setConnected(true);
    };

    const handleSend = () => {
        const newMessage = { type: "message", room, from: username, text: message };
        ws.current.send(JSON.stringify(newMessage));

        setMessage("");
        console.log(newMessage, "message sent");
    };




    return (
        <div className="flex flex-col items-center justify-center  ">
            <h1 className="text-3xl font-bold mt-20">Welcome to the Chat Room: {room}</h1>

            {!connected ? (
                <div className="flex flex-col items-center justify-center mt-10 text-2xl gap-4 font-serif">
                    <label>Select Room{room}</label>
                    <select value={room} onChange={e => setRoom(e.target.value)} className="border p-2 px-3 rounded cursor-pointer">
                        <option value="room 1">Room 1</option>
                        <option value="room 2">Room 2</option>
                        <option value="room 3">Room 3</option>
                    </select>
                    <button onClick={handleJoinRoom} className="bg-blue-600 p-2 rounded">Join Room</button>
                </div>
            ) : (
                <>
                    <div className="h-96 w-full flex flex-col items-center justify-center">
                        {messages.map((msg, index) => (
                            <p key={index} className="text-lg bg-gray-100 p-3 m-3 rounded-md">
                                <strong>{msg.from} </strong> {msg.text}
                            </p>
                        ))}
                    </div>
                    <div className="flex items-center justify-center w-full p-10 gap-2">
                        <input
                            type="text"
                            placeholder="Type your message here"
                            className="w-full border border-black p-3 rounded-xl"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                        />
                        <button
                            className="bg-blue-600 text-white p-3 rounded-xl"
                            onClick={handleSend}
                        >Send</button>
                    </div>
                </>
            )}
        </div>

    )
}

export default Chat;

