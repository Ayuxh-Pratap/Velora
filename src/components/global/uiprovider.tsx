"use client";

import React from "react";
import { Toaster } from "sonner";

interface UIProviderProps {
  children: React.ReactNode;
}

const UIProvider = ({ children }: UIProviderProps) => {
  return (
    <>
      <Toaster
        richColors
        theme="dark"
        position="bottom-center"
      />
      {children}
    </>
  );
};

export default UIProvider;
