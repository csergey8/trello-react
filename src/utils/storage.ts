export const setToLocalStorage = async (key: string, data: any) => {
  await window.localStorage.setItem(key, data);
}

export const getFromLocalStorage = async (name: string) => {
  const token = await window.localStorage.getItem(name);
  return token
}