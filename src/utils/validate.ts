export default function validate(value: any, validate: any) {
  if (validate) {
    validate(value);
  }
}
