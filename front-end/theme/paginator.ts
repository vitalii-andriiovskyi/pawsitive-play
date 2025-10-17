/* eslint-disable @typescript-eslint/no-explicit-any */
// import { PaginatorPassThroughOptions } from "primereact/paginator";
import cn from "@/front-end/utils/cn";

const paginator: any = {
  root: {
    className: cn('flex items-center justify-center flex-wrap', 'bg-white text-gray-500 border-0 px-4 py-2 rounded-md', 'dark:bg-gray-900 dark:text-white/60 dark:border-blue-900/40' // Dark Mode
    )
  },
  firstPageButton: function firstPageButton({ context }: any) {
    return {
      className: cn('relative inline-flex items-center justify-center user-none overflow-hidden leading-none', 'border-0 text-gray-500  min-w-[3rem] h-12 m-[0.143rem] rounded-md', 'transition duration-200', 'dark:text-white',
        'hover:cursor-pointer',
        //Dark Mode
        {
          'cursor-default pointer-events-none opacity-60': context.disabled,
          'focus:outline-none focus:outline-offset-0 focus:ring-[0.2rem] focus:ring-primary-900/25': !context.disabled // Focus
        })
    };
  },
  prevPageButton: function prevPageButton({ context }: any) {
    return {
      className: cn('relative inline-flex items-center justify-center user-none overflow-hidden leading-none', 'border-0 text-gray-500 min-w-[3rem] h-12 m-[0.143rem] rounded-md', 'transition duration-200', 'dark:text-white',
        'hover:cursor-pointer',
        //Dark Mode
        {
          'cursor-default pointer-events-none opacity-60': context.disabled,
          'focus:outline-none focus:outline-offset-0 focus:ring-[0.2rem] focus:ring-primary-900/25': !context.disabled // Focus
        })
    };
  },
  nextPageButton: function nextPageButton({ context }: any) {
    return {
      className: cn('relative inline-flex items-center justify-center user-none overflow-hidden leading-none', 'border-0 text-gray-500 min-w-[3rem] h-12 m-[0.143rem] rounded-md', 'transition duration-200', 'dark:text-white',
        'hover:cursor-pointer',
        //Dark Mode
        {
          'cursor-default pointer-events-none opacity-60': context.disabled,
          'focus:outline-none focus:outline-offset-0 focus:ring-[0.2rem] focus:ring-primary-900/25': !context.disabled // Focus
        })
    };
  },
  lastPageButton: function lastPageButton({ context }: any) {
    return {
      className: cn('relative inline-flex items-center justify-center user-none overflow-hidden leading-none', 'border-0 text-gray-500 min-w-[3rem] h-12 m-[0.143rem] rounded-md', 'transition duration-200', 'dark:text-white',
        'hover:cursor-pointer',
        //Dark Mode
        {
          'cursor-default pointer-events-none opacity-60': context.disabled,
          'focus:outline-none focus:outline-offset-0 focus:ring-[0.2rem] focus:ring-primary-900/25': !context.disabled // Focus
        })
    };
  },
  pageButton: function pageButton({ context }: any) {
    return {
      className: cn('relative inline-flex items-center justify-center user-none overflow-hidden leading-none', 'border-0 text-gray-500 min-w-[3rem] h-12 m-[0.143rem] rounded-md', 'transition duration-200', 'dark:border-blue-300 dark:text-white',
        'hover:cursor-pointer',
        // Dark Mode
        'focus:outline-none focus:outline-offset-0 focus:ring-[0.2rem] focus:ring-primary-900/25',
        // Focus
        {
          'bg-primary-900/5 border-primary-900/5 text-primary-900 dark:bg-blue-300': context.active
        })
    };
  },
  RPPDropdown: {
    root: function root({ props, state }: any) {
      return {
        className: cn('inline-flex relative cursor-pointer user-none', 'bg-white border rounded-md', 'transition duration-200', 'h-12 mx-2', 'dark:bg-gray-950 dark:border-blue-900/40',
          //DarkMode
          {
            'outline-none outline-offset-0 ring-[0.2rem] ring-primary-900/25 border-primary-700': state.focused && !props.disabled,
            //Focus
            'border-gray-300': !state.focused,
            'hover:border-primary-900/60': !props.disabled //Hover
          })
      };
    },
    input: {
      className: cn('font-sans text-base text-gray-600 p-3 m-0 rounded-md apperance-none', 'block whitespace-nowrap overflow-hidden flex-auto w-[1%] cursor-pointer text-ellipsis border-0 pr-0', 'focus:outline-none focus:outline-offset-0', 'dark:text-white' //Dark Mode
      )
    },
    trigger: {
      className: cn('flex items-center justify-center shrink-0', 'text-gray-500 dark:text-white w-12 rounded-r-md')
    },
    panel: {
      className: cn('bg-white text-gray-600 border-0 rounded-md shadow-[0_2px_12px_rgba(0,0,0,0.1)]', 'dark:bg-gray-900 dark:text-white/80 dark:border-blue-900/40' //Dark Mode
      )
    },
    wrapper: () => 'overflow-auto',
    list: () => 'm-0 p-0 py-3 list-none',
    item: function item({ context }: any) {
      return {
        className: cn('relative font-normal cursor-pointer space-nowrap overflow-hidden',
          'm-0 py-3 px-5 border-none text-gray-600 rounded-none', 'transition duration-200', 'dark:text-white/80',
          'hover:text-primary-900/80 hover:bg-primary-900/10 hover:border-none',
          // Dark Mode
          {
            'text-primary-900 bg-primary-900/20 dark:text-white/80 dark:bg-blue-300': !context.focused && context.selected,
            'bg-primary-900/30': context.focused && context.selected,
            'text-primary-900 bg-gray-300 dark:text-white/80 dark:bg-blue-900/40': context.focused && !context.selected
          })
      };
    }
  },
  JTPInput: {
    root: () => 'inline-flex mx-2',
    input: {
      className: cn('font-sans text-base text-gray-600 p-3 m-0 rounded-md apperance-none', 'block whitespace-nowrap overflow-hidden flex-auto w-[1%] cursor-pointer text-ellipsis border border-gray-300 pr-0', 'focus:outline-none focus:outline-offset-0 focus:ring-[0.2rem] focus:ring-primary-900/25 focus:border-blue-300', 'dark:text-white dark:bg-gray-950 dark:border-blue-900/40',
        //Dark Mode
        'm-0 flex-auto max-w-[3rem]')
    }
  },
  jumptopagedropdown: {
    root: function root({ props, state }: any) {
      return {
        className: cn('inline-flex relative cursor-pointer user-none', 'bg-white border rounded-md', 'transition duration-200', 'h-12 mx-2', 'dark:bg-gray-950 dark:border-blue-900/40',
          //DarkMode
          {
            'outline-none outline-offset-0 shadow-[0_0_0_0.2rem_rgba(191,219,254,1)] border-blue-500': state.focused && !props.disabled,
            //Focus
            'border-gray-300': !state.focused,
            'hover:border-blue-500': !props.disabled //Hover
          })
      };
    },
    input: {
      className: cn('font-sans text-base text-gray-600 p-3 m-0 rounded-md apperance-none', 'block whitespace-nowrap overflow-hidden flex-auto w-[1%] cursor-pointer text-ellipsis border-0 pr-0', 'focus:outline-none focus:outline-offset-0', 'dark:text-white' //Dark Mode
      )
    },
    trigger: {
      className: cn('flex items-center justify-center shrink-0', 'text-gray-500 dark:text-white w-12 rounded-r-md')
    },
    panel: {
      className: cn('bg-white text-gray-600 border-0 rounded-md shadow-[0_2px_12px_rgba(0,0,0,0.1)]', 'dark:bg-gray-900 dark:text-white/80 dark:border-blue-900/40' //Dark Mode
      )
    },
    wrapper: 'overflow-auto',
    list: 'm-0 p-0 py-3 list-none',
    item: function item({ context }: any) {
      return {
        className: cn('relative font-normal cursor-pointer space-nowrap overflow-hidden', 'm-0 py-3 px-5 border-none text-gray-600 rounded-none', 'transition duration-200', 'dark:text-white/80',
          // Dark Mode
          {
            'text-blue-700 bg-blue-50 dark:text-white/80 dark:bg-blue-300': !context.focused && context.selected,
            'bg-blue-300/40': context.focused && context.selected,
            'text-gray-600 bg-gray-300 dark:text-white/80 dark:bg-blue-900/40': context.focused && !context.selected
          })
      };
    }
  }
}

export default paginator;