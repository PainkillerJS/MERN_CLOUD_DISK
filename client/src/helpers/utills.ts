export const converSize = (size: number) => {
  const sizeGb = 1024 * 1024 * 1024;
  const sizeMb = 1024 * 1024;

  switch (true) {
    case size > sizeGb:
      return (size / sizeGb).toFixed(1) + " Gb";
    case size > sizeMb:
      return (size / sizeMb).toFixed(1) + " Mb";
    case size > 1024:
      return (size / 1024).toFixed(1) + " Kb";
    case !!size:
      return size + "B";
    default:
      return "";
  }
};
