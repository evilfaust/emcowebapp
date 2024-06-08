import { TbNews } from "react-icons/tb";
import { AiOutlineHome } from "react-icons/ai";

export * from "./Bottom Navbar/index";
export * from "./Footer/index";
export * from "./Navbar/index";
export { Navbar as Navigation } from './Navbar/index'; // Исправленное имя экспорта

export const pages = [
  {
    label: "Главная",
    value: "/main",
    icon: <AiOutlineHome />,
    to: "/",
  },
  {
    label: "Новости",
    value: "/news",
    icon: <TbNews />,
    to: "/news",
  },
  
];
