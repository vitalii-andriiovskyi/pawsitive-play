/* eslint-disable @typescript-eslint/no-explicit-any */
import cn from "@/front-end/utils/cn";

const dialog: any = {
  root: function root({ state }: any) {
    return {
      className: cn('rounded-lg shadow-lg border-0', 'max-h-[90%] transform scale-100', 'm-0 w-[50vw]', 'dark:border dark:border-blue-900/40', {
        'transition-none transform-none !w-screen !h-screen !max-h-full !top-0 !left-0': state.maximized
      })
    };
  },
  header: {
    className: cn('flex items-center justify-between shrink-0',
      'bg-white text-gray-800 border-t-0 rounded-tl-lg rounded-tr-lg px-6 py-4',
      'dark:bg-gray-900  dark:text-white/80',
    )
  },
  headerTitle: 'font-bold text-lg',
  headerIcons: 'flex items-center',
  closeButton: {
    className: cn(
      'flex items-center justify-center overflow-hidden relative',
      'w-8 h-8 text-gray-500 border-0 bg-transparent rounded-full transition duration-200 ease-in-out mr-2 last:mr-0',
      'hover:text-gray-700 hover:border-transparent hover:cursor-pointer',
      'focus:outline-none focus:outline-offset-0',
      // focus
      'dark:hover:text-white/80 dark:hover:border-transparent dark:hover:bg-gray-800/80 dark:focus:shadow-[inset_0_0_0_0.2rem_rgba(147,197,253,0.5)]')
  },
  closeButtonIcon: 'w-4 h-4 inline-block',
  content: function content({ state, props }: any) {
    return {
      className: cn('overflow-y-auto', 'bg-white text-gray-700 px-6', {
        'rounded-bl-lg rounded-br-lg': !props.footer
      }, 'dark:bg-gray-900  dark:text-white/80 ', {
        grow: state.maximized
      })
    };
  },
  footer: {
    className: cn('flex gap-2 shrink-0 justify-end align-center',
      'bg-white text-gray-700 p-6 text-right rounded-b-lg', 'dark:bg-gray-900 dark:text-white/80')
  },
  mask: function mask({ state }: any) {
    return {
      className: cn('transition duration-200', {
        'bg-black/40': state.containerVisible
      })
    };
  },
  transition: function transition({ props }: any) {
    return {
      timeout: 200,
      cn: props.position === 'top' ? {
        enter: 'opacity-0 scale-75 translate-x-0 -translate-y-full translate-z-0',
        enterActive: '!opacity-100 !scale-100 !translate-y-0 transition-all duration-200 ease-out',
        exit: 'opacity-100 scale-100 transition-all duration-200 ease-out',
        exitActive: '!opacity-0 !scale-75 translate-x-0 -translate-y-full translate-z-0'
      } : props.position === 'bottom' ? {
        enter: 'opacity-0 scale-75 translate-y-full',
        enterActive: '!opacity-100 !scale-100 !translate-y-0 transition-all duration-200 ease-out',
        exit: 'opacity-100 scale-100 transition-all duration-200 ease-out',
        exitActive: '!opacity-0 !scale-75 translate-x-0 translate-y-full translate-z-0'
      } : props.position === 'left' || props.position === 'top-left' || props.position === 'bottom-left' ? {
        enter: 'opacity-0 scale-75 -translate-x-full translate-y-0 translate-z-0',
        enterActive: '!opacity-100 !scale-100 !translate-x-0 transition-all duration-200 ease-out',
        exit: 'opacity-100 scale-100 transition-all duration-200 ease-out',
        exitActive: '!opacity-0 !scale-75 -translate-x-full translate-y-0 translate-z-0'
      } : props.position === 'right' || props.position === 'top-right' || props.position === 'bottom-right' ? {
        enter: 'opacity-0 scale-75 translate-x-full translate-y-0 translate-z-0',
        enterActive: '!opacity-100 !scale-100 !translate-x-0 transition-all duration-200 ease-out',
        exit: 'opacity-100 scale-100 transition-all duration-200 ease-out',
        exitActive: '!opacity-0 !scale-75 translate-x-full translate-y-0 translate-z-0'
      } : {
        enter: 'opacity-0 scale-75',
        enterActive: '!opacity-100 !scale-100 transition-all duration-200 ease-out',
        exit: 'opacity-100 scale-100 transition-all duration-200 ease-out',
        exitActive: '!opacity-0 !scale-75'
      }
    };
  }
}
export default dialog;