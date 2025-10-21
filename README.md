# Xalora - AI Code Excellence Platform ✨

A stunning, modern React application that harnesses Groq's powerful LLM to provide intelligent code review and optimization. Experience the future of code analysis with our sleek, glassmorphic interface and lightning-fast AI insights.

## 🎨 New Design Features

- **Glassmorphic UI**: Beautiful translucent panels with backdrop blur effects
- **Vibrant Gradients**: Purple, cyan, and green color scheme (no typical AI blues!)
- **Animated Backgrounds**: Floating gradient orbs and smooth transitions
- **Modern Typography**: JetBrains Mono for code, Poppins for headings
- **Neon Accents**: Subtle glowing effects and interactive elements

## ✨ Core Features

- **🤖 AI-Powered Analysis**: Advanced code review using Groq's Llama 3.3 70B model
- **⚡ Lightning Fast**: Groq's inference speed delivers results in seconds
- **🚀 Code Optimization**: Intelligent suggestions for performance improvements
- **🌈 Multi-language Support**: JavaScript, TypeScript, Python, Java, C#, Go, Rust, Ruby, HTML, CSS, SQL, PHP, C++, C, JSON, XML, YAML
- **💎 Professional Editor**: Monaco Editor with custom theming and file upload
- **📱 Responsive Design**: Seamless experience across all devices
- **📋 Smart Export**: Copy and download optimized code
- **🎨 Modern UI**: Glassmorphic design with coral and orange gradients

## 🚀 Quick Start

**Prerequisites:** Node.js 16+

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Ravi62026/gemini-code-reviewer.git
   cd gemini-code-reviewer
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up your API key:**
   - Copy `.env.example` to `.env`:
     ```bash
     cp .env.example .env
     ```
   - Get your free Groq API key from: https://console.groq.com/keys
   - Add it to `.env`:
     ```
     VITE_GROQ_API_KEY=your_groq_api_key_here
     ```

4. **Launch the app:**
   ```bash
   npm run dev
   ```

5. **Open** `http://localhost:5173` and start reviewing code!

## 🛠️ Tech Stack

- **Frontend**: React 19 + TypeScript
- **Styling**: Tailwind CSS with custom design system  
- **Code Editor**: Monaco Editor
- **AI Model**: Groq (Llama 3.3 70B Versatile)
- **Build Tool**: Vite
- **Deployment**: Vercel

## 🚀 Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Add environment variable:
   - `VITE_GROQ_API_KEY` = your Groq API key
4. Deploy!

## 📝 Environment Variables

Create a `.env` file in the root directory:

```env
VITE_GROQ_API_KEY=your_groq_api_key_here
```

**Note:** Never commit your `.env` file to version control. Use `.env.example` as a template.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

MIT License - feel free to use this project for your own purposes!
