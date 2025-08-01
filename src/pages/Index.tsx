import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import LoveNotes from "@/components/LoveNotes";
import MemoryGame from "@/components/MemoryGame";
import VirtualGarden from "@/components/VirtualGarden";
import LoveQuiz from "@/components/LoveQuiz";
import FloatingHearts from "@/components/FloatingHearts";
import { Heart, Sparkles, Coffee } from "lucide-react";
import heroImage from "@/assets/hero-romantic.jpg";

const Index = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-soft-gradient">
      <FloatingHearts />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <div className="mb-8 animate-float">
            <Heart className="w-16 h-16 text-primary mx-auto mb-4 animate-heart-beat" />
          </div>
          
          <h1 className="text-6xl md:text-8xl font-romantic font-bold mb-6 bg-love-gradient bg-clip-text text-transparent animate-bounce-gentle">
            Hello Beautiful! 💕
          </h1>
          
          <p className="text-xl md:text-2xl text-foreground mb-8 max-w-2xl mx-auto">
            I made this little corner of the internet just for you, filled with love, games, and all the reasons why you make my world brighter ✨
          </p>
          
          <div className="flex flex-wrap gap-4 justify-center mb-12">
            <Button 
              variant="romantic" 
              size="lg" 
              onClick={() => scrollToSection('love-notes')}
              className="flex items-center gap-2"
            >
              <Heart className="w-5 h-5" />
              Read Love Notes
            </Button>
            <Button 
              variant="cute" 
              size="lg" 
              onClick={() => scrollToSection('games')}
              className="flex items-center gap-2"
            >
              <Sparkles className="w-5 h-5" />
              Play Games
            </Button>
          </div>
          
          <Card variant="romantic" className="max-w-md mx-auto animate-pulse-soft">
            <CardContent className="p-6">
              <div className="flex items-center justify-center gap-3 text-lg">
                <Coffee className="w-6 h-6 text-accent" />
                <span>Made with endless love & coffee ☕</span>
                <Heart className="w-6 h-6 text-primary animate-heart-beat" />
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Love Notes Section */}
      <div id="love-notes">
        <LoveNotes />
      </div>

      {/* Games Section */}
      <div id="games" className="bg-romantic-gradient/30">
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-5xl font-romantic font-bold mb-4 text-foreground">
              Games Made With Love 🎮💖
            </h2>
            <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
              Let's play together and create more beautiful memories! Each game is designed to bring us closer 💕
            </p>
            
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <Card variant="cute" className="hover-lift shadow-dreamy">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 justify-center">
                    🧠 Memory Game
                    <Sparkles className="w-5 h-5 text-accent hover-bounce" />
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Test your memory with cute emojis! Match the pairs and watch them sparkle with love ✨
                  </p>
                  <Button 
                    variant="romantic" 
                    onClick={() => scrollToSection('memory-game')}
                    className="w-full hover-glow"
                  >
                    Play Memory Game 💕
                  </Button>
                </CardContent>
              </Card>
              
              <Card variant="love" className="hover-lift shadow-dreamy">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 justify-center">
                    🌺 Love Garden
                    <Heart className="w-5 h-5 text-primary hover-bounce" />
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Grow our virtual garden together! Plant seeds of love and watch them bloom 🌸
                  </p>
                  <Button 
                    variant="cute" 
                    onClick={() => scrollToSection('garden')}
                    className="w-full hover-glow"
                  >
                    Visit Garden 🌱
                  </Button>
                </CardContent>
              </Card>
            </div>
            
            <Card variant="romantic" className="max-w-md mx-auto hover-lift shadow-dreamy">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 justify-center">
                  💕 Love Quiz
                  <Heart className="w-5 h-5 text-primary animate-heart-beat hover-bounce" />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  A sweet quiz about our love! Every answer is perfect because our love is perfect 💖
                </p>
                <Button 
                  variant="love" 
                  onClick={() => scrollToSection('quiz')}
                  className="w-full hover-glow"
                >
                  Take Love Quiz ✨
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>

      {/* Individual Game Sections */}
      <div id="memory-game">
        <MemoryGame />
      </div>
      
      <div id="garden" className="bg-sunset-gradient/20">
        <VirtualGarden />
      </div>
      
      <div id="quiz">
        <LoveQuiz />
      </div>

      {/* Footer */}
      <footer className="py-16 px-4 bg-love-gradient">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-4xl font-romantic font-bold mb-6 text-primary-foreground">
            You Are My Everything 💕
          </h3>
          <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Thank you for being the most amazing girlfriend in the world. 
            Every day with you is a beautiful adventure, and I can't wait to see what tomorrow brings us! 🌟
          </p>
          
          <div className="flex justify-center gap-4 text-4xl mb-8 animate-float">
            💕 💖 💗 💝 💘 ❤️ 🧡 💛 💚 💙 💜 🤍
          </div>
          
          <Card variant="romantic" className="max-w-2xl mx-auto">
            <CardContent className="p-8">
              <p className="text-2xl font-romantic font-bold text-foreground mb-4">
                "In your eyes, I found my home. In your heart, I found my love. 
                In your soul, I found my mate. Forever and always." 💞
              </p>
              <p className="text-lg text-muted-foreground">
                All my love, always and forever 💕
              </p>
            </CardContent>
          </Card>
        </div>
      </footer>
    </div>
  );
};

export default Index;