export interface UserState {
  isLoading: boolean;
  error: string;
  user: {
    avatar: string;
    username: string;
    email: string;
    isEmailVerified: boolean;
  };
}

export interface FetchUserPayload {
  username: string;
  email: string;
  avatar: string;
  isEmailVerified: boolean;
}
