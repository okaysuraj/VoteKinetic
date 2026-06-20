---
name: Vote Kinetic
description: A high-end, luxury tech design system for Vote Kinetic.
---

# Vote Kinetic Design System

## Brand & Style
This design system embodies a high-end, luxury tech aesthetic inspired by award-winning WebGL portfolios. The brand personality is precise, cinematic, and sophisticated, targeting a high-tier audience that values technical excellence and artistic restraint.
The visual style is a fusion of Dark Minimalism and Atmospheric Tech. It relies on deep obsidian surfaces, extreme typographic contrast, and fluid motion metaphors. Every element is designed to feel like part of a cohesive, high-performance machine. The emotional response should be one of "digital craftsmanship"—an interface that feels premium, intentional, and cutting-edge without being noisy.

## Colors
The palette is anchored in a "Deep Obsidian" dark theme.
- **Primary Accent**: Electric Cyan (`#00F0FF`) is used exclusively for interactive highlights, focus states, and key data points. It should represent less than 5% of the total screen real estate to maintain its impact.
- **Surface Strategy**: Backgrounds utilize `#050505`. Subtle depth is created using `#171717` for containers and atmospheric gradients that transition from charcoal to obsidian.
- **Typography**: Pure White (`#FFFFFF`) provides maximum contrast for headings, while a muted Neutral (`#A3A3A3`) is reserved for secondary metadata and body text to reduce eye strain and establish hierarchy.

### Color Tokens
- surface: '#131313'
- surface-dim: '#131313'
- surface-bright: '#3a3939'
- surface-container-lowest: '#0e0e0e'
- surface-container-low: '#1c1b1b'
- surface-container: '#201f1f'
- surface-container-high: '#2a2a2a'
- surface-container-highest: '#353534'
- on-surface: '#e5e2e1'
- on-surface-variant: '#b9cacb'
- inverse-surface: '#e5e2e1'
- inverse-on-surface: '#313030'
- outline: '#849495'
- outline-variant: '#3b494b'
- surface-tint: '#00dbe9'
- primary: '#dbfcff'
- on-primary: '#00363a'
- primary-container: '#00f0ff'
- on-primary-container: '#006970'
- inverse-primary: '#006970'
- secondary: '#c7c6c6'
- on-secondary: '#2f3131'
- secondary-container: '#484949'
- on-secondary-container: '#b8b8b8'
- tertiary: '#fff5de'
- on-tertiary: '#3b2f00'
- tertiary-container: '#fed639'
- on-tertiary-container: '#715d00'
- error: '#ffb4ab'
- on-error: '#690005'
- error-container: '#93000a'
- on-error-container: '#ffdad6'
- primary-fixed: '#7df4ff'
- primary-fixed-dim: '#00dbe9'
- on-primary-fixed: '#002022'
- on-primary-fixed-variant: '#004f54'
- secondary-fixed: '#e3e2e2'
- secondary-fixed-dim: '#c7c6c6'
- on-secondary-fixed: '#1a1c1c'
- on-secondary-fixed-variant: '#464747'
- tertiary-fixed: '#ffe179'
- tertiary-fixed-dim: '#eac324'
- on-tertiary-fixed: '#231b00'
- on-tertiary-fixed-variant: '#554500'
- background: '#131313'
- on-background: '#e5e2e1'
- surface-variant: '#353534'
- obsidian: '#050505'
- charcoal: '#171717'
- slate-gradient-start: '#1A1A1A'
- pure-white: '#FFFFFF'

## Typography
The typographic system relies on a sharp contrast between a bold, geometric sans-serif for impact and a technical monospaced font for utility.
- **Headlines**: Use Hanken Grotesk. Large display sizes should utilize tight tracking (negative letter spacing) to create a "cinematic" block effect. This is essential for section headers designed to be triggered by scroll animations.
- **Body & Technical Info**: Use JetBrains Mono. This reinforces the "high-end tech" aesthetic, making data and descriptions feel like precision documentation.
- **Scale**: Maintain extreme variance between display type and body type to emphasize luxury and breathing room.

