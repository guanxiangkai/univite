export interface RouteMeta {
  isTabPage?: boolean;

  [key: string]: any;
}

export interface Route {
  path: string;
  name?: string;
  meta?: RouteMeta;
}

export interface TabBarItem {
  pagePath: string;

  [key: string]: any;
}

export interface PageItem {
  path: string;
  name?: string;

  [key: string]: any;
}

export interface SubPackageItem {
  root: string;
  pages: PageItem[];
}

