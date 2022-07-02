export type AuthFormProps = {
  changeFormType: () => void;
};

export interface LoginValues {
  email: string;
  password: string;
}

export interface RegisterValues {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}
