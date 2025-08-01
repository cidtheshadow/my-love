import { useEffect, useState } from "react";

interface Heart {
  id: number;
  left: number;
  animationDuration: number;
  emoji: string;
}

export default function FloatingHearts() {
  const [hearts, setHearts] = useState<Heart[]>([]);

  const heartEmojis = ["💕", "💖", "💗", "💝", "💘", "❤️", "🧡", "💛", "💚", "💙", "💜", "🤍"];

  useEffect(() => {
    const createHeart = () => {
      const newHeart: Heart = {
        id: Math.random(),
        left: Math.random() * 100,
        animationDuration: 3 + Math.random() * 4,
        emoji: heartEmojis[Math.floor(Math.random() * heartEmojis.length)],
      };
      
      setHearts(prev => [...prev, newHeart]);
      
      // Remove heart after animation
      setTimeout(() => {
        setHearts(prev => prev.filter(heart => heart.id !== newHeart.id));
      }, newHeart.animationDuration * 1000);
    };

    // Create a heart every 2-5 seconds
    const interval = setInterval(createHeart, 2000 + Math.random() * 3000);
    
    // Create initial hearts
    for (let i = 0; i < 3; i++) {
      setTimeout(createHeart, i * 1000);
    }

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      {hearts.map(heart => (
        <div
          key={heart.id}
          className="absolute text-2xl animate-float opacity-60"
          style={{
            left: `${heart.left}%`,
            bottom: '-50px',
            animation: `floatUp ${heart.animationDuration}s linear forwards`,
          }}
        >
          {heart.emoji}
        </div>
      ))}
      
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes floatUp {
            0% {
              transform: translateY(0) rotate(0deg);
              opacity: 0;
            }
            10% {
              opacity: 0.8;
            }
            90% {
              opacity: 0.8;
            }
            100% {
              transform: translateY(-100vh) rotate(360deg);
              opacity: 0;
            }
          }
        `
      }} />
    </div>
  );
}