// validationParams = {
//   minLen: null,
//   maxLen: null,
//   allowRu: false,
// }

export const validate = (str, params) => {
  if (str.length < params.minLen) {
    return false;
  }

  if (str.length > params.maxLen) {
    return false;
  }

  if (!params.allowRu) {
    console.log("asdads")
    const regex = /^[a-zA-Z0-9]+$/;
    if (!regex.test(str)) {
      return false;
    }
  } else {
    const regex = /^[a-zA-Z0-9а-яА-Я]+$/;
    if (!regex.test(str)) {
      return false;
    }
  }

  return true;
}

export const validatePassword = (str) => {
  const regexp = /^[a-zA-Z\d\s\p{P}\s]{6,20}$/u;
  return regexp.test(str);
}
