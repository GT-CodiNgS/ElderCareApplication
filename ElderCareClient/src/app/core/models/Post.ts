export class Post {
  id: string;
  title: string;
  description: string;
  postGenderType: PostGenderType;
  body: string;
  isDeleted: boolean;
  createdDate?: Date;
  updatedDate?: Date;
  createdBy?: string;
  updatedBy?: string;
  isVerified: boolean;

  constructor(
    id: string,
    title: string,
    description: string,
    postGenderType: PostGenderType,
    body: string,
    isDeleted: boolean,
    createdDate: Date,
    updatedDate: Date,
    createdBy: string,
    updatedBy: string,
    isVerified: boolean
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.postGenderType = postGenderType;
    this.body = body;
    this.isDeleted = isDeleted;
    this.createdDate = createdDate;
    this.updatedDate = updatedDate;
    this.createdBy = createdBy;
    this.updatedBy = updatedBy;
    this.isVerified = isVerified;
  }
}

export enum PostGenderType {
  Male = 'Male',
  Female = 'Female',
  Other = 'Other',
}
