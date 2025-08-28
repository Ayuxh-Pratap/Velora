"use client";

import { cn } from "@/lib/utils";

interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  created_at: string;
}

interface Props {
  index: number;
  message: Message;
  messages: Message[];
  isLoading: boolean;
}

const ChatMessage = ({ index, message, messages, isLoading }: Props) => {
  const isUser = message.role === "user";
  const isLastMessage = index === messages.length - 1;
  const showLoading = isLoading && isLastMessage && !isUser;

  return (
    <div
      className={cn(
        "flex gap-x-2 p-2 group/message transition-all duration-300",
        isUser ? "text-start" : "items-start my-3",
        isLastMessage ? "pb-80" : "",
      )}
    >
      <div className="relative flex-1 px-1 overflow-hidden">
        <div
          data-id="message-content"
          className={cn(
            "flex flex-col grow transition-all duration-300",
            message.role === "user" && "bg-muted text-foreground w-fit max-w-[85%] ml-auto rounded-lg px-3 py-1.5",
            !isUser && message.content.length <= 90 && "pt-1"
          )}
        >
          {showLoading ? (
            <div className="flex items-center pt-2.5 animate-pulse">
              <div className="w-2.5 h-2.5 rounded-full bg-foreground animate-pulse" />
            </div>
          ) : (
            <div className="whitespace-pre-wrap break-words">
              {message.content}
            </div>
          )}
        </div>
        
        {/* Message options placeholder */}
        {!isLoading && !showLoading && (
          <div className="opacity-0 group-hover/message:opacity-100 transition-opacity">
            {/* Message options would go here */}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatMessage;
