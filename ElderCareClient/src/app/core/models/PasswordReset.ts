export class PasswordReset{
  userid:string;
  password:string;
  confirmPassword:string;

  constructor(userid: string, password: string, confirmPassword: string) {
    this.userid = userid;
    this.password = password;
    this.confirmPassword = confirmPassword;
  }
}
