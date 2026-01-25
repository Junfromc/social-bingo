---
description: Essential Tailwind v4 practices for rapid frontend development. CSS-first config, modern features, zero setup.
---

# Tailwind CSS v4 Frontend Development

## Setup (One Line)
```css
@import "tailwindcss";  /* everything else is automatic */
```
- Zero configuration needed (content auto-detected, ignores `.gitignore`)
- PostCSS or Vite plugin (`@tailwindcss/vite` for best performance)
- Built-in `@import` support; no extra tooling

## CSS-First Configuration
Define design tokens directly in CSS (no `tailwind.config.js`):
```css
@theme {
  --color-brand: oklch(0.72 0.11 178);        /* available as bg-brand */
  --font-display: "Inter", sans-serif;         /* available as font-display */
  --spacing-xs: 0.25rem;                       /* used in dynamic scales */
}
```
- All `@theme` values auto-exposed as CSS custom properties at `:root`
- Flat structure only (no nesting in `@media` or selectors)
- Runtime themes: use `@theme inline { --color-primary: var(--primary); }`

## Modern Web Essentials

| Feature | Usage |
|---------|-------|
| **Native Opacity** | `bg-black/50`, `text-white/75` |
| **Color Interpolation** | `bg-linear-to-r/oklch` (OKLCH default), `/srgb` for alt mode |
| **3D Transforms** | `rotate-x-45`, `rotate-y-90`, `scale-z-150` |
| **Container Queries** | `@container` + `@sm:`, `@md:`, `@max-md:` |
| **Gradients** | `bg-linear-45`, `bg-radial-[at_25%_25%]`, `bg-conic-[in_hsl]` |
| **New Variants** | `not-*`, `starting:`, `@starting-style` (enter/exit), `color-scheme:`, `inert:` |
| **Dynamic Utils** | `grid-cols-15`, `mt-29`, `data-current:opacity-100` (no config needed) |
| **Inset Shadows** | `inset-shadow-lg`, `inset-ring-2` (layer up to 4 shadows) |

## Color Palette
- Upgraded to OKLCH (wider gamut, more vivid)
- Maintains v3 feel; safe to upgrade existing projects

## Key Migrations
- `bg-opacity-50` → `bg-black/50` (use `/` for any color + opacity)
- `overflow-ellipsis` → `text-ellipsis`
- `shadow-sm` → `shadow-xs`
- `bg-gradient-*` → `bg-linear-*` (linear gradients)
- Remove `@tailwind` directives; use single `@import "tailwindcss"`

## Performance Wins
- **3.78x** faster full builds
- **8.8x** faster incremental builds
- **100x+** faster incremental with no new CSS (microseconds)

## Custom Utilities & Variants
```css
@layer utilities {
  .card { @apply rounded-lg border shadow-sm; }
}

@layer variants {
  .custom\:active { @media (prefers-active: yes) { & } }
}
```

## Pro Tips
1. Trust auto-detection; don't overthink `content` config
2. Use `@source` in CSS to include excluded files: `@source "../node_modules/@company/ui-lib"`
3. Reference theme values anywhere: `color: var(--color-brand)` in JS
4. Arbitrary values for anything: `px-[12px]`, `w-[--custom-width]`, `text-[#f0f]`
5. Stack container query variants: `@min-md:@max-xl:hidden`
