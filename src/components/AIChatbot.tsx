import { useState, useRef, useEffect } from 'react';
import { Send, Bot, X, Loader } from 'lucide-react';
import toast from 'react-hot-toast';

interface AIChatbotProps {
  context: 'PYQs' | 'Smart Notes';
  onClose?: () => void;
}

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function AIChatbot({ context, onClose }: AIChatbotProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: `Hello! I'm your AI study assistant. I can help you with questions about ${context.toLowerCase()}. Ask me anything!`
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      // Simulate AI response (replace with actual API call)
      // For production, integrate with OpenAI API, Anthropic Claude, or similar
      const response = await simulateAIResponse(userMessage.content, context);
      
      setMessages(prev => [...prev, { role: 'assistant', content: response }]);
    } catch (error) {
      console.error('AI Error:', error);
      toast.error('Failed to get AI response. Please try again.');
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try rephrasing your question.'
      }]);
    } finally {
      setLoading(false);
    }
  };

  const simulateAIResponse = async (question: string, context: string): Promise<string> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const lowerQuestion = question.toLowerCase();
    
    // Context-specific responses
    if (context === 'PYQs') {
      if (lowerQuestion.includes('download') || lowerQuestion.includes('access')) {
        return 'To download PYQs, click on any PYQ card and use the "Download" button. All files are stored securely in PDF format. If you need a specific subject or year, use the search bar to filter results.';
      }
      if (lowerQuestion.includes('upload') || lowerQuestion.includes('add')) {
        return 'To upload a new PYQ, fill out the upload form with the title, subject, year, and semester information, then select the PDF file and click "Upload PYQ". Make sure the file is a valid PDF.';
      }
      if (lowerQuestion.includes('subject') || lowerQuestion.includes('topic')) {
        return 'PYQs are organized by subject, year, and semester. You can search by any of these criteria using the search bar. Common subjects include Data Structures, Algorithms, Database Systems, and more.';
      }
    }

    if (context === 'Smart Notes') {
      if (lowerQuestion.includes('notes') || lowerQuestion.includes('study')) {
        return 'Smart Notes are interactive study materials available in the embedded viewer. You can navigate through pages using the controls. For specific topics or concepts, let me know what you need help with!';
      }
      if (lowerQuestion.includes('concept') || lowerQuestion.includes('understand')) {
        return 'I can help explain concepts from the Smart Notes! Please specify which topic or concept you\'d like me to explain in detail. For example, you can ask about algorithms, data structures, or any other subject covered in the notes.';
      }
    }

    // General responses
    if (lowerQuestion.includes('hello') || lowerQuestion.includes('hi')) {
      return 'Hello! How can I assist you with your studies today?';
    }

    if (lowerQuestion.includes('help')) {
      return `I'm here to help you with ${context.toLowerCase()}! You can ask me:
- Questions about specific topics
- How to use features on this page
- Study tips and strategies
- Explanations of concepts
What would you like to know?`;
    }

    // Default response
    return `I understand you're asking about: "${question}". 

For ${context}:
${context === 'PYQs' 
  ? '- You can search and download previous year question papers\n- Upload new PYQs to help other students\n- Filter by subject, year, or semester'
  : '- Interactive notes are available in the embedded viewer\n- Ask me specific questions about concepts\n- I can provide detailed explanations'}

Could you provide more specific details about what you need help with? I can give you a more detailed answer!`;
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="bg-surface-light dark:bg-surface-dark rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
      <div className="bg-primary-dark dark:bg-primary-light text-white p-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Bot className="w-5 h-5" />
          <h3 className="font-semibold">AI Study Assistant - {context}</h3>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="p-1 hover:bg-white/20 rounded transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      <div className="h-96 overflow-y-auto p-4 space-y-4 scrollbar-hide">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-lg p-3 ${
                message.role === 'user'
                  ? 'bg-primary-dark dark:bg-primary-light text-white'
                  : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-700'
              }`}
            >
              {message.role === 'assistant' && (
                <Bot className="w-4 h-4 mb-1 text-primary-dark dark:text-primary-light" />
              )}
              <p className="whitespace-pre-wrap text-sm">{message.content}</p>
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-3 border border-gray-200 dark:border-gray-700">
              <Loader className="w-4 h-4 animate-spin text-primary-dark dark:text-primary-light" />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="border-t border-gray-200 dark:border-gray-700 p-4">
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask a question..."
            className="flex-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary-dark dark:focus:ring-primary-light focus:border-transparent"
            disabled={loading}
          />
          <button
            onClick={handleSend}
            disabled={loading || !input.trim()}
            className="bg-primary-dark dark:bg-primary-light text-white p-2 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 text-center">
          AI responses are simulated. For production, integrate with OpenAI or similar service.
        </p>
      </div>
    </div>
  );
}
