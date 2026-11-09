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
  theme?: string;
  language?: string;
  series?: string;
  status?: string;
  period?: string;
  funder?: string;
  thematicAreas?: string[];
  on2026Register?: boolean;
  relatedProjectIds?: string[];
  image?: string;
  imageCaption?: string;
  imageAlt?: string;
  imageWidth?: number;
  imageAlignment?: "left" | "center" | "right";
  link?: string;
  location?: string;
  type?: string;
  deadline?: string;
  publisher?: string;
  authorRole?: string;
  readingTime?: string;
  wordCount?: number;
  tags?: string[];
  sourceUrl?: string;
  newsType?: "internal" | "external";
  sourceName?: string;
  date?: string;
  createdAt?: string;
  document?: string;
  approved: boolean;
  featured?: boolean;
  homepageFeatured?: boolean;
  postedBy?: { _id?: string; name: string; email?: string; position?: string; avatar?: string };
  publisherUser?: { _id?: string; name: string; position?: string; avatar?: string };
}

export interface StaffProfile {
  _id: string;
  name: string;
  position: string;
  image?: string;
  bio?: string;
  accountId?: string;
  category: "trustee" | "leadership" | "staff" | "volunteer";
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
