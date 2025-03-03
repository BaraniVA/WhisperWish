import React from 'react';
import { Send, Inbox, Sparkles } from 'lucide-react';
import { WishButton } from '../components/WishButton';
import { FloatingWishes } from '../components/FloatingWishes';

export const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-blue-50 p-6">
      <FloatingWishes />
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <header className="text-center mb-12 pt-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">WhisperWish</h1>
          <p className="text-gray-600">Share kindness, one wish at a time</p>
        </header>

        {/* Wish Buttons Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          <WishButton
            to="/send"
            icon={<Send />}
            label="Send a Wish"
          />
          <WishButton
            to="/receive"
            icon={<Inbox />}
            label="Receive a Wish"
          />
          <WishButton
            to="/wish-pool"
            icon={<Sparkles />}
            label="Explore Wishes"
          />
        </div>

        {/* Additional Text Content Section */}
        <section className="mt-16 text-center">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6">The Power of Kindness</h2>
          <p className="text-gray-600 leading-relaxed mb-6">
            In a world that often feels divided, small acts of kindness can create ripples of change.
            WhisperWish is here to remind you that even the simplest words can brighten someone's day.
          </p>
          <p className="text-gray-600 leading-relaxed mb-6">
            Whether you're sending a wish, receiving one, or exploring the collective positivity of our community,
            every interaction is an opportunity to spread joy.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Join us in making the world a little brighter—one wish at a time.
          </p>
        </section>
      </div>
    </div>
  );
};