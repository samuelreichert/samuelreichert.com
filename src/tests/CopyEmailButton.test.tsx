import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import CopyEmailButton from '../components/CopyEmailButton';

describe('CopyEmailButton', () => {
  it('renders the email as the default label', () => {
    render(<CopyEmailButton email="hi@example.com" />);
    expect(
      screen.getByRole('button', { name: /hi@example\.com/i }),
    ).toBeInTheDocument();
  });

  it('writes the email to the clipboard on click and shows a copied state', async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText },
      configurable: true,
    });

    render(<CopyEmailButton email="hi@example.com" />);

    fireEvent.click(screen.getByRole('button'));

    expect(writeText).toHaveBeenCalledWith('hi@example.com');
    expect(await screen.findByText(/copied/i)).toBeInTheDocument();
  });
});
