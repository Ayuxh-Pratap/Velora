"use client";

import React from 'react';
import ChatPannel from './chat-pannel';

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
const ChatWrapper = ({ messages, isLoading = false }: Props) => {
  return (
    <div className="relative flex-1 size-full">
      <ChatPannel messages={messages} isLoading={isLoading} />
    </div>
  );
};

export default ChatWrapper;
