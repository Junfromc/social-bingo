import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { StartScreen } from './StartScreen';

describe('StartScreen', () => {
  it('should render the main heading', () => {
    const onStart = vi.fn();
    render(<StartScreen onStart={onStart} />);
    
    expect(screen.getByText('What is Social Bingo?')).toBeInTheDocument();
  });

  it('should render the tagline', () => {
    const onStart = vi.fn();
    render(<StartScreen onStart={onStart} />);
    
    expect(screen.getByText(/An icebreaker game for social mixers/i)).toBeInTheDocument();
  });

  it('should render grid preview section', () => {
    const onStart = vi.fn();
    render(<StartScreen onStart={onStart} />);
    
    expect(screen.getByText('> Your Bingo Grid')).toBeInTheDocument();
  });

  it('should render FREE SPACE in grid preview', () => {
    const onStart = vi.fn();
    render(<StartScreen onStart={onStart} />);
    
    expect(screen.getByText('FREE')).toBeInTheDocument();
  });

  it('should render three rule cards', () => {
    const onStart = vi.fn();
    render(<StartScreen onStart={onStart} />);
    
    expect(screen.getByText('Meet People')).toBeInTheDocument();
    expect(screen.getByText('Mark Matches')).toBeInTheDocument();
    expect(screen.getByText('Get Bingo')).toBeInTheDocument();
  });

  it('should render PLAY BINGO button', () => {
    const onStart = vi.fn();
    render(<StartScreen onStart={onStart} />);
    
    expect(screen.getByText('[ PLAY BINGO ]')).toBeInTheDocument();
  });

  it('should render SCAVENGER HUNT button', () => {
    const onStart = vi.fn();
    render(<StartScreen onStart={onStart} />);
    
    expect(screen.getByText('[ SCAVENGER HUNT ]')).toBeInTheDocument();
  });

  it('should render LEARN MORE button', () => {
    const onStart = vi.fn();
    render(<StartScreen onStart={onStart} />);
    
    expect(screen.getByText('[ LEARN MORE ]')).toBeInTheDocument();
  });

  it('should call onStart with bingo mode when PLAY BINGO button is clicked', () => {
    const onStart = vi.fn();
    render(<StartScreen onStart={onStart} />);
    
    const bingoButton = screen.getByText('[ PLAY BINGO ]');
    fireEvent.click(bingoButton);
    
    expect(onStart).toHaveBeenCalledWith('bingo');
  });

  it('should call onStart with hunt mode when SCAVENGER HUNT button is clicked', () => {
    const onStart = vi.fn();
    render(<StartScreen onStart={onStart} />);
    
    const huntButton = screen.getByText('[ SCAVENGER HUNT ]');
    fireEvent.click(huntButton);
    
    expect(onStart).toHaveBeenCalledWith('hunt');
  });

  it('should toggle detailed rules when LEARN MORE is clicked', () => {
    const onStart = vi.fn();
    render(<StartScreen onStart={onStart} />);
    
    // Detailed rules should not be visible initially
    expect(screen.queryByText('> DETAILED RULES')).not.toBeInTheDocument();
    
    // Click LEARN MORE
    const learnMoreButton = screen.getByText('[ LEARN MORE ]');
    fireEvent.click(learnMoreButton);
    
    // Detailed rules should now be visible
    expect(screen.getByText('> DETAILED RULES')).toBeInTheDocument();
    expect(screen.getByText(/Each player gets a unique 5×5 bingo grid/i)).toBeInTheDocument();
    
    // Button text should change to HIDE
    expect(screen.getByText('[ HIDE ]')).toBeInTheDocument();
  });

  it('should hide detailed rules when HIDE is clicked', () => {
    const onStart = vi.fn();
    render(<StartScreen onStart={onStart} />);
    
    // Click LEARN MORE to show rules
    const learnMoreButton = screen.getByText('[ LEARN MORE ]');
    fireEvent.click(learnMoreButton);
    
    expect(screen.getByText('> DETAILED RULES')).toBeInTheDocument();
    
    // Click HIDE to hide rules
    const hideButton = screen.getByText('[ HIDE ]');
    fireEvent.click(hideButton);
    
    // Detailed rules should be hidden again
    expect(screen.queryByText('> DETAILED RULES')).not.toBeInTheDocument();
    expect(screen.getByText('[ LEARN MORE ]')).toBeInTheDocument();
  });

  it('should render sample questions in grid preview', () => {
    const onStart = vi.fn();
    render(<StartScreen onStart={onStart} />);
    
    // Check for some sample questions (they appear multiple times in the grid)
    const musicElements = screen.getAllByText(/has a favorite music genre/i);
    expect(musicElements.length).toBeGreaterThan(0);
    
    const instrumentElements = screen.getAllByText(/plays an instrument/i);
    expect(instrumentElements.length).toBeGreaterThan(0);
  });
});
