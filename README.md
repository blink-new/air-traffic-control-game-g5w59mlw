# 🛩️ Air Traffic Control Simulator Game

A realistic web-based air traffic control simulation where players manage aircraft in an airspace by issuing commands to automated pilots. Direct planes safely and efficiently while avoiding collisions and maintaining proper flight paths.

![Air Traffic Control Game](https://img.shields.io/badge/Game-Air%20Traffic%20Control-blue) ![React](https://img.shields.io/badge/React-19.1.0-blue) ![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-blue) ![Tailwind](https://img.shields.io/badge/Tailwind-3.3.5-blue)

## 🎮 Game Overview

Take on the role of an air traffic controller managing a busy airspace. Your mission is to safely guide aircraft through your sector by issuing precise commands to automated pilots. Each aircraft follows realistic flight physics and responds to your instructions for altitude, heading, and speed changes.

### 🎯 Objectives
- **Safety First**: Prevent aircraft collisions by maintaining proper separation
- **Efficiency**: Manage multiple aircraft simultaneously to maximize your score
- **Precision**: Issue accurate commands for smooth traffic flow
- **Vigilance**: Monitor aircraft status and respond to changing conditions

## ✨ Key Features

### 🎛️ Realistic Air Traffic Control Interface
- **Radar Display**: Circular radar screen with aircraft icons, compass directions, and range rings
- **Flight Strips**: Traditional ATC flight progress strips showing aircraft details
- **Control Panel**: Professional command interface for issuing instructions
- **Game Header**: Real-time scoring, collision tracking, and game controls

### ✈️ Aircraft Management
- **Multiple Aircraft Types**: Commercial airliners, cargo planes, and private aircraft
- **Realistic Call Signs**: Authentic airline codes (UAL123, DAL456, etc.)
- **Flight Physics**: Aircraft gradually adjust to commanded parameters
- **Status Tracking**: Monitor enroute, approach, departure, and holding patterns

### 🎮 Interactive Controls
- **Click-to-Select**: Click any aircraft on radar to select and command
- **Command Panel**: Issue precise altitude, heading, and speed instructions
- **Quick Commands**: One-click buttons for common maneuvers
- **Real-time Feedback**: Visual indicators show aircraft responding to commands

### 📊 Performance Tracking
- **Dynamic Scoring**: Points awarded based on aircraft successfully managed
- **Collision Detection**: Advanced proximity and altitude separation monitoring
- **Game Timer**: Track your session duration
- **Safety Record**: Monitor collision count for performance evaluation

## 🚀 Getting Started

### Prerequisites
- **Node.js** (version 18 or higher)
- **npm** or **yarn** package manager
- Modern web browser with JavaScript enabled

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/air-traffic-control-game.git
   cd air-traffic-control-game
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000` to start playing!

### Alternative: Quick Start
```bash
# One-line setup
git clone https://github.com/your-username/air-traffic-control-game.git && cd air-traffic-control-game && npm install && npm run dev
```

## 🎮 How to Play

### Basic Controls

1. **Start the Game**
   - Click the "Start Game" button to begin
   - Aircraft will automatically spawn and enter your airspace

2. **Select Aircraft**
   - Click on any aircraft icon on the radar display
   - Selected aircraft will be highlighted in accent color
   - Aircraft details appear in the control panel

3. **Issue Commands**
   - **Altitude**: Set target altitude (1,000 - 40,000 feet)
   - **Heading**: Set target direction (0 - 360 degrees)
   - **Speed**: Set target speed (100 - 600 knots)

4. **Monitor Progress**
   - Watch aircraft gradually adjust to your commands
   - Use flight strips to track multiple aircraft status
   - Monitor separation to prevent collisions

### Advanced Techniques

#### Collision Avoidance
- Maintain **3+ nautical miles** horizontal separation
- Ensure **1,000+ feet** vertical separation between aircraft
- Use altitude changes for quick separation adjustments
- Plan ahead for crossing traffic patterns

#### Efficient Traffic Management
- **Vectoring**: Use heading changes to create efficient flight paths
- **Speed Control**: Adjust aircraft speed to manage spacing
- **Altitude Stacking**: Use different flight levels to separate traffic
- **Flow Management**: Sequence aircraft for optimal throughput

#### Quick Commands
- **Climb/Descend 2000ft**: Rapid altitude adjustments
- **Turn Left/Right 90°**: Standard vectoring maneuvers
- **Emergency Separation**: Quick commands for collision avoidance

## 🏗️ Technical Architecture

### Technology Stack
- **Frontend**: React 19.1.0 with TypeScript
- **Styling**: Tailwind CSS with custom radar styling
- **UI Components**: Radix UI primitives with shadcn/ui
- **Icons**: Lucide React icon library
- **Build Tool**: Vite for fast development and building

### Project Structure
```
src/
├── components/           # React components
│   ├── ui/              # Reusable UI components
│   ├── RadarDisplay.tsx # Main radar screen
│   ├── ControlPanel.tsx # Aircraft command interface
│   ├── FlightStrip.tsx  # Flight progress strips
│   └── GameHeader.tsx   # Game status and controls
├── hooks/
│   └── useGameLogic.ts  # Core game logic and state
├── types/
│   └── game.ts          # TypeScript interfaces
└── App.tsx              # Main application component
```

### Core Components

#### `useGameLogic` Hook
Central game state management handling:
- Aircraft spawning and movement physics
- Command processing and aircraft AI
- Collision detection algorithms
- Score calculation and game timing

#### `RadarDisplay` Component
- Circular radar visualization with range rings
- Aircraft positioning and rotation based on heading
- Click-to-select aircraft interaction
- Animated radar sweep effect

#### `ControlPanel` Component
- Aircraft selection and status display
- Command input forms with validation
- Quick command buttons for common maneuvers
- Real-time feedback on issued commands

#### `FlightStrip` Component
- Traditional ATC flight progress strips
- Aircraft status and trend indicators
- Compact aircraft information display
- Selection synchronization with radar

## 🎯 Game Mechanics

### Aircraft Behavior
- **Realistic Physics**: Aircraft gradually adjust to commanded parameters
- **Turn Rates**: Heading changes at realistic 2°/second maximum
- **Climb/Descent**: Altitude changes at 100 feet/second
- **Speed Changes**: Acceleration/deceleration at 5 knots/second

### Scoring System
- **Base Score**: Points awarded continuously for each aircraft managed
- **Efficiency Bonus**: Higher scores for managing more aircraft simultaneously
- **Safety Penalty**: Score reduction for collisions and safety violations

### Collision Detection
- **Horizontal Separation**: Minimum 3 nautical miles between aircraft
- **Vertical Separation**: Minimum 1,000 feet altitude difference
- **Real-time Monitoring**: Continuous proximity checking with warnings

### Aircraft Types
- **Commercial**: Large passenger aircraft (Boeing 737, Airbus A320)
- **Cargo**: Freight aircraft with different performance characteristics
- **Private**: Smaller general aviation aircraft with unique handling

## 🛠️ Development

### Available Scripts
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint and Stylelint
npm run lint:js      # Run JavaScript/TypeScript linting
npm run lint:css     # Run CSS linting
```

### Code Quality
- **TypeScript**: Full type safety with strict configuration
- **ESLint**: JavaScript/TypeScript code quality enforcement
- **Stylelint**: CSS code quality and consistency
- **Prettier**: Automatic code formatting

### Adding New Features

#### New Aircraft Types
1. Add type to `Aircraft['type']` union in `types/game.ts`
2. Update `generateRandomAircraft` function in `useGameLogic.ts`
3. Add icon mapping in `RadarDisplay.tsx`

#### New Commands
1. Add command type to `Command['type']` union
2. Implement command handling in `issueCommand` function
3. Add UI controls in `ControlPanel.tsx`

#### Enhanced AI
1. Modify `updateAircraft` function for new behaviors
2. Add new aircraft properties for advanced features
3. Implement weather, traffic patterns, or emergency scenarios

## 🎨 Customization

### Styling
- **Radar Theme**: Modify radar colors and styling in `RadarDisplay.tsx`
- **UI Theme**: Customize component themes in `tailwind.config.cjs`
- **Aircraft Icons**: Replace Lucide icons with custom aircraft symbols

### Game Parameters
- **Difficulty**: Adjust aircraft spawn rates and complexity
- **Airspace Size**: Modify radar bounds and aircraft limits
- **Realism**: Tune aircraft physics and response times

## 🐛 Troubleshooting

### Common Issues

#### Aircraft Not Responding
- **Check Selection**: Ensure aircraft is properly selected (highlighted)
- **Valid Commands**: Verify command values are within acceptable ranges
- **Game State**: Confirm game is running (not paused)

#### Performance Issues
- **Browser Compatibility**: Use modern browser with hardware acceleration
- **Memory Usage**: Refresh page if experiencing slowdowns after extended play
- **Screen Size**: Optimize for desktop viewing (minimum 1024px width)

#### Visual Glitches
- **Radar Display**: Refresh if aircraft icons become misaligned
- **UI Components**: Check browser zoom level (100% recommended)
- **Animations**: Disable animations if experiencing performance issues

## 🤝 Contributing

We welcome contributions! Please follow these guidelines:

1. **Fork the repository** and create a feature branch
2. **Follow TypeScript** best practices and maintain type safety
3. **Test thoroughly** across different browsers and screen sizes
4. **Document changes** in code comments and README updates
5. **Submit pull request** with clear description of changes

### Development Setup
```bash
git clone https://github.com/your-username/air-traffic-control-game.git
cd air-traffic-control-game
npm install
npm run dev
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Real ATC Procedures**: Inspired by actual air traffic control operations
- **Aviation Community**: Thanks to pilots and controllers for domain expertise
- **Open Source**: Built with amazing open-source libraries and tools

## 🔗 Links

- **Live Demo**: [Play the Game](https://your-game-url.com)
- **Documentation**: [Full API Docs](https://docs.your-game-url.com)
- **Issues**: [Report Bugs](https://github.com/your-username/air-traffic-control-game/issues)
- **Discussions**: [Community Forum](https://github.com/your-username/air-traffic-control-game/discussions)

---

**Ready for takeoff?** 🛫 Start managing your airspace and become the ultimate air traffic controller!