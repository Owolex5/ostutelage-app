// data/menuData.ts
export interface Menu {
  id: number;
  title: string;
  path: string; // Changed from optional to required
  newTab: boolean;
  submenu?: Menu[]; // Submenu items have the same structure
}

const menuData: Menu[] = [
  {
    id: 1,
    title: "Home",
    newTab: false,
    path: "/",
  },
  {
    id: 2,
    title: "About",
    newTab: false,
    path: "/about",
  },
  {
    id: 3,
    title: "Career",
    newTab: false,
    path: "/career",
    submenu: [
      {
        id: 31,
        title: "Become a Faculty",
        newTab: false,
        path: "/career/faculty",
      },
      {
        id: 32,
        title: "Write for OsTutelage",
        newTab: false,
        path: "/career/write",
      },
    ],
  },
  {
    id: 4,
    title: "School",
    newTab: false,
    path: "/schools",
  },
  {
    id: 5,
    title: "Pricing",
    newTab: false,
    path: "/pricing",
  },
  {
    id: 6,
    title: "Contact",
    newTab: false,
    path: "/support",
  },
];

export default menuData;