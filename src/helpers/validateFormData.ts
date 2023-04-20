const EMAIL_REGEX =
  /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
const UPPERCASE_REGEX = /[A-Z]/;
const LOWERCASE_REGEX = /[A-Z]/;
const SPECIALCHARS_REGEX = /[!@#$%^&*]/;

export const validateFormData = (
  email: string,
  password: string,
  confirmPassword: string
) => {
  const validEmail = EMAIL_REGEX.test(email!);
  const validPassword =
    password!.length > 7 &&
    LOWERCASE_REGEX.test(password!) &&
    UPPERCASE_REGEX.test(password!) &&
    SPECIALCHARS_REGEX.test(password!);
  let validConfirmPassword = true;
  if (confirmPassword.length > 0) {
    validConfirmPassword = password === confirmPassword;
  }

  return {
    validEmail,
    validPassword,
    validConfirmPassword
  }
};
