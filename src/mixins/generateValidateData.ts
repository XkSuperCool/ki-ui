import { ref, toRef } from 'vue';

export default function generateValidateData() {
  const validateStatus = ref(true);

  const validate = (value: any, validate?: (status: boolean) => Promise<boolean>) => {
    if (validate && typeof validate === 'function') {
      validate(value).then((status: boolean) => {
        validateStatus.value = status;
      });
    }
  }

  return {
    validateStatus: toRef({ validateStatus }, 'validateStatus'),
    validate,
  };
};
