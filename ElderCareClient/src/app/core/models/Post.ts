export interface Post {
  id: string;
  title: string;
  description: string;
  postGenderType: PostGenderType;
  body: string;
  createdDate?: Date;
  updatedDate?: Date;
  createdBy?: string;
  updatedBy?: string;
}

export enum PostGenderType {
  Male = 'Male',
  Female = 'Female',
  Other = 'Other',
}
