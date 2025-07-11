# 🍏 App Name: Task Master

## ✅ Core Features

- **User Interface**: Clean, minimalistic UI mimicking Apple’s design aesthetics across all platforms (desktop & mobile).
- **Task Creation**: Add new tasks with `title` and `description`.
- **Task Management**: View, edit, and delete tasks.
- **Task Status**: Toggle tasks as complete/incomplete with visual feedback.
- **User Authentication**: Register/Login functionality using cookies (no external DB).
- **Dark Mode Toggle**: Switch between light and dark mode with smooth transition.

---

## 🎨 Apple-Styled Color Palette & Themes

### ☀️ Light Mode Colors

| Usage              | Color Name         | Hex Code     |
|--------------------|--------------------|--------------|
| Background         | Snow White         | `#F9FAFB`     |
| Primary Accent     | Light Sky Blue     | `#B4D4FF`     |
| Success (Complete) | Soft Mint Green    | `#A0D6B4`     |
| Text - Primary     | Dark Charcoal Gray | `#1C1C1E`     |
| Text - Secondary   | Light Gray         | `#6E6E73`     |
| Card Background    | Frost White        | `#FFFFFF`     |
| Border / Dividers  | Soft Gray          | `#D1D5DB`     |
| Shadows            | Light RGBA Shadow  | `rgba(0,0,0,0.06)` |

### 🌙 Dark Mode Colors

| Usage              | Color Name         | Hex Code     |
|--------------------|--------------------|--------------|
| Background         | Black Pearl        | `#121212`     |
| Primary Accent     | Cool Blue          | `#81B3FF`     |
| Success (Complete) | Teal Green         | `#7ACCA3`     |
| Text - Primary     | Off White          | `#F5F5F7`     |
| Text - Secondary   | Gray Tint          | `#A1A1A6`     |
| Card Background    | Dark Gray          | `#1E1E1E`     |
| Border / Dividers  | Deep Gray          | `#2C2C2E`     |
| Shadows            | Dark RGBA Shadow   | `rgba(0,0,0,0.2)` |

---

## ✍️ Typography & Font System

- **Font Family**: `'Inter'`, system-ui fallback (modern, readable, clean).
- **Headings**: Medium-bold (`font-weight: 500–600`)
- **Body Text**: Regular/medium weight (`400–500`)
- **Font Sizes**:
  - Headings: `2xl`, `xl`
  - Body: `base`, `sm` (for metadata/labels)

---

## 🧱 UI/UX Design System

- **Layout**:
  - Ample padding and whitespace
  - Grid/flex-based structure for responsiveness
  - Rounded corners (radius: `0.75rem` or `2xl`)
- **Shadows**:
  - Soft, subtle shadows for cards and buttons (`shadow-md` or `drop-shadow`)
- **Buttons**:
  - Smooth hover/focus transitions (`ease-in-out`)
  - Rounded, large tap targets (min-height: `44px`)
- **Transitions**:
  - Use Tailwind transitions (`transition-all duration-300 ease-in-out`)
  - Animate mode toggle, task creation/completion

---

## 🧩 Components (Styled)

### Button
- Rounded full (`rounded-full`)
- Font-medium, padding-y `2`, padding-x `4`
- Background: Primary color in light mode; Cool Blue in dark
- Hover: Slight brightness or elevation

### Card
- Background: White/light gray (light), dark gray (dark)
- Padding: `p-4` or `p-6`
- Border radius: `xl` or `2xl`
- Shadow: `shadow-md` or `shadow-sm`
- Transition on hover/focus

### Toggle Switch (for dark mode)
- Rounded pill shape
- Smooth transition when toggling
- Track color based on theme
- Thumb color: white/gray

---

## 🪄 Extras (Optional but Nice-to-Have)

- Light blur or frosted glass (`backdrop-blur`) for modals/panels
- Motion effects (Framer Motion or CSS keyframes) for page transitions
- Custom scrollbar (minimal, styled like macOS)
- Color system variables (use Tailwind’s theme config or CSS variables)

---

## 📦 Notes for Vibe Code

> ⚠️ Please **strictly adhere to the Apple-styled UI instructions**, use the color palette exactly, and **do not use overly vibrant or dense UI elements**.

- Stick to minimalist spacing and layout.
- Keep all animations and transitions soft and elegant.
- Maintain visual hierarchy using font weight and spacing, not color saturation.
- Do not overuse shadows or border colors; aim for subtlety.

---

## 🌐 Output Expectation

A polished, elegant, responsive task manager that *feels like an Apple product*. No distractions, minimalistic elements, smooth interactions, and an intuitive user flow.

