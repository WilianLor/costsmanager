const formatMoney = (value: Number) => {
  const string = value.toString();
  let [natural, decimal] = string.split(".");

  let initialDot = natural.length % 3;

  if (decimal === undefined) {
    decimal = "00";
  }

  if (initialDot == 0) {
    initialDot = 3;
  }

  let array = natural.split("");
  let finalString = "";

  array.forEach((item: string, index: number) => {
    if (index == initialDot) {
      finalString = finalString + ".";
      finalString = finalString + item;
      initialDot += 3;
    } else {
      finalString = finalString + item;
    }
  });

  decimal.split("");

  return (finalString +=
    "," + decimal[0] + (decimal[1] === undefined ? "0" : decimal[1]));
};

export default formatMoney;
