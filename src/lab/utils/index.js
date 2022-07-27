function isFalse(value) {
  return value === 0 ? true : !value;
}

export function objectClean(inputObjects) {
  const paramObj = { ...inputObjects };

  Object.keys(paramObj).forEach((key) => {
    if (isFalse(paramObj[key])) {
      delete paramObj[key];
    }
  });

  return paramObj;
}
