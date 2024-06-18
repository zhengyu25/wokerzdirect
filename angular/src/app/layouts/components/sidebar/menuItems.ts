//Metadata
export interface RouteInfo {
  path: string;
  title: string;
  type: string;
  icontype: string;
  collapse?: string;
  isCollapsed?: boolean;
  isCollapsing?: any;
  children?: ChildrenItems[];
}

export interface ChildrenItems {
  path: string;
  title: string;
  smallTitle?: string;
  type?: string;
  collapse?: string;
  children?: ChildrenItems2[];
  isCollapsed?: boolean;
}

export interface ChildrenItems2 {
  path?: string;
  smallTitle?: string;
  title?: string;
  type?: string;
}

//Menu Items
export const MenuRoutes: RouteInfo[] = [
  {
    path: "/dashboard",
    title: "Dashboard",
    type: "link",
    icontype: "",
  },
  {
    path: "/users",
    title: "Users",
    type: "link",
    icontype: "",
  },
]