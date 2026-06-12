# Design Brief — LocalBazar Kart: Multi-Role Commerce Platform + Employee Management

**Purpose:** Multi-role commerce platform for Customers, Merchants, Delivery Partners, and Manufacturers with subscription-gated dashboards. Extends functionality to include manufacturer employee management (inventory register, accounts/bills, sales tracking, purchasing, restocking, expiry management, complaint handling) and professional service flows. All share dark modern aesthetic with role-specific color coding.

**Tone:** Professional, modern, role-differentiated. Merchant: amber (trade/business). Delivery: teal (logistics). Customer: purple (consumer). Manufacturer: amber (trade). Each role sees only relevant data and actions. Employee interfaces prioritize operational clarity and quick status scanning.

**Differentiation:** Subscription lock icon on gated features. Status badges (active/pending/inactive) with color coding. Left-border accent on stat cards (1-4px) matching role color. Employee role cards show team assignment and permissions. Inventory tables use color-coded stock levels (low=red, normal=green, overstock=amber). Calendar-based booking slots for healthcare/travel/services. No decorative gradients—role headers use subtle background tints only.

## Color Palette

| Token                | Light          | Dark           | Role                           |
| :------------------- | :------------- | :------------- | :----------------------------- |
| Primary (Green)      | 0.65 0.14 132  | 0.65 0.14 132  | Accent, confirmations          |
| Role Merchant        | #f59e0b        | #fbbf24        | Appointment/booking cards      |
| Role Delivery        | #06b6d4        | #22d3ee        | Active delivery/trips          |
| Role Customer        | #a855f7        | #d946ef        | Expenditure/subscriptions      |
| Role Healthcare      | #ec4899        | #f472b6        | Medical appointments           |
| Role Travel          | #3b82f6        | #60a5fa        | Tours/packages                 |
| Success (Teal)       | 0.65 0.16 172  | 0.68 0.16 172  | Active/confirmed, normal stock |
| Warning (Amber)      | 0.80 0.17 87   | 0.78 0.17 86   | Pending/attention, overstock   |
| Destructive (Red)    | #dc2626        | #ef4444        | Low stock, expenses, errors    |
| Background           | 0.98 0 0       | 0.12 0 0       | Main canvas                    |
| Card                 | 0.99 0 0       | 0.16 0 0       | Stat/booking cards, tables     |
| Sidebar              | 0.15 0 0       | 0.12 0 0       | Admin nav (unchanged)          |

## Typography

| Layer   | Font            | Size  | Weight | Usage                          |
| :------ | :-------------- | :---- | :----- | :----------------------------- |
| Display | General Sans    | 32px  | 600    | Page titles, hero sections     |
| Heading | General Sans    | 20px  | 600    | Section headers, card titles   |
| Body    | Inter           | 14px  | 400    | Default text, tables, forms    |
| Caption | Inter           | 12px  | 400    | Timestamps, metadata, labels   |
| Mono    | JetBrains Mono  | 13px  | 400    | Order IDs, QR timers, codes, batch numbers |

## Structural Zones — Employee Management

| Zone              | Background        | Border             | Details                                   |
| :---------------- | :---------------- | :----------------- | :---------------------------------------- |
| Dashboard Header  | `bg-role-*/10`    | `border-b`         | Role badge, subscription status, quick menu |
| Employee Card     | `bg-card`         | `border-l-[4px]`   | Employee name, role, department, status    |
| Inventory Row     | `bg-card`         | `border-b`         | Product, SKU, quantity, stock level, restock button |
| Inventory Level   | Role-color/10%    | N/A                | Low (red), Normal (green), Overstock (amber) |
| Accounts Entry    | `bg-card`         | `border-b`         | Date, type (income/expense), amount, description |
| Income Badge      | `bg-success/10`   | N/A                | Green text, for sales/revenue entries       |
| Expense Badge     | `bg-destructive/10` | N/A              | Red text, for cost/purchase entries         |
| Stat Card         | `bg-card`         | `border-l-[4px]`   | Metric value, trend, role-color accent    |
| Booking Card      | `bg-card`         | `border-l-[4px]`   | Service type, date slot, CTA, lock icon   |
| Status Badge      | role-color/20%    | role-color         | Active/Pending/Inactive indicator         |
| Subscription Lock | `bg-destructive/15` | N/A               | Lock icon, passdigit required label       |
| POS (unchanged)   | `bg-background`   | —                  | Full-screen, left-border order states     |
| Sidebar (unchanged)| `bg-sidebar`     | `border-sidebar`   | Persistent left nav, admin only           |

## Spacing & Rhythm

- **Compact (sm)**: 8px — form fields, icon spacing
- **Default (md)**: 16px — card padding, section gaps, table row height
- **Generous (lg)**: 24px — top-level section breaks
- **Table row**: 44px minimum height (touch-friendly)
- Admin sidebar width: 240px (mobile: drawer)
- POS full-screen, no sidebar

## POS-Specific Patterns

**Merchant POS:** Tiled order cards (2–3 columns desktop, 1 mobile). Each card shows order #, customer name, items summary, time, total. Left border accent: amber (pending), green (confirmed). Tap to open detail. Multi-branch switcher (top-left). Real-time earnings card. UPI QR overlay (fixed bottom-right) with countdown timer, red pulse when <30 sec.

**Delivery Partner POS:** Scrollable active orders list. Buzz alert on new assignment (vibration + sound). Earnings dashboard (trips, money collected). UPI QR for customer payment. Touch-friendly row heights (54px min for mobile).

