export const rounded = (number) => parseFloat(parseFloat(number).toFixed(2));

export const normalize = (text) => {
  return (
    text
      .toString()
      .normalize("NFD") // split an accented letter in the base letter and the acent
      .replace(/[\u0300-\u036f]/g, "") // remove all previously split accents
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "+")
      // eslint-disable-next-line
      .replace(/[^\w\-]+/g, "+")
      // eslint-disable-next-line
      .replace(/\-\-+/g, "+")
  );
};
