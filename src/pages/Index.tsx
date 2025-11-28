import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';

type Question = {
  id: number;
  question: string;
  answers: string[];
  correctAnswer: number;
};

const questions: Question[] = [
  {
    id: 1,
    question: 'Какой день стал началом нашей истории?',
    answers: ['14 февраля', '1 января', 'Тот самый день', '8 марта'],
    correctAnswer: 2,
  },
  {
    id: 2,
    question: 'Что делает тебя особенной?',
    answers: ['Всё', 'Твоя улыбка', 'Твоё сердце', 'Правильно всё'],
    correctAnswer: 3,
  },
  {
    id: 3,
    question: 'Сколько причин я люблю тебя?',
    answers: ['Миллион', 'Бесконечно', 'Не сосчитать', 'Все варианты верны'],
    correctAnswer: 3,
  },
  {
    id: 4,
    question: 'Что я загадал на Новый год?',
    answers: ['Быть с тобой', 'Твоё счастье', 'Нашу любовь', 'Всё вместе'],
    correctAnswer: 3,
  },
  {
    id: 5,
    question: 'Куда бы я хотел с тобой попасть в будущем?',
    answers: ['В сказку', 'К звёздам', 'В рай', 'Везде, где ты рядом'],
    correctAnswer: 3,
  },
];

