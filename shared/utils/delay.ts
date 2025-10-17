const delay = (time: number = 0) =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(0);
    }, time);
  });

export default delay;
