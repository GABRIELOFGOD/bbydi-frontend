import { Icon } from "lucide-react";

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
  date: Date | string;
  title: string;
  content: string;
  publisher?: string;
}

export interface PublicationType {
  id: string;
  title: string;
  desc: string;
  text?: string;
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