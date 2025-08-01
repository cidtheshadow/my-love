import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";

const loveNotes = [
  "You make my heart skip a beat every single day 💕",
  "Your smile is the most beautiful thing in the world ✨",
  "I fall in love with you more and more each day 🌸",
  "You are my sunshine on the cloudiest days ☀️",
  "With you, every moment feels like magic 🎆",
  "You're not just my girlfriend, you're my best friend 👫",
  "Your laugh is my favorite sound in the universe 🎵",
  "I love the way you make everything better just by being there 🌺",
  "You're the reason I believe in fairy tales 🧚‍♀️",
  "Every day with you feels like the best day of my life 🎈",
  "You make ordinary moments extraordinary 💖",
  "I love you more than all the stars in the sky ⭐",
];

export default function LoveNotes() {
  const [currentNote, setCurrentNote] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const nextNote = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentNote((prev) => (prev + 1) % loveNotes.length);
      setIsAnimating(false);
    }, 200);
  };

  const randomNote = () => {
    const randomIndex = Math.floor(Math.random() * loveNotes.length);
    if (randomIndex !== currentNote) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentNote(randomIndex);
        setIsAnimating(false);
      }, 200);
    } else {
      nextNote();
    }
  };

  useEffect(() => {
    const interval = setInterval(nextNote, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-16 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-romantic font-bold mb-8 text-foreground">
          Love Notes Just For You 💌
        </h2>
        
        <Card variant="romantic" className="max-w-2xl mx-auto relative overflow-hidden">
          <CardContent className="p-8">
            <div className="relative">
              <Heart className="absolute -top-2 -right-2 text-primary animate-pulse-soft w-8 h-8" />
              <Heart className="absolute -bottom-2 -left-2 text-secondary animate-float w-6 h-6" />
              
              <p 
                className={`text-xl md:text-2xl font-medium text-foreground transition-all duration-300 min-h-[3rem] flex items-center justify-center ${
                  isAnimating ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
                }`}
              >
                {loveNotes[currentNote]}
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="flex gap-4 justify-center mt-8">
          <Button variant="romantic" onClick={nextNote} className="flex items-center gap-2">
            <Heart className="w-4 h-4" />
            Next Note
          </Button>
          <Button variant="cute" onClick={randomNote} className="flex items-center gap-2">
            ✨ Surprise Me
          </Button>
        </div>

        <div className="mt-8 flex justify-center gap-2">
          {loveNotes.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentNote(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentNote 
                  ? 'bg-primary shadow-glow scale-125' 
                  : 'bg-muted hover:bg-secondary'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}