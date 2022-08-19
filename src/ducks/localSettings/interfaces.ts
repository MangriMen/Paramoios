export interface LocalSettings {
  theme: string;
}
export interface LocalSettingsState extends LocalSettings {
  error: string;
}

export type SettingPayload = { key: keyof LocalSettings; value: string };
