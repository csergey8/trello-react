export const setToLocalStorage = (key: string, data: any) => {
  return window.localStorage.setItem(key, data);
}

export const getFromLocalStorage = (key: string) => {
  const token = window.localStorage.getItem(key);
  return token
}

export const deleteFromLocalStorage = (key: string) => {
  return window.localStorage.removeItem(key);
}