'use client';

import React, { useState, useEffect } from 'react';
import { useChat } from 'ai/react';
import toast from 'react-hot-toast';
import { 
  Sparkles, Code, FileText, PenTool, Settings, Download, 
  Copy, Check, Moon, Sun, Github, Twitter, Zap, Brain,
  Send, StopCircle
} from 'lucide-react';

const CerebrasStudio: React.FC = () => {
  const [activeTab, setActiveTab] = useState('text');
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [selectedModel, setSelectedModel] = useState('llama-4-scout-17b-16e-instruct');
  const [copied, setCopied] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [showSettings, setShowSettings] = useState(false);

  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    stop,
  } = useChat({
    api: '/api/generate',
    body: { model: selectedModel },
    onError: (error) => toast.error(error.message),
    onFinish: () => toast.success('Content generated successfully!'),
  });

  const models = [
    { id: 'llama-4-scout-17b-16e-instruct', name: 'Llama 4 Scout 17B', description: 'Latest reasoning model' },
    { id: 'llama-3.3-70b', name: 'Llama 3.3 70B', description: 'Most powerful model' },
    { id: 'llama3.1-8b', name: 'Llama 3.1 8B', description: 'Fast and efficient' },
  ];

  const tabs = [
    { id: 'text', label: 'Text Studio', icon: PenTool, description: 'Creative writing & content generation' },
    { id: 'code', label: 'Code Generator', icon: Code, description: 'Programming assistance' },
    { id: 'document', label: 'Document AI', icon: FileText, description: 'Document analysis' },
  ];

  const copyToClipboard = () => {
    const lastMessage = messages[messages.length - 1];
    if (lastMessage?.content) {
      navigator.clipboard.writeText(lastMessage.content);
      setCopied(true);
      toast.success('Copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    handleSubmit(e);
  };

  const lastMessage = messages[messages.length - 1];
  const hasResponse = lastMessage?.role === 'assistant';

  return (
    <div className={`min-h-screen transition-all duration-500 ${isDarkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Header */}
      <header className="relative z-10 border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                  <Brain className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold gradient-text">Cerebras Studio</h1>
                  <p className="text-sm text-gray-500 dark:text-gray-400">AI-Powered Creative Platform</p>
                </div>
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
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                <Settings className="h-5 w-5" />
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
                <button onClick={() => setShowSettings(false)} className="text-2xl">×</button>
              </div>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Cerebras API Key</label>
                  <input
                    type="password"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    placeholder="Enter your Cerebras API key"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 bg-white dark:bg-gray-800"
                  />
                  <p className="text-xs text-gray-500 mt-1">Get your free API key from cerebras.ai</p>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Model Selection</label>
                  <select
                    value={selectedModel}
                    onChange={(e) => setSelectedModel(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 bg-white dark:bg-gray-800"
                  >
                    {models.map(model => (
                      <option key={model.id} value={model.id}>
                        {model.name} - {model.description}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-4 mb-8">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`group px-6 py-4 rounded-2xl transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                    : 'bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Icon className="h-5 w-5" />
                  <div className="text-left">
                    <div className="font-medium">{tab.label}</div>
                    <div className="text-xs opacity-75">{tab.description}</div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Panel */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700">
            <div className="p-6 border-b border-gray-100 dark:border-gray-700">
              <h2 className="text-xl font-bold">Input</h2>
            </div>
            
            <form onSubmit={handleFormSubmit} className="p-6">
              <textarea
                value={input}
                onChange={handleInputChange}
                placeholder="What would you like to create today?"
                className="w-full h-64 p-4 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 resize-none bg-gray-50 dark:bg-gray-900"
                disabled={isLoading}
              />
              
              <div className="flex space-x-4 mt-6">
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-medium hover:from-purple-600 hover:to-pink-600 disabled:opacity-50 transition-all duration-300"
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
                
                {isLoading && (
                  <button
                    type="button"
                    onClick={stop}
                    className="px-4 py-3 bg-red-500 hover:bg-red-600 text-white rounded-xl transition-colors"
                  >
                    <StopCircle className="h-4 w-4" />
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* Output Panel */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700">
            <div className="p-6 border-b border-gray-100 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold">Output</h2>
                {hasResponse && (
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={copyToClipboard}
                      className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                    >
                      {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                    </button>
                  </div>
                )}
              </div>
            </div>
            
            <div className="p-6">
              <div className="min-h-64 bg-gray-50 dark:bg-gray-900 rounded-xl p-4">
                {messages.length > 0 ? (
                  <div className="space-y-4">
                    {messages.map((message, index) => (
                      <div key={index} className={`p-3 rounded-lg ${
                        message.role === 'user' 
                          ? 'bg-blue-50 dark:bg-blue-900/20' 
                          : 'bg-purple-50 dark:bg-purple-900/20'
                      }`}>
                        <pre className="whitespace-pre-wrap text-sm">
                          {message.content}
                          {isLoading && index === messages.length - 1 && (
                            <span className="inline-block w-2 h-5 bg-purple-500 animate-pulse ml-1"></span>
                          )}
                        </pre>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-64 text-gray-500">
                    <Sparkles className="h-12 w-12 mb-4 opacity-50" />
                    <p className="text-center">Your AI-generated content will appear here</p>
                    <p className="text-sm text-center mt-2">Experience lightning-fast inference with Cerebras</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CerebrasStudio;
