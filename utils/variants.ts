import { Variants } from "framer-motion";

export const SidebarAnimation: Variants = {
  hidden: {
    translateX: "100%",
  },
  visible: {
    translateX: "0%",
    transition: {
      duration: 0.3,
    },
  },
  exit: {
    translateX: "100%",
    transition: {
      duration: 0.2,
    },
  },
};
