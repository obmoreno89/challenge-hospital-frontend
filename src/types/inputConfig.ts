export interface InputConfig {
  logo?: boolean;
  success?: string;
  name: string;
  label: string;
  type: string;
  placeholder?: string;
  options?: Options[];
  titleLanding?: string;
  validation: {
    required?: string;
    maxLength?: {
      value: number;
      message?: string;
    };
    pattern?: {
      value: RegExp;
      message: string;
    };
    validate?: Record<string, (value: any) => string | boolean>;
  };
}

export interface Options {
  value: number | string;
  label: string;
}

export interface FormInputProps extends InputConfig {
  register: any;
  error?: {
    message?: string;
  };
}
