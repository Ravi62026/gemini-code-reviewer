import React, { useRef, useEffect, useState } from 'react';
import { LANGUAGES } from '../constants';
import { Spinner } from './Spinner';
import { XCircleIcon } from './icons/XCircleIcon';
import { UploadIcon } from './icons/UploadIcon';
import Editor from '@monaco-editor/react';

interface CodeEditorProps {
  code: string;
  setCode: (code: string) => void;
  language: string;
  setLanguage: (language: string) => void;
  onReview: () => void;
}

export const CodeEditor: React.FC<CodeEditorProps> = ({
  code,
  setCode,
  language,
  setLanguage,
  onReview,
}) => {
  const editorRef = useRef<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragOver, setIsDragOver] = useState(false);

  const handleEditorDidMount = (editor: any) => {
    editorRef.current = editor;
    
    // Wait for fonts to load, then force layout recalculation
    const checkFontsAndLayout = () => {
      if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(() => {
          setTimeout(() => {
            editor.layout();
            editor.render(true);
          }, 50);
        });
      } else {
        // Fallback for browsers without font loading API
        setTimeout(() => {
          editor.layout();
          editor.render(true);
        }, 200);
      }
    };
    
    checkFontsAndLayout();
  };

  useEffect(() => {
    // Recalculate layout when language changes
    if (editorRef.current) {
      setTimeout(() => {
        editorRef.current.layout();
      }, 50);
    }
  }, [language]);

  // Auto-detect language from file extension
  const detectLanguageFromFilename = (filename: string): string => {
    const extension = filename.split('.').pop()?.toLowerCase();
    const langMap: { [key: string]: string } = {
      'js': 'javascript',
      'jsx': 'javascript',
      'ts': 'typescript',
      'tsx': 'typescript',
      'py': 'python',
      'java': 'java',
      'cs': 'csharp',
      'go': 'go',
      'rs': 'rust',
      'rb': 'ruby',
      'html': 'html',
      'css': 'css',
      'sql': 'sql',
      'php': 'php',
      'cpp': 'cpp',
      'c': 'c',
      'json': 'json',
      'xml': 'xml',
      'yaml': 'yaml',
      'yml': 'yaml',
    };
    return langMap[extension || ''] || language;
  };

  // Handle file reading
  const handleFileRead = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      setCode(content);
      
      // Auto-detect and set language
      const detectedLanguage = detectLanguageFromFilename(file.name);
      setLanguage(detectedLanguage);
    };
    reader.readAsText(file);
  };

  // Handle file input change
  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileRead(file);
    }
    // Reset input value to allow selecting the same file again
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Handle file upload button click
  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  // Handle drag and drop
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    const file = files[0];
    
    if (file && file.type.startsWith('text/') || file.name.match(/\.(js|jsx|ts|tsx|py|java|cs|go|rs|rb|html|css|sql|php|cpp|c|json|xml|yaml|yml)$/i)) {
      handleFileRead(file);
    }
  };

  return (
    <div className="glass-effect rounded-2xl shadow-2xl flex flex-col h-full border border-white/10 overflow-hidden">
      <div className="flex justify-between items-center p-4 border-b border-white/10 bg-gradient-to-r from-dark-800/50 to-dark-700/50">
        <div className="flex items-center space-x-3">
          <div className="flex space-x-1.5">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          </div>
          <h2 className="text-lg font-display font-semibold text-white">Code Editor</h2>
        </div>
        <div className="flex items-center space-x-3 relative">
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="bg-dark-800/80 text-white border border-white/20 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-neon-coral/50 focus:border-neon-coral/50 backdrop-blur-sm"
            aria-label="Select language"
          >
            {LANGUAGES.map((lang) => (
              <option key={lang.value} value={lang.value} className="bg-dark-800">
                {lang.label}
              </option>
            ))}
          </select>
          
          <input
            ref={fileInputRef}
            type="file"
            accept=".js,.jsx,.ts,.tsx,.py,.java,.cs,.go,.rs,.rb,.html,.css,.sql,.php,.cpp,.c,.json,.xml,.yaml,.yml,.txt"
            onChange={handleFileInputChange}
            className="hidden"
            aria-label="Upload file"
          />
          
          <div className="relative">
            <button
              onClick={handleUploadClick}
              className="text-gray-400 hover:text-white transition-all duration-200 p-2 rounded-lg hover:bg-white/10 relative group"
              title="Upload file"
              aria-label="Upload file"
            >
              <UploadIcon className="h-5 w-5" />
              <div className="absolute -top-10 right-0 bg-dark-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 border border-white/20">
                Upload File
                <div className="absolute top-full right-2 w-0 h-0 border-l-2 border-r-2 border-t-2 border-transparent border-t-dark-800"></div>
              </div>
            </button>
          </div>
          
          <div className="relative">
            <button
              onClick={() => setCode('')}
              className="text-gray-400 hover:text-white transition-all duration-200 p-2 rounded-lg hover:bg-white/10 relative group"
              title="Clear code"
              aria-label="Clear code"
            >
              <XCircleIcon className="h-5 w-5" />
              <div className="absolute -top-10 right-0 bg-dark-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 border border-white/20">
                Clear Code
                <div className="absolute top-full right-2 w-0 h-0 border-l-2 border-r-2 border-t-2 border-transparent border-t-dark-800"></div>
              </div>
            </button>
          </div>
        </div>
      </div>
      
      <div 
        className={`flex-grow relative ${isDragOver ? 'bg-neon-coral/10 border-2 border-dashed border-neon-coral' : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {isDragOver && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-dark-900/80 backdrop-blur-sm">
            <div className="text-center">
              <UploadIcon className="h-16 w-16 text-neon-coral mx-auto mb-4 animate-bounce" />
              <p className="text-white text-lg font-semibold">Drop your file here</p>
              <p className="text-gray-300 text-sm mt-2">Supports: JS, TS, Python, Java, and more</p>
            </div>
          </div>
        )}
        
        {!code && !isDragOver && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="text-center text-gray-500">
              <UploadIcon className="h-12 w-12 mx-auto mb-3 opacity-50" />
              <p className="text-sm">Start typing, paste code, or drag & drop a file</p>
              <p className="text-xs mt-1 opacity-75">Supports JS, TS, Python, Java, and more</p>
            </div>
          </div>
        )}
        
        <Editor
          height="100%"
          language={language}
          value={code}
          onChange={(value) => setCode(value || '')}
          onMount={handleEditorDidMount}
          theme="vs-dark"
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            fontFamily: 'JetBrains Mono, Fira Code, Consolas, Monaco, monospace',
            wordWrap: 'on',
            scrollBeyondLastLine: false,
            automaticLayout: true,
            padding: { top: 16, bottom: 16 },
            lineNumbers: 'on',
            renderLineHighlight: 'all',
            cursorBlinking: 'smooth',
            smoothScrolling: true,
            fontLigatures: false,
            disableLayerHinting: true,
            roundedSelection: false,
            mouseWheelZoom: false,
            contextmenu: true,
            selectOnLineNumbers: true,
            glyphMargin: false,
            folding: true,
            foldingStrategy: 'indentation',
            showFoldingControls: 'mouseover',
            matchBrackets: 'always',
            renderWhitespace: 'none',
            renderControlCharacters: false,
            fontWeight: 'normal',
            letterSpacing: 0,
            lineHeight: 1.5,
          }}
        />
      </div>
      
      <div className="p-4 border-t border-white/10 bg-gradient-to-r from-dark-800/30 to-dark-700/30">
        <button
          onClick={onReview}
          className="w-full relative overflow-hidden bg-gradient-to-r from-neon-coral to-neon-orange hover:from-neon-coral/80 hover:to-neon-orange/80 text-white font-bold py-4 px-6 rounded-xl flex items-center justify-center transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
          <div className="relative flex items-center">
            <span className="font-display text-lg">✨ Review Code</span>
          </div>
        </button>
      </div>
    </div>
  );
};