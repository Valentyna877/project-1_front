import { getGreeting } from './getGreeting';

describe('getGreeting', () => {
  it('повертає "Доброї ночі" для 2:00', () => {
    const date = new Date();
    date.setHours(2, 0, 0, 0);
    expect(getGreeting(date)).toBe('Доброї ночі');
  });

  it('повертає "Доброго ранку" для 8:00', () => {
    const date = new Date();
    date.setHours(8, 0, 0, 0);
    expect(getGreeting(date)).toBe('Доброго ранку');
  });

  it('повертає "Доброго дня" для 14:00', () => {
    const date = new Date();
    date.setHours(14, 0, 0, 0);
    expect(getGreeting(date)).toBe('Доброго дня');
  });

  it('повертає "Доброго вечора" для 20:00', () => {
    const date = new Date();
    date.setHours(20, 0, 0, 0);
    expect(getGreeting(date)).toBe('Доброго вечора');
  });

  it('повертає "Доброї ночі" для 0:00 (межа)', () => {
    const date = new Date();
    date.setHours(0, 0, 0, 0);
    expect(getGreeting(date)).toBe('Доброї ночі');
  });

  it('повертає "Доброго ранку" для 6:00 (межа)', () => {
    const date = new Date();
    date.setHours(6, 0, 0, 0);
    expect(getGreeting(date)).toBe('Доброго ранку');
  });

  it('повертає "Доброго дня" для 12:00 (межа)', () => {
    const date = new Date();
    date.setHours(12, 0, 0, 0);
    expect(getGreeting(date)).toBe('Доброго дня');
  });

  it('повертає "Доброго вечора" для 18:00 (межа)', () => {
    const date = new Date();
    date.setHours(18, 0, 0, 0);
    expect(getGreeting(date)).toBe('Доброго вечора');
  });
});
