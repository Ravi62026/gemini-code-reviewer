import React, { useState } from 'react';
import { Spinner } from './Spinner';
import { SparklesIcon } from './icons/SparklesIcon';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import vscDarkPlus from 'react-syntax-highlighter/dist/esm/styles/prism/vsc-dark-plus';
import { ClipboardIcon } from './icons/ClipboardIcon';
import { CheckIcon } from './icons/CheckIcon';

interface FeedbackCardProps {
  feedback: string;
  isLoading: boolean;
  error: string | null;
}

const WelcomeMessage: React.FC = () => (
    <div className="text-center flex flex-col items-center justify-center h-full p-8">
        <div className="relative mb-6">
            <div className="absolute inset-0 bg-gradient-to-r from-neon-coral to-neon-orange rounded-full blur-lg opacity-30 animate-pulse-slow"></div>
            <SparklesIcon className="relative h-20 w-20 text-white animate-float" />
        </div>
        <h3 className="text-xl font-display font-semibold text-white mb-3">Ready for Code Analysis</h3>
        <p className="text-gray-300 max-w-sm leading-relaxed">
            Paste your code in the editor and let our AI provide intelligent feedback and optimization suggestions.
        </p>
        <div className="mt-6 flex items-center space-x-2 text-sm text-gray-400">
            <div className="w-2 h-2 bg-neon-green rounded-full animate-pulse"></div>
            <span>AI Engine Ready</span>
        </div>
    </div>
);

const MarkdownRenderer: React.FC<{ content: string }> = ({ content }) => {
    return (
        <div className="prose prose-invert prose-sm md:prose-base max-w-none p-6 prose-headings:text-white prose-p:text-gray-200 prose-strong:text-white prose-a:text-neon-cyan prose-li:text-gray-200">
            <ReactMarkdown
                children={content}
                remarkPlugins={[remarkGfm]}
                components={{
                    code({node, inline, className, children, ...props}) {
                        const match = /language-(\w+)/.exec(className || '');
                        return !inline && match ? (
                            <div className="my-6 rounded-xl overflow-hidden border border-white/20 bg-dark-900/50">
                                <SyntaxHighlighter
                                    children={String(children).replace(/\n$/, '')}
                                    style={vscDarkPlus}
                                    language={match[1]}
                                    PreTag="div"
                                    customStyle={{
                                        background: 'transparent',
                                        padding: '1.5rem',
                                        fontFamily: 'JetBrains Mono, Fira Code, monospace'
                                    }}
                                    {...props}
                                />
                            </div>
                        ) : (
                            <code className="bg-neon-coral/20 text-neon-mint rounded-lg px-2 py-1 font-mono text-sm border border-neon-coral/30">
                                {children}
                            </code>
                        );
                    }
                }}
            />
        </div>
    );
};

const CopyButton: React.FC<{ textToCopy: string }> = ({ textToCopy }) => {
    const [isCopied, setIsCopied] = useState(false);

    const handleCopy = async () => {
        if (!textToCopy) return;
        try {
            await navigator.clipboard.writeText(textToCopy);
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy text: ', err);
        }
    };

    return (
        <button
            onClick={handleCopy}
            disabled={!textToCopy || isCopied}
            className="flex items-center space-x-2 text-sm px-4 py-2 rounded-lg transition-all duration-200 bg-white/10 hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed border border-white/20 hover:border-white/30"
        >
            {isCopied ? (
                <>
                    <CheckIcon className="h-4 w-4 text-neon-green" />
                    <span className="text-neon-green font-medium">Copied!</span>
                </>
            ) : (
                <>
                    <ClipboardIcon className="h-4 w-4 text-gray-300" />
                    <span className="text-gray-300 font-medium">Copy</span>
                </>
            )}
        </button>
    )
}

export const FeedbackCard: React.FC<FeedbackCardProps> = ({ feedback, isLoading, error }) => {
  return (
    <div className="glass-effect rounded-2xl shadow-2xl flex flex-col  border border-white/10 overflow-hidden">
      <div className="p-4 border-b border-white/10 bg-gradient-to-r from-dark-800/50 to-dark-700/50 flex items-center justify-between">
        <div className="flex items-center space-x-3">
            <div className="relative">
                <SparklesIcon className="h-6 w-6 text-white" />
                <div className="absolute inset-0 bg-neon-coral rounded-full blur-sm opacity-30 animate-pulse"></div>
            </div>
            <h2 className="text-lg font-display font-semibold text-white">AI Analysis</h2>
        </div>
        {!isLoading && !error && feedback && <CopyButton textToCopy={feedback} />}
      </div>
      <div className="flex-grow overflow-y-auto">
        {isLoading && !feedback && (
          <div className="flex flex-col items-center justify-center h-full space-y-4">
            <div className="relative">
                <Spinner className="h-12 w-12 text-neon-coral" />
                <div className="absolute inset-0 bg-neon-coral rounded-full blur-lg opacity-20 animate-pulse"></div>
            </div>
            <p className="text-gray-300 font-medium">Analyzing your code...</p>
          </div>
        )}
        {error && (
            <div className="p-6 text-center m-6 rounded-xl bg-red-500/10 border border-red-500/30 backdrop-blur-sm">
                <div className="text-red-400 mb-2">⚠️</div>
                <p className="font-semibold text-red-300 mb-2">Analysis Failed</p>
                <p className="text-red-200 text-sm">{error}</p>
            </div>
        )}
        {!error && feedback && <MarkdownRenderer content={feedback} />}
        {!isLoading && !error && !feedback && <WelcomeMessage />}
      </div>
    </div>
  );
};