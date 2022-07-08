export interface UsernameValue {
  username: string;
}

export interface EmailValue {
  email: string;
}

export interface PasswordValue {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface activeButtons {
  username: boolean;
  email: boolean;
  password: boolean;
  avatar: boolean;
}
