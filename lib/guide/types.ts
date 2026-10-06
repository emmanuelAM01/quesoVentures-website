// The Queso Guide — types for the queso_guide schema.
//
// COPY. The source of truth is queso-portal/packages/supabase/src/guide.ts,
// next to the migration that defines the tables
// (queso-portal/supabase/migrations/088_queso_guide.sql). This repo cannot
// import from the portal, so when a column changes, change it there first and
// paste the new version here.

export type GuideStatus = 'draft' | 'published' | 'archived';
export type GuideMembership = 'member' | 'not_member';
export type GuideEventType = 'pageview' | 'cta_click' | 'badge_click';
export type GuideReferrerClass = 'ai' | 'search' | 'social' | 'direct' | 'other';

/**
 * The heading over an article's item cards (migration 090). Stored as a key;
 * the words are here, so rewording one changes every article at once.
 */
export type GuideItemsLabel = 'get' | 'order' | 'book' | 'best' | 'ask';

export const GUIDE_ITEMS_LABELS: Record<GuideItemsLabel, { heading: string; fits: string }> = {
  get: { heading: 'What to Get', fits: 'General' },
  order: { heading: 'What to Order', fits: 'Food and drink' },
  book: { heading: 'What to Book', fits: 'Appointments and lessons' },
  best: { heading: 'What They Do Best', fits: 'Trades and services' },
  ask: { heading: 'What to Ask For', fits: 'Shops where you ask at the counter' },
};

/** The article's own choice if it made one, otherwise its category's. */
export function guideItemsHeading(
  article: { items_label?: GuideItemsLabel | null },
  category?: { items_label?: GuideItemsLabel | null } | null,
): string {
  const key = article.items_label ?? category?.items_label ?? 'get';
  return (GUIDE_ITEMS_LABELS[key] ?? GUIDE_ITEMS_LABELS.get).heading;
}

export type GuideDay =
  | 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';

export const GUIDE_DAYS: GuideDay[] = [
  'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday',
];

/** One row of opening hours. Times are 24 hour "HH:MM", local to the business. */
export type GuideHours = { days: GuideDay[]; opens: string; closes: string };
export type GuideWhatToGet = { name: string; description: string };
export type GuideFaq = { question: string; answer: string };
export type GuideGalleryImage = { path: string; alt: string; caption?: string | null };
/** One photo in the header. The first is the cover (migration 089). */
export type GuideHeroImage = { path: string; alt: string };

export type GuideCity = {
  id: string;
  slug: string;
  name: string;
  region: string;
  sort_order: number;
  created_at: string;
};

export type GuideCategory = {
  id: string;
  slug: string;
  name: string;
  plural_name: string;
  schema_type: string;
  sensitive: boolean;
  /** Default heading for its articles' item cards. */
  items_label: GuideItemsLabel;
  sort_order: number;
};

export type GuideArticle = {
  id: string;
  slug: string;
  city_id: string | null;
  category_id: string | null;
  status: GuideStatus;
  membership: GuideMembership;
  client_id: string | null;
  author_name: string;

  business_name: string;
  headline: string | null;
  dek: string | null;
  story: string | null;
  owner_quote: string | null;
  owner_quote_attribution: string | null;
  what_to_get: GuideWhatToGet[];
  /** Overrides the category's heading for the item cards. NULL = use the category's. */
  items_label: GuideItemsLabel | null;
  good_to_know: string[];
  who_its_for: string | null;
  faqs: GuideFaq[];

  street_address: string | null;
  area: string | null;
  locality: string | null;
  region: string | null;
  postal_code: string | null;
  /**
   * The towns its customers come from (migration 110). The city is the one
   * town it is in, and says it everywhere; area, locality and region above are
   * no longer read.
   */
  serves_city_ids: string[];
  latitude: number | null;
  longitude: number | null;
  phone: string | null;
  website_url: string | null;
  maps_url: string | null;
  instagram_url: string | null;
  same_as: string[];
  hours: GuideHours[];
  price_range: string | null;
  known_for: string | null;
  how_to_order: string | null;
  catering_info: string | null;
  parking: string | null;

  /** The header photos, in order. Source of truth since 089. */
  hero_images: GuideHeroImage[];
  /** Always hero_images[0], kept in step by a trigger. Read it, never write it. */
  hero_image_path: string | null;
  hero_image_alt: string | null;
  gallery: GuideGalleryImage[];

  seo_title: string | null;
  seo_description: string | null;

  visited_on: string | null;
  published_at: string | null;
  last_verified_at: string | null;
  created_at: string;
  updated_at: string;
};

