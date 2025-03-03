import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { PageLayout } from '../components/PageLayout';
import { wishesApi } from '../services/api';

interface Wish {
  id: number;
  content: string;
}

export const WishPool: React.FC = () => {
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWishes = async () => {
      setLoading(true);
      
      // Get the number of wishes fetched in this session
      const sessionCount = parseInt(sessionStorage.getItem('wishCount') || '0', 10);

      // Stop fetching if the session limit is reached
      if (sessionCount >= 25) {
        setLoading(false);
        return;
      }

      try {
        const data = await wishesApi.getAll(); // Fetch all wishes

        if (!Array.isArray(data)) {
          console.error('API did not return an array:', data);
          setError('Invalid response format from server');
          setWishes([]);
        } else {
          // Limit the wishes to the remaining allowed count (Max 25 per session)
          const remaining = 25 - sessionCount;
          const limitedWishes = data.slice(0, remaining);
          
          setWishes(limitedWishes);
          setError(null);

          // Update session count
          sessionStorage.setItem('wishCount', (sessionCount + limitedWishes.length).toString());
        }
      } catch (err) {
        console.error('Failed to fetch wishes:', err);
        setError('Failed to load wishes');
        setWishes([]);
      } finally {
        setLoading(false);
      }
    };

    fetchWishes();
  }, []);

  if (loading) return <PageLayout><div className="min-h-screen flex items-center justify-center text-white">Loading wishes...</div></PageLayout>;
  if (error) return <PageLayout><div className="min-h-screen flex items-center justify-center text-red-400">{error}</div></PageLayout>;

  return (
    <PageLayout>
      <div className='flex flex-wrap gap-6 p-10 justify-center'>
        {wishes.map((wish, index) => (
          <motion.div
            key={wish.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ 
              opacity: [0.4, 1, 0.4],
              y: [-5, 5, -5]
            }}
            transition={{
              duration: 6,
              delay: index * 0.3,
              repeat: Infinity,
              repeatType: "reverse"
            }}
            className="max-w-xs py-3 px-6 bg-teal-600 text-white rounded-lg font-medium flex items-center justify-center space-x-2 hover:bg-teal-700 transition-colors disabled:bg-teal-400"
          >
            {wish.content}
          </motion.div>
        ))}
      </div>
    </PageLayout>
  );
};
