/* eslint-disable @typescript-eslint/no-explicit-any */
import { AvatarPassThroughOptions } from "primereact/avatar";
import cn from "@/front-end/utils/cn";

const avatar: AvatarPassThroughOptions = {
  root: function root({ props, state }: any) {
    return {
      className: cn('flex items-center justify-center', 'bg-linear-to-br from-primary to-primary-700  dark:bg-gray-900 font-primary text-white', {
        'rounded-lg': props.shape == 'square',
        'rounded-full': props.shape == 'circle'
      }, {
        'w-10 h-10 text-3xl': props.size == null || props.size == 'normal',
        'w-12 h-12 text-3xl': props.size == 'large',
        'w-16 h-16 text-4xl': props.size == 'xlarge'
      }, {
        '-ml-4 border-2 border-white dark:border-gray-900': state.nested
      })
    };
  },
  image: () => 'h-full w-full'
}


export default avatar