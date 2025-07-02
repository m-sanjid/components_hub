export type Component = {
  code: string;
  Demo?: React.ComponentType;
  meta: {
    title: string;
    description: string;
    slug: string;
    tags?: string[];
    language?: string;
    author?: string;
    createdAt?: string;
    downloads?: number;
    likes?: number;
    usage?: string;
    props?: Array<{
      name: string;
      type: string;
      default: string;
      description: string;
    }>;
    examples?: Array<{
      title: string;
      code: string;
    }>;
  };
};

export type Components = {
  title: string;
  slug?: string;
  description?: string;
  category?: string;
  tags?: string[];
  language?: string;
  author?: string;
  createdAt?: string;
  downloads?: number;
  likes?: number;
  usage?: string;
  props?: Array<{
    name: string;
    type: string;
    default: string;
    description: string;
  }>;
  examples?: Array<{
    title: string;
    code: string;
  }>;
};

export interface Template {
  id: number;
  title: string;
  description: string;
  downloadUrl?: string;
  image: string;
  category: string;
  tags: string[];
  featured: boolean;
  previewUrl: string;
  codeUrl: string;
  price: number;
  rating: number;
  reviews: number;
  features: string[];
  requirements: string[];
  screenshots: string[];
}
