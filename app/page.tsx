// import { Chatbot } from "@/components/component/chatbot";

// export default function Home() {
//   return (
//     <main className="flex items-center justify-center h-screen w-full bg-gray-50">
//       <Chatbot />
//     </main>
//   );
// }
// page.tsx
// app/page.tsx
"use client";

import { Chatbot } from "@/components/component/chatbot";
import { useChat } from '@/app/contexts/ChatContext';

export default function Home() {
  const { currentChatId } = useChat();

  return (
    <div className="flex items-center justify-center h-full w-full bg-gray-50">
      {currentChatId ? (
        <Chatbot />
      ) : (
        <p>Select or create a new chat to begin</p>
      )}
    </div>
  );
}
