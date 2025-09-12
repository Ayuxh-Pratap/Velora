"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useTRPC } from "@/trpc/client";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import ChatContainer from "./components/chat-container";
import ChatWrapper from "./components/chat-wrapper";
import ChatInput from "./components/chat-input";
import EmptyState from "./components/empty-state";
import StudyModeLayout from "./components/study-mode-layout";
import { NodeWorkspaceModal } from "./node/node-workspace-modal";

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
  console.log('HomePageContents component rendering...');
  
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [pendingMessage, setPendingMessage] = useState<string>('');
  const [isStudyMode, setIsStudyMode] = useState(false);
  const [isNodeMode, setIsNodeMode] = useState(false);
  const [currentInput, setCurrentInput] = useState<string>('');
  const router = useRouter();
  const trpc = useTRPC();

  // Debug useEffect to monitor mode state changes
  useEffect(() => {
    console.log('Study mode state changed to:', isStudyMode);
    console.log('Node mode state changed to:', isNodeMode);
  }, [isStudyMode, isNodeMode]);

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

    // Set current input for study mode display
    setCurrentInput(content);

    // If this is the first message (empty state), create a new chat
    if (messages.length === 0 && !isStudyMode && !isNodeMode) {
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

    // For study mode, node mode, or existing chats, add the message
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
        content: isStudyMode
          ? `Sign language translation for: "${content}". The 3D model will now demonstrate the corresponding gestures.`
          : isNodeMode
            ? `Medical specialist team response for: "${content}". Your healthcare specialists are analyzing your query and will provide comprehensive medical insights.`
            : `I received your message: "${content}". This is a simulated response. In a real implementation, this would be an AI-generated response.`,
        role: 'assistant',
        created_at: new Date().toISOString()
      };

      setMessages(prev => [...prev, aiMessage]);
      setIsLoading(false);
      setCurrentInput(''); // Clear current input after processing
    }, 2000); // Longer delay for study mode to simulate processing
  };

  const handleSelectPrompt = (prompt: string) => {
    handleSendMessage(prompt);
  };

  const handleToggleStudyMode = () => {
    console.log('Study mode toggle clicked! Current state:', isStudyMode);
    const newState = !isStudyMode;
    console.log('Setting study mode to:', newState);
    setIsStudyMode(newState);
    // Clear current input when toggling modes
    setCurrentInput('');
  };

  const handleToggleNodeMode = () => {
    console.log('Node mode toggle clicked! Current state:', isNodeMode);
    const newState = !isNodeMode;
    console.log('Setting node mode to:', newState);
    setIsNodeMode(newState);
    // Clear current input when toggling modes
    setCurrentInput('');
    console.log('Node mode state updated to:', newState);
  };

  console.log('Rendering with isStudyMode:', isStudyMode, 'isNodeMode:', isNodeMode, 'messages.length:', messages.length);
  console.log('handleToggleStudyMode function:', handleToggleStudyMode);
  console.log('handleToggleNodeMode function:', handleToggleNodeMode);

  return (
    <>
      <ChatContainer isStudyMode={isStudyMode}>
        {isStudyMode ? (
          <StudyModeLayout
            messages={messages}
            isLoading={isLoading}
            currentInput={currentInput}
          />
        ) : messages.length === 0 ? (
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
        isStudyMode={isStudyMode}
        onToggleStudyMode={handleToggleStudyMode}
        isNodeMode={isNodeMode}
        onToggleNodeMode={handleToggleNodeMode}
      />
      
      {/* Node Workspace Modal */}
      <NodeWorkspaceModal
        isOpen={isNodeMode}
        onClose={() => setIsNodeMode(false)}
      />
    </>
  );
};