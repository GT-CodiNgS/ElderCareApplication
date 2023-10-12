export interface UserProfile {
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
  Username?: string;
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
}
