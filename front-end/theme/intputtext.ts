/* eslint-disable @typescript-eslint/no-explicit-any */
import cn from "@/front-end/utils/cn";

const inputtext = {
  root: ({ props, context }: any) => ({
    className: cn(
      "m-0",
      "text-primary-900 dark:text-white/80 placeholder:text-gray-400 bg-white dark:bg-gray-900 border border-primary-900/30 dark:border-blue-900/40 transition-colors duration-200 appearance-none rounded-lg group-has-[.error-msg]:border-red-500! group-has-[.error-msg]:text-red-500! ",
      {
        "focus:border-primary-900/90 hover:border-primary-900/90 focus:shadow-none focus:outline-none":
          !context.disabled,
        "opacity-60 select-none pointer-events-none cursor-default":
          context.disabled,
      },
      {
        "text-lg px-4 py-4": props.size == "large",
        "text-xs px-2 py-2": props.size == "small",
        "p-3 text-base": props.size == null,
      }
    ),
  }),
};
export default inputtext;