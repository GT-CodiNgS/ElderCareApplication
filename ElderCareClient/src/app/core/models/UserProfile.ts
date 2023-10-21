export class UserProfile {
  Id: string;
  FirstName: string;
  LastName?: string;
  Email?: string;
  Password?: string;
  Phone?: string;
  Address?: string;
  City?: string;
  IsDeleted: boolean;
  IsVerfied: boolean;
  Username: string;
  RoleType: string;
  PasswordHash?: Uint8Array;
  PasswordSalt?: Uint8Array;
  RefreshToken?: string;
  Token?: string;
  TokenCreated?: Date;
  TokenExpires?: Date;
  CreatedDate: Date;
  UpdatedDate: Date;
  CreatedBy: string;
  UpdatedBy: string;

  constructor(
    Id: string,
    FirstName: string,
    LastName: string,
    Email: string,
    Password: string,
    Phone: string,
    Address: string,
    City: string,
    IsDeleted: boolean,
    IsVerfied: boolean,
    Username: string,
    RoleType: string,
    PasswordHash: Uint8Array,
    PasswordSalt: Uint8Array,
    RefreshToken: string,
    Token: string,
    TokenCreated: Date,
    TokenExpires: Date,
    CreatedDate: Date,
    UpdatedDate: Date,
    CreatedBy: string,
    UpdatedBy: string
  ) {
    this.Id = Id;
    this.FirstName = FirstName;
    this.LastName = LastName;
    this.Email = Email;
    this.Password = Password;
    this.Phone = Phone;
    this.Address = Address;
    this.City = City;
    this.IsDeleted = IsDeleted;
    this.IsVerfied = IsVerfied;
    this.Username = Username;
    this.RoleType = RoleType;
    this.PasswordHash = PasswordHash;
    this.PasswordSalt = PasswordSalt;
    this.RefreshToken = RefreshToken;
    this.Token = Token;
    this.TokenCreated = TokenCreated;
    this.TokenExpires = TokenExpires;
    this.CreatedDate = CreatedDate;
    this.UpdatedDate = UpdatedDate;
    this.CreatedBy = CreatedBy;
    this.UpdatedBy = UpdatedBy;
  }
}
