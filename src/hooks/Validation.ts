import { IUser } from "../Components/Login/Login";

export const Validation = ({email,password}: IUser) => {
  const error: IUser = {} as IUser;
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (!email || !re.test(email)) {
    error.email = "Invalid email address!"
  } else {
    error.email = "";
  }

  if (!password) {
    error.password = "Invalid password"
  } else if (password.length < 6) {
    error.password = "Your password must be longer than 6"
  }
  else {
    error.password = ""
  }

  return error;
}