import React from 'react';
import { motion } from 'framer-motion';
import { useCartStore } from '../utils/store';
import '../styles/ChatOrder.css';

interface ServiceDetailButtonProps {
  activityId: string;
  activityTitle: string;
  image: string;
  onClick: () => void;
}

const ServiceDetailButton: React.FC<ServiceDetailButtonProps> = ({
  activityId,
  activityTitle,
  image,
  onClick
}) => {
  const { addItem } = useCartStore();

  const handleClick = () => {
    // Add activity to cart before opening chat
    addItem({
      id: activityId,
      activityId,
      title: activityTitle,
      activityTitle,
      image,
      price: 0,
      quantity: 1,
      numPersons: 1
    });
    
    // Open chat
    onClick();
  };

  return (
    <motion.button 
      className="service-detail-chat-button"
      onClick={handleClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <span className="chat-icon">💬</span>
      Order with consultant
    </motion.button>
  );
};

export default ServiceDetailButton; 