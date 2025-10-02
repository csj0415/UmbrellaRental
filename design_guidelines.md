# Design Guidelines: 대학 캠퍼스 우산 대여 서비스

## Design Approach
**Reference-Based:** Drawing inspiration from modern Korean service platforms (Toss, Karrot Market, Baemin) that successfully engage young adults with clean, friendly, and approachable design. The aesthetic should feel fresh, optimistic, and relatable to early 20s university students.

## Core Design Principles
- **Youthful Energy:** Bright, cheerful design that feels accessible and non-corporate
- **Mobile-First:** Optimized for smartphone usage (primary device for college students)
- **Clear Hierarchy:** Easy scanning with obvious CTAs and form sections
- **Trust Building:** Professional enough to feel legitimate, casual enough to feel approachable

## Color Palette

**Primary Colors (Light Mode):**
- Primary: 210 100% 50% (vibrant blue - trustworthy yet energetic)
- Primary Hover: 210 100% 45%
- Background: 0 0% 100% (pure white)
- Surface: 210 40% 98% (very light blue tint)

**Primary Colors (Dark Mode):**
- Primary: 210 100% 60%
- Primary Hover: 210 100% 65%
- Background: 220 15% 10%
- Surface: 220 15% 15%

**Accent Colors:**
- Success/Highlight: 150 60% 50% (fresh teal - for completed actions)
- Warning: 35 100% 60% (warm orange - for important notices)

**Text Colors:**
- Primary Text: 220 10% 10% (light) / 0 0% 95% (dark)
- Secondary Text: 220 5% 45% (light) / 0 0% 70% (dark)

## Typography
- **Font Family:** 'Pretendard', -apple-system, BlinkMacSystemFont, sans-serif (optimized Korean font)
- **Headings:** Bold (700), generous letter-spacing for impact
- **Body:** Regular (400-500), optimized for readability
- **Forms:** Medium (500) for labels, Regular (400) for inputs

## Layout System
**Spacing Scale:** Use Tailwind units of 3, 4, 6, 8, 12, 16, 20, 24 for consistent rhythm
- Sections: py-16 to py-24 on desktop, py-12 on mobile
- Cards/Forms: p-6 to p-8
- Element spacing: gap-4 to gap-6 for related items

**Container Strategy:**
- Full-width hero with max-w-6xl inner content
- Form sections: max-w-2xl centered
- Multi-column grids: max-w-7xl

## Component Library

### Hero Section
- **Layout:** Full-width background with centered content, asymmetric design
- **Content:** Bold headline (우산 걱정 끝!), subheading about campus convenience, primary CTA scroll-to-form
- **Visual:** Gradient overlay (210 100% 50% to 150 60% 50%) or solid color with playful illustrations/icons
- **Height:** 70vh on desktop, auto on mobile

### Why Rent Umbrellas Section
- **Layout:** 2-3 column grid (lg:grid-cols-3, md:grid-cols-2, grid-cols-1)
- **Cards:** Icon + heading + short description
- **Content Ideas:** 
  - "비 올 때마다 우산 사기? 이제 그만!" (No more buying umbrellas every rainy day)
  - "캠퍼스 곳곳에서 편하게 대여 & 반납" (Convenient rental and return across campus)
  - "학생 친화적 가격으로 부담 없이" (Student-friendly pricing)
- **Style:** Clean cards with soft shadows, icons in primary color

### Rental Application Form
- **Layout:** Single column, max-w-2xl centered
- **Styling:** 
  - Rounded input fields (rounded-lg) with subtle borders
  - Date pickers with calendar icons
  - Clear labels above each field
  - Large, friendly submit button (w-full on mobile, auto on desktop)
- **Grouping:** Logical sections (대여 정보, 개인 정보) with subtle dividers
- **Validation:** Inline error messages in warning color

### Advertiser Section (Footer Area)
- **Layout:** Two-column split (lg:grid-cols-2, grid-cols-1)
- **Left:** Advertiser recruitment pitch with benefits list
- **Right:** Advertiser application form
- **Background:** Contrasting background (surface color) to separate from main content
- **Padding:** Generous py-20 to give breathing room

### Forms Styling (Both Types)
- **Input Fields:** 
  - Border: 1px solid neutral-200 (light) / neutral-700 (dark)
  - Focus: Ring with primary color, border-primary
  - Padding: px-4 py-3
  - Rounded: rounded-lg
- **Buttons:**
  - Primary: bg-primary, text-white, px-8 py-3, rounded-lg, font-medium
  - Hover: Subtle lift with shadow-lg transition
- **Labels:** mb-2, font-medium, text-sm

## Visual Elements

### Icons
- **Library:** Heroicons (outline for larger icons, solid for small UI elements)
- **Usage:** Feature cards, form field indicators, navigation
- **Color:** Primary color for emphasis, neutral for secondary elements

### Images
This landing page should include strategic imagery:
- **Hero Section:** Consider a cheerful illustration or photo of students on campus with umbrellas (if illustration, use bright, friendly style matching Korean design trends)
- **Feature Section:** Icon-based (no photos needed)
- **Advertiser Section:** Optional: Small illustration or icon representing partnership

**Hero Image Specification:** If using photo, apply gradient overlay (from primary color at 40% opacity) for text readability. If using illustration, integrate it on the right side of hero content (desktop) or below headline (mobile).

## Animations
**Minimal approach:**
- Subtle hover states on buttons (transform: translateY(-2px))
- Smooth scroll to form section when clicking hero CTA
- Form field focus transitions (150ms ease)
- NO scroll-triggered animations or complex effects

## Mobile Optimization
- Stack all multi-column layouts to single column
- Full-width buttons on mobile
- Larger touch targets (min 44px)
- Simplified spacing (reduce py values by 1/3)
- Sticky navigation if header exists

## Korean Design Conventions
- Clear, friendly Korean typography with proper line-height (1.6-1.8)
- Avoid overly playful fonts - maintain readability
- Use polite language tone (존댓말) in copy
- Date format: YYYY.MM.DD (Korean standard)

## Accessibility
- Maintain WCAG AA contrast ratios
- Proper label associations for all form fields
- Keyboard navigation for all interactive elements
- Dark mode toggle (respect system preferences)
- Error messages clearly associated with fields