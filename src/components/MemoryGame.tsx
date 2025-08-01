import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const emojis = ["💕", "🌸", "✨", "🦋", "🌺", "💖", "🌙", "⭐"];
const gameEmojis = [...emojis, ...emojis];

interface GameCard {
  id: number;
  emoji: string;
  isFlipped: boolean;
  isMatched: boolean;
}

export default function MemoryGame() {
  const [cards, setCards] = useState<GameCard[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matches, setMatches] = useState(0);
  const [moves, setMoves] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameWon, setGameWon] = useState(false);

  const shuffleArray = (array: string[]) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const initializeGame = () => {
    const shuffledEmojis = shuffleArray(gameEmojis);
    const newCards: GameCard[] = shuffledEmojis.map((emoji, index) => ({
      id: index,
      emoji,
      isFlipped: false,
      isMatched: false,
    }));
    
    setCards(newCards);
    setFlippedCards([]);
    setMatches(0);
    setMoves(0);
    setGameStarted(true);
    setGameWon(false);
  };

  const handleCardClick = (cardId: number) => {
    if (!gameStarted || gameWon) return;
    
    const card = cards[cardId];
    if (card.isFlipped || card.isMatched || flippedCards.length >= 2) return;

    const newCards = [...cards];
    newCards[cardId].isFlipped = true;
    setCards(newCards);

    const newFlippedCards = [...flippedCards, cardId];
    setFlippedCards(newFlippedCards);

    if (newFlippedCards.length === 2) {
      setMoves(moves + 1);
      
      const [firstId, secondId] = newFlippedCards;
      const firstCard = newCards[firstId];
      const secondCard = newCards[secondId];

      if (firstCard.emoji === secondCard.emoji) {
        // Match found!
        setTimeout(() => {
          newCards[firstId].isMatched = true;
          newCards[secondId].isMatched = true;
          setCards([...newCards]);
          setMatches(matches + 1);
          setFlippedCards([]);
          
          if (matches + 1 === emojis.length) {
            setGameWon(true);
            toast("🎉 Congratulations! You found all the matches! You're amazing! 💕");
          }
        }, 600);
      } else {
        // No match
        setTimeout(() => {
          newCards[firstId].isFlipped = false;
          newCards[secondId].isFlipped = false;
          setCards([...newCards]);
          setFlippedCards([]);
        }, 1000);
      }
    }
  };

  useEffect(() => {
    initializeGame();
  }, []);

  return (
    <section className="py-16 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-romantic font-bold mb-8 text-foreground">
          Memory Game 🧠💖
        </h2>
        
        <Card variant="cute" className="max-w-2xl mx-auto mb-8">
          <CardHeader>
            <CardTitle>Find the matching pairs!</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center mb-4 text-lg">
              <span>Matches: {matches}/{emojis.length}</span>
              <span>Moves: {moves}</span>
            </div>
            
            {gameWon && (
              <div className="mb-4 p-4 bg-sunset-gradient rounded-lg animate-bounce-gentle">
                <p className="text-xl font-bold">🎉 You Win! 🎉</p>
                <p>You completed it in {moves} moves!</p>
              </div>
            )}
            
            <div className="grid grid-cols-4 gap-3 mb-6">
              {cards.map((card) => (
                <button
                  key={card.id}
                  onClick={() => handleCardClick(card.id)}
                  className={`aspect-square rounded-lg text-2xl font-bold transition-all duration-300 hover:scale-105 ${
                    card.isFlipped || card.isMatched
                      ? 'bg-romantic-gradient shadow-romantic'
                      : 'bg-muted hover:bg-secondary'
                  } ${card.isMatched ? 'animate-pulse-soft' : ''}`}
                  disabled={!gameStarted || gameWon}
                >
                  {card.isFlipped || card.isMatched ? card.emoji : '?'}
                </button>
              ))}
            </div>
            
            <Button variant="love" onClick={initializeGame} className="w-full">
              {gameStarted ? 'New Game' : 'Start Game'}
            </Button>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}