export type GuideRedirect = {
  id: string;
  from_path: string;
  to_path: string;
  created_at: string;
};

export type GuideEvent = {
  id: string;
  article_id: string;
  type: GuideEventType;
  referrer_host: string | null;
  referrer_class: GuideReferrerClass;
  created_at: string;
};

// Everything with a database default is optional on insert.
type Defaulted<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

type ArticleDefaults =
  | 'id' | 'status' | 'membership' | 'author_name' | 'created_at' | 'updated_at'
  | 'what_to_get' | 'good_to_know' | 'faqs' | 'hours' | 'gallery' | 'same_as' | 'hero_images';
type ArticleNullable = {
  [K in keyof GuideArticle]: null extends GuideArticle[K] ? K : never;
}[keyof GuideArticle];

export type GuideArticleInsert = Partial<Pick<GuideArticle, ArticleNullable | ArticleDefaults>> &
  Pick<GuideArticle, 'slug' | 'business_name'>;
export type GuideArticleUpdate = Partial<Omit<GuideArticle, 'id' | 'created_at'>>;

/** The queso_guide entry in `Database`, in the shape supabase-js expects. */
export type QuesoGuideSchema = {
  Tables: {
    cities: {
      Row: GuideCity;
      Insert: Defaulted<GuideCity, 'id' | 'sort_order' | 'created_at'>;
      Update: Partial<GuideCity>;
      Relationships: [];
    };
    categories: {
      Row: GuideCategory;
      Insert: Defaulted<GuideCategory, 'id' | 'schema_type' | 'sensitive' | 'sort_order' | 'items_label'>;
      Update: Partial<GuideCategory>;
      Relationships: [];
    };
    articles: {
      Row: GuideArticle;
      Insert: GuideArticleInsert;
      Update: GuideArticleUpdate;
      Relationships: [
        {
          foreignKeyName: 'articles_city_id_fkey';
          columns: ['city_id'];
          isOneToOne: false;
          referencedRelation: 'cities';
          referencedColumns: ['id'];
        },
        {
          foreignKeyName: 'articles_category_id_fkey';
          columns: ['category_id'];
          isOneToOne: false;
          referencedRelation: 'categories';
          referencedColumns: ['id'];
        },
      ];
    };
    redirects: {
      Row: GuideRedirect;
      Insert: Defaulted<GuideRedirect, 'id' | 'created_at'>;
      Update: Partial<GuideRedirect>;
      Relationships: [];
    };
    events: {
      Row: GuideEvent;
      Insert: Defaulted<GuideEvent, 'id' | 'created_at' | 'referrer_host'>;
      Update: Partial<GuideEvent>;
      Relationships: [
        {
          foreignKeyName: 'events_article_id_fkey';
          columns: ['article_id'];
          isOneToOne: false;
          referencedRelation: 'articles';
          referencedColumns: ['id'];
        },
      ];
    };
  };
  Views: Record<string, never>;
  Functions: {
    article_path: {
      Args: { p_city_id: string; p_category_id: string; p_slug: string };
      Returns: string;
    };
  };
  Enums: Record<string, never>;
  CompositeTypes: Record<string, never>;
};

/** The public path of an article. Must match queso_guide.article_path() in SQL. */
export function guideArticlePath(citySlug: string, categorySlug: string, slug: string): string {
  return `/guide/${citySlug}/${categorySlug}/${slug}`;
}

/** Lowercase, url-safe, hyphen separated. Matches the CHECK on every slug column. */
export function guideSlugify(input: string): string {
  return input
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/['’]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80)
    .replace(/-+$/g, '');
}
