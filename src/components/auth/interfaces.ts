export type AuthFormProps = {
  isSubmitEnabled: boolean;
  changeFormType: () => void;
};

export interface LoginValue {
  email: string;
  password: string;
}

export interface RegisterValue {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}
