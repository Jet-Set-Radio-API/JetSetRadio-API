export const isValidJson = (text) => {
  try {
    JSON.parse(JSON.stringify(text));
    return true;
  } catch {
    return false;
  }
};
