export const setToLocalStorage = async (key: string, data: any) => {
  window.localStorage.setItem(key, data);
}

<<<<<<< HEAD
export const getFromLocalStorage = async (key: string) => {
  const token = window.localStorage.getItem(key);
=======
export const getFromLocalStorage = async (name: string) => {
  const token = window.localStorage.getItem(name);
>>>>>>> b2b0a4f2cefa4870a5df09bee4ee1ed346d9497d
  return token
}