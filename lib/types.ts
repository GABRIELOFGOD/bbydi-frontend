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
}

