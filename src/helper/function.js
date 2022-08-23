const theLargestNumber = (arr) => {
  if (!arr.length) {
    return 0;
  } else {
    const id = arr[arr.length - 1].id + 1;
    return id;
  }
};


export { theLargestNumber };
