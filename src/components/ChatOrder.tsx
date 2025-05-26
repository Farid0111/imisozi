import React, { useState, useRef, useEffect, forwardRef, useImperativeHandle } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCartStore } from '../utils/store';
import { orderService } from '../services';
import { Order } from '../models';
import '../styles/ChatOrder.css';

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  isInput?: boolean;
  inputType?: 'text' | 'number' | 'email';
  inputName?: string;
  required?: boolean;
  sender: string;
  timestamp: Date;
}

interface OrderData {
  fullName: string;
  email: string;
  numPersons: number;
  numDays: number;
  specialRequests?: string;
  items: any[];
  totalItems: number;
}

export interface ChatOrderHandle {
  openChat: () => void;
}

const ChatOrder = forwardRef<ChatOrderHandle, {}>((props, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentInput, setCurrentInput] = useState('');
  const [orderData, setOrderData] = useState<Partial<OrderData>>({});
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { items, clearCart, getTotal } = useCartStore();
  
  // Exposer la fonction openChat via ref
  useImperativeHandle(ref, () => ({
    openChat: () => {
      openChat();
    }
  }));
  
  // Questions à poser dans l'ordre
  const questions: Message[] = [
    {
      id: 'q1',
      text: "Hello! I'm your travel assistant. To get started, what is your full name?",
      isBot: true,
      isInput: true,
      inputType: 'text',
      inputName: 'fullName',
      required: true,
      sender: 'bot',
      timestamp: new Date()
    },
    {
      id: 'q2',
      text: "Thank you! And your email address so we can send you information?",
      isBot: true,
      isInput: true,
      inputType: 'email',
      inputName: 'email',
      required: true,
      sender: 'bot',
      timestamp: new Date()
    },
    {
      id: 'q3',
      text: "How many people are you planning this trip for?",
      isBot: true,
      isInput: true,
      inputType: 'number',
      inputName: 'numPersons',
      required: true,
      sender: 'bot',
      timestamp: new Date()
    },
    {
      id: 'q4',
      text: "And how many days would you like to stay?",
      isBot: true,
      isInput: true,
      inputType: 'number',
      inputName: 'numDays',
      required: true,
      sender: 'bot',
      timestamp: new Date()
    },
    {
      id: 'q5',
      text: "Do you have any special requests or specific needs? (optional)",
      isBot: true,
      isInput: true,
      inputType: 'text',
      inputName: 'specialRequests',
      required: false,
      sender: 'bot',
      timestamp: new Date()
    }
  ];
  
  const openChat = () => {
    setIsOpen(true);
    
    // Réinitialiser le chat si nécessaire
    if (messages.length === 0) {
      initChat();
    }
  };
  
  const closeChat = () => {
    if (orderComplete) {
      setMessages([]);
      setCurrentQuestion(0);
      setOrderData({});
      setOrderComplete(false);
    }
    setIsOpen(false);
  };
  
  const initChat = () => {
    // Welcome message
    const welcomeMessage: Message = {
      id: 'welcome',
      text: "Welcome! I'm your assistant to help plan your trip to Rwanda.",
      isBot: true,
      sender: 'bot',
      timestamp: new Date()
    };
    
    // Display cart summary if items are present
    let initialMessages = [welcomeMessage];
    
    if (items.length > 0) {
      const cartSummary: Message = {
        id: 'cart-summary',
        text: `You have ${items.length} activity(ies) in your cart.`,
        isBot: true,
        sender: 'bot',
        timestamp: new Date()
      };
      initialMessages.push(cartSummary);
    } else {
      const infoMessage: Message = {
        id: 'info-message',
        text: "I'll help you plan your stay and answer your questions about our activities in Rwanda.",
        isBot: true,
        sender: 'bot',
        timestamp: new Date()
      };
      initialMessages.push(infoMessage);
    }
    
    initialMessages.push(questions[0]);
    setMessages(initialMessages);
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setCurrentInput(e.target.value);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!currentInput && questions[currentQuestion].required) {
      alert("This field is required.");
      return;
    }
    
    // Ajouter la réponse de l'utilisateur
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      text: currentInput,
      isBot: false,
      sender: 'user',
      timestamp: new Date()
    };
    
    // Mettre à jour les données de commande
    const fieldName = questions[currentQuestion].inputName;
    if (!fieldName) return;
    
    const newOrderData = { ...orderData } as Record<string, any>;
    
    // Convertir en nombre si nécessaire
    if (questions[currentQuestion].inputType === 'number') {
      newOrderData[fieldName] = Number(currentInput);
    } else {
      newOrderData[fieldName] = currentInput;
    }
    
    setOrderData(newOrderData as Partial<OrderData>);
    setMessages(prev => [...prev, userMessage]);
    setCurrentInput('');
    
    // Passer à la question suivante ou finaliser
    const nextQuestionIndex = currentQuestion + 1;
    
    if (nextQuestionIndex < questions.length) {
      setMessages(prev => [...prev, questions[nextQuestionIndex]]);
      setCurrentQuestion(nextQuestionIndex);
    } else {
      // Toutes les questions ont été posées, afficher la confirmation
      finalizeChatAndOrder(newOrderData as Partial<OrderData>);
    }
  };
  
  const finalizeChatAndOrder = async (data: Partial<OrderData>) => {
    // Confirmation message
    const confirmationMessage: Message = {
      id: `confirmation-${Date.now()}`,
      text: "Perfect! Here's a summary of your information:",
      isBot: true,
      sender: 'bot',
      timestamp: new Date()
    };
    
    const summaryMessage: Message = {
      id: `summary-${Date.now()}`,
      text: `
        Name: ${data.fullName}
        Email: ${data.email}
        Number of people: ${data.numPersons}
        Number of days: ${data.numDays}
        ${data.specialRequests ? `Special requests: ${data.specialRequests}` : ''}
        
        ${items.length > 0 ? `Number of activities selected: ${items.length}` : 'No activities selected yet.'}
      `,
      isBot: true,
      sender: 'bot',
      timestamp: new Date()
    };
    
    const processingMessage: Message = {
      id: `processing-${Date.now()}`,
      text: "Processing your request...",
      isBot: true,
      sender: 'bot',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, confirmationMessage, summaryMessage, processingMessage]);
    
    try {
      setIsSubmitting(true);
      
      // Vérifier que tous les champs requis sont présents
      if (!data.fullName || !data.email || !data.numPersons || !data.numDays) {
        throw new Error('Missing required fields');
      }

      // Créer la commande avec des valeurs par défaut pour éviter undefined
      const orderToSave: Omit<Order, 'id' | 'createdAt' | 'updatedAt'> = {
        fullName: data.fullName,
        email: data.email,
        phone: '',  // Le téléphone n'est pas requis
        numPersons: data.numPersons,
        numDays: data.numDays,
        specialRequests: data.specialRequests || '',
        items: items.map(item => ({
          activityId: item.activityId,
          activityTitle: item.activityTitle,
          image: item.image,
          numPersons: item.quantity,
          price: item.price
        })),
        totalItems: items.length,
        totalAmount: items.reduce((total, item) => total + (item.price * item.quantity), 0),
        currency: 'USD',
        status: 'pending',
        paymentStatus: 'pending',
        paymentMethod: ''
      };
      
      console.log('Saving order to Firebase:', orderToSave);
      const savedOrder = await orderService.create(orderToSave);
      console.log('Order saved successfully:', savedOrder);
      
      // Success message
      const successMessage: Message = {
        id: `success-${Date.now()}`,
        text: `Your request has been successfully recorded! Reference: ${savedOrder.id}. We'll contact you soon at ${data.email}.`,
        isBot: true,
        sender: 'bot',
        timestamp: new Date()
      };
      
      const thankYouMessage: Message = {
        id: `thank-you-${Date.now()}`,
        text: items.length > 0 
          ? "Thank you for your order! We'll contact you soon to confirm the details." 
          : "Thank you for your interest! A consultant will contact you within 24 hours to propose activities adapted to your needs.",
        isBot: true,
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, successMessage, thankYouMessage]);
      setOrderComplete(true);
      
      // Clear cart after successful order if items are present
      if (items.length > 0) {
        setTimeout(() => {
          clearCart();
        }, 3000);
      }
      
    } catch (error) {
      console.error("Error while recording your request:", error);
      
      const errorMessage: Message = {
        id: `error-${Date.now()}`,
        text: "An error occurred while recording your request. Please try again or contact us directly.",
        isBot: true,
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Faire défiler vers le bas après l'ajout de nouveaux messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  
  return (
    <>
      <motion.button 
        className="chat-order-button"
        onClick={openChat}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <span className="chat-icon">💬</span>
        Need help?
      </motion.button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className="chat-order-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div 
              className="chat-order-panel"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              transition={{ type: "spring", damping: 30 }}
            >
              <div className="chat-order-header">
                <h3>Rwanda Travel Assistant</h3>
                <button 
                  className="chat-close-btn" 
                  onClick={closeChat}
                  aria-label="Close"
                >
                  ×
                </button>
              </div>
              
              <div className="chat-order-messages">
                {messages.map((message) => (
                  <motion.div 
                    key={message.id}
                    className={`chat-message ${message.isBot ? 'bot-message' : 'user-message'}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="message-bubble">
                      <p>{message.text}</p>
                    </div>
                  </motion.div>
                ))}
                <div ref={messagesEndRef} />
              </div>
              
              {!orderComplete && currentQuestion < questions.length && (
                <form onSubmit={handleSubmit} className="chat-order-input">
                  {questions[currentQuestion].inputType === 'text' ? (
                    <input 
                      type="text" 
                      value={currentInput} 
                      onChange={handleInputChange} 
                      placeholder={`Enter your ${questions[currentQuestion].inputName}`}
                      disabled={isSubmitting}
                      required={questions[currentQuestion].required}
                      autoFocus
                    />
                  ) : questions[currentQuestion].inputType === 'email' ? (
                    <input 
                      type="email" 
                      value={currentInput} 
                      onChange={handleInputChange} 
                      placeholder="Enter your email"
                      disabled={isSubmitting}
                      required={questions[currentQuestion].required}
                      autoFocus
                    />
                  ) : (
                    <input 
                      type="number" 
                      value={currentInput} 
                      onChange={handleInputChange} 
                      placeholder={`Enter a number`}
                      min="1"
                      disabled={isSubmitting}
                      required={questions[currentQuestion].required}
                      autoFocus
                    />
                  )}
                  
                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="send-button"
                  >
                    <span>Send</span>
                    <i className="send-icon">➤</i>
                  </button>
                </form>
              )}
              
              {orderComplete && (
                <div className="chat-order-complete">
                  <button 
                    onClick={closeChat}
                    className="close-chat-button"
                  >
                    Close
                  </button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
});

export default ChatOrder; 