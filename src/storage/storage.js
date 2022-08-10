export const getStorageValue = (key, defaultValue) => {
    if (typeof window !== "undefined") {
        const save = localStorage.getItem(key);
        const inicio = save !== null ? JSON.parse(save) : defaultValue;
        return inicio;
    }
}
export const setStorageValue = (key, defaultValue) => {
    localStorage.setItem(key, defaultValue);
   /*  if (typeof window !== "undefined") {
        const save = localStorage.setItem(key, defaultValue);
        const inicio = save !== null ? JSON.parse(save) : defaultValue;
        return inicio;
    } */
}
