import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Render app with error handling
try {
  const rootElement = document.getElementById('root');
  if (!rootElement) {
    throw new Error('Root element not found');
  }

  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} catch (error) {
  console.error('Failed to render app:', error);
  document.body.innerHTML = `
    <div style="display: flex; align-items: center; justify-content: center; min-height: 100vh; padding: 20px; font-family: Arial, sans-serif;">
      <div style="max-width: 600px; text-align: center;">
        <h1 style="color: #ef4444; margin-bottom: 16px;">Application Error</h1>
        <p style="color: #666; margin-bottom: 24px;">Failed to load the application. Please check the console for details.</p>
        <button onclick="window.location.reload()" style="background: #8B4513; color: white; padding: 10px 20px; border: none; border-radius: 6px; cursor: pointer;">
          Reload Page
        </button>
      </div>
    </div>
  `;
}

