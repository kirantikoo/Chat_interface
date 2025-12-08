# Quick Copy-Paste Guide for Components

## 🚀 Fast Setup (5 minutes)

### If you already have Tailwind CSS in your project:

1. **Copy these 4 component files:**

   ```
   src/components/
   ├── AuthModal.jsx          ✅ Self-contained
   ├── ChatInterface.jsx       ✅ Self-contained
   ├── QuickActions.jsx        ✅ Self-contained
   └── WebsitePreview.jsx      ✅ Self-contained
   ```

2. **Copy UI components (if you don't have them):**

   ```
   src/components/ui/
   ├── button.jsx
   ├── dialog.jsx
   ├── input.jsx
   ├── label.jsx
   ├── tabs.jsx
   ├── card.jsx
   ├── avatar.jsx
   └── toaster.jsx (optional)
   ```

3. **Copy hooks:**

   ```
   src/hooks/
   └── use-toast.js
   ```

4. **Install missing packages:**

   ```bash
   npm install lucide-react class-variance-authority clsx
   npm install @radix-ui/react-dialog @radix-ui/react-tabs
   ```

5. **Done! Import and use:**

   ```jsx
   import ChatInterface from "@/components/ChatInterface";

   export default function App() {
     return <ChatInterface />;
   }
   ```

---

## 📋 What's Included in Each Component

### AuthModal.jsx

**Dependencies:**

- Dialog, Button, Input, Label, Tabs (UI components)
- use-toast hook
- React (useState)

**Tailwind Classes Used:**

- 30+ responsive classes
- Gradient backgrounds
- Focus states and animations
- No custom CSS needed ✅

**Usage:**

```jsx
import AuthModal from "@/components/AuthModal";

const [isOpen, setIsOpen] = useState(false);

<AuthModal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  onAuthSuccess={(user) => console.log(user)}
/>;
```

---

### ChatInterface.jsx

**Dependencies:**

- Button, Input, Avatar, Card (UI components)
- use-toast hook
- lucide-react icons
- QuickActions, WebsitePreview, AuthModal (components)
- React (useState, useRef, useEffect)

**Tailwind Classes Used:**

- 50+ responsive classes
- Backdrop blur effects
- Animations (slide-in, pulse, bounce)
- Responsive grid layout
- No custom CSS needed ✅

**Usage:**

```jsx
import ChatInterface from "@/components/ChatInterface";

export default function App() {
  return <ChatInterface />;
}
```

---

### QuickActions.jsx

**Dependencies:**

- Button (UI component)
- lucide-react icons
- React

**Tailwind Classes Used:**

- 15+ responsive classes
- Hover animations
- Mobile-responsive text
- Active state transforms
- No custom CSS needed ✅

**Usage:**

```jsx
import QuickActions from "@/components/QuickActions";

<QuickActions onActionClick={(action) => console.log(action)} />;
```

---

### WebsitePreview.jsx

**Dependencies:**

- Card, Button (UI components)
- lucide-react icons
- React (useState)

**Tailwind Classes Used:**

- 25+ responsive classes
- Responsive iframe sizing
- Device mode switching
- Backdrop effects
- No custom CSS needed ✅

**Usage:**

```jsx
import WebsitePreview from "@/components/WebsitePreview";

<WebsitePreview htmlContent={htmlString} isGenerating={false} />;
```

---

## 🎨 Tailwind Configuration Required

Your project needs:

### 1. tailwind.config.js

```javascript
module.exports = {
  darkMode: ["class"],
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "hsl(var(--primary))",
        secondary: "hsl(var(--secondary))",
      },
    },
  },
};
```

### 2. postcss.config.js

```javascript
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

### 3. index.css or main.css

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --primary: 139 84% 35%; /* Green */
    --secondary: 228 67% 47%; /* Blue */
  }
}
```

---

## 🔧 Required Dependencies

### Essential (Must Have)

```json
{
  "tailwindcss": "^3.4.0",
  "postcss": "^8.4.0",
  "autoprefixer": "^10.4.0",
  "react": "^18.0.0",
  "react-dom": "^18.0.0"
}
```

### Component Specific

```json
{
  "lucide-react": "^0.507.0",
  "class-variance-authority": "^0.7.0",
  "clsx": "^2.1.0",
  "@radix-ui/react-dialog": "^1.1.11",
  "@radix-ui/react-tabs": "^1.1.9",
  "@radix-ui/react-avatar": "^1.1.7",
  "@radix-ui/react-label": "^2.1.4",
  "@radix-ui/react-toast": "^1.2.11"
}
```

### Installation

```bash
npm install tailwindcss postcss autoprefixer \
  lucide-react class-variance-authority clsx \
  @radix-ui/react-dialog @radix-ui/react-tabs \
  @radix-ui/react-avatar @radix-ui/react-label \
  @radix-ui/react-toast
```

---

## ✅ Verification Checklist

Before importing components, verify:

- [ ] Tailwind CSS installed and configured
- [ ] CSS variables defined for colors
- [ ] All @radix-ui packages installed
- [ ] lucide-react installed
- [ ] UI components copied (button, dialog, etc.)
- [ ] hooks folder copied (use-toast.js)
- [ ] Build succeeds without errors
- [ ] No missing imports in components

---

## 🎯 Common Issues & Solutions

### Issue: Tailwind classes not applying

**Solution:**

- Check `tailwind.config.js` has correct content paths
- Verify CSS file has `@tailwind` directives
- Restart dev server
- Check for typos in class names

### Issue: Colors appear wrong

**Solution:**

- Verify CSS variables defined in index.css
- Check primary/secondary HSL values
- Ensure tailwind.config.js extends colors correctly

### Issue: Components look broken

**Solution:**

- Ensure all UI components are copied
- Install all @radix-ui packages
- Check console for import errors
- Verify lucide-react is installed

### Issue: Responsive design not working

**Solution:**

- Use mobile-first approach (no prefix = mobile)
- Add breakpoints: sm:, md:, lg:, xl:
- Test with browser DevTools responsive mode
- Check media query in DevTools

---

## 📱 Component Sizes

When copied, expect these file sizes:

- AuthModal.jsx: ~7 KB
- ChatInterface.jsx: ~12 KB
- QuickActions.jsx: ~2 KB
- WebsitePreview.jsx: ~6 KB
- **Total: ~27 KB** (uncompressed)

Production builds: ~3 KB gzipped (only used classes)

---

## 🎓 Learning Resources

- Tailwind CSS Docs: https://tailwindcss.com/docs
- Radix UI Docs: https://www.radix-ui.com/docs/primitives/overview/introduction
- Lucide Icons: https://lucide.dev/

---

## ❓ Need Custom Styling?

All components are built purely with Tailwind CSS. To customize:

1. **Change colors:** Update CSS variables in index.css
2. **Modify spacing:** Extend tailwind.config.js theme
3. **Adjust animations:** Add custom keyframes in config
4. **Update components:** Edit className attributes directly

No separate CSS files needed!

---

**Last Updated:** December 1, 2025
**Status:** ✅ Production Ready | 100% Tailwind CSS | Zero Custom CSS
