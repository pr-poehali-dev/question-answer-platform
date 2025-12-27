import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
    question: 'мой день рождения',
    answers: ['15 марта', '1 января', '26 апреля хмм)', '27 августа', '30 февраля'],
    correctAnswer: 3,
  },
  {
    id: 2,
    question: 'мой любимый/сигнатурный мультик',
    answers: ['в поисках немо', 'маленький принц', 'аладдин', 'зеленый слоник', 'губка боб'],
    correctAnswer: 1,
  },
  {
    id: 3,
    question: 'аниме которое я начал смотреть по твоему совету',
    answers: ['человек бензопила', 'твое имя', 'лес, где мерцают светлячки', 'блич'],
    correctAnswer: 3,
  },
  {
    id: 4,
    question: 'а ты помнишь как мы?',
    answers: ['целовелись-целовались под луной', 'первый раз встретились', 'сидели на лавочке', 'лежали в обнимку'],
    correctAnswer: 0,
  },
  {
    id: 5,
    question: 'ну и наконец, кого я люблю больше всех на свете',
    answers: ['тебяяяяя, да да именно тебя Диан, люблююю мямямяв'],
    correctAnswer: 0,
  },
];

const Index = () => {
  const [currentScreen, setCurrentScreen] = useState<'welcome' | 'rules' | 'game' | 'result'>('welcome');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showError, setShowError] = useState(false);

  const progress = ((currentQuestion) / questions.length) * 100;

  const handleAnswer = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    
    if (answerIndex === questions[currentQuestion].correctAnswer) {
      setShowError(false);
      setTimeout(() => {
        if (currentQuestion < questions.length - 1) {
          setCurrentQuestion(currentQuestion + 1);
          setSelectedAnswer(null);
        } else {
          setCurrentScreen('result');
        }
      }, 800);
    } else {
      setShowError(true);
      setTimeout(() => {
        setSelectedAnswer(null);
        setShowError(false);
      }, 1500);
    }
  };

  const playerRef = useRef<any>(null);
  const [musicStarted, setMusicStarted] = useState(false);

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
          },
        },
      });
    };

    return () => {
      playerRef.current?.destroy();
    };
  }, []);

  const startMusic = () => {
    if (playerRef.current && !musicStarted) {
      try {
        playerRef.current.playVideo();
        setMusicStarted(true);
      } catch (error) {
        console.error('Failed to play music:', error);
      }
    }
  };

  useEffect(() => {
    const handleClick = () => {
      startMusic();
    };
    
    document.addEventListener('click', handleClick, { once: true });
    
    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [musicStarted]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-secondary/10 relative overflow-hidden font-body">
      <div id="youtube-player" className="absolute" style={{ opacity: 0, pointerEvents: 'none', width: '1px', height: '1px' }}></div>
      
      <div className="snowflakes absolute inset-0 pointer-events-none z-0">
        {[...Array(40)].map((_, i) => (
          <div
            key={i}
            className="snowflake absolute animate-snowfall"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${6 + Math.random() * 4}s`,
              fontSize: `${20 + Math.random() * 20}px`,
              opacity: 0.7 + Math.random() * 0.3,
            }}
          >
            ❄
          </div>
        ))}
      </div>

      <div className="snowmen absolute inset-0 pointer-events-none z-0">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-sway"
            style={{
              left: `${15 + i * 18}%`,
              top: '5%',
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
            }}
          >
            <div className="text-6xl opacity-60 drop-shadow-lg">☃️</div>
          </div>
        ))}
      </div>

      <div className="christmas-tree fixed bottom-0 left-4 z-0">
        <div className="relative">
          <div className="text-8xl">🎄</div>
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 rounded-full animate-twinkle"
                style={{
                  left: `${20 + Math.random() * 60}%`,
                  top: `${10 + Math.random() * 70}%`,
                  backgroundColor: ['#ff0000', '#00ff00', '#0000ff', '#ffff00'][Math.floor(Math.random() * 4)],
                  animationDelay: `${Math.random() * 2}s`,
                }}
              />
            ))}
          </div>
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 flex gap-2">
            <div className="text-3xl">🎁</div>
            <div className="text-3xl">🎁</div>
          </div>
        </div>
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
              <p className="text-sm text-muted-foreground italic">
                (тут еще музыка должна играть, включи звук или подожди пока не запоет)
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
                    onClick={() => setCurrentScreen('game')}
                    className="text-lg px-8 py-6 bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all"
                  >
                    жмакать сюда чтобы стать счастливой
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
                  className="w-full text-lg py-6 bg-secondary hover:bg-secondary/90"
                >
                  Начать тест
                  <Icon name="Play" className="ml-2" size={20} />
                </Button>
              </CardContent>
            </Card>
          </div>
        )}

        {currentScreen === 'game' && (
          <div className="max-w-2xl mx-auto space-y-6 animate-in fade-in duration-500">
            <div className="mb-8 px-4">
              <div className="flex items-center justify-center gap-2">
                {questions.map((_, idx) => (
                  <div
                    key={idx}
                    className={`w-8 h-8 rounded-full border-2 transition-all duration-500 ${
                      idx < currentQuestion
                        ? 'bg-yellow-400 border-yellow-500 shadow-lg shadow-yellow-400/50 animate-pulse-slow'
                        : idx === currentQuestion
                        ? 'bg-yellow-300 border-yellow-400 shadow-md shadow-yellow-300/50 scale-110'
                        : 'bg-gray-300 border-gray-400'
                    }`}
                  />
                ))}
              </div>
            </div>

            <Card className="backdrop-blur-sm bg-card/80 border-2 border-primary/30 shadow-2xl">
              <CardHeader>
                <CardTitle className="text-2xl md:text-3xl font-heading text-center text-primary">
                  {questions[currentQuestion].question}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {showError && (
                  <div className="bg-red-100 border-2 border-red-400 text-red-700 px-4 py-3 rounded-lg text-center animate-shake">
                    Неверно! Попробуй еще раз 🤔
                  </div>
                )}
                <div className="grid gap-3">
                  {questions[currentQuestion].answers.map((answer, index) => (
                    <Button
                      key={index}
                      size="lg"
                      variant="outline"
                      onClick={() => handleAnswer(index)}
                      disabled={selectedAnswer !== null}
                      className={`text-left justify-start h-auto py-4 px-6 text-base md:text-lg transition-all ${
                        selectedAnswer === index
                          ? index === questions[currentQuestion].correctAnswer
                            ? 'bg-green-100 border-green-500 text-green-700 hover:bg-green-100'
                            : 'bg-red-100 border-red-500 text-red-700 hover:bg-red-100'
                          : 'hover:bg-primary/10 hover:border-primary/50'
                      }`}
                    >
                      {answer}
                      {selectedAnswer === index && index === questions[currentQuestion].correctAnswer && (
                        <Icon name="Check" className="ml-auto" size={24} />
                      )}
                      {selectedAnswer === index && index !== questions[currentQuestion].correctAnswer && (
                        <Icon name="X" className="ml-auto" size={24} />
                      )}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {currentScreen === 'result' && (
          <div className="max-w-2xl mx-auto text-center space-y-8 animate-in fade-in duration-700">
            <div className="space-y-6">
              <h2 className="text-5xl md:text-6xl font-heading font-bold text-primary">
                молодеец
              </h2>
              
              <Card className="backdrop-blur-sm bg-card/80 border-2 border-accent/30 shadow-2xl">
                <CardContent className="pt-8 space-y-6">
                  <p className="text-xl text-muted-foreground leading-relaxed">
                    ну че сказать, надеюсь в этом году мы оба очень сильно постараемся и наконец съедемся, а пока желаю хорошо отпраздновать этот новый год, впереди нас ждет еще много встреч, а теперь маленько меня в кадре
                  </p>
                  <div className="pt-4">
                    <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center text-gray-500">
                      [Место для видео]
                    </div>
                  </div>
                </CardContent>
              </Card>


            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes snowfall {
          0% { transform: translateY(-10vh) rotate(0deg); }
          100% { transform: translateY(110vh) rotate(360deg); }
        }
        
        @keyframes sway {
          0%, 100% { transform: translateX(0) rotate(-3deg); }
          50% { transform: translateX(15px) rotate(3deg); }
        }
        
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-10px); }
          75% { transform: translateX(10px); }
        }
        
        @keyframes pulse-slow {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        
        .animate-snowfall { animation: snowfall linear infinite; }
        .animate-sway { animation: sway ease-in-out infinite; }
        .animate-shake { animation: shake 0.3s ease-in-out; }
        .animate-pulse-slow { animation: pulse-slow 2s ease-in-out infinite; }
        .animate-bounce-slow { animation: bounce-slow 2s ease-in-out infinite; }
      `}</style>
    </div>
  );
};

export default Index;