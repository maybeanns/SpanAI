"use client";

import { useState } from 'react';
import { useChat } from '@/app/contexts/ChatContext';
import { PlusCircle, ChevronLeft, ChevronRight } from 'lucide-react';

export function SideNavbar() {
  const { chats, addChat, currentChatId, setCurrentChatId } = useChat();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleNewChat = () => {
    addChat(`Chat ${chats.length + 1}`);
  };

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <aside className={`bg-gray-800 h-[calc(100vh-4rem)] overflow-y-auto transition-all duration-300 fixed top-16 left-0 ${isCollapsed ? 'w-16' : 'w-64'}`}>
      <div className="flex justify-between items-center p-2">
        <button 
          onClick={toggleSidebar}
          className="text-white p-2 rounded-full hover:bg-gray-700"
        >
          {isCollapsed ? <ChevronRight size={24} /> : <ChevronLeft size={24} />}
        </button>
        {!isCollapsed && (
          <button 
            onClick={handleNewChat}
            className=" text-white p-2 rounded-md flex items-center justify-center hover:bg-blue-500 transition-colors"
          >
            <PlusCircle className="mr-2" size={18} />
            New Chat
          </button>
        )}
      </div>
      <div className={`p-4 ${isCollapsed ? 'hidden' : 'block'}`}>
        <div className="space-y-2">
          {chats.map((chat) => (
            <button
              key={chat.id}
              onClick={() => setCurrentChatId(chat.id)}
              className={`w-full text-left p-2 rounded-md transition-colors ${
                currentChatId === chat.id 
                  ? 'bg-gray-700 text-white' 
                  : 'text-gray-300 hover:bg-gray-700'
              }`}
            >
              {chat.name}
            </button>
          ))}
        </div>
      </div>
      {isCollapsed && (
        <div className="flex flex-col items-center pt-4">
          <div className="flex flex-col items-center">
            {chats.map((chat) => (
              <button
                key={chat.id}
                onClick={() => setCurrentChatId(chat.id)}
                className={`p-2 rounded-full mb-2 ${
                  currentChatId === chat.id 
                    ? 'bg-gray-700 text-white' 
                    : 'text-gray-300 hover:bg-gray-700'
                }`}
              >
                {chat.name[0]}
              </button>
            ))}
          </div>
        </div>
      )}
    </aside>
  );
}