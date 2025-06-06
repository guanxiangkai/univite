declare module '@/pages.json' {
  interface PageItem {
    path: string;
    name?: string;
  }

  interface SubPackage {
    root: string;
    pages: PageItem[];
  }

  const pagesJson: {
    pages: PageItem[];
    subPackages?: SubPackage[];
    tabBar?: any;
  };

  export default pagesJson;
}
