export interface UserSettingsState {
  error: string;
  loading: {
    username: boolean;
    email: boolean;
    password: boolean;
    image: boolean;
  };
}
