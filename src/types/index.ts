export interface Experience {
  title: string;
  info: string;
  description: string[];
  pic_uri: string;
}

export interface Project {
  name: string;
  logo_uri?: string;
  preview_uri?: string;
  stack: string;
  description: string;
  link: string;
}
