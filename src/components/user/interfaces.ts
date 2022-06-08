export interface UsernameValue {
  username: string;
}

export interface EmailValue {
  email: string;
}

export interface PasswordValue {
  newPassword: string;
  confirmPassword: string;
  currentPassword: string;
}

export interface activeButtons {
  username: boolean;
  email: boolean;
  password: boolean;
}
