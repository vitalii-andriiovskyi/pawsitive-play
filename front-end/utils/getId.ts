const getId = () => {
  if (typeof window === "undefined") {
    return "";
  }
  const crypto = window?.crypto || window?.Crypto;
  const array = new Uint32Array(1);
  return crypto?.getRandomValues(array)?.toString() || "";
};

export default getId;
