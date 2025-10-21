import React, { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import vscDarkPlus from 'react-syntax-highlighter/dist/esm/styles/prism/vsc-dark-plus';
import { ClipboardIcon } from './icons/ClipboardIcon';
import { CheckIcon } from './icons/CheckIcon';
import { LightBulbIcon } from './icons/LightBulbIcon';
import { DownloadIcon } from './icons/DownloadIcon';
import { LANGUAGES } from '../constants';

interface OptimalCodeCardProps {
    code: string;
    language: string;
    isLoading: boolean;
}

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
            title="Copy code"
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

const ExportButton: React.FC<{ code: string; language: string }> = ({ code, language }) => {
    const handleExport = () => {
        const selectedLanguage = LANGUAGES.find(lang => lang.value === language);
        const fileExtension = selectedLanguage?.fileExtension || '.txt';
        const filename = `optimal-code${fileExtension}`;

        const blob = new Blob([code], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    return (
        <button
            onClick={handleExport}
            disabled={!code}
            title="Export as file"
            className="flex items-center space-x-2 text-sm px-4 py-2 rounded-lg transition-all duration-200 bg-white/10 hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed border border-white/20 hover:border-white/30"
        >
            <DownloadIcon className="h-4 w-4 text-gray-300" />
            <span className="text-gray-300 font-medium">Export</span>
        </button>
    );
};


const EmptyOptimalCodeState: React.FC = () => (
    <div className="glass-effect rounded-2xl shadow-2xl flex flex-col flex-shrink-0 border border-white/10 overflow-hidden" style={{ height: '250px' }}>
        <div className="p-4 border-b border-white/10 bg-gradient-to-r from-dark-800/50 to-dark-700/50 flex items-center justify-between">
            <div className="flex items-center space-x-3">
                <div className="relative">
                    <LightBulbIcon className="h-6 w-6 text-white" />
                    <div className="absolute inset-0 bg-neon-yellow rounded-full blur-sm opacity-30 animate-pulse"></div>
                </div>
                <h2 className="text-lg font-display font-semibold text-white">Optimized Code</h2>
            </div>
        </div>
        <div className="flex-grow flex items-center justify-center">
            <div className="text-center text-gray-500">
                <LightBulbIcon className="h-12 w-12 mx-auto mb-3 opacity-50" />
                <p className="text-sm">Optimized code will appear here</p>
                <p className="text-xs mt-1 opacity-75">After AI analysis completes</p>
            </div>
        </div>
    </div>
);

export const OptimalCodeCard: React.FC<OptimalCodeCardProps> = ({ code, language, isLoading }) => {
    if (isLoading) {
        return (
            <div className="glass-effect rounded-2xl shadow-2xl flex flex-col flex-shrink-0 border border-white/10 overflow-hidden" style={{ height: '250px' }}>
                <div className="p-4 border-b border-white/10 bg-gradient-to-r from-dark-800/50 to-dark-700/50 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <div className="relative">
                            <LightBulbIcon className="h-6 w-6 text-white" />
                            <div className="absolute inset-0 bg-neon-yellow rounded-full blur-sm opacity-30 animate-pulse"></div>
                        </div>
                        <h2 className="text-lg font-display font-semibold text-white">Optimized Code</h2>
                    </div>
                </div>
                <div className="flex-grow flex items-center justify-center">
                    <div className="text-center">
                        <div className="animate-spin h-8 w-8 border-2 border-neon-coral border-t-transparent rounded-full mx-auto mb-3"></div>
                        <p className="text-gray-300">Generating optimized code...</p>
                    </div>
                </div>
            </div>
        );
    }
    
    if (!code) {
        return <EmptyOptimalCodeState />;
    }

    return (
        <div className="glass-effect rounded-2xl shadow-2xl flex flex-col ">
            <div className="p-4 border-b border-white/10 bg-gradient-to-r from-dark-800/50 to-dark-700/50 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                    <div className="relative">
                        <LightBulbIcon className="h-6 w-6 text-white" />
                        <div className="absolute inset-0 bg-neon-yellow rounded-full blur-sm opacity-30 animate-pulse"></div>
                    </div>
                    <h2 className="text-lg font-display font-semibold text-white">Optimized Code</h2>
                </div>
                <div className="flex items-center space-x-3">
                    <ExportButton code={code} language={language} />
                    <CopyButton textToCopy={code} />
                </div>
            </div>
            <div className="flex-grow overflow-y-auto bg-dark-900/30">
                 <SyntaxHighlighter
                    children={String(code).replace(/\n$/, '')}
                    style={vscDarkPlus}
                    language={language}
                    PreTag="div"
                    customStyle={{
                        background: 'transparent',
                        padding: '1.5rem',
                        height: '100%',
                        fontFamily: 'JetBrains Mono, Fira Code, monospace'
                    }}
                    codeTagProps={{
                        style: {
                            fontFamily: 'JetBrains Mono, Fira Code, monospace'
                        }
                    }}
                />
            </div>
        </div>
    );
};