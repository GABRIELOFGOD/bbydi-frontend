import type { ContentKind } from "./types";

export interface ContentItem {
  _id: string;
  slug?: string;
  kind: ContentKind;
  title: string;
  description?: string;
  context?: string;
  summary?: string;
  category?: string;
  status?: string;
  image?: string;
  imageCaption?: string;
  imageWidth?: number;
  imageAlignment?: "left" | "center" | "right";
  link?: string;
  location?: string;
  type?: string;
  deadline?: string;
  publisher?: string;
  date?: string;
  createdAt?: string;
  document?: string;
  approved: boolean;
  featured?: boolean;
  postedBy?: { _id?: string; name: string; email?: string; position?: string };
}

export interface StaffProfile {
  _id: string;
  name: string;
  position: string;
  image?: string;
  bio?: string;
  accountId?: string;
  category: "leadership" | "staff" | "volunteer";
  active: boolean;
  displayOrder?: number;
}

export interface StaffAccount {
  _id: string;
  name: string;
  email: string;
  position: string;
  bio?: string;
  avatar?: string;
  isVerified: boolean;
  isBlocked: boolean;
}
