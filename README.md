# 🧠 Cerebras Studio

> **AI-Powered Creative Platform with Ultra-Fast Inference**

Experience the world's fastest AI content generation with Cerebras Studio - a premium creative platform powered by Cerebras Wafer-Scale Engine technology, delivering up to 1,800 tokens per second.

## ✨ Features

- **🚀 Ultra-Fast AI Inference** - 1,800 tokens/second with Llama models
- **🔐 Secure API Key Management** - Persistent storage with localStorage
- **🎨 Creative Platforms** - Text, Code, Document AI, and Creative Writing
- **🌙 Modern UI** - Dark/Light themes with smooth animations
- **💾 Auto-Save Settings** - Theme and API key preferences persist
- **📱 Progressive Web App** - Works on all devices
- **⚡ Real-Time Generation** - Instant AI responses with visual feedback
- **🔧 Production Ready** - Comprehensive fixes and optimizations

## 🚀 Quick Start

1. **Clone and Install**
   ```bash
   git clone https://github.com/rajshah9305/CereStudioAI.git
   cd CereStudioAI
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm run dev
   ```

3. **Configure API Key**
   - Open [http://localhost:3000](http://localhost:3000)
   - Click the settings gear icon (top right)
   - Enter your Cerebras API key from [cerebras.ai](https://cerebras.ai)
   - Click "Save Key" - it will be stored locally

4. **Deploy to Vercel**
   ```bash
   vercel
   # Add CEREBRAS_API_KEY to Vercel environment variables
   ```

## 📦 Tech Stack

- **Next.js 14** - React framework (stable version)
- **React 18** - UI library (compatible version)
- **TypeScript 5** - Type safety
- **Tailwind CSS** - Modern styling
- **Cerebras API** - Direct integration for ultra-fast inference
- **Lucide React** - Beautiful icons
- **Framer Motion** - Smooth animations

## 🛠️ Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript checks

# Quick Fixes (if needed)
chmod +x quick-fix.sh && ./quick-fix.sh           # Quick dependency fixes
chmod +x comprehensive-fix.sh && ./comprehensive-fix.sh  # Complete rebuild
```

## 🔧 Troubleshooting

If you encounter any issues:

1. **Dependency Conflicts**: Run the quick-fix script
   ```bash
   chmod +x quick-fix.sh && ./quick-fix.sh
   ```

2. **Complete Reset**: Run the comprehensive fix
   ```bash
   chmod +x comprehensive-fix.sh && ./comprehensive-fix.sh
   ```

3. **Build Issues**: Check that all dependencies are compatible
   ```bash
   npm run build
   ```

## 🔧 Configuration

### API Key Setup
1. Get your free Cerebras API key at [cerebras.ai](https://cerebras.ai)
2. In the app, click the settings gear icon
3. Enter your API key and click "Save Key"
4. The key is stored locally in your browser

### Environment Variables (Optional)
You can also set the API key as an environment variable:
```bash
CEREBRAS_API_KEY=your_api_key_here
```

## 🚀 Deployment

### Vercel (Recommended)
```bash
vercel
# Add CEREBRAS_API_KEY to environment variables in Vercel dashboard
```

### Other Platforms
The app works on any platform that supports Next.js:
- Netlify
- Railway
- Render
- AWS Amplify

## 📊 Performance

- **Speed**: Up to 1,800 tokens/second
- **Context**: 128K tokens
- **Precision**: 16-bit
- **Efficiency**: 20x faster than traditional GPUs

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

---

**Built with ❤️ using Cerebras ultra-fast AI inference**
