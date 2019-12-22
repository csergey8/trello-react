export const setToLocalStorage = (key: string, data: any) => {
  window.localStorage.setItem(key, data);
}

export const getFromLocalStorage = (name: string) => {
  const token = window.localStorage.getItem(name);
  return token
}