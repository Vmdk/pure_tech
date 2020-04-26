const moment = require("moment");

const priceWithDollars = amount => {
    const dPart = Math.floor(amount / 100);
    const pPart = amount % 100 || "00"; // Handling case of "$4.00" instead of "$4.0"
    return `$${dPart}.${pPart}`;
};

const priceWithPennies = amount => `${amount}p`;

const formatPrice = (amount = 0) => {
    const priceFormatter =
        Math.abs(amount) >= 100 ? priceWithDollars : priceWithPennies;
    return priceFormatter(amount);
};

const isCurrentWeek = date => {
    const currWeek = moment().isoWeek();
    const currYear = moment().year();
    const reqDateWeek = moment(date, "DD/MM/YYYY").isoWeek() || -1;
    const reqDateYear = moment(date, "DD/MM/YYYY").year() || -1;
    return currWeek === reqDateWeek && currYear === reqDateYear;
};

module.exports = {
    formatPrice,
    isCurrentWeek
};
