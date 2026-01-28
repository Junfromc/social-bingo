import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { HuntScreen } from './HuntScreen';

describe('HuntScreen', () => {
  const mockHuntItems = Array.from({ length: 24 }, (_, i) => ({
    id: i,
    text: `Hunt item ${i + 1}`,
    isChecked: i < 5, // First 5 are checked
  }));

  it('should render without crashing', () => {
    const onItemToggle = vi.fn();
    const onBack = vi.fn();
    render(
      <HuntScreen
        huntItems={mockHuntItems}
        onItemToggle={onItemToggle}
        onBack={onBack}
      />
    );
    expect(screen.getByText(/scavenger hunt/i)).toBeInTheDocument();
  });

  it('should display all 24 hunt items as checkboxes', () => {
    const onItemToggle = vi.fn();
    const onBack = vi.fn();
    render(
      <HuntScreen
        huntItems={mockHuntItems}
        onItemToggle={onItemToggle}
        onBack={onBack}
      />
    );

    // Should render 24 checkboxes
    const checkboxes = screen.getAllByRole('checkbox');
    expect(checkboxes).toHaveLength(24);
  });

  it('should display each hunt item text', () => {
    const onItemToggle = vi.fn();
    const onBack = vi.fn();
    render(
      <HuntScreen
        huntItems={mockHuntItems}
        onItemToggle={onItemToggle}
        onBack={onBack}
      />
    );

    // Should display specific items
    expect(screen.getByText('Hunt item 1')).toBeInTheDocument();
    expect(screen.getByText('Hunt item 12')).toBeInTheDocument();
    expect(screen.getByText('Hunt item 24')).toBeInTheDocument();
  });

  it('should show checked state for initially checked items', () => {
    const onItemToggle = vi.fn();
    const onBack = vi.fn();
    render(
      <HuntScreen
        huntItems={mockHuntItems}
        onItemToggle={onItemToggle}
        onBack={onBack}
      />
    );

    const checkboxes = screen.getAllByRole('checkbox');
    // First 5 should be checked
    expect(checkboxes[0]).toBeChecked();
    expect(checkboxes[4]).toBeChecked();
    // 6th should be unchecked
    expect(checkboxes[5]).not.toBeChecked();
  });

  it('should call onItemToggle when clicking a checkbox', () => {
    const onItemToggle = vi.fn();
    const onBack = vi.fn();
    render(
      <HuntScreen
        huntItems={mockHuntItems}
        onItemToggle={onItemToggle}
        onBack={onBack}
      />
    );

    const checkboxes = screen.getAllByRole('checkbox');
    fireEvent.click(checkboxes[0]);

    expect(onItemToggle).toHaveBeenCalledWith(0);
  });

  it('should toggle checkbox state when clicked', () => {
    const onItemToggle = vi.fn();
    const onBack = vi.fn();
    const { rerender } = render(
      <HuntScreen
        huntItems={mockHuntItems}
        onItemToggle={onItemToggle}
        onBack={onBack}
      />
    );

    const checkboxes = screen.getAllByRole('checkbox');
    const initialState = (checkboxes[5] as HTMLInputElement).checked;

    fireEvent.click(checkboxes[5]);
    expect(onItemToggle).toHaveBeenCalledWith(5);

    // Simulate toggle by updating props
    const updatedItems = mockHuntItems.map((item) =>
      item.id === 5 ? { ...item, isChecked: !item.isChecked } : item
    );
    rerender(
      <HuntScreen
        huntItems={updatedItems}
        onItemToggle={onItemToggle}
        onBack={onBack}
      />
    );

    const updatedCheckboxes = screen.getAllByRole('checkbox');
    expect((updatedCheckboxes[5] as HTMLInputElement).checked).toBe(!initialState);
  });

  it('should display progress meter with current count', () => {
    const onItemToggle = vi.fn();
    const onBack = vi.fn();
    render(
      <HuntScreen
        huntItems={mockHuntItems}
        onItemToggle={onItemToggle}
        onBack={onBack}
      />
    );

    // Progress should show 5/24 (5 checked items)
    expect(screen.getByText(/5.*24/)).toBeInTheDocument();
  });

  it('should display progress meter with 0/24 when no items checked', () => {
    const onItemToggle = vi.fn();
    const onBack = vi.fn();
    const uncheckedItems = mockHuntItems.map((item) => ({
      ...item,
      isChecked: false,
    }));

    render(
      <HuntScreen
        huntItems={uncheckedItems}
        onItemToggle={onItemToggle}
        onBack={onBack}
      />
    );

    expect(screen.getByText(/0.*24/)).toBeInTheDocument();
  });

  it('should render Back button', () => {
    const onItemToggle = vi.fn();
    const onBack = vi.fn();
    render(
      <HuntScreen
        huntItems={mockHuntItems}
        onItemToggle={onItemToggle}
        onBack={onBack}
      />
    );

    expect(screen.getByText(/\[ BACK \]/i)).toBeInTheDocument();
  });

  it('should call onBack when Back button is clicked', () => {
    const onItemToggle = vi.fn();
    const onBack = vi.fn();
    render(
      <HuntScreen
        huntItems={mockHuntItems}
        onItemToggle={onItemToggle}
        onBack={onBack}
      />
    );

    const backButton = screen.getByText(/\[ BACK \]/i);
    fireEvent.click(backButton);

    expect(onBack).toHaveBeenCalled();
  });

  it('should display completion message when all items are checked', () => {
    const onItemToggle = vi.fn();
    const onBack = vi.fn();
    const allCheckedItems = mockHuntItems.map((item) => ({
      ...item,
      isChecked: true,
    }));

    render(
      <HuntScreen
        huntItems={allCheckedItems}
        onItemToggle={onItemToggle}
        onBack={onBack}
      />
    );

    // Should show a completion message
    expect(
      screen.getByText(/hunt complete|congratulations|all items found/i)
    ).toBeInTheDocument();
  });

  it('should not display completion message when items remain unchecked', () => {
    const onItemToggle = vi.fn();
    const onBack = vi.fn();
    render(
      <HuntScreen
        huntItems={mockHuntItems}
        onItemToggle={onItemToggle}
        onBack={onBack}
      />
    );

    // Should NOT show completion message
    expect(
      screen.queryByText(/hunt complete|congratulations|all items found/i)
    ).not.toBeInTheDocument();
  });

  it('should display instructions text', () => {
    const onItemToggle = vi.fn();
    const onBack = vi.fn();
    render(
      <HuntScreen
        huntItems={mockHuntItems}
        onItemToggle={onItemToggle}
        onBack={onBack}
      />
    );

    expect(
      screen.getByText(/check off items|find items|mark items/i)
    ).toBeInTheDocument();
  });

  it('should render items in a scrollable container', () => {
    const onItemToggle = vi.fn();
    const onBack = vi.fn();
    render(
      <HuntScreen
        huntItems={mockHuntItems}
        onItemToggle={onItemToggle}
        onBack={onBack}
      />
    );

    // Should render all items (scrollable list)
    const listItems = screen.getAllByRole('checkbox');
    expect(listItems.length).toBe(24);
  });

  it('should update progress when items are toggled', () => {
    const onItemToggle = vi.fn();
    const onBack = vi.fn();
    const { rerender } = render(
      <HuntScreen
        huntItems={mockHuntItems}
        onItemToggle={onItemToggle}
        onBack={onBack}
      />
    );

    expect(screen.getByText(/5.*24/)).toBeInTheDocument();

    // Toggle more items to checked
    const moreCheckedItems = mockHuntItems.map((item) => ({
      ...item,
      isChecked: item.id < 10,
    }));

    rerender(
      <HuntScreen
        huntItems={moreCheckedItems}
        onItemToggle={onItemToggle}
        onBack={onBack}
      />
    );

    expect(screen.getByText(/10.*24/)).toBeInTheDocument();
  });

  it('should render title/header', () => {
    const onItemToggle = vi.fn();
    const onBack = vi.fn();
    render(
      <HuntScreen
        huntItems={mockHuntItems}
        onItemToggle={onItemToggle}
        onBack={onBack}
      />
    );

    expect(
      screen.getByText(/scavenger hunt|hunt mode|find people/i)
    ).toBeInTheDocument();
  });
});
