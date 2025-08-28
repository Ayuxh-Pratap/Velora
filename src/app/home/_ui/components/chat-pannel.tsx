"use client";

import ChatMessage from './chat-message';
import EmptyState from './empty-state';
import { useSidebar } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  created_at: string;
}

interface Props {
  messages: Message[];
  isLoading?: boolean;
}

const ChatPannel = ({ messages, isLoading = false }: Props) => {
  const { state } = useSidebar();
  
  const showEmpty = messages.length === 0;

  return (
    <div className={cn(
      "relative flex flex-col w-full pt-16 pb-24 mx-auto h-full transition-all duration-200 ease-linear",
      // When sidebar is expanded, use smaller max-width for better centering
      state === "expanded" 
        ? "md:max-w-2xl lg:max-w-3xl" 
        : "md:max-w-4xl lg:max-w-5xl"
    )}>
      {showEmpty ? (
        <EmptyState />
      ) : (
        messages.map((msg, index) => (
          <ChatMessage
            key={msg.id}
            message={msg}
            index={index}
            messages={messages}
            isLoading={isLoading}
          />
        ))
      )}
      
      {/* Error state example */}
      {false && (
        <div className="py-4 flex items-center justify-center w-full">
          <div className="flex items-center bg-destructive/10 text-destructive px-4 py-1.5 rounded-lg text-sm">
            <svg className="w-5 h-5 text-destructive" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 18.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
            <p className="ml-2 font-medium">Error message would appear here</p>
          </div>
        </div>
      )}

      <div className="w-full h-px" />
    </div>
  );
};

export default ChatPannel;