const Index = () => {
  const [currentScreen, setCurrentScreen] = useState<'welcome' | 'rules' | 'game' | 'result'>('welcome');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  const handleAnswer = (answerIndex: number) => {
    if (answered) return;
    
    setSelectedAnswer(answerIndex);
    setAnswered(true);
    
    if (answerIndex === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
        setAnswered(false);
      } else {
        setCurrentScreen('result');
      }
    }, 1500);
  };

  const playerRef = useRef<any>(null);

  useEffect(() => {
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

    (window as any).onYouTubeIframeAPIReady = () => {
      playerRef.current = new (window as any).YT.Player('youtube-player', {
        videoId: 'VlMUBWOHoa8',
        playerVars: {
          autoplay: 0,
          loop: 1,
          playlist: 'VlMUBWOHoa8',
          controls: 0,
        },
        events: {
          onReady: (event: any) => {
            event.target.setVolume(30);
            const playAudio = () => {
              event.target.playVideo();
              document.removeEventListener('click', playAudio);
            };
            document.addEventListener('click', playAudio, { once: true });
          },
        },
      });
    };

    return () => {
      playerRef.current?.destroy();
    };
  }, []);

  const resetGame = () => {
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer(null);
    setAnswered(false);
    setCurrentScreen('welcome');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-secondary/10 relative overflow-hidden font-body">
      <div id="youtube-player" className="absolute" style={{ opacity: 0, pointerEvents: 'none', width: '1px', height: '1px' }}></div>
      
      <div className="snowflakes absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="snowflake absolute text-white opacity-70 animate-snowfall"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${8 + Math.random() * 6}s`,
              fontSize: `${10 + Math.random() * 15}px`,
            }}
          >
            ❄
          </div>
        ))}
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        {currentScreen === 'welcome' && (
          <div className="max-w-2xl mx-auto text-center space-y-8 animate-in fade-in duration-700">
            <div className="space-y-4">
              <h1 className="text-6xl md:text-7xl font-heading font-bold text-primary">
                С Новым Годом! ✨
              </h1>
              <p className="text-2xl text-foreground/80 font-light">
                Особенный подарок для особенной девушки
              </p>
            </div>

            <Card className="backdrop-blur-sm bg-card/80 border-2 border-accent/30 shadow-2xl">
              <CardContent className="pt-8 space-y-6">
                <div className="flex justify-center">
                  <img src="https://cdn.poehali.dev/files/c4ca95af-bd8d-48d5-afff-841a435b2007.jpg" alt="Gift" className="w-64 h-64 object-cover rounded-2xl shadow-2xl border-4 border-accent/30" />
                </div>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  привет диан, это мой небольшой квестик для тебя, надеюсь тебе понравится, в конце так же тебя ждет поздравление и код от коробочки&lt;3
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                  <Button 
                    size="lg" 
                    onClick={() => setCurrentScreen('rules')}
                    className="text-lg px-8 py-6 bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all"
                  >
                    жмакать сюда чтоби стать счастливой
                    <Icon name="Heart" className="ml-2" size={20} />
                  </Button>
                  <Button 
                    size="lg" 
                    variant="outline"
                    onClick={() => setCurrentScreen('rules')}
                    className="text-lg px-8 py-6 border-2 border-primary/50 hover:bg-primary/10"
                  >
                    <Icon name="BookOpen" className="mr-2" size={20} />
                    Правила
                  </Button>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-center gap-2 text-4xl">
              <span className="animate-twinkle mx-[15px] my-0" style={{ animationDelay: '0s' }}>⭐</span>
              <span className="animate-twinkle" style={{ animationDelay: '0.3s' }}>✨</span>
              <span className="animate-twinkle" style={{ animationDelay: '0.6s' }}>💫</span>
            </div>
          </div>
        )}

        {currentScreen === 'rules' && (
          <div className="max-w-2xl mx-auto space-y-6 animate-in fade-in duration-500">
            <Button 
              variant="ghost" 
              onClick={() => setCurrentScreen('welcome')}
              className="mb-4 hover:bg-primary/10"
            >
              <Icon name="ArrowLeft" className="mr-2" size={20} />
              Назад
            </Button>

            <Card className="backdrop-blur-sm bg-card/80 border-2 border-secondary/30 shadow-2xl">
              <CardHeader>
                <CardTitle className="text-3xl font-heading text-center text-secondary">
                  <Icon name="Sparkles" className="inline mr-2" size={28} />
                  Правила игры
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4 text-lg">
                  <div className="flex items-start gap-3 p-4 bg-primary/5 rounded-lg">
                    <span className="text-2xl">🤷</span>
                    <div>
                      <p className="text-muted-foreground">вот будто бы без знаний правил ты не справилась бы, ну лааан, крч отвечай на вопросы и продвигайся по квесту, хуй его знает как себя поведет сайт на твоем ипхоне, но надеюсь не поломается, хотя если ты это читаешь то значит работает, в общем давай уже проходи, а я пока еще стопочку наебну тут, за тебя конечно же)</p>
                    </div>
                  </div>
                </div>

                <Button 
                  size="lg"
                  onClick={() => setCurrentScreen('game')}
                  className="w-full text-lg py-6 bg-secondary hover:bg-secondary/90 text-secondary-foreground shadow-lg"
                >
                  Поехали!
                  <Icon name="Sparkles" className="ml-2" size={20} />
                </Button>
              </CardContent>
            </Card>
          </div>
        )}

        {currentScreen === 'game' && (
          <div className="max-w-3xl mx-auto space-y-6 animate-in fade-in duration-500">
            <div className="space-y-3">
              <div className="flex justify-between items-center text-sm text-muted-foreground">
                <span className="font-medium">Вопрос {currentQuestion + 1} из {questions.length}</span>
                <span className="font-medium">{Math.round(progress)}%</span>
              </div>
              <div className="relative">
                <Progress value={progress} className="h-3 bg-muted" />
                <div 
                  className="absolute top-0 left-0 h-3 bg-gradient-to-r from-primary via-accent to-secondary transition-all duration-500 rounded-full"
                  style={{ width: `${progress}%` }}
                />
                <div 
                  className="absolute -top-1 transition-all duration-500"
                  style={{ left: `${progress}%`, transform: 'translateX(-50%)' }}
                >
                  <span className="text-2xl animate-twinkle">⭐</span>
                </div>
              </div>
            </div>

            <Card className="backdrop-blur-sm bg-card/80 border-2 border-primary/30 shadow-2xl">
              <CardHeader>
                <CardTitle className="text-2xl md:text-3xl font-heading text-center leading-relaxed">
                  {questions[currentQuestion].question}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {questions[currentQuestion].answers.map((answer, index) => (
                  <Button
                    key={index}
                    variant={selectedAnswer === index ? 
                      (index === questions[currentQuestion].correctAnswer ? 'default' : 'destructive') 
                      : 'outline'}
                    className={`w-full text-left justify-start h-auto py-4 px-6 text-lg transition-all ${
                      selectedAnswer === index
                        ? index === questions[currentQuestion].correctAnswer
                          ? 'bg-secondary border-secondary text-secondary-foreground shadow-lg scale-105'
                          : 'bg-destructive border-destructive scale-95'
                        : 'hover:bg-primary/5 hover:border-primary/50 hover:scale-102'
                    } ${answered && index === questions[currentQuestion].correctAnswer ? 'bg-secondary/20 border-secondary' : ''}`}
                    onClick={() => handleAnswer(index)}
                    disabled={answered}
                  >
                    <span className="mr-3 text-2xl">
                      {answered && index === questions[currentQuestion].correctAnswer ? '✨' : '💝'}
                    </span>
                    {answer}
                  </Button>
                ))}
              </CardContent>
            </Card>
          </div>
        )}

        {currentScreen === 'result' && (
          <div className="max-w-2xl mx-auto text-center space-y-8 animate-in fade-in duration-700">
            <div className="text-6xl mb-4 animate-float">🎉</div>
            
            <Card className="backdrop-blur-sm bg-card/80 border-2 border-accent/50 shadow-2xl">
              <CardContent className="pt-8 space-y-6">
                <h2 className="text-4xl md:text-5xl font-heading font-bold text-primary">
                  Ты прошла путь! ✨
                </h2>
                
                <div className="text-6xl my-6">
                  {score === questions.length ? '💖' : '🌟'}
                </div>

                <div className="space-y-4">
                  <p className="text-3xl font-heading text-accent">
                    {score} из {questions.length}
                  </p>
                  
                  <div className="bg-gradient-to-r from-primary/10 via-accent/10 to-secondary/10 p-6 rounded-lg border-2 border-accent/30">
                    <p className="text-xl leading-relaxed text-foreground/90">
                      {score === questions.length 
                        ? 'Ты знаешь все ответы, потому что мы вместе создаём эту историю! Каждый день с тобой — это новая страница нашей сказки. Спасибо, что ты есть! 💕'
                        : 'Не важно, сколько баллов, главное — что мы вместе! Каждый момент с тобой особенный, и впереди нас ждёт ещё столько прекрасного! 🌟'
                      }
                    </p>
                  </div>

                  <div className="text-5xl my-6 space-x-2">
                    <span className="inline-block animate-float" style={{ animationDelay: '0s' }}>❄️</span>
                    <span className="inline-block animate-float" style={{ animationDelay: '0.2s' }}>✨</span>
                    <span className="inline-block animate-float" style={{ animationDelay: '0.4s' }}>💝</span>
                    <span className="inline-block animate-float" style={{ animationDelay: '0.6s' }}>✨</span>
                    <span className="inline-block animate-float" style={{ animationDelay: '0.8s' }}>❄️</span>
                  </div>

                  <p className="text-2xl font-heading text-primary">
                    С Новым Годом, любимая! 🎆
                  </p>
                </div>

                <Button 
                  size="lg"
                  onClick={resetGame}
                  className="mt-6 text-lg px-8 py-6 bg-primary hover:bg-primary/90 shadow-lg"
                >
                  <Icon name="RotateCcw" className="mr-2" size={20} />
                  Пройти ещё раз
                </Button>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;