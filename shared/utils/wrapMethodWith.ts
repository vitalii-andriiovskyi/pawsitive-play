/* eslint-disable @typescript-eslint/no-explicit-any */


/**
 * Example usage:
  ```typescript
    function fluent<This, Args extends any[]>(method: any) {
      return function (this: This, ...args: Args) {
        method.apply(this, args);
        return this;
      }
    }
    class MyClass {
     ⠀@wrapMethodWith(fluent)
      myMethod(arg1: string, arg2: number): this {
        // method implementation
      }
  }
  ```
  .
*/
function wrapMethodWith(decorator: any) {
  return function actualDecorator<This, Args extends any[], Return>(
    target: (this: This, ...args: Args) => Return,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    context: ClassMethodDecoratorContext<This, (this: This, ...args: Args) => Return>
  ) {
    return decorator(target)
  }
}




export default wrapMethodWith;