import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface Question {
  id: number;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

const quizQuestions: Question[] = [
  {
    id: 1,
    question: "What makes our relationship special? 💕",
    options: [
      "The way we laugh together",
      "How we support each other",
      "Our inside jokes and silly moments",
      "All of the above! ✨"
    ],
    correct: 3,
    explanation: "Every single thing about us makes our love unique and beautiful! 💖"
  },
  {
    id: 2,
    question: "What's the best part of loving you? 🌸",
    options: [
      "Your beautiful smile",
      "Your kind heart",
      "How you make everything better",
      "Everything about you! 💕"
    ],
    correct: 3,
    explanation: "You're perfect in every way, and I love absolutely everything about you! 🌺"
  },
  {
    id: 3,
    question: "How much do I love you? ⭐",
    options: [
      "To the moon and back",
      "More than all the stars",
      "Beyond infinity",
      "More than words can express! 💞"
    ],
    correct: 3,
    explanation: "My love for you grows stronger every single day! 🌙✨"
  },
  {
    id: 4,
    question: "What's our love like? 🦋",
    options: [
      "A beautiful fairy tale",
      "A perfect adventure",
      "A sweet dream come true",
      "All of these and more! 💝"
    ],
    correct: 3,
    explanation: "Our love story is the most beautiful one ever written! 📖💕"
  }
];

export default function LoveQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer === null) {
      toast("Please select an answer! 💕");
      return;
    }

    const isCorrect = selectedAnswer === quizQuestions[currentQuestion].correct;
    
    if (isCorrect) {
      setScore(score + 1);
      toast("Perfect! You know our love so well! 💖");
    } else {
      toast("Aww, but every answer shows how much we love each other! 💕");
    }

    setShowResult(true);

    setTimeout(() => {
      if (currentQuestion < quizQuestions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
        setShowResult(false);
      } else {
        setQuizCompleted(true);
      }
    }, 2500);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setScore(0);
    setShowResult(false);
    setQuizCompleted(false);
  };

  if (quizCompleted) {
    return (
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-romantic font-bold mb-8 text-foreground">
            Love Quiz Results! 🎉
          </h2>
          
          <Card variant="love" className="max-w-2xl mx-auto">
            <CardContent className="p-8">
              <div className="text-6xl mb-6 animate-heart-beat">🏆</div>
              <h3 className="text-3xl font-romantic font-bold mb-4">
                You scored {score}/{quizQuestions.length}!
              </h3>
              <p className="text-xl mb-6">
                {score === quizQuestions.length 
                  ? "Perfect! You know our love inside and out! 💕✨"
                  : score >= quizQuestions.length / 2
                  ? "Amazing! Our love shines through in every answer! 🌟💖"
                  : "Beautiful! Every moment we share makes our love stronger! 💝🌸"
                }
              </p>
              <p className="text-lg text-muted-foreground mb-8">
                No matter the score, you're always perfect to me! Every day with you is a gift! 🎁💕
              </p>
              <Button variant="romantic" onClick={resetQuiz} className="w-full">
                Take Quiz Again 💖
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    );
  }

  const question = quizQuestions[currentQuestion];

  return (
    <section className="py-16 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-romantic font-bold mb-8 text-foreground">
          Love Quiz 💕
        </h2>
        
        <Card variant="cute" className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>
              Question {currentQuestion + 1} of {quizQuestions.length}
            </CardTitle>
            <div className="w-full bg-muted rounded-full h-2">
              <div 
                className="bg-primary h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentQuestion + 1) / quizQuestions.length) * 100}%` }}
              />
            </div>
          </CardHeader>
          <CardContent>
            <h3 className="text-xl font-medium mb-6">
              {question.question}
            </h3>
            
            <div className="space-y-3 mb-6">
              {question.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => !showResult && handleAnswerSelect(index)}
                  disabled={showResult}
                  className={`w-full p-4 rounded-lg text-left transition-all duration-300 ${
                    selectedAnswer === index
                      ? showResult
                        ? index === question.correct
                          ? 'bg-romantic-gradient shadow-romantic animate-bounce-gentle'
                          : 'bg-destructive/20 border border-destructive'
                        : 'bg-accent shadow-soft'
                      : showResult && index === question.correct
                      ? 'bg-romantic-gradient shadow-romantic'
                      : 'bg-muted hover:bg-secondary'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>

            {showResult && (
              <div className="p-4 bg-sunset-gradient rounded-lg mb-6 animate-fade-in">
                <p className="text-lg font-medium">
                  {question.explanation}
                </p>
              </div>
            )}

            {!showResult && (
              <Button 
                variant="love" 
                onClick={handleNextQuestion}
                className="w-full"
                disabled={selectedAnswer === null}
              >
                {currentQuestion === quizQuestions.length - 1 ? 'Finish Quiz' : 'Next Question'} 💕
              </Button>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}