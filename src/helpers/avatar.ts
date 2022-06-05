/**
 * Used to get color as a hash of the input string for automatically generated avatars
 * @param string any string, can be user name/nickname
 * @returns color in hex with alpha, calculated as a hash of the input string
 */
export function stringToColor(string: string | null | undefined) {
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
 * Used to get  first letter of the input string for automatically generated avatars
 * @param name - real name/nikname
 * @returns first letter of name
 */
export function stringAvatar(name: string | null | undefined) {
  return name === undefined || name === null ? undefined : `${name.charAt(0)}`;
}
