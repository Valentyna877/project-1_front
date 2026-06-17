import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import GreetingBlock from './GreetingBlock';

function mockDate(hour: number) {
  const fakeDate = new Date(2020, 1, 1, hour, 0, 0, 0);
  vi.setSystemTime(fakeDate);
}

describe('GreetingBlock', () => {
    beforeEach(() => {
      
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('рендерить "Доброго ранку, Мамо!" для 8:00', () => {
    mockDate(8);
    render(<GreetingBlock />);
    expect(screen.getByText(/Доброго ранку, Мамо!/)).toBeInTheDocument();
  });

  it('рендерить "Доброго дня, Мамо!" для 14:00', () => {
    mockDate(14);
    render(<GreetingBlock />);
    expect(screen.getByText(/Доброго дня, Мамо!/)).toBeInTheDocument();
  });

  it('рендерить "Доброго вечора, Мамо!" для 20:00', () => {
    mockDate(20);
    render(<GreetingBlock />);
    expect(screen.getByText(/Доброго вечора, Мамо!/)).toBeInTheDocument();
  });

  it('рендерить "Доброї ночі, Мамо!" для 2:00', () => {
    mockDate(2);
    render(<GreetingBlock />);
    expect(screen.getByText(/Доброї ночі, Мамо!/)).toBeInTheDocument();
  });
});
