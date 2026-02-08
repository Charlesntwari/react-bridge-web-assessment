import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider, useTheme } from './ThemeProvider';
import { ReactNode } from 'react';

const TestComponent = () => {
  const { theme, setTheme } = useTheme();
  return (
    <div>
      <div data-testid="current-theme">{theme}</div>
      <button onClick={() => setTheme('light')} data-testid="light-btn">
        Light
      </button>
      <button onClick={() => setTheme('dark')} data-testid="dark-btn">
        Dark
      </button>
      <button onClick={() => setTheme('system')} data-testid="system-btn">
        System
      </button>
    </div>
  );
};

describe('ThemeProvider', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.className = '';
  });

  afterEach(() => {
    localStorage.clear();
    document.documentElement.className = '';
  });

  it('should provide default theme', () => {
    render(
      <ThemeProvider defaultTheme="light">
        <TestComponent />
      </ThemeProvider>
    );

    expect(screen.getByTestId('current-theme')).toHaveTextContent('light');
  });

  it('should set theme to light', async () => {
    const user = userEvent.setup();
    render(
      <ThemeProvider defaultTheme="system">
        <TestComponent />
      </ThemeProvider>
    );

    const lightBtn = screen.getByTestId('light-btn');
    await user.click(lightBtn);

    expect(screen.getByTestId('current-theme')).toHaveTextContent('light');
    expect(document.documentElement.classList.contains('light')).toBe(true);
  });

  it('should set theme to dark', async () => {
    const user = userEvent.setup();
    render(
      <ThemeProvider defaultTheme="system">
        <TestComponent />
      </ThemeProvider>
    );

    const darkBtn = screen.getByTestId('dark-btn');
    await user.click(darkBtn);

    expect(screen.getByTestId('current-theme')).toHaveTextContent('dark');
    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });

  it('should persist theme to localStorage', async () => {
    const user = userEvent.setup();
    render(
      <ThemeProvider defaultTheme="light" storageKey="test-theme">
        <TestComponent />
      </ThemeProvider>
    );

    const darkBtn = screen.getByTestId('dark-btn');
    await user.click(darkBtn);

    expect(localStorage.getItem('test-theme')).toBe('dark');
  });

  it('should load theme from localStorage on mount', () => {
    localStorage.setItem('klaboard-theme', 'dark');

    render(
      <ThemeProvider defaultTheme="light">
        <TestComponent />
      </ThemeProvider>
    );

    expect(screen.getByTestId('current-theme')).toHaveTextContent('dark');
  });

  it('should handle system theme preference', () => {
    // Mock system preference to dark
    const matchMediaMock = (query: string) => ({
      matches: query === '(prefers-color-scheme: dark)',
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false,
    });

    window.matchMedia = matchMediaMock as any;

    render(
      <ThemeProvider defaultTheme="system">
        <TestComponent />
      </ThemeProvider>
    );

    // When system theme is dark, it should apply the dark class
    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });

  it('should throw error when useTheme is used outside ThemeProvider', () => {
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    expect(() => {
      render(<TestComponent />);
    }).toThrow('useTheme must be used within a ThemeProvider');

    consoleErrorSpy.mockRestore();
  });

  it('should remove old theme classes before applying new one', async () => {
    const user = userEvent.setup();
    render(
      <ThemeProvider defaultTheme="light">
        <TestComponent />
      </ThemeProvider>
    );

    expect(document.documentElement.classList.contains('light')).toBe(true);

    const darkBtn = screen.getByTestId('dark-btn');
    await user.click(darkBtn);

    expect(document.documentElement.classList.contains('light')).toBe(false);
    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });
});
