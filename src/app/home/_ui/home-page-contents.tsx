"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTRPC } from "@/trpc/client";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import ChatContainer from "./components/chat-container";
import ChatWrapper from "./components/chat-wrapper";
import ChatInput from "./components/chat-input";
import EmptyState from "./components/empty-state";

interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  created_at: string;
}

// Utility function to generate unique IDs
const generateUniqueId = () => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

export const HomePageContents = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [pendingMessage, setPendingMessage] = useState<string>('');
  const router = useRouter();
  const trpc = useTRPC();

  const createChatMutation = useMutation(trpc.chat.createChat.mutationOptions({
    onSuccess: (data: any) => {
      // Check if we have a valid chat ID before redirecting
      if (!data?.chat?.id) {
        toast.error("Failed to create chat: Invalid chat ID");
        setIsLoading(false);
        setPendingMessage('');
        return;
      }

      // Redirect to the new chat with the message as URL parameter
      const url = pendingMessage ? `/home/c/${data.chat.id}?message=${encodeURIComponent(pendingMessage)}` : `/home/c/${data.chat.id}`;
      router.push(url);
      setPendingMessage(''); // Clear the pending message
    },
    onError: (error: any) => {
      toast.error("Failed to create chat. Please try again.");
      console.error("Error creating chat:", error);
      setIsLoading(false);
      setPendingMessage(''); // Clear the pending message on error
    }
  }));

  const handleSendMessage = async (content: string) => {
    if (!content.trim()) return;

    // If this is the first message (empty state), create a new chat
    if (messages.length === 0) {
      setIsLoading(true);
      setPendingMessage(content); // Store the message content
      
      try {
        // Create a new chat with the message content as title
        const title = content.length > 50 ? content.substring(0, 50) + "..." : content;
        await createChatMutation.mutateAsync({ title });
        
        // The redirect will happen in the onSuccess callback
        return;
      } catch (error) {
        setIsLoading(false);
        setPendingMessage(''); // Clear on error
        return;
      }
    }

    // For existing chats, just add the message (this will be handled in the chat page)
    const userMessage: Message = {
      id: generateUniqueId(),
      content,
      role: 'user',
      created_at: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    // Simulate AI response (replace with actual AI integration later)
    setTimeout(() => {
      const aiMessage: Message = {
        id: generateUniqueId(),
        content: `I received your message: "${content}". This is a simulated response. In a real implementation, this would be an AI-generated response.`,
        role: 'assistant',
        created_at: new Date().toISOString()
      };

      setMessages(prev => [...prev, aiMessage]);
      setIsLoading(false);
    }, 1000);
  };

  const handleSelectPrompt = (prompt: string) => {
    handleSendMessage(prompt);
  };

  return (
    <>
      <ChatContainer>
        {messages.length === 0 ? (
          <EmptyState onSelectPrompt={handleSelectPrompt} />
        ) : (
            <ChatWrapper
              messages={messages}
              isLoading={isLoading}
            />
        )}
      </ChatContainer>
      <ChatInput
        isLoading={isLoading}
        onSendMessage={handleSendMessage}
      />
    </>
  );
};