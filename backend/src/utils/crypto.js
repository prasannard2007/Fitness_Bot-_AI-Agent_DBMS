export function maskSecret(value = '') {
  if (!value) return '';
  if (value.length <= 8) return '*'.repeat(value.length);
  return `${value.slice(0, 4)}${'*'.repeat(Math.max(4, value.length - 8))}${value.slice(-4)}`;
}

export function encodeSecret(value = '') {
  if (!value) return null;
  return Buffer.from(value).toString('base64');
}

export function decodeSecret(value = '') {
  if (!value) return '';
  return Buffer.from(value, 'base64').toString('utf8');
}
