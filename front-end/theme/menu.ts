/* eslint-disable @typescript-eslint/no-explicit-any */
import { MenuPassThroughOptions } from "primereact/menu";
import cn from "@/front-end/utils/cn";
import TRANSITIONS from "./transitions";

const menu: MenuPassThroughOptions = {
  root: () => 'py-1 bg-white dark:bg-gray-900 text-primary-900 dark:text-white/80 border border-primary-900/20 dark:border-blue-900/40 rounded-md w-48',
  menu: {
    className: cn('m-0 p-0 list-none', 'outline-none')
  },
  content: function content(_ref99: any) {
    const state = _ref99.state;
    return {
      className: cn('text-primary dark:text-white/80 transition-shadow duration-200 rounded-none',
        'hover:text-primary-900 dark:hover:text-white/80',
        // Hover
        {
          'hover:bg-primary-900/5 text-gray-700 dark:text-white/80 dark:bg-gray-800/90': state.focused
        })
    };
  },
  action: {
    className: cn('text-primary-900 font-[500] dark:text-white/80 p-3 select-none',
      'hover:cursor-pointer flex items-center no-underline overflow-hidden relative')
  },
  menuitem: {
    className: cn('hover:bg-primary-900/3')
  },
  icon: () => 'text-primary-900/90 dark:text-white/70 mr-2',
  submenuHeader: {
    className: cn('m-0 p-3 text-gray-700 dark:text-white/80 bg-white dark:bg-gray-900 font-bold rounded-tl-none rounded-tr-none')
  },
  separator: () => 'border-t border-gray-300 dark:border-blue-900/40 my-1',
  transition: TRANSITIONS.overlay
}

export default menu