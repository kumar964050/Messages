import connectDB from "./config/database";
import app from "./app";
import { Server } from "socket.io";
import userModel from "./models/user.model";

const PORT = process.env.PORT || 5001;
const server = app.listen(PORT, () => {
  console.log(`Server is Running on PORT : ${PORT}`);
  connectDB();
});

const io = new Server(server, {
  cors: {
    origin: "*",
    credentials: true,
  },
});

interface ActiveUser {
  userId: string;
  socketId: string;
}

let activeUsers: ActiveUser[] = [];

// add user into active users arr
const addUser = async ({ userId, socketId }: ActiveUser): Promise<void> => {
  // removing from active user arr
  activeUsers = activeUsers.filter((user) => user.userId !== userId);
  // adding from active user arr
  activeUsers.push({ userId, socketId });

  const activeIds = activeUsers.map((user) => user.userId);
  io.emit("get-users", activeIds);

  // need to do some more async op on msgs and user
};

// get user from activeUsers arr
const getActiveUser = (
  key: "socketId" | "userId",
  value: string
): ActiveUser | null => {
  return activeUsers.find((user) => user[key] === value) ?? null;
};

// remove user from activeUsers
const removeUser = async (socketId: string): Promise<void> => {
  const index = activeUsers.findIndex((user) => user.socketId === socketId);
  if (index === -1) return;
  // const { userId } = activeUsers[index];
  activeUsers.splice(index, 1);

  const activeIds = activeUsers.map((user) => user.userId);
  io.emit("get-users", activeIds);
};

io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);
  //
  socket.on("add-user", (userId) => {
    addUser({ userId, socketId: socket.id });
  });

  //
  socket.on("send-msg", (msg) => {
    const user = getActiveUser("userId", msg.to);
    if (!user) return;
    const { socketId } = user;
    socket.to(socketId).emit("get-msg", msg);
  });

  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);
    removeUser(socket.id);
  });
});
