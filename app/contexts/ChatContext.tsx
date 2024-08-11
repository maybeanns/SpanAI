// contexts/ChatContext.tsx
"use client";

import React, { createContext, useState, useContext, useEffect } from 'react';

type Chat = {
  id: string;
  name: string;
};

type ChatContextType = {
  chats: Chat[];
  addChat: (name: string) => void;
  currentChatId: string | null;
  setCurrentChatId: (id: string | null) => void;
};

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export function ChatProvider({ children }: { children: React.ReactNode }) {
  const [chats, setChats] = useState<Chat[]>([]);
  const [currentChatId, setCurrentChatId] = useState<string | null>(null);

  useEffect(() => {
    // Load chats from localStorage on initial render
    const savedChats = localStorage.getItem('chats');
    if (savedChats) {
      setChats(JSON.parse(savedChats));
    }
  }, []);

  useEffect(() => {
    // Save chats to localStorage whenever it changes
    localStorage.setItem('chats', JSON.stringify(chats));
  }, [chats]);

  const addChat = (name: string) => {
    const newChat = { id: Date.now().toString(), name };
    setChats(prevChats => [...prevChats, newChat]);
    setCurrentChatId(newChat.id);
  };

  return (
    <ChatContext.Provider value={{ chats, addChat, currentChatId, setCurrentChatId }}>
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
}