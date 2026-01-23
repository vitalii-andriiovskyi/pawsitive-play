/* eslint-disable @typescript-eslint/no-explicit-any */
function provided(...fns: any[]) {
  return function actualDecorator<This, Args extends any[], Return>(
    target: (this: This, ...args: Args) => Return,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    context: ClassMethodDecoratorContext<This, (this: This, ...args: Args) => Return>
  ) {
    console.log('target', target)
    // console.log('context', arguments)
    function replacementMethod(this: This, ...args: Args): any {
      for (const fn of fns) {
        const result = fn.apply(this, args);

        if (!result) return undefined as unknown as Return;
      }

      return target.apply(this, args);
    }
    return replacementMethod;
  }
}

export default provided;