### Type Tokens
- **display-2xl**: fontFamily: Hanken Grotesk, fontSize: 120px, fontWeight: '800', lineHeight: 110px, letterSpacing: -0.05em
- **display-lg**: fontFamily: Hanken Grotesk, fontSize: 72px, fontWeight: '700', lineHeight: 76px, letterSpacing: -0.04em
- **display-lg-mobile**: fontFamily: Hanken Grotesk, fontSize: 48px, fontWeight: '700', lineHeight: 52px, letterSpacing: -0.03em
- **headline-md**: fontFamily: Hanken Grotesk, fontSize: 32px, fontWeight: '600', lineHeight: 40px, letterSpacing: -0.02em
- **body-lg**: fontFamily: JetBrains Mono, fontSize: 18px, fontWeight: '400', lineHeight: 28px, letterSpacing: -0.01em
- **body-sm**: fontFamily: JetBrains Mono, fontSize: 14px, fontWeight: '400', lineHeight: 22px, letterSpacing: 0em
- **label-caps**: fontFamily: JetBrains Mono, fontSize: 12px, fontWeight: '500', lineHeight: 16px, letterSpacing: 0.15em

## Layout & Spacing
The layout follows a Strict Grid Alignment model with a heavy emphasis on asymmetric balance.
- **Grid**: Use a 12-column grid for desktop with wide 32px gutters. Avoid centering content; instead, anchor elements to the left or right grid lines to create a sophisticated, editorial flow.
- **Whitespace**: Implement aggressive vertical spacing (`section-gap`). Each major content block should feel like an individual "scene" in a cinematic sequence.
- **Responsive Behavior**: On mobile, collapse to a 4-column grid. Transitions between sections should be handled via vertical wipes or opacity fades to maintain the WebGL portfolio feel.

### Spacing Tokens
- container-max: 1440px
- gutter: 32px
- margin-desktop: 80px
- margin-mobile: 24px
- section-gap: 160px

## Elevation & Depth
Depth is achieved through Tonal Layers and Atmospheric Blurs rather than traditional drop shadows.
- **Layering**: Backgrounds are `#050505`. Elevated components (like cards or modals) use a `#171717` fill with a very subtle 1px border in `#FFFFFF` at 10% opacity.
- **Glassmorphism**: Use backdrop filters (blur) for navigation bars and overlays to create a "frosted obsidian" effect.
- **Interactive Depth**: When an element is hovered, use a subtle glow effect using the Electric Cyan accent, but keep the spread tight and the opacity low (e.g., `0px 0px 20px rgba(0, 240, 255, 0.2)`).

## Shapes
The design system utilizes Sharp (0px) corners across all primary components. This reinforces a technical, architectural, and uncompromising luxury feel.
Avoid rounded corners on buttons, inputs, and cards. The only exception is for circular icon containers or specialized UI tokens that require a distinct "node" appearance.

## Components
- **Buttons**: Rectangular with 0px radius. Primary buttons feature a Ghost style with a 1px `#FFFFFF` border that fills with `#FFFFFF` on hover (text flips to `#050505`). Use the Electric Cyan for "Active" or "Success" states only.
- **Input Fields**: Minimalist underlines or 1px borders in `#A3A3A3`. Focus state transitions the border to Electric Cyan with a sharp, immediate animation.
- **Cards**: No background by default; defined by 1px borders at low opacity. Content inside cards should follow the monospaced body scale.
- **Navigation**: A minimalist fixed header. Use "Label-Caps" typography for nav links. Include a custom "magnetic" cursor interaction for menu items.
- **Scroll Indicators**: Use a thin, vertical Electric Cyan line at the bottom of the viewport that pulses or grows to indicate scroll-triggered transitions.
- **Chips/Tags**: Monospaced text inside a subtle charcoal (`#171717`) box with 0px roundedness.
