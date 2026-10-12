import type { ContentKind } from "./types";

export interface ContentItem {
  _id: string;
  kind: ContentKind;
  title: string;
  description?: string;
  context?: string;
  summary?: string;
  category?: string;
  status?: string;
  image?: string;
  link?: string;
  location?: string;
  type?: string;
  deadline?: string;
  publisher?: string;
  date?: string;
  document?: string;
  approved: boolean;
  postedBy?: { name: string; email: string };
}

export interface StaffProfile {
  _id: string;
  name: string;
  position: string;
  image?: string;
  category: "leadership" | "staff";
  active: boolean;
}

export interface StaffAccount {
  _id: string;
  name: string;
  email: string;
  position: string;
  avatar?: string;
  isVerified: boolean;
  isBlocked: boolean;
}
