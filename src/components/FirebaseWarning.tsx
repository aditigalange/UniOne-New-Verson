import { AlertCircle, X } from 'lucide-react';
import { useState } from 'react';

export default function FirebaseWarning() {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="bg-yellow-100 dark:bg-yellow-900/30 border-l-4 border-yellow-500 p-4 mb-4">
      <div className="flex items-start">
        <AlertCircle className="w-5 h-5 text-yellow-600 dark:text-yellow-400 mt-0.5 mr-3 flex-shrink-0" />
        <div className="flex-1">
          <h3 className="text-sm font-semibold text-yellow-800 dark:text-yellow-200 mb-1">
            Firebase Not Configured
          </h3>
          <p className="text-sm text-yellow-700 dark:text-yellow-300 mb-2">
            To use all features (authentication, database, file uploads), please configure Firebase.
          </p>
          <p className="text-xs text-yellow-600 dark:text-yellow-400">
            See <code className="bg-yellow-200 dark:bg-yellow-800 px-1 rounded">FIX_FIREBASE_ERROR.md</code> for setup instructions.
          </p>
        </div>
        <button
          onClick={() => setDismissed(true)}
          className="ml-4 text-yellow-600 dark:text-yellow-400 hover:text-yellow-800 dark:hover:text-yellow-200"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
