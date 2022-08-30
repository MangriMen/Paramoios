export interface LocalSettings {
  theme: string;
}
export interface LocalSettingsState extends LocalSettings {
  error: string;
  themeChangeTimer: NodeJS.Timer;
}

export type SettingPayload = { key: keyof LocalSettings; value: string };
