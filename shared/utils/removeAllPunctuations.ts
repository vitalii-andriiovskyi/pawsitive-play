const removeAllPunctuations = (str: string) => {
  return str.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "");
};

export default removeAllPunctuations;