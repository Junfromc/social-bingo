import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { StartScreen } from './StartScreen';

describe('StartScreen', () => {
  it('renders without errors', () => {
    const onStart = vi.fn();
    render(<StartScreen onStart={onStart} />);
    
    expect(screen.getByText('[ SOCIAL BINGO ]')).toBeInTheDocument();
  });

  it('displays ASCII art title banner', () => {
    const onStart = vi.fn();
    render(<StartScreen onStart={onStart} />);
    
    const asciiArt = screen.getByLabelText('SOC OPS title in ASCII art format');
    expect(asciiArt).toBeInTheDocument();
  });

  it('displays terminal-style rules with > prefixes', () => {
    const onStart = vi.fn();
    render(<StartScreen onStart={onStart} />);
    
    expect(screen.getByText(/> Find people matching the prompts/i)).toBeInTheDocument();
    expect(screen.getByText(/> Tap squares when you find a match/i)).toBeInTheDocument();
    expect(screen.getByText(/> Get 5 in a row to WIN/i)).toBeInTheDocument();
  });

  it('displays START GAME button with bracket notation', () => {
    const onStart = vi.fn();
    render(<StartScreen onStart={onStart} />);
    
    const button = screen.getByRole('button', { name: /START GAME/i });
    expect(button).toBeInTheDocument();
    expect(button.textContent).toBe('[ START GAME ]');
  });

  it('calls onStart when START GAME button is clicked', () => {
    const onStart = vi.fn();
    render(<StartScreen onStart={onStart} />);
    
    const button = screen.getByRole('button', { name: /START GAME/i });
    fireEvent.click(button);
    
    expect(onStart).toHaveBeenCalledTimes(1);
  });

  it('renders blinking cursor element', () => {
    const onStart = vi.fn();
    const { container } = render(<StartScreen onStart={onStart} />);
    
    // Check for the blinking cursor element with animate-blink class
    const cursor = container.querySelector('.animate-blink');
    expect(cursor).toBeInTheDocument();
    expect(cursor).toHaveClass('bg-accent');
  });

  it('has proper accessibility attributes', () => {
    const onStart = vi.fn();
    render(<StartScreen onStart={onStart} />);
    
    const asciiArt = screen.getByLabelText('SOC OPS title in ASCII art format');
    expect(asciiArt).toBeInTheDocument();
    
    const button = screen.getByRole('button', { name: /START GAME/i });
    expect(button).toBeInTheDocument();
  });

  it('applies glow effect classes to button', () => {
    const onStart = vi.fn();
    render(<StartScreen onStart={onStart} />);
    
    const button = screen.getByRole('button', { name: /START GAME/i });
    expect(button.className).toContain('shadow-lg');
    expect(button.className).toContain('shadow-accent/50');
    expect(button.className).toContain('hover:shadow-[0_0_20px_rgba(15,255,80,0.8)]');
  });

  it('applies border and glow to rules section', () => {
    const onStart = vi.fn();
    const { container } = render(<StartScreen onStart={onStart} />);
    
    // Find the rules container
    const rulesContainer = container.querySelector('.border-2.border-accent.shadow-lg.shadow-accent\\/50');
    expect(rulesContainer).toBeInTheDocument();
  });
});
