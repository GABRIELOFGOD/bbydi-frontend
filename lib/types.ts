import { Icon } from "lucide-react";

export enum UserRole {
  ADMIN = "admin",
  STAFF = "staff"
}

export type ContentKind =
  | "program"
  | "project"
  | "news"
  | "blog"
  | "opportunity"
  | "report"
  | "publication"
  | "partner"
  | "innovation";

export interface ProjectCardTypes {
  id: string;
  category: string;
  status: string;
  title: string;
  context: string;
  desc: string;
  image: string;
};

export interface NewTypes {
  id: string;
  slug?: string;
  date: Date | string;
  title: string;
  content: string;
  publisher?: string;
  publisherUser?: { _id?: string; name: string; position?: string; avatar?: string };
}

export interface PublicationType {
  id: string;
  title: string;
  desc: string;
  text?: string;
  fileUrl?: string;
}

export interface MissionVisionType {
  id: string;
  track: string;
  title: string;
  desc: string;
  cta?: {
    text: string;
    link?: string;
  }
}

export interface ProgrammingAreasTypes {
 sn: string;
 title: string;
 description: string;
 project: string;
 image: string;
}

export interface OpportunityTypes {
  id: string;
  title: string;
  desc?: string;
  status: string;
  image?: string;
  link: string;
  location?: string;
  type?: string;
  deadline?: string;
}

export interface CardTypes {
  id: number;
  title: string;
  text: string;
  value: number;
  icon?: string | typeof Icon;
}

export interface User {
  _id?: string;
  name: string;
  avatar: string;
  email: string;
  role: UserRole;
  position: string;
  bio?: string;
}
