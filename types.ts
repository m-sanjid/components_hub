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
  isLive?: boolean;
  description: string;
  downloadUrl?: string;
  image: string;
  category: string;
  tags: string[];
  featured: boolean;
  previewUrl?: string;
  codeUrl?: string;
  price?: number;
  features?: {
    title: string;
    description: string[];
  }[];
  screenshots: string[];
  techStack?: string[];
}

export interface NpmCommands {
  __pnpm__?: string;
  __yarn__?: string;
  __npm__?: string;
  __bun__?: string;
}

export interface UnistNode extends Node {
  type: string;
  name?: string;
  tagName?: string;
  value?: string;
  properties?: {
    __rawString__?: string;
    [key: string]: unknown;
  } & NpmCommands;
  attributes?: {
    name: string;
    value: unknown;
    type?: string;
  }[];
  children?: UnistNode[];
}

export interface UnistTree extends Node {
  children: UnistNode[];
}
