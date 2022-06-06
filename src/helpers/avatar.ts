type StringOrEmpty = string | null | undefined;

/**
 * @used For automatically generated avatar colors.
 * @param string Any string to get hash from.
 * @returns Color (as a hash string from input value) or undefined.
 */
export function stringToColor(string: StringOrEmpty): string | undefined {
  if (string === undefined || string === null) return undefined;

  let hash = 0;

  /* eslint-disable no-bitwise */
  for (let i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (let i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

/**
 * @used For automatically generated avatars.
 * @param name - Username.
 * @returns First letter of name variable or undefined.
 */
export function stringAvatar(name: StringOrEmpty): string | undefined {
  return name === undefined || name === null ? undefined : `${name.charAt(0)}`;
}
