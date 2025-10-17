/* eslint-disable @typescript-eslint/no-explicit-any */
import cn from "@/front-end/utils/cn";
import TRANSITIONS from "@/front-end/theme/transitions";

const confirmpopup: any = {
  root: {
    className: cn(
      'bg-white text-gray-700 border-1 border-primary-900/35 border-t-1 border-t-primary-900/70 rounded-md shadow-lg shadow-primary-900/55',
      'z-40 transform origin-center',
      'mt-3 absolute left-0 top-0',
      'before:absolute before:w-0 before:-top-3 before:h-0 before:border-transparent before:border-solid before:ml-6 before:border-x-[0.75rem] before:border-b-[0.75rem] before:border-t-0 before:border-b-primary-900 dark:before:border-b-gray-900',
      'dark:border dark:border-blue-900/40 dark:bg-gray-900  dark:text-white/80'
    )
  },
  content: 'p-5 items-center flex',
  icon: 'text-2xl',
  message: 'ml-4',
  footer: 'flex gap-2 justify-end align-center text-right px-5 py-5 pt-0',
  transition: TRANSITIONS.overlay
}

export default confirmpopup;