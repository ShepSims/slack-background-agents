# Vision Pro Mini Games

A collection of immersive mini games designed specifically for Apple Vision Pro, featuring glassmorphism UI, 3D effects, and spatial computing interactions.

## 🎮 Games Included

- **Tic Tac Toe** - Classic strategy game with 3D spatial effects
- **Memory Cards** - Test your memory with animated card flipping
- **Snake 3D** - Navigate through dimensional space with enhanced visuals
- **Slide Puzzle** - Solve spatial puzzles with smooth animations

## ✨ Features

- **Vision Pro Optimized**: Designed for Apple Vision Pro with Safari compatibility
- **Immersive UI**: Glassmorphism design with backdrop blur effects
- **3D Effects**: Spatial depth and perspective transformations
- **Smooth Animations**: 60fps gameplay with fluid transitions
- **Touch Controls**: Optimized for gesture-based interactions
- **Responsive Design**: Works across different screen sizes
- **Particle Effects**: Dynamic background animations

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd vision-pro-mini-games
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### For Vision Pro

1. Open Safari on your Apple Vision Pro
2. Navigate to your local development server or deployed URL
3. Enjoy the immersive gaming experience!

## 🛠️ Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom glassmorphism utilities
- **UI Effects**: Custom CSS animations and 3D transforms
- **Optimization**: Apple Vision Pro specific meta tags and viewport settings

## 🎨 Design Features

- **Glassmorphism**: Frosted glass effects with backdrop blur
- **3D Transforms**: Perspective and rotation effects
- **Particle System**: Dynamic floating particles
- **Gradient Backgrounds**: Radial gradients for depth
- **Smooth Transitions**: Hardware-accelerated animations
- **Spatial Audio Ready**: Prepared for future audio enhancements

## 🔧 Development

### Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout with Vision Pro optimization
│   ├── page.tsx            # Main game selection screen
│   └── globals.css         # Global styles and glassmorphism utilities
├── components/
│   ├── games/
│   │   ├── TicTacToe.tsx   # Tic Tac Toe game component
│   │   ├── MemoryGame.tsx  # Memory card game component
│   │   ├── Snake.tsx       # Snake game component
│   │   └── Puzzle.tsx      # Sliding puzzle game component
│   └── ui/
│       └── ParticleBackground.tsx  # Particle animation system
```

### Custom CSS Classes

- `.glass` - Glassmorphism effect with backdrop blur
- `.glass-hover` - Interactive glass effect on hover
- `.game-card` - Game selection card styling
- `.glow-button` - Glowing button with shimmer effect
- `.float-animation` - Floating animation for UI elements
- `.transform-3d` - 3D transform utilities

## 🌟 Vision Pro Optimizations

- **Viewport Settings**: Optimized for spatial computing
- **Meta Tags**: Apple-specific web app capabilities
- **Touch Targets**: Appropriately sized for Vision Pro interactions
- **Performance**: Optimized for smooth 60fps rendering
- **Accessibility**: High contrast and readable text
- **Gesture Support**: Ready for future gesture API integration

## 📱 Browser Support

- **Primary**: Safari on Apple Vision Pro
- **Secondary**: Modern browsers with WebKit support
- **Fallbacks**: Graceful degradation for older browsers

## 🚀 Deployment

### Vercel (Recommended)

```bash
npx vercel
```

### Build for Production

```bash
npm run build
npm start
```

## 🎯 Future Enhancements

- [ ] Spatial audio integration
- [ ] Hand tracking support
- [ ] Multiplayer capabilities
- [ ] More game variations
- [ ] Achievement system
- [ ] Leaderboards
- [ ] Voice commands
- [ ] Haptic feedback integration

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

For questions or support, please open an issue in the GitHub repository.

---

Built with ❤️ for Apple Vision Pro spatial computing experiences.
