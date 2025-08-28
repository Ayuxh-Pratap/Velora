"use client";
import { useState } from "react";
import ChatContainer from "./components/chat-container";
import ChatWrapper from "./components/chat-wrapper";
import ChatInput from "./components/chat-input";
import { AppSidebar } from "@/components/navigation/sidebar/app-sidebar";
import { SiteHeader } from "@/components/navigation/sidebar/site-header";
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar";

interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  created_at: string;
}

export const HomePageContents = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: 'Hello! How can I help you today?',
      role: 'user',
      created_at: new Date().toISOString()
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async (content: string) => {
    // Add user message immediately
    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      role: 'user',
      created_at: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    // Simulate AI response (replace with actual AI integration later)
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: `I received your message: "${content}". This is a simulated response. In a real implementation, this would be an AI-generated response.`,
        role: 'assistant',
        created_at: new Date().toISOString()
      };

      setMessages(prev => [...prev, aiMessage]);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="[--header-height:calc(--spacing(14))]">
      <SidebarProvider className="flex flex-col">
        <SiteHeader />
        <div className="flex flex-1">
          <AppSidebar />
          <SidebarInset>
            <ChatContainer>
              <ChatWrapper
                messages={messages}
                isLoading={isLoading}
              />
            </ChatContainer>
            <ChatInput
              isLoading={isLoading}
              onSendMessage={handleSendMessage}
            />
          </SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  );
};