import { useState } from 'react';
import { MessageCircle, BookOpen } from 'lucide-react';
import AIChatbot from '../components/AIChatbot';

export default function SmartNotes() {
  const [showChatbot, setShowChatbot] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            Smart Notes
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Interactive study materials and notes
          </p>
        </div>
        <button
          onClick={() => setShowChatbot(!showChatbot)}
          className="flex items-center space-x-2 bg-primary-dark dark:bg-primary-light text-white px-4 py-2 rounded-lg hover:opacity-90 transition-opacity"
        >
          <MessageCircle className="w-5 h-5" />
          <span>AI Assistant</span>
        </button>
      </div>

      {showChatbot && (
        <div className="mb-6">
          <AIChatbot context="Smart Notes" onClose={() => setShowChatbot(false)} />
        </div>
      )}

      {/* FlipHTML5 Embed */}
      <div className="bg-surface-light dark:bg-surface-dark rounded-xl p-6 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-3 mb-4">
          <BookOpen className="w-6 h-6 text-primary-dark dark:text-primary-light" />
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
            Interactive Notes Viewer
          </h2>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-inner">
          <iframe
            src="https://online.fliphtml5.com/fqcdv/wybj/"
            className="w-full h-[600px] md:h-[800px] border-0"
            title="Smart Notes"
            allowFullScreen
          />
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-4 text-center">
          Use the controls above to navigate through the notes. Click on AI Assistant for help with any topic.
        </p>
      </div>

      {/* Additional Notes Sections */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-surface-light dark:bg-surface-dark rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">
            Study Tips
          </h3>
          <ul className="space-y-2 text-gray-600 dark:text-gray-400">
            <li className="flex items-start">
              <span className="text-primary-dark dark:text-primary-light mr-2">•</span>
              Take notes while reading
            </li>
            <li className="flex items-start">
              <span className="text-primary-dark dark:text-primary-light mr-2">•</span>
              Review regularly for better retention
            </li>
            <li className="flex items-start">
              <span className="text-primary-dark dark:text-primary-light mr-2">•</span>
              Use AI Assistant for clarification
            </li>
            <li className="flex items-start">
              <span className="text-primary-dark dark:text-primary-light mr-2">•</span>
              Practice with PYQs after studying
            </li>
          </ul>
        </div>

        <div className="bg-surface-light dark:bg-surface-dark rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">
            Quick Actions
          </h3>
          <div className="space-y-3">
            <button
              onClick={() => setShowChatbot(true)}
              className="w-full text-left px-4 py-3 bg-primary-dark/10 dark:bg-primary-light/10 rounded-lg hover:bg-primary-dark/20 dark:hover:bg-primary-light/20 transition-colors"
            >
              <div className="font-medium text-gray-900 dark:text-gray-100">Ask AI About Notes</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Get help understanding concepts</div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
