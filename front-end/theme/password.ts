/* eslint-disable @typescript-eslint/no-explicit-any */
import { PasswordPassThroughOptions } from "primereact/password";

import cn from "@/front-end/utils/cn";
import TRANSITIONS from "./transitions";

const password: PasswordPassThroughOptions = {
  root: ({ props }: any) => ({
    className: cn('inline-flex relative', {
      'opacity-60 select-none pointer-events-none cursor-default': props.disabled
    })

  }),
  // panel: 'p-5 bg-white dark:bg-gray-900 text-gray-700 dark:text-white/80 shadow-md rounded-md',
  // meter: 'mb-2 bg-gray-300 dark:bg-gray-700 h-3',
  meterLabel: function meterLabel(_ref56: any) {
    let _state$meter, _state$meter2, _state$meter3;
    const state = _ref56.state,
      props = _ref56.props;
    return {
      className: cn('transition-width duration-1000 ease-in-out h-full', {
        'bg-red-500': ((_state$meter = state.meter) === null || _state$meter === void 0 ? void 0 : _state$meter.strength) == 'weak',
        'bg-orange-500': ((_state$meter2 = state.meter) === null || _state$meter2 === void 0 ? void 0 : _state$meter2.strength) == 'medium',
        'bg-green-500': ((_state$meter3 = state.meter) === null || _state$meter3 === void 0 ? void 0 : _state$meter3.strength) == 'strong'
      }, {
        'pr-[2.5rem] ': props.toggleMask
      })
    };
  },
  showIcon: {
    className: cn('absolute top-1/2 -mt-2', 'right-3 text-gray-600 dark:text-white/70')
  },
  hideIcon: {
    className: cn('absolute top-1/2 -mt-2', 'right-3 text-gray-600 dark:text-white/70')
  },
  // inputIcon: {
  //   root: 'mt-0'
  // },
  transition: TRANSITIONS.overlay
}

export default password;