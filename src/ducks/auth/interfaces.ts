export interface AuthState {
  isLoading: boolean;
  isLogged: boolean;
  error: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  username: string;
  email: string;
  password: string;
}
