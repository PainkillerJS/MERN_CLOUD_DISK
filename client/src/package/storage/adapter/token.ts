const getItem = () => localStorage.getItem("token");

const setItem = (value: string) => localStorage.setItem("token", value);

const removeItem = () => localStorage.removeItem("token");

export { getItem, setItem, removeItem };
