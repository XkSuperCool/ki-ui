export default function(value: any, validate?: (status: boolean) => Promise<boolean>) {
  if (validate && typeof validate === 'function') {
    validate(value);
  }
}
