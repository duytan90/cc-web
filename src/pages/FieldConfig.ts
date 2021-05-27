export const registerFields: Array<{
  label: string;
  name: string;
  type?: string;
}> = [
  {
    label: "Username",
    name: "username",
  },
  {
    label: "Email",
    name: "email",
    type: "email",
  },
  {
    label: "Password",
    name: "password",
    type: "password",
  },
];

export const loginFields: Array<{
  label: string;
  name: string;
  type?: string;
}> = [
  {
    label: "Username Or Email",
    name: "usernameOrEmail",
  },
  {
    label: "Password",
    name: "password",
    type: "password",
  },
];

export const createNewPasswordFields: Array<{
  label: string;
  name: string;
  type?: string;
  placehodler?: string;
}> = [
  {
    label: "New password",
    name: "newPassword",
    placehodler: "New password",
    type: "password"
  },
];

export const forgotPasswordFields: Array<{
  label: string;
  name: string;
  type?: string;
  placehodler?: string;
}> = [
  {
    label: "Email",
    name: "email",
    placehodler: "email",
    type: "email"
  },
];
