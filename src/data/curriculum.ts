import { month1Days } from './curriculum-month1';
import { month2Days } from './curriculum-month2';
import { month3Days } from './curriculum-month3';
import type { CurriculumDay } from '../types';

export const allDays: CurriculumDay[] = [...month1Days, ...month2Days, ...month3Days];

export const getDayData = (day: number): CurriculumDay | undefined =>
  allDays.find(d => d.day === day);

export const getMonthDays = (month: 1 | 2 | 3): CurriculumDay[] =>
  allDays.filter(d => d.month === month);

export const getWeekDays = (week: number): CurriculumDay[] =>
  allDays.filter(d => d.week === week);

export { month1Days, month2Days, month3Days };
