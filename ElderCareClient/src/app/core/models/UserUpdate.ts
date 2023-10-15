export class UserUpdate{
  firstName:string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  city: string;
  username: string
  about: string

  constructor(firstName: string, lastName: string, email: string, password: string, phone: string, address: string, city: string, username: string, about: string) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
    this.phone = phone;
    this.address = address;
    this.city = city;
    this.username = username;
    this.about = about;
  }
}
