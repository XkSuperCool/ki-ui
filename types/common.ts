export type ComponentSize = 'small' | 'medium' | 'large';
export type StatusType = 'success' | 'info' | 'error' | 'warning';
export type Props<T> = T extends (...args: infer P) => any ? P : any;
