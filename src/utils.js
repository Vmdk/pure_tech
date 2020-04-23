const priceWithDollars = amount => {
    const dPart = Math.floor(amount / 100);
    const pPart = amount % 100 || "00"; // Handling case of "$4.00" instead of "$4.0"
    return `$${dPart}.${pPart}`;
};

const priceWithPennies = amount => `${amount}p`;

const formatPrice = amount => {
    const priceFormatter =
        Math.abs(amount) >= 100 ? priceWithDollars : priceWithPennies;
    return priceFormatter(amount);
};

module.exports = {
    formatPrice
};
