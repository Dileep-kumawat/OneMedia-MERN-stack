import { Server } from "socket.io";

let io;
const onlineUsers = new Map();

export const initSocket = (server) => {
    io = new Server(server, {
        cors: {
            origin: "http://localhost:5173",
            methods: ["GET", "POST"],
            credentials: true,
        },
    });

    io.on("connection", (socket) => {
        console.log("New client connected: " + socket.id);

        socket.on("addUser", (userId) => {
            if (userId) {
                onlineUsers.set(userId, socket.id);
                console.log(`User ${userId} connected with socket ${socket.id}`);
                
                io.emit("getUsers", Array.from(onlineUsers.keys()));
            }
        });

        socket.on("sendMessage", ({ senderId, receiverId, message, senderName, senderAvatar }) => {
            if (!senderId || !receiverId || !message) return;
            
            const receiverSocketId = onlineUsers.get(receiverId);
            const senderSocketId = onlineUsers.get(senderId);
            const messageData = {
                senderId,
                senderName,
                senderAvatar,
                message,
                timestamp: new Date()
            };

            if (receiverSocketId) {
                io.to(receiverSocketId).emit("getMessage", messageData);
            }
            
            if (senderSocketId && senderSocketId !== receiverSocketId) {
                io.to(senderSocketId).emit("getMessage", messageData);
            }
        });

        socket.on("sendGroupMessage", ({ senderId, message, senderName, senderAvatar }) => {
            if (!senderId || !message) return;
            
            const messageData = {
                senderId,
                senderName,
                senderAvatar,
                message,
                timestamp: new Date()
            };

            io.emit("getGroupMessage", messageData);
        });

        socket.on("typing", ({ receiverId, isTyping }) => {
            if (!receiverId) return;
            
            const receiverSocketId = onlineUsers.get(receiverId);
            if (receiverSocketId) {
                io.to(receiverSocketId).emit("userTyping", { isTyping });
            }
        });

        socket.on("joinRoom", (roomId) => {
            if (roomId) {
                socket.join(roomId);
                console.log(`Socket ${socket.id} joined room ${roomId}`);
            }
        });

        socket.on("leaveRoom", (roomId) => {
            if (roomId) {
                socket.leave(roomId);
                console.log(`Socket ${socket.id} left room ${roomId}`);
            }
        });

        socket.on("disconnect", () => {
            console.log("Client disconnected: " + socket.id);
            
            for (let [userId, socketId] of onlineUsers.entries()) {
                if (socketId === socket.id) {
                    onlineUsers.delete(userId);
                    console.log(`User ${userId} disconnected`);
                    break;
                }
            }
            
            io.emit("getUsers", Array.from(onlineUsers.keys()));
        });
    });
};

export const getIo = () => {
    if (!io) {
        throw new Error("Socket.io not initialized");
    }
    return io;
};

export const getSocketId = (userId) => {
    return onlineUsers.get(userId);
};

export const getOnlineUsers = () => {
    return Array.from(onlineUsers.keys());
};
