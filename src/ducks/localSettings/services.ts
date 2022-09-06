import { LocalSettingsState, SettingPayload } from './interfaces';

export function preAction(payload: SettingPayload) {
  if (payload.key === 'theme') {
    document.body.classList.add('smoothColor');
  }
}

export function postAction({
  payload,
  state,
  setThemeTimer,
}: {
  payload: SettingPayload;
  state: LocalSettingsState;
  setThemeTimer: (timer: NodeJS.Timer) => void;
}) {
  clearInterval(state.themeChangeTimer);

  const timerId = setTimeout(() => {
    document.body.classList.remove('smoothColor');
  }, 1000);

  setThemeTimer(timerId);
}
