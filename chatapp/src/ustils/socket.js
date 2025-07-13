import io from "socket.io-client"
export const socket = io('https://chat-app-server-ci6w.onrender.com/',{
    transports: ["websocket"],
  });

