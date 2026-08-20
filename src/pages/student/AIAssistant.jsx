import React, { useState, useRef, useEffect } from 'react';
import { 
  Bot, 
  Send, 
  Sparkles, 
  Heart, 
  LifeBuoy, 
  CalendarCheck, 
  Wind, 
  Compass, 
  RotateCcw, 
  ShieldAlert, 
  User, 
  MessageSquare,
  BookOpen
} from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { useWellness } from '../../context/WellnessContext';
import { Link } from 'react-router-dom';

const INITIAL_MESSAGES = [
  {
    id: 'msg-1',
    sender: 'ai',
    text: "Hello Maya, I'm your MindGrid AI Companion 🌿. I'm here to listen, offer gentle grounding exercises, or help you sort through study stress. How is your day feeling so far?",
    timestamp: 'Just now',
    actions: []
  }
];

const SUGGESTED_PROMPTS = [
  "I have an exam in 2 hours and feel sudden panic",
  "I'm procrastinating on a paper and feeling guilty",
  "Help me unwind before sleep tonight",
  "Guide me through a quick grounding breath"
];

export const AIAssistant = () => {
  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem('mindgrid_ai_chat');
    return saved ? JSON.parse(saved) : INITIAL_MESSAGES;
  });
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const { openCrisisModal } = useWellness();
  const messagesEndRef = useRef(null);

  useEffect(() => {
    localStorage.setItem('mindgrid_ai_chat', JSON.stringify(messages));
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const generateAIResponse = (userText) => {
    const lower = userText.toLowerCase();

    if (lower.includes('exam') || lower.includes('panic') || lower.includes('anxious') || lower.includes('stress')) {
      return {
        text: "I hear how much pressure you're feeling right now. Exam tension is a natural physiological reaction, but it doesn't define your capability. Let's ground your nervous system together first: take a slow breath in for 4 seconds, and release for 8. Would you like to launch the interactive breathing tool or talk through what you're facing?",
        actions: [
          { label: 'Open 4-7-8 Breathing Tool', type: 'breathe' },
          { label: 'Book Counselor Session', type: 'counselor' }
        ]
      };
    } else if (lower.includes('procrastinat') || lower.includes('paper') || lower.includes('study') || lower.includes('guilt')) {
      return {
        text: "Procrastination is often our brain trying to protect us from feeling overwhelmed or fearing imperfection, not laziness. Let's try the '2-Minute Gentle Start': just open the document and write 1 sentence, with zero expectation of quality. How does that sound?",
        actions: [
          { label: 'Read Procrastination-Guilt Guide', type: 'resource', link: '/resources' }
        ]
      };
    } else if (lower.includes('sleep') || lower.includes('tired') || lower.includes('bed') || lower.includes('night')) {
      return {
        text: "Getting peaceful rest in college dorms can be tough. Try setting screens to warm night mode and stepping away from coursework for 20 minutes before bed. We also have a guided 5-minute body scan audio track designed for deep muscle relaxation.",
        actions: [
          { label: 'Open Dorm Sleep Hygiene Guide', type: 'resource', link: '/resources' },
          { label: 'Try 5-4-3-2-1 Grounding', type: 'ground' }
        ]
      };
    } else if (lower.includes('counselor') || lower.includes('therapist') || lower.includes('human')) {
      return {
        text: "Speaking with a licensed human counselor is a wonderful and strong step. University counseling sessions are 100% free and confidential for enrolled students. You can browse open slots for today or tomorrow right here.",
        actions: [
          { label: 'Browse Campus Counselors', type: 'counselor' }
        ]
      };
    } else {
      return {
        text: "Thank you for sharing that with me. It is completely okay to feel whatever you're experiencing today. Remember to give yourself grace and take things one moment at a time. What would feel most supportive right now?",
        actions: [
          { label: 'Try 1-Min Breathing', type: 'breathe' },
          { label: 'Explore Resources Library', type: 'resource', link: '/resources' }
        ]
      };
    }
  };

  const handleSendMessage = (textToSend = input) => {
    if (!textToSend.trim()) return;

    const userMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const reply = generateAIResponse(textToSend);
      const aiMessage = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: reply.text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        actions: reply.actions || []
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1100);
  };

  const handleClearChat = () => {
    setMessages(INITIAL_MESSAGES);
    localStorage.removeItem('mindgrid_ai_chat');
  };

  const handleActionClick = (action) => {
    if (action.type === 'breathe') {
      openCrisisModal('breathe');
    } else if (action.type === 'ground') {
      openCrisisModal('ground');
    }
  };

  return (
    <div className="space-y-4 max-w-4xl mx-auto h-[calc(100vh-8rem)] flex flex-col animate-in fade-in-50 duration-300">
      {/* Top Disclaimer Header */}
      <div className="bg-gradient-to-r from-calm-50 to-serene-50/70 p-4 rounded-2xl border border-calm-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-calm-600 text-white flex items-center justify-center shadow-soft flex-shrink-0">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-bold text-slate-800">MindGrid AI Companion</h2>
              <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-calm-200 text-calm-900">
                Empathetic Guide
              </span>
            </div>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Supportive wellness listening & grounding. Not a clinical diagnosis or crisis replacement.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          <Link to="/counselors">
            <Button variant="soft" size="xs" icon={CalendarCheck}>
              Talk to a Counselor Instead
            </Button>
          </Link>
          <button
            onClick={handleClearChat}
            title="Reset conversation"
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-white transition-colors text-xs flex items-center gap-1"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Chat Box Container */}
      <Card className="flex-1 flex flex-col p-4 bg-white shadow-soft overflow-hidden border-slate-200/80">
        {/* Messages Stream */}
        <div className="flex-1 overflow-y-auto space-y-4 pr-2">
          {messages.map((msg) => {
            const isUser = msg.sender === 'user';
            return (
              <div
                key={msg.id}
                className={`flex items-start gap-2.5 ${isUser ? 'justify-end' : 'justify-start'}`}
              >
                {!isUser && (
                  <div className="w-8 h-8 rounded-xl bg-calm-100 text-calm-700 flex items-center justify-center flex-shrink-0 mt-0.5 shadow-2xs">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div className={`max-w-lg space-y-2`}>
                  <div
                    className={`p-4 rounded-2xl text-xs sm:text-sm leading-relaxed shadow-2xs ${
                      isUser
                        ? 'bg-calm-600 text-white rounded-tr-none font-medium'
                        : 'bg-slate-50 text-slate-800 rounded-tl-none border border-slate-100'
                    }`}
                  >
                    <p className="whitespace-pre-line">{msg.text}</p>
                    <span
                      className={`block text-[10px] mt-1.5 ${
                        isUser ? 'text-calm-100 text-right' : 'text-slate-400'
                      }`}
                    >
                      {msg.timestamp}
                    </span>
                  </div>

                  {/* Smart Actions embedded in AI messages */}
                  {!isUser && msg.actions && msg.actions.length > 0 && (
                    <div className="flex flex-wrap gap-2 pt-1">
                      {msg.actions.map((act, i) => {
                        if (act.type === 'counselor') {
                          return (
                            <Link key={i} to="/counselors">
                              <button className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-calm-100 hover:bg-calm-200 text-calm-800 border border-calm-200 transition-colors shadow-2xs">
                                <CalendarCheck className="w-3.5 h-3.5" />
                                <span>{act.label}</span>
                              </button>
                            </Link>
                          );
                        }
                        if (act.type === 'resource') {
                          return (
                            <Link key={i} to={act.link || '/resources'}>
                              <button className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 transition-colors shadow-2xs">
                                <BookOpen className="w-3.5 h-3.5" />
                                <span>{act.label}</span>
                              </button>
                            </Link>
                          );
                        }
                        return (
                          <button
                            key={i}
                            onClick={() => handleActionClick(act)}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-calm-50 hover:bg-calm-100 text-calm-800 border border-calm-200 transition-colors shadow-2xs"
                          >
                            <Wind className="w-3.5 h-3.5" />
                            <span>{act.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>

                {isUser && (
                  <div className="w-8 h-8 rounded-xl bg-slate-200 text-slate-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            );
          })}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex items-start gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-calm-100 text-calm-700 flex items-center justify-center flex-shrink-0">
                <Bot className="w-4 h-4" />
              </div>
              <div className="p-3 bg-slate-50 border border-slate-100 rounded-2xl rounded-tl-none">
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-calm-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-2 h-2 rounded-full bg-calm-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-2 h-2 rounded-full bg-calm-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Suggestion Chips */}
        <div className="pt-3 pb-2 flex flex-wrap gap-1.5 border-t border-slate-100">
          {SUGGESTED_PROMPTS.map((prompt, i) => (
            <button
              key={i}
              type="button"
              onClick={() => handleSendMessage(prompt)}
              className="text-[11px] font-medium px-2.5 py-1 rounded-full bg-slate-50 hover:bg-calm-50 text-slate-600 hover:text-calm-800 border border-slate-200/80 transition-colors"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Input Form */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex items-center gap-2 pt-2"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a thought, stressor, or question..."
            className="flex-1 text-xs sm:text-sm px-4 py-3 rounded-2xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-calm-500/20 focus:border-calm-500 transition-all"
          />
          <Button
            type="submit"
            variant="primary"
            size="md"
            icon={Send}
            disabled={!input.trim()}
          >
            Send
          </Button>
        </form>
      </Card>
    </div>
  );
};
