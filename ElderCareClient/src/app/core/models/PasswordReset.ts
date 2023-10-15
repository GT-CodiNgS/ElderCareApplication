export class PasswordReset{
  userid:number;
  password:string;
  confirmPassword:string;

  constructor(userid: number, password: string, confirmPassword: string) {
    this.userid = userid;
    this.password = password;
    this.confirmPassword = confirmPassword;
  }
}
