export interface homeInterface {
  logo: string;
  setting: {
    id: number;
    domain: string;
    maint_mode: string;
    default_lang: string;
    social_facebook: string;
    social_x: string;
    social_insta: string;
    social_linkedin: string;
    social_snap: string;
    social_tiktok: string;
    created_at: string;
    updated_at: string;
    title_ar: string;
    description_ar: string;
    keywords_ar: string;
    title_en: string;
    description_en: string;
    keywords_en: string;
    hero_video: string;
    hero_title_ar: string | null;
    hero_title_en: string;
    hero_description_ar: string | null;
    hero_description_en: string;
    logo: string;
  };
  services: Array<{
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
  }>;
  blogs: Array<blogsInterface>;
  team: Array<teamsInterface>;
  stats: Array<statsInterface>;
  testimonials: Array<testimonialsInterface>;
  mission: Array<missionInterface>;
  vission: Array<vissionInterface>;
  contact: Array<{
    id: number;
    email: string;
    phone: string;
    address: string;
    created_at: string;
    updated_at: string;
  }>;
  portfolio: Array<{
    id: number;
    image: string;
    title_ar: string;
    title_en: string;
    content_ar: string;
    content_en: string;
    keywords_ar: string;
    keywords_en: string;
    description_ar: string;
    description_en: string;
    status: string;
    client: string;
    start_date: string;
    end_date: string;
    website_link: string;
    created_at: string;
    updated_at: string;
  }>;
}

export interface missionInterface {
  id: number;
  image: string;
  title_ar: string;
  title_en: string;
  sub_title_ar: string;
  sub_title_en: string;
  description_ar: string;
  description_en: string;
  created_at: string;
  updated_at: string;
}

export interface vissionInterface {
  id: number;
  image: string;
  created_at: string;
  updated_at: string;
  title_ar: string;
  sub_title_ar: string;
  description_ar: string;
  title_en: string;
  sub_title_en: string;
  description_en: string;
}

export interface statsInterface {
  id: number;
  stat1: string;
  stat2: string;
  stat3: string;
  stat4: string;
  created_at: string;
  updated_at: string;
  title_ar: string;
  sub_title_ar: string;
  title_en: string;
  sub_title_en: string;
}

export interface teamsInterface {
  id: number;
  image: string;
  created_at: string;
  updated_at: string;
  name_ar: string;
  position_ar: string;
  name_en: string;
  position_en: string;
}

export interface testimonialsInterface {
  id: number;
  image: string;
  name: string;
  company: string;
  created_at: string;
  updated_at: string;
  message_ar: string;
  message_en: string;
}

export interface blogsInterface {
  id: number;
  image: string;
  created_at: string;
  updated_at: string;
  title_ar: string;
  content_ar: string;
  keywords_ar: string;
  description_ar: string;
  title_en: string;
  content_en: string;
  keywords_en: string;
  description_en: string;
  tags_ar: string | null;
  tags_en: string;
}

export interface aboutUsVideoInterface {
  id: number;
  content_ar: string;
  content_en: string;
  created_at: string;
  updated_at: string;
}
