const TRANSITIONS = {
  toggleable: {
    timeout: 500,
    classNames: {
      enter: 'max-h-0',
      enterActive: '!max-h-[1000px] overflow-hidden transition-[max-height] duration-500 ease-in',
      exit: 'max-h-[1000px]',
      exitActive: '!max-h-0 overflow-hidden transition-[max-height] duration-500 ease-out'
    }
  },
  overlay: {
    timeout: 150,
    classNames: {
      enter: 'opacity-0 scale-75',
      enterActive: 'opacity-100 !scale-100 transition-transform transition-opacity duration-150 ease-in',
      exit: 'opacity-100',
      exitActive: '!opacity-0 transition-opacity duration-150 ease-linear'
    }
  }
};

export default TRANSITIONS;