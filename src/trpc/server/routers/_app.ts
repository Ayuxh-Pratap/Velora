import { createTRPCRouter } from "../init";
import { userRouter } from "./user";
import { chatRouter } from "./chat";
import { messageRouter } from "./message";
import { aiRouter } from "./ai";
import { nodeRouter } from "./node";
import { chatNodeRouter } from "./chatNode";

export const appRouter = createTRPCRouter({
  user: userRouter,
  chat: chatRouter,
  message: messageRouter,
  ai: aiRouter,
  node: nodeRouter,
  chatNode: chatNodeRouter,
});

export type AppRouter = typeof appRouter;