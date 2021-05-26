const formatMoney = (value: Number) => {
    return  value.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
}

export default formatMoney