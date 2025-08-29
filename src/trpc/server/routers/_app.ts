import { createTRPCRouter } from "../init";
import { userRouter } from "./user";
import { chatRouter } from "./chat";
import { messageRouter } from "./message";
import { aiRouter } from "./ai";

export const appRouter = createTRPCRouter({
  user: userRouter,
  chat: chatRouter,
  message: messageRouter,
  ai: aiRouter,
});

export type AppRouter = typeof appRouter;