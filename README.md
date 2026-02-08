# Task Management App

**[To Do Application Live Demo](https://react-bridge-web-assessment.vercel.app)**

A comprehensive task management application built with React, TypeScript, and modern web technologies. Features multiple views including Kanban board, list view, and timeline, with full CRUD functionality, dark mode support, and internationalization.

## Features

- **Multiple Task Views**: Kanban board, list view with TanStack Table, and timeline
- **Task Management**: Full CRUD functionality (Create, Read, Update, Delete)
- **Drag & Drop**: Move tasks between columns in Kanban view
- **Dark Mode**: Toggle between light and dark themes with system preference support
- **Internationalization**: Full EN/FR support across all UI elements
- **Responsive Design**: Works on desktop and mobile devices
- **Comprehensive Testing**: Unit, component, and E2E tests with full coverage
- **API Integration**: Dummy JSON API for persistent task storage

## Technologies Used

- **Frontend Framework**: React 18 with TypeScript 5.9
- **Build Tool**: Vite 5.4
- **Styling**: Tailwind CSS 3.4 with shadcn/ui components and Radix UI
- **Table Management**: TanStack React Table v8
- **Server State**: TanStack React Query v5
- **Forms**: React Hook Form with Zod validation
- **Testing**: Vitest 3.2, React Testing Library 16, Playwright
- **Drag & Drop**: @hello-pangea/dnd
- **i18n**: react-i18next with dual-language support
- **Date Handling**: date-fns
- **Icons**: Lucide React
- **Routing**: React Router v6

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone https://github.com/Charlesntwari/react-bridge-web-assessment.git
cd react-bridge-web
```

2. Install dependencies:

```bash
npm install --legacy-peer-deps
```

3. Start the development server:

```bash
npm run dev
```

4. Open [http://localhost:8080](http://localhost:8080) in your browser.

## Available Scripts

### Development & Build

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production (outputs to `dist/`)
- `npm run preview` - Preview the production build locally

### Testing

- `npm run test` - Run unit and component tests (Vitest) - **24/24 tests passing**
- `npm run test:watch` - Run tests in watch mode for development
- `npm run e2e` - Run end-to-end tests (Playwright) - **6 E2E test scenarios**
- `npm run e2e:ui` - Run E2E tests with interactive UI
- `npm run e2e:debug` - Debug E2E tests

### Code Quality

- `npm run lint` - Run ESLint to check code quality

## Testing

### Unit & Component Tests (24 total)

Comprehensive test coverage including:

- **useTasks Hook Tests (5 tests)**
  - Fetch tasks from API
  - Create new task
  - Handle errors gracefully
  - Group tasks by status
  - Handle undefined data

- **TaskCard Component Tests (10 tests)**
  - Render task title and priority
  - Display due dates and progress
  - Show metadata (comments, attachments)
  - Handle click callbacks
  - Render avatars
  - Apply drag styles

- **ThemeProvider Tests (8 tests)**
  - Toggle light/dark/system modes
  - Persist theme to localStorage
  - Detect system preference
  - Handle errors
  - Apply CSS classes

Run tests with:

```bash
npm run test
```

### E2E Tests (6 scenarios)

Playwright tests validate complete user workflows:

```bash
npm run e2e
```

**Test Coverage:**

1. **CREATE** - Add a new task via the Add Task dialog
2. **READ** - Display and verify tasks across all views
3. **UPDATE** - Edit existing task properties (title, description, priority)
4. **DELETE** - Remove tasks with confirmation dialog
5. **Task Completion** - Toggle task status via checkbox
6. **View Switching** - Navigate between Kanban Board, List, and Timeline views

Each test validates API calls, UI updates, and state management.

## Project Structure

```
src/
├── components/
│   ├── ui/                      # shadcn/ui components
│   │   ├── table.tsx           # DataTable with TanStack React Table
│   │   └── ... (20+ UI components)
│   ├── layout/
│   │   ├── Header.tsx          # App header with theme toggle
│   │   └── Sidebar.tsx         # Navigation with i18n
│   ├── tasks/
│   │   ├── TaskCard.tsx        # Task display component
│   │   └── TaskDialog.tsx      # Add/edit task form
│   ├── views/
│   │   ├── KanbanBoard.tsx     # Kanban with drag & drop
│   │   ├── ListView.tsx        # TanStack Table view
│   │   └── TimelineView.tsx    # Timeline view
│   └── ThemeProvider.tsx       # Dark mode provider
├── hooks/
│   ├── useTasks.ts             # React Query CRUD hooks
│   ├── useTasks.test.tsx       # Hook tests (5 tests)
│   └── use-toast.ts
├── lib/
│   ├── i18n.ts                 # i18next config (EN/FR)
│   └── utils.ts
├── pages/
│   ├── Index.tsx               # Main app
│   └── NotFound.tsx
├── types/
│   └── task.ts
├── test/
│   └── setup.ts
├── e2e/
│   └── crud.spec.ts           # Playwright E2E tests (6 scenarios)
└── .github/workflows/
    ├── test.yml               # CI: Run tests
    └── build.yml              # CI: Build verification
```

## API Integration

The app uses the [DummyJSON API](https://dummyjson.com/docs/todos) for task management:

- **Base URL**: `https://dummyjson.com/todos`
- **GET /todos** - Fetch all todos (limit=30)
- **POST /todos/add** - Create new todo
- **PUT /todos/:id** - Update todo
- **DELETE /todos/:id** - Delete todo

All CRUD operations are wrapped in React Query for caching and state management.

## Internationalization (i18n)

Full EN/FR support with `react-i18next`:

- Navigation labels
- Task statuses and priorities
- Dialog forms and buttons
- View names
- Error messages

Switch languages via the Header settings menu. Preference is saved to localStorage.

## Dark Mode

Toggle between light/dark themes from the Header. Preference is saved to localStorage.

## CI/CD

GitHub Actions automatically run on every push and PR:

- **test.yml** - Runs lint and tests on Node 18.x & 20.x
- **build.yml** - Verifies the production build succeeds

See `.github/workflows/` for full configurations.
