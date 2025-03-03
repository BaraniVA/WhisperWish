import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, SendHorizontal } from 'lucide-react';
import { motion } from 'framer-motion';
import { PageLayout } from '../components/PageLayout';
import { wishesApi } from '../services/api';


export const ReceiveWish: React.FC = () => {
  const navigate = useNavigate();
  const [wish, setWish] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [heartClicked, setHeartClicked] = useState(false);
  const [clickCount, setClickCount] = useState(0);


  useEffect(() => {
    const fetchRandomWish = async () => {
      try {
        const randomWish = await wishesApi.getRandom();
        setWish(randomWish?.content || 'Make a wish and share it with others!');
      } catch (error) {
        console.error('Failed to fetch wish:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchRandomWish();
  }, []);

  const handleHeartClick = () => {
    setHeartClicked(true);
    setClickCount(prev => prev + 1);
    
    // Reset the animation after a short delay
    setTimeout(() => {
      setHeartClicked(false);
    }, 1000);
  };

  if (isLoading) {
    return (
      <PageLayout>
        <div className="flex justify-center items-center h-64">
          <div className="text-gray-600">Loading wish...</div>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md mx-auto"
      >
        <div className="bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-lg">
          <div className="flex justify-center mb-6">
          <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              animate={heartClicked ? {
                scale: [1, 1.5, 1.2],
                color: ["#f43f5e", "#e11d48", "#f43f5e"],
                transition: { duration: 0.5 }
              } : {}}
              onClick={handleHeartClick}
              className="cursor-pointer relative"
            >
            <Heart className="text-rose-500" 
                size={32} 
                fill={heartClicked ? "#e11d48" : "none"}
               />
               {heartClicked && (
                <>
                  {[...Array(6)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute top-1/2 left-1/2 w-1 h-1 rounded-full bg-rose-400"
                      initial={{ opacity: 1, x: 0, y: 0 }}
                      animate={{
                        opacity: 0,
                        x: (Math.random() - 0.5) * 40,
                        y: (Math.random() - 0.5) * 40,
                      }}
                      transition={{ duration: 0.7, ease: "easeOut" }}
                    />
                  ))}
                </>
              )}
            </motion.div>
            
            {clickCount > 0 && (
              <motion.p 
                className="text-sm text-rose-500 mt-2 px-2"
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {clickCount} {clickCount === 1 ? 'like' : 'likes'}
              </motion.p>
            )}
          </div>
          <p className="text-xl text-center text-gray-700 mb-8 font-medium">
            {wish}
          </p>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate('/send')}
            className="w-full py-3 px-6 bg-teal-600 text-white rounded-lg font-medium flex items-center justify-center space-x-2 hover:bg-teal-700 transition-colors"
          >
            <SendHorizontal size={20} />
            <span>Send Back a Wish</span>
          </motion.button>
        </div>
      </motion.div>
    </PageLayout>
  );
};