**Budget Warning Bar:** Sticky top, amber background (`bg-warning/10`), amber left border. Non-blocking (customer can dismiss or proceed). Shows remaining budget + percentage. Hidden when budget is unlimited or not applicable.

## Employee Management Patterns

**Employee Role Card:** 4px left border (amber for merchant/manufacturer), shows name, role (Admin/Manager/Staff), department, start date, and status badge (Active/On Leave/Inactive). Tap to view full profile or edit permissions.

**Inventory Level Indicator:** Color-coded background in table cells. Low stock (<20% of max): red background with white text. Normal (20–80%): green background. Overstock (>80%): amber background. Quick restock button adjacent.

**Accounts Entry Row:** Horizontal layout with date (left), transaction type (badge: income=green, expense=red), amount in mono font, description (optional), and delete/edit actions (right). Hover to highlight row.

**Bills Summary:** Aggregate cards showing total payable, total paid, pending amount. Each with role-color border accent. Drill-down to line items.

## Component Patterns

| Pattern                | CSS Class                    | Usage                                   |
| :--------------------- | :--------------------------- | :-------------------------------------- |
| Chat bubbles           | `.chat-bubble-in` / `-out`   | Admin feature (unchanged)               |
| Stat card (merchant)   | `.stat-card-merchant`        | Border-left amber, role-color accent    |
| Stat card (delivery)   | `.stat-card-delivery`        | Border-left teal, role-color accent     |
| Stat card (customer)   | `.stat-card-customer`        | Border-left purple, role-color accent   |
| Employee role card     | `.employee-role-card`        | Border-left amber, shows role + status  |
| Inventory table row    | `.inventory-table-row`       | Hover highlight, quick-scan stock      |
| Inventory level (low)  | `.inventory-level-low`       | Red bg/text, urgent attention           |
| Inventory level (normal)| `.inventory-level-normal`   | Green bg/text, all good                |
| Inventory level (overstock)| `.inventory-level-overstock` | Amber bg/text, reduce stock            |
| Accounts entry row     | `.accounts-entry-row`        | Horizontal layout, hover highlight      |
| Income badge           | `.income-badge`              | Green, sales/revenue entries            |
| Expense badge          | `.expense-badge`             | Red, cost/purchase entries              |
| Booking card           | `.booking-card-*`            | Healthcare/travel/service cards         |
| Status badge (active)  | `.badge-active`              | Green bg, green text, checkmark icon    |
| Status badge (pending) | `.badge-pending`             | Amber bg, amber text, clock icon        |
| Status badge (inactive)| `.badge-inactive`            | Muted bg, muted text, dash icon         |
| Subscription lock      | `.subscription-lock`         | Red bg/icon, passdigit required label   |
| Subscription unlocked  | `.subscription-unlocked`     | Green bg/icon, ready to use             |
| Role header            | `.role-header-merchant/delivery/customer` | Subtle tinted bg, role label |
| POS order cards        | `.pos-order-card-*`          | Left border state (unchanged)           |
| Dashboard grid         | `.dashboard-grid`            | Auto-fit grid, 320px min-width, 6px gap |

## Motion

- **Entrance**: `fade-in` (300ms) for dashboards, modals, overlays
- **Stat highlight**: `animate-status-highlight` (2s) on new stat updates, left border pulse
- **Interaction**: `slide-up` (300ms) for drawer opens, chat messages, booking calendar
- **Row hover**: `transition-smooth` (0.3s) for table row highlights and employee card interactions
- **Smooth transitions**: `transition-smooth` (0.3s) on all interactive elements
- **QR timer pulse**: `animate-qr-pulse` (2s) when <30 sec remaining (unchanged)
- **Badge pulse**: Optional pulse animation on pending status badges

## Responsive Breakpoints

- **Mobile** (`<sm`): Single-column dashboard grid, full-width cards, stacked stat layout, table scrolls horizontally
- **Tablet** (`sm–md`): Two-column grid for stat cards, booking cards auto-fit, compact table mode
- **Desktop** (`md+`): Three-column grid, sidebar visible (if admin), optimal information density, full table display

## Signature Details

**Role-specific headers:** Subtle background tint (role-color/10%) creates instant role identification without visual noise. No full gradients.

**Left-border stat cards:** 4px colored accent (merchant=amber, delivery=teal, customer=purple) mirrors POS state indicators. Scannability at glance.

**Employee role cards:** 4px amber left border consistent with merchant stat cards. Quick visual grouping of team members by status.

**Inventory color coding:** Three-tier stock level system (low=red, normal=green, overstock=amber) enables rapid visual scanning without reading numbers.

**Subscription lock icon:** Passdigit-gated features show lock icon with role-color tint. Unlocked state shows green checkmark. Clearly signals access requirement.

**Calendar-based booking:** Healthcare, travel, and professional service cards show available date slots in compact grid. Touch-friendly spacing (44px+ buttons).

**Status badges:** Color-coded (green=active, amber=pending, grey=inactive) with semantic icons. Consistent across all roles.

## Anti-patterns Avoided

- No full-page gradients — role headers use subtle color tints only (10% opacity)
- No rounded pills for UI chrome — minimal radius (md/sm) maintains professionalism
- Dashboard grid does not force equal-height cards — content height varies by data
- Subscription lock never blocks page load — shows gated state, still visible
- No role-specific fonts — typography reuses existing (General Sans, Inter, JetBrains Mono)
- Booking cards are not full-screen modals — inline cards in dashboard grid
- Status badge animations are subtle pulse only, not bouncing or rotating
- Employee tables do not use alternating row colors — hover state provides clear interaction feedback
- Inventory indicators are background colors only, not animated blinks
