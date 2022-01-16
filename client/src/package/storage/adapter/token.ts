const getItem = () => localStorage.getItem("token");

const setItem = (value: string) => localStorage.setItem("token", value);

export { getItem, setItem };
