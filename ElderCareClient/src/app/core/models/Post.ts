export class Post {
  title: string;
  description: string;
  postGenderType: PostGenderType;
  body: string;
  isDeleted: boolean;
  createdDate?: Date;
  updatedDate?: Date;
  createdBy?: string;
  updatedBy?: string;

  constructor( title: string, description: string, postGenderType: PostGenderType, body: string, isDeleted: boolean, createdDate: Date, updatedDate: Date, createdBy: string, updatedBy: string) {
    this.title = title;
    this.description = description;
    this.postGenderType = postGenderType;
    this.body = body;
    this.isDeleted = isDeleted;
    this.createdDate = createdDate;
    this.updatedDate = updatedDate;
    this.createdBy = createdBy;
    this.updatedBy = updatedBy;
  }
}

export enum PostGenderType {
  Male = 'Male',
  Female = 'Female',
  Other = 'Other',
}
