const DEFAULT_PRODUCTS = [
    {
        productId: "soup",
        price: 60
    },
    {
        productId: "bread",
        price: 80
    },
    {
        productId: "milk",
        price: 130
    },
    {
        productId: "apple",
        price: 100
    }
];

const getProductPrice = (id, products = DEFAULT_PRODUCTS) => {
    const requestedProduct = products.find(p => p.productId === id);
    return requestedProduct.price;
};

// This version works with integer amounts greater than zero
const isValidAmount = p => parseInt(p, 10) > 0;

const isProductAvailable = (p, availableProducts) =>
    availableProducts.indexOf(p) !== -1;

const getValidatedProducts = (list = [], products = DEFAULT_PRODUCTS) => {
    try {
        // Filter out products that cannot be purchased
        const availableProducts = products.map(p => p.productId);
        const existingValidProducts = list.filter(
            p =>
                isProductAvailable(p.productId, availableProducts) &&
                isValidAmount(p.amount)
        );

        // Let put some top maximum of possible amounts, let it be some magic number of 1m
        const maxAmount = 1000000;
        const mappedProducts = existingValidProducts.map(p => {
            p.amount = Math.min(p.amount, maxAmount);
            return p;
        });

        return {
            validProducts: mappedProducts
        };
    } catch (err) {
        // Log error
        console.log(
            `Unexpected error happened during products validation: ${err}`
        );
        throw err;
    }
};

module.exports = {
    getProductPrice,
    getValidatedProducts
};
