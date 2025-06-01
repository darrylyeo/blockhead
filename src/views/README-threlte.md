# Blockchain Visualization

## Overview
The Blockchain Visualization is an interactive 3D visualization built with Threlte (Three.js for Svelte) that displays blockchain activity in real-time. It's integrated at the layout level, appearing as an ambient visualization at the top of every page.

## Features
- **Site-wide Integration**: Visualization appears on every page as part of the layout
- **Toggle Control**: Users can show/hide the visualization with a button
- **Compact Mode**: Optimized for layout-level display with minimal visual footprint
- **Real-time Updates**: Automatically streams new blockchain data
- **Multi-chain Support**: Adapts to different blockchain networks
- **Responsive Design**: Adjusts height and complexity based on screen size

## Implementation

### Layout Integration
The visualization is embedded in `/src/routes/+layout.svelte`:
- Fixed position at the top of the viewport
- Semi-transparent overlay with gradient fade
- Toggle button for user control
- Preserves main content flow

### Compact Mode
When used in the layout, the visualization runs in compact mode:
- Shows only blocks (no transactions/contracts)
- Reduced entity count and size
- Disabled user interaction
- Faster update cycle
- Lower opacity for subtlety

## Components

### Stage.svelte
Main 3D scene component with two modes:
- **Full Mode**: Complete visualization with all entity types and interactions
- **Compact Mode**: Simplified visualization for layout integration

### Properties
- `chainId`: The blockchain network to visualize (default: 1 for Ethereum)
- `compact`: Boolean flag for compact mode (default: false)

## Visual Design
- **Blocks**: Green cubes flowing along the timeline
- **Position**: X-axis represents time progression
- **Size**: Reflects transaction count in blocks
- **Animation**: Continuous flow from right to left
- **Background**: Dark gradient overlay for contrast

## Performance
The compact mode is optimized for performance:
- Fewer entities rendered
- Simplified geometry
- No interaction handlers
- Longer update intervals
- GPU-efficient transparency

## User Experience
- Non-intrusive: Adds visual interest without disrupting content
- Optional: Users can hide if they prefer a cleaner interface
- Persistent: Toggle state could be saved to localStorage (not yet implemented)
- Accessible: Visualization is purely decorative, no critical information

## Future Enhancements
- Connect to real blockchain data via GraphQL
- Chain-specific color themes
- Activity intensity indicators
- Sound effects for new blocks
- Customizable visualization preferences
- Performance metrics display

## Dependencies
- `@threlte/core`: Core Threlte library
- `@threlte/extras`: Additional components (Grid, Text, OrbitControls)
- `three`: Three.js library
- `svelte/motion`: For smooth animations

## Development
To modify the visualization:
1. Edit `src/components/Stage.svelte`
2. Adjust compact mode settings for layout display
3. Test performance across different devices
4. Ensure it doesn't interfere with page content 