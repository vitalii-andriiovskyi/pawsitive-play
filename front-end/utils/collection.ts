type UpdateFn<T> = (key: string, value: T[]) => void;

export const removeItem = <T extends { id: string | number }>(
  arr: T[],
  id: string | number,
  key: string,
  fn: UpdateFn<T>
): void => {
  const newItems = arr.filter((el) => el.id !== id);
  fn(key, [...newItems]);
};


export const addItem = <T>(
  arr: T[],
  item: T,
  key: string,
  fn: UpdateFn<T>
): void => fn(key, arr.concat([item]));

export const changePosition = <T>(
  currentIndex: number,
  nextIndex: number,
  arr: T[],
  key: string,
  fn: UpdateFn<T>
): void => {
  const newArr = [...arr];
  const savedItem = newArr.splice(currentIndex, 1);
  newArr.splice(nextIndex, 0, savedItem[0]);
  fn(key, newArr);
};
