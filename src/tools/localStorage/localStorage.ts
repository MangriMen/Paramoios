export function loadFromLocalStorage(key: string, defaultValue: string = '') {
  const value = localStorage.getItem(key);

  if (value === null) {
    localStorage.setItem(key, defaultValue);
    return defaultValue;
  }

  return value;
}

export function saveToLocalStorage(key: string, value: string) {
  localStorage.setItem(key, value);
}
