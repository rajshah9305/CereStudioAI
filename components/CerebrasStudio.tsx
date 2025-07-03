'use client';

import React, { useState, useEffect } from 'react';
import { Brain, Send, Settings, Moon, Sun, Save, Check } from 'lucide-react';

const CerebrasStudioSimple: React.FC = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [apiKey, setApiKey] = useState('');
  const [showSettings, setShowSettings] = useState(false);
  const [apiKeySaved, setApiKeySaved] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Load saved settings on component mount
  useEffect(() => {
    setMounted(true);
    const savedApiKey = localStorage.getItem('cerebras-api-key');
    const savedTheme = localStorage.getItem('cerebras-theme');

    if (savedApiKey) {
      setApiKey(savedApiKey);
      setApiKeySaved(true);
    }

    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark');
    }
  }, []);

  // Save theme preference
  useEffect(() => {
    if (mounted) {
      localStorage.setItem('cerebras-theme', isDarkMode ? 'dark' : 'light');
    }
  }, [isDarkMode, mounted]);

  const handleSaveApiKey = () => {
    if (apiKey.trim()) {
      localStorage.setItem('cerebras-api-key', apiKey.trim());
      setApiKeySaved(true);
      setTimeout(() => setApiKeySaved(false), 2000);
    }
  };

  const handleClearApiKey = () => {
    localStorage.removeItem('cerebras-api-key');
    setApiKey('');
    setApiKeySaved(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    if (!apiKey.trim()) {
      setOutput('Error: Please enter your Cerebras API key in the settings panel (click the gear icon).');
      setShowSettings(true);
      return;
    }

    setIsLoading(true);
    setOutput(''); // Clear previous output

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [{ role: 'user', content: input }],
          model: 'llama3.1-8b',
          apiKey: apiKey
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
        throw new Error(errorData.error || `Request failed with status ${response.status}`);
      }

      const data = await response.json();
      setOutput(data.content || data.message || 'No content generated');

    } catch (error) {
      console.error('API Error:', error);
      setOutput('Error: ' + (error as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  // Don't render until mounted to prevent hydration mismatch
  if (!mounted) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin mx-auto mb-4"></div>
          <h2 className="text-2xl font-bold text-white mb-2">Loading Cerebras Studio</h2>
          <p className="text-gray-400">Initializing ultra-fast AI inference...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen transition-all duration-500 ${isDarkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      {/* Header */}
      <header className="border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                <Brain className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Cerebras Studio
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">AI-Powered Creative Platform</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </button>
              <button
                onClick={() => setShowSettings(!showSettings)}
                className={`p-2 rounded-lg transition-colors relative ${
                  apiKey
                    ? 'bg-green-100 dark:bg-green-900/20 hover:bg-green-200 dark:hover:bg-green-900/30'
                    : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                <Settings className={`h-5 w-5 ${apiKey ? 'text-green-600 dark:text-green-400' : ''}`} />
                {apiKey && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full"></div>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Settings Panel */}
      {showSettings && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm">
          <div className="absolute right-0 top-0 h-full w-96 bg-white dark:bg-gray-900 border-l border-gray-200 dark:border-gray-800 shadow-2xl">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">Settings</h2>
                <button 
                  onClick={() => setShowSettings(false)} 
                  className="text-2xl hover:bg-gray-100 dark:hover:bg-gray-800 rounded p-1"
                >
                  ×
                </button>
              </div>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Cerebras API Key
                  </label>
                  <div className="space-y-3">
                    <input
                      type="password"
                      value={apiKey}
                      onChange={(e) => setApiKey(e.target.value)}
                      placeholder="Enter your Cerebras API key"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 bg-white dark:bg-gray-800"
                    />

                    <div className="flex space-x-2">
                      <button
                        onClick={handleSaveApiKey}
                        disabled={!apiKey.trim()}
                        className="flex-1 px-4 py-2 bg-green-500 hover:bg-green-600 disabled:bg-gray-400 disabled:cursor-not-allowed text-white rounded-lg transition-colors flex items-center justify-center space-x-2"
                      >
                        {apiKeySaved ? (
                          <>
                            <Check className="h-4 w-4" />
                            <span>Saved!</span>
                          </>
                        ) : (
                          <>
                            <Save className="h-4 w-4" />
                            <span>Save Key</span>
                          </>
                        )}
                      </button>

                      <button
                        onClick={handleClearApiKey}
                        className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
                      >
                        Clear
                      </button>
                    </div>
                  </div>

                  <p className="text-xs text-gray-500 mt-2">
                    Get your free API key from{' '}
                    <a
                      href="https://cerebras.ai"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-purple-600 hover:text-purple-500"
                    >
                      cerebras.ai
                    </a>
                  </p>

                  {apiKey && (
                    <div className="mt-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                      <p className="text-sm text-green-700 dark:text-green-300">
                        ✓ API key is {localStorage.getItem('cerebras-api-key') ? 'saved locally' : 'entered but not saved'}
                      </p>
                    </div>
                  )}
                </div>

                <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                  <h3 className="text-sm font-medium mb-3">Performance Stats</h3>
                  <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                    <div className="flex justify-between">
                      <span>Speed:</span>
                      <span className="font-medium">Up to 1,800 tokens/sec</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Context:</span>
                      <span className="font-medium">128K tokens</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Precision:</span>
                      <span className="font-medium">16-bit</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Panel */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700">
            <div className="p-6 border-b border-gray-100 dark:border-gray-700">
              <h2 className="text-xl font-bold">Input</h2>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="What would you like to create today?"
                className="w-full h-64 p-4 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 resize-none bg-gray-50 dark:bg-gray-900 transition-all duration-200"
                disabled={isLoading}
              />
              
              <div className="flex space-x-4 mt-6">
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-medium hover:from-purple-600 hover:to-pink-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg shadow-purple-500/25"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Generating...</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center space-x-2">
                      <Send className="h-4 w-4" />
                      <span>Generate with Cerebras</span>
                    </div>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Output Panel */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700">
            <div className="p-6 border-b border-gray-100 dark:border-gray-700">
              <h2 className="text-xl font-bold">Output</h2>
            </div>
            
            <div className="p-6">
              <div className="min-h-64 bg-gray-50 dark:bg-gray-900 rounded-xl p-4">
                {output ? (
                  <pre className="whitespace-pre-wrap text-sm font-mono">
                    {output}
                  </pre>
                ) : (
                  <div className="flex flex-col items-center justify-center h-64 text-gray-500 dark:text-gray-400">
                    <Brain className="h-12 w-12 mb-4 opacity-50" />
                    <p className="text-center">Your AI-generated content will appear here</p>
                    <p className="text-sm text-center mt-2">Experience lightning-fast inference with Cerebras</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Performance Stats */}
        <div className="mt-8 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 p-6">
          <h3 className="font-bold text-gray-900 dark:text-white mb-4">Performance Metrics</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl">
              <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">1,800</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Tokens/Second</div>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">128K</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Context Length</div>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">16-bit</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Precision</div>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-xl">
              <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">20x</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Faster than GPUs</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CerebrasStudioSimple;
