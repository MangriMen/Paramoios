export function loadObjectFromDisk(key: string): any {
  const objString = localStorage.getItem(key);

  if (!objString === null) {
    throw new Error('This key is not in the localstorage');
  }

  return JSON.parse(objString ?? '');
}

export function dumpObjectToDisk(key: string, value: { [x: string]: any }) {
  localStorage.setItem(
    key,
    JSON.stringify(value, (_key, value) =>
      value instanceof Set ? [...value] : value,
    ),
  );
}

export function loadOrInitObjectFromDisk(key: string, defaultValue: any) {
  try {
    return loadObjectFromDisk(key);
  } catch {
    dumpObjectToDisk(key, defaultValue);
    return defaultValue;
  }
}
