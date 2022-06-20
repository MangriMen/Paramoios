export type AuthFormProps = {
  changeFormType: () => void;
};

export interface RegisterValues {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}
