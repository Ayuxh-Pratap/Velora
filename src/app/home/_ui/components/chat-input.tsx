"use client";

import { cn } from "@/lib/utils";
import React, { useRef, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useSidebar } from "@/components/ui/sidebar";

interface Props {
  onSendMessage?: (message: string) => void;
  isLoading?: boolean;
}

const ChatInput = ({ onSendMessage, isLoading = false }: Props) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [input, setInput] = useState("");
  const { state } = useSidebar();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const trimmedInput = input.trim();
    if (!trimmedInput || isLoading) return;
    
    // Send the message
    onSendMessage?.(trimmedInput);
    
    // Clear the input
    setInput("");
    
    // Focus back to the textarea
    textareaRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e as unknown as React.FormEvent<HTMLFormElement>);
    }
  };

  return (
    <div className="fixed bottom-0 transition-all duration-200 ease-linear z-40" 
         style={{
           left: state === "expanded" ? "16rem" : "0",
           right: "0"
         }}>
      <div className="px-3 text-base pb-4 md:px-5 lg:px-1 xl:px-5">
        <div className={cn(
          "flex flex-1 gap-4 mx-auto text-base md:gap-5 lg:gap-6 transition-all duration-200 ease-linear",
          // When sidebar is expanded, use smaller max-width for better centering
          state === "expanded" 
            ? "md:max-w-2xl lg:max-w-3xl" 
            : "md:max-w-4xl lg:max-w-5xl"
        )}>
          <form
            onSubmit={handleSubmit}
            className="relative w-full"
          >
            <div className="relative w-full gap-x-1.5 rounded-xl p-1 transition-colors bg-background border border-border/60 overflow-y-auto flex flex-col z-0">
              
              {/* File upload preview area */}
              <div className="hidden">
                {/* File previews would go here */}
              </div>

              <div className="relative flex flex-col justify-center flex-1 min-w-0">
                <Textarea
                  rows={1}
                  tabIndex={0}
                  value={input}
                  autoFocus={true}
                  ref={textareaRef}
                  disabled={isLoading}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Type a message..."
                  className={cn(
                    "h-auto pl-4 overflow-y-auto bg-transparent border-0 resize-none text-left focus:outline-none min-h-20 max-h-52 w-full",
                  )}
                />
              </div>

              {/* Attach files button */}
              <div className="absolute left-2 bottom-2 z-20">
                <Button
                  size="icon"
                  type="button"
                  variant="ghost"
                  disabled={isLoading}
                  className="active:scale-90"
                >
                  <label
                    htmlFor="file"
                    className="size-full flex items-center justify-center cursor-pointer"
                  >
                    <input
                      type="file"
                      id="file"
                      className="hidden"
                      accept="image/*,.pdf,.doc,.txt"
                    />
                    <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </label>
                </Button>
              </div>

              {/* Send button */}
              <div className="absolute right-2 bottom-2 z-20">
                <Button
                  size="icon"
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  className="active:scale-90"
                >
                  {isLoading ? (
                    <svg className="size-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                  ) : (
                    <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                  )}
                </Button>
              </div>

              {/* Voice recording button */}
              <div className="absolute bottom-2 right-12 z-20 flex gap-x-2">
                <Button
                  size="icon"
                  type="button"
                  variant="ghost"
                  disabled={isLoading}
                  className="relative transition-all duration-200 active:scale-90"
                >
                  <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                  </svg>
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChatInput;
