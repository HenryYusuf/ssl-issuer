# Design System: Electric Cobalt (V1)

A precise, technical design system optimized for high-performance dashboards, developer tools, and portfolios. It balances "hacker-chic" terminal aesthetics with sophisticated high-end typography.

## 1. Visual Philosophy
- **Precision:** Use of hairline borders (1.5px gaps, 1px borders) and grid-based alignment.
- **Brutalism:** Lean on system fonts (Monospace) and terminal metaphors (prompts, cursors).
- **Depth:** Layered surfaces using subtle glassmorphism (blur) and noise overlays instead of heavy shadows.
- **Electric Utility:** High-contrast accents used sparingly for "glowing" interactive states.

## 2. Foundation (Design Tokens)
To use this in other apps, implement these CSS variables in your global stylesheet:

### Typography
- **Display:** `Syne` (Bold/Extrabold). Fallback: `system-ui`.
- **UI/Body/Mono:** `JetBrains Mono`. Fallback: `SF Mono`, `Fira Code`, `monospace`.

### Color Palette
| Token | Dark (Default) | Light (Override) | Purpose |
| :--- | :--- | :--- | :--- |
| `--bg` | `#080c0a` | `#f5f0e8` | Primary page background |
| `--bg-raised` | `#12181a` | `#ede8de` | Secondary background / Sidebars |
| `--bg-card` | `#1c2426` | `#e8e2d8` | Interactive cards / Modals |
| `--accent` | `#38b6ff` | `#005fab` | Primary action / Interactivity |
| `--border` | `#2a3436` | `#c8c0b0` | Precision separators / Borders |
| `--text-bright`| `#f0f8fa` | `#0a0a0a` | Headings / Emphasized text |
| `--text-dim` | `#8aa4ac` | `#5a5248` | Body copy / UI labels |

### Signatures
- **Noise Overlay:** Apply a fixed `::after` element with 3% opacity fractal noise.
- **Glow:** `text-shadow: 0 0 40px var(--accent-glow)`.

## 3. Core Component Specs
### Buttons & Inputs
- **Primary:** Solid `--accent` background, `--bg` text, `2px` border-radius.
- **Ghost:** `--border` border, `--text-dim` text; hover state brightens border and text.
- **Focus:** `2px` solid `--accent` with `3px` offset.

### Layout Containers
- **Glass Header:** `backdrop-filter: blur(20px)`, `80%` background opacity.
- **Section Dividers:** `2px` vertical bar of `--accent` color followed by uppercase monospace label.
- **The "Thin Grid":** Instead of standard margins, use a parent container with `--border` background and `1.5px` gap between child items to create "hairline" grid lines.

## 4. Implementation Guide
To port this system to a new application:

1.  **Extract CSS Variables:** Copy the `:root` and `.light` definitions from `app/assets/css/main.css`.
2.  **Global Reset:** Ensure `box-sizing: border-box` and monospace-first font stacking.
3.  **Noise Utility:** Add the `.noise-overlay` class to the root layout component.
4.  **Component Logic:**
    - Use `computed` properties (in Vue/Nuxt) or `useEffect` (in React) to manage the `.light` class on the `html` element for theme switching.
    - Standardize animations using the `cubic-bezier(0.22, 1, 0.36, 1)` easing for all "Slide-Up" entrance effects.

## 5. Motion Tokens
- **Entrance:** `slide-up (24px -> 0, 0.7s duration)`.
- **Interactive:** `0.2s ease` for color/background-color transitions.
- **Wait States:** Use the `animate-blink` (terminal cursor style) for loading or active inputs.
