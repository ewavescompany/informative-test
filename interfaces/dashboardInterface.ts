export interface BlogInterface {
  content_ar: string; // Arabic content in HTML format
  content_en: string; // English content in HTML format
  created_at: string; // Date when the blog was created (ISO format)
  description_ar: string; // Description in Arabic
  description_en: string; // Description in English
  id: number; // Blog ID
  image: string; // Image filename or URL
  keywords_ar: string; // Keywords in Arabic
  keywords_en: string; // Keywords in English
  tags_ar: string | null; // Tags in Arabic (nullable)
  tags_en: string | null; // Tags in English (nullable)
  title_ar: string; // Title in Arabic
  title_en: string; // Title in English
  updated_at: string; // Date when the blog was last updated (ISO format)
}

export interface DashboardResponse {
  blogs_count: number;
  latest_blogs: BlogInterface[];
  portfolio_count: number;
  latest_portfolio: Portfolio[];
  team_count: number;
  users_count: number;
  services_count: number;
}

export interface BlogsState {
  data: BlogInterface[];
  // Add other fields like pagination or metadata if necessary
}

export interface Portfolio {
  id: number;
  client: string;
  title_ar: string;
  title_en: string;
  content_ar: string;
  content_en: string;
  description_ar: string;
  description_en: string;
  keywords_ar: string;
  keywords_en: string;
  status: string;
  start_date: string;
  end_date: string;
  image: string;
  website_link: string;
  created_at: string;
  updated_at: string;
  portfolio_images: PortfolioImages[];
}

export interface PortfoliosState {
  data: Portfolio[];
  // Add other fields like pagination or metadata if necessary
}

// interfaces/service.ts
export interface Service {
  id: number;
  image: string;
  created_at: string;
  updated_at: string;
  title_ar: string;
  short_description_ar: string;
  long_description_ar: string;
  title_en: string;
  short_description_en: string;
  long_description_en: string;
}

export interface serviceState {
  data: Service[];
  // Add other fields like pagination or metadata if necessary
}

export interface TeamMember {
  id: number;
  image: string;
  created_at: string;
  updated_at: string;
  name_ar: string;
  position_ar: string;
  name_en: string;
  position_en: string;
}

export interface teamState {
  data: TeamMember[];
  // Add other fields like pagination or metadata if necessary
}

export interface Testimonial {
  id: number;
  image: string;
  name: string;
  company: string;
  created_at: string; // ISO date string
  updated_at: string; // ISO date string
  message_ar: string;
  message_en: string;
}

export interface TestimonialState {
  data: Testimonial[];
  // Add other fields like pagination or metadata if necessary
}

export interface statsData {
  id: number;
  stat1: string; // Represents a numeric value (e.g., "150")
  stat2: string; // Represents a numeric value (e.g., "40")
  stat3: string; // Represents a numeric value (e.g., "100")
  stat4: string; // Represents a numeric value (e.g., "1")
  created_at: string; // ISO Date string (e.g., "2024-10-15T12:10:43.000000Z")
  updated_at: string; // ISO Date string (e.g., "2024-10-15T12:10:43.000000Z")
  title_ar: string; // Arabic title (e.g., "تأثيرنا ووصولنا على مر السنين")
  sub_title_ar: string; // Arabic subtitle (e.g., "على مر السنين، قمنا بتوسيع حضورنا...")
  title_en: string; // English title (e.g., "Our impact and reach over the years")
  sub_title_en: string; // English subtitle (e.g., "Over the years, we've expanded our presence...")
}

export interface settings {
  id: number;
  domain: string;
  maint_mode: string; // Assuming "0" and "1" are string representations of boolean values
  default_lang: string;
  social_facebook: string;
  social_x: string;
  social_insta: string;
  social_linkedin: string;
  social_snap: string;
  social_tiktok: string;
  created_at: string; // ISO date format
  updated_at: string; // ISO date format
  title_ar: string | null;
  description_ar: string | null;
  keywords_ar: string | null;
  title_en: string | null;
  description_en: string | null;
  keywords_en: string | null;
  hero_video: string | null; // Assuming this could be a URL or null
  hero_title_ar: string | null;
  hero_title_en: string | null;
  hero_description_ar: string | null;
  hero_description_en: string | null;
  logo: string; // Filename or URL for the logo
}

export interface vision {
  id: number;
  title_ar: string;
  title_en: string;
  sub_title_ar: string;
  sub_title_en: string;
  description_ar: string;
  description_en: string;
  image: string;
  created_at: string; // ISO date format
  updated_at: string; // ISO date format
}

export interface ContentObject {
  id: number;
  content_ar: string;
  content_en: string;
  created_at: string;
  updated_at: string;
}

export interface PortfolioImages {
  id: number;
  image: string;
  portfolio_id: number;
}

export interface ContactInfo {
  id: number;
  email: string;
  phone: string;
  address: string;
  created_at: string; // ISO date format
  updated_at: string; // ISO date format
}
