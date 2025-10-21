import React, { useState, useCallback } from 'react';
import { reviewCode } from './services/geminiService';
import { CodeEditor } from './components/CodeEditor';
import { FeedbackCard } from './components/FeedbackCard';
import { Header } from './components/Header';
import { LANGUAGES, DEFAULT_CODE_SNIPPET } from './constants';
import { OptimalCodeCard } from './components/OptimalCodeCard';

const App: React.FC = () => {
  const [code, setCode] = useState<string>(DEFAULT_CODE_SNIPPET);
  const [language, setLanguage] = useState<string>(LANGUAGES[0].value);
  const [feedback, setFeedback] = useState<string>('');
  const [optimalCode, setOptimalCode] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleReviewCode = useCallback(async () => {
    if (!code.trim()) {
      setError('Please enter some code to review.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setFeedback('');
    setOptimalCode('');

    try {
      const result = await reviewCode(code, language);
      setFeedback(result.review);
      setOptimalCode(result.optimalCode);

    } catch (err) {
      setError('An error occurred while reviewing the code. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [code, language]);

  return (
    <div className="min-h-screen text-white flex flex-col relative overflow-hidden">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-neon-coral rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-neon-mint rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-neon-green rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-float" style={{animationDelay: '4s'}}></div>
      </div>
      
      <Header />
      
      <main className="flex-grow p-4 md:p-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 h-full">
            <div className="flex flex-col min-h-[600px]">
              <CodeEditor
                code={code}
                setCode={setCode}
                language={language}
                setLanguage={setLanguage}
                onReview={handleReviewCode}
              />
            </div>
            <div className="flex flex-col gap-6 min-h-[600px]">
               <FeedbackCard 
                feedback={feedback}
                isLoading={isLoading}
                error={error}
              />
              <OptimalCodeCard 
                code={optimalCode}
                language={language}
                isLoading={isLoading}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;