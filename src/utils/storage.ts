export const setToLocalStorage = async (key: string, data: any) => {
  window.localStorage.setItem(key, data);
}

export const getFromLocalStorage = async (name: string) => {
  const token = window.localStorage.getItem(name);
  return token
}