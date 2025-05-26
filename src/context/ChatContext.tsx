import React, { createContext, useState, useContext, ReactNode } from 'react';

interface ChatContextType {
  isChatOpen: boolean;
  openChat: (activityName?: string) => void;
  closeChat: () => void;
  currentActivityName: string | undefined;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

interface ChatProviderProps {
  children: ReactNode;
}

export const ChatProvider: React.FC<ChatProviderProps> = ({ children }) => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [currentActivityName, setCurrentActivityName] = useState<string | undefined>(undefined);

  const openChat = (activityName?: string) => {
    setCurrentActivityName(activityName);
    setIsChatOpen(true);
  };

  const closeChat = () => {
    setIsChatOpen(false);
  };

  return (
    <ChatContext.Provider
      value={{
        isChatOpen,
        openChat,
        closeChat,
        currentActivityName
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = (): ChatContextType => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};

export default ChatContext; 