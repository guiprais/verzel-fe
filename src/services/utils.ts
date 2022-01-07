export const formatDate = (date: string | undefined) => {
  if (date !== undefined) {
    const newDate = new Date(date);
    return `${newDate.getDate()}/${
      newDate.getMonth() + 1
    }/${newDate.getFullYear()}`;
  }

  return date;
};
