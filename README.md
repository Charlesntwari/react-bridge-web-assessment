# Task Management App

A comprehensive task management application built with React, TypeScript, and modern web technologies. Features multiple views including Kanban board, list view, and timeline, with full CRUD functionality, dark mode support, and internationalization.

## Features

- **Multiple Task Views**: Kanban board, list view, and timeline
- **Task Management**: Create, read, update, and delete tasks
- **Drag & Drop**: Move tasks between columns in Kanban view
- **Dark Mode**: Toggle between light and dark themes
- **Internationalization**: Support for English and French
- **Responsive Design**: Works on desktop and mobile devices

## Technologies Used

- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS with shadcn/ui components
- **State Management**: React hooks and local storage
- **Drag & Drop**: @hello-pangea/dnd
- **Forms**: React Hook Form with validation
- **Date Handling**: date-fns
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:

```bash
git clone <your-repo-url>
cd react-bridge-web
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open [http://localhost:8080](http://localhost:8080) in your browser.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run test` - Run tests
- `npm run test:watch` - Run tests in watch mode

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # shadcn/ui components
│   ├── layout/         # Layout components (Header, Sidebar)
│   ├── tasks/          # Task-related components
│   └── views/          # View components (Kanban, List, Timeline)
├── hooks/              # Custom React hooks
├── lib/                # Utility functions and configurations
├── pages/              # Page components
├── types/              # TypeScript type definitions
└── test/               # Test files
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## License

This project is licensed under the MIT License.
