<div align="center">

# 🎯 Soc Ops

### Break the ice, make connections, have fun!

**Social Bingo** is an interactive game designed to energize in-person events, team mixers, and networking gatherings. Find people who match the prompts, mark your squares, and race to get five in a row!

[🎮 Play Now](https://junfromc.github.io/social-bingo/) • [📖 Workshop Guide](.lab/GUIDE.md) • [🐛 Report Bug](../../issues)

---

</div>

## ✨ Features

- 🎲 **Randomized Boards** – Every game is unique with shuffled prompts
- 📱 **Mobile-First** – Optimized for phones and tablets at events
- 💾 **Auto-Save Progress** – Never lose your game state
- 🎨 **Clean, Modern UI** – Built with React 19 & Tailwind CSS v4
- ⚡ **Lightning Fast** – Powered by Vite with instant hot reload
- 🎉 **Celebration Effects** – Animated win screen when you get BINGO!
- 🔄 **Reset & Replay** – Start fresh with one tap

## 🎮 How to Play

1. **Start the Game** – Tap "Start Game" to generate your bingo board
2. **Mingle & Match** – Find people who match each prompt (e.g., "has lived in another country")
3. **Mark Your Squares** – Tap a square when you find a match
4. **Get Five in a Row** – Complete any row, column, or diagonal to win!
5. **Celebrate** – Enjoy your BINGO moment! 🎊

> 💡 **Pro Tip**: The center square is always a FREE SPACE to get you started!

## 🚀 Quick Start

### Prerequisites

- [Node.js 22](https://nodejs.org/) or higher

### Installation & Development

```bash
# Clone the repository
git clone https://github.com/junfromc/social-bingo.git
cd social-bingo

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:5173` and start playing! 🎉

### Build for Production

```bash
npm run build
```

The app deploys automatically to GitHub Pages on push to `main`.

## 🎯 Use Cases

- **Team Building** – Energize company mixers and team offsites
- **Conferences & Events** – Break the ice at networking sessions
- **Educational Workshops** – Help participants connect and learn about each other
- **Social Gatherings** – Add excitement to parties and meetups
- **Virtual Events** – Works great on mobile for hybrid gatherings

## 🛠️ Tech Stack

- **[React 19](https://react.dev/)** – Modern UI with concurrent features
- **[TypeScript](https://www.typescriptlang.org/)** – Type-safe development
- **[Tailwind CSS v4](https://tailwindcss.com/)** – Utility-first styling with CSS-first config
- **[Vite](https://vite.dev/)** – Next-generation frontend tooling
- **[Vitest](https://vitest.dev/)** – Blazing fast unit tests
- **[GitHub Pages](https://pages.github.com/)** – Free hosting with CI/CD

## 🎨 Customization

Want to customize the prompts? Edit the questions in [`src/data/questions.ts`](src/data/questions.ts):

```typescript
export const questions: string[] = [
  "bikes to work",
  "has lived in another country",
  "has a pet",
  // Add your own prompts here!
];
```

The game automatically adapts to your custom content!

## 🧪 Development

```bash
# Run linter
npm run lint

# Run tests
npm test

# Build for production
npm run build
```

## 🤝 Contributing

Contributions are welcome! This project was built as part of the [VS Code Agent Lab](https://github.com/microsoft/vscode-agent-lab-soc-ops).

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License – see the [LICENSE](LICENSE) file for details.

## 👤 Author

**Harald Kirschner** ([@digitarald](https://github.com/digitarald))

## 🌟 Acknowledgments

Built with ❤️ as part of the VS Code Agent Lab workshop to demonstrate AI-assisted development workflows.

---

<div align="center">

**[⬆ Back to Top](#-soc-ops)**

Made with 🎯 for bringing people together

</div>
