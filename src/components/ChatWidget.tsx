import React, { useState, useEffect, useRef } from 'react';
import '../styles/ChatWidget.css';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'agent';
  timestamp: Date;
}

interface ChatWidgetProps {
  isOpen: boolean;
  onClose: () => void;
  activityName?: string;
}

const ChatWidget: React.FC<ChatWidgetProps> = ({ isOpen, onClose, activityName }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Initialiser le chat avec un message de bienvenue
  useEffect(() => {
    if (isOpen) {
      const initialMessages: Message[] = [
        {
          id: 1,
          text: activityName 
            ? `Bonjour ! Merci de votre intérêt pour "${activityName}". Comment puis-je vous aider avec cette réservation ?`
            : 'Bonjour ! Comment puis-je vous aider avec votre réservation ?',
          sender: 'agent',
          timestamp: new Date()
        }
      ];
      setMessages(initialMessages);
    }
  }, [isOpen, activityName]);

  // Faire défiler automatiquement vers le bas lorsque de nouveaux messages arrivent
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Simuler une réponse de l'agent après que l'utilisateur envoie un message
  const simulateAgentResponse = (userMessage: string) => {
    setTimeout(() => {
      let response = '';
      
      if (userMessage.toLowerCase().includes('prix') || userMessage.toLowerCase().includes('tarif')) {
        response = "Je serais ravi de vous donner des informations sur les tarifs. Pourriez-vous me préciser le nombre de personnes et la date souhaitée ?";
      } else if (userMessage.toLowerCase().includes('date') || userMessage.toLowerCase().includes('disponibilité')) {
        response = "Pour vérifier les disponibilités, j'aurais besoin de connaître vos dates de voyage. Quand souhaiteriez-vous réaliser cette activité ?";
      } else if (userMessage.toLowerCase().includes('réserver') || userMessage.toLowerCase().includes('réservation')) {
        response = "Parfait ! Pour procéder à la réservation, j'aurais besoin des informations suivantes : nom complet, dates, nombre de personnes et informations de contact.";
      } else if (userMessage.toLowerCase().includes('paiement') || userMessage.toLowerCase().includes('payer')) {
        response = "Nous acceptons les paiements par carte bancaire, PayPal ou virement. Un acompte de 30% est demandé pour confirmer la réservation. Quelle méthode préférez-vous ?";
      } else if (userMessage.toLowerCase().includes('merci')) {
        response = "Je vous en prie ! N'hésitez pas si vous avez d'autres questions.";
      } else {
        response = "Merci pour votre message. Un agent va traiter votre demande et reviendra vers vous très rapidement. Puis-je vous aider avec autre chose en attendant ?";
      }
      
      const newAgentMessage: Message = {
        id: messages.length + 2,
        text: response,
        sender: 'agent',
        timestamp: new Date()
      };
      
      setMessages(prevMessages => [...prevMessages, newAgentMessage]);
    }, 1000);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (newMessage.trim() === '') return;
    
    const userMessage: Message = {
      id: messages.length + 1,
      text: newMessage,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prevMessages => [...prevMessages, userMessage]);
    setNewMessage('');
    
    simulateAgentResponse(newMessage);
  };

  if (!isOpen) return null;

  return (
    <div className="chat-widget">
      <div className="chat-header">
        <h3>Assistance Réservation</h3>
        <button className="close-button" onClick={onClose}>
          <i className="fa-solid fa-xmark"></i>
        </button>
      </div>
      
      <div className="chat-messages">
        {messages.map(message => (
          <div 
            key={message.id} 
            className={`message ${message.sender === 'user' ? 'user-message' : 'agent-message'}`}
          >
            <div className="message-content">
              <p>{message.text}</p>
              <span className="message-time">
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      
      <form className="chat-input" onSubmit={handleSendMessage}>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Tapez votre message ici..."
        />
        <button type="submit">
          <i className="fa-solid fa-paper-plane"></i>
        </button>
      </form>
    </div>
  );
};

export default ChatWidget; 