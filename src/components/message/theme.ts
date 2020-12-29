import { StatusType } from '@/types/common';

export interface ThemeOptionValue {
  backgroundColor: string
  borderColor: string
  color: string
  [key: string]: any
}

export type ThemeOption = {
  [key in StatusType]: ThemeOptionValue
}

const themeOptions: ThemeOption = {
  success: {
    backgroundColor: '#e7f6df',
    borderColor: 'var(--success-shallow-color)',
    color: 'var(--success-color)',
  },
  info: {
    backgroundColor: '#efefef',
    borderColor: 'var(--info-shallow-color)',
    color: 'var(--info-color)',
  },
  warning: {
    backgroundColor: '#fff7ef',
    borderColor: 'var(--warning-shallow-color)',
    color: 'var(--warning-color)',
  },
  error: {
    backgroundColor: '#fae6d6',
    borderColor: 'var(--error-shallow-color)',
    color: 'var(--error-color)',
  },
};

export default themeOptions;
