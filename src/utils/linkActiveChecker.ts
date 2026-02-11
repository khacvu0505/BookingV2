interface MenuItemWithRoute {
  routePath: string;
  [key: string]: unknown;
}

interface MenuGroup {
  items?: MenuItemWithRoute[];
  [key: string]: unknown;
}

// is active parent check
export const isActiveParent = (data: MenuGroup[] = [], path: string): boolean | undefined => {
  if (data?.length !== 0) {
    return data?.some(({ items }) =>
      items?.some(
        (menu) =>
          menu.routePath.replace(/\/\d+/, "") === path.replace(/\/\d+/, "")
      )
    );
  }
};

// is active parent child check
export const isActiveParentChaild = (data: MenuItemWithRoute[] = [], path: string): boolean | undefined => {
  if (data?.length !== 0) {
    return data?.some(
      (menu) =>
        menu.routePath.replace(/\/\d+/, "") === path.replace(/\/\d+/, "")
    );
  }
};

// is active link check
export const isActiveLink = (menuPath: string, routePath: string): boolean | undefined => {
  if (menuPath && routePath) {
    return menuPath.replace(/\/\d+/, "") === routePath.replace(/\/\d+/, "");
  }
};
