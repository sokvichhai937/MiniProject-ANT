# Vue 3 + Vite + Bootstrap 5 Dashboard

A responsive admin dashboard template built with **Vue 3**, **Vite**, **Bootstrap 5**, and **Bootstrap Icons**.

## Features

- 🎨 **Responsive layout** — sidebar collapses on mobile automatically
- 🗂️ **5 pages** — Dashboard, Users, Products, Reports, Settings
- 📊 **Dashboard** — 4 stat cards, recent orders table, chart placeholders
- 🔀 **Vue Router** — client-side navigation with active link highlighting
- ⚡ **Vite** — fast development server and optimised build
- 🎭 **Bootstrap 5** — utility-first styling + Bootstrap Icons

## Project Setup

### Prerequisites

- Node.js >= 18
- npm >= 9

### Install dependencies

```bash
cd frontend
npm install
```

### Start development server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for production

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Project Structure

```
frontend/
├── src/
│   ├── assets/
│   │   └── dashboard.css     # Custom styles (sidebar, cards, etc.)
│   ├── components/
│   │   ├── TheNavbar.vue     # Top navigation bar
│   │   ├── TheSidebar.vue    # Left sidebar with nav links
│   │   ├── StatCard.vue      # Reusable stat card component
│   │   └── OrdersTable.vue   # Recent orders table
│   ├── router/
│   │   └── index.js          # Vue Router configuration
│   ├── views/
│   │   ├── DashboardView.vue
│   │   ├── UsersView.vue
│   │   ├── ProductsView.vue
│   │   ├── ReportsView.vue
│   │   └── SettingsView.vue
│   ├── App.vue               # Root component (layout)
│   └── main.js               # Entry point (Bootstrap imports)
├── index.html
├── vite.config.js
└── package.json
```

## Routes

| Path | Page |
|------|------|
| `/` | Dashboard |
| `/users` | Users |
| `/products` | Products |
| `/reports` | Reports |
| `/settings` | Settings |

