import { SubmitErrorHandler } from 'react-hook-form';
import { toast } from 'sonner';

const isEnglishOnly = (message: string) => /^[\x00-\x7F]+$/.test(message);

const findFirstErrorMessage = (errorObj: any, path: string = ''): string | undefined => {
  if (!errorObj || typeof errorObj !== 'object') return undefined;

  if ('message' in errorObj && typeof errorObj.message === 'string') {
    const message = errorObj.message;
    return isEnglishOnly(message) ? `${path}: ${message}` : message;
  }

  if (Array.isArray(errorObj)) {
    for (let i = 0; i < errorObj.length; i++) {
      const nested = findFirstErrorMessage(errorObj[i], `${path}[${i}]`);
      if (nested) return nested;
    }
  } else {
    for (const key in errorObj) {
      const nestedPath = path ? `${path}.${key}` : key;
      const nested = findFirstErrorMessage(errorObj[key], nestedPath);
      if (nested) return nested;
    }
  }

  return undefined;
};

export const formErrorHandler: SubmitErrorHandler<any> = errors => {
  const message = findFirstErrorMessage(errors);

  if (message) {
    toast.error(message);
  }

  console.error('Form validation error:', errors);
};
