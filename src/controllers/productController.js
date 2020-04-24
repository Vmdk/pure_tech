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

const getValidatedProducts = (list = [], products = DEFAULT_PRODUCTS) => {
    try {
        // Filter out products that cannot be purchased
        const availableProducts = products.map(p => p.productId);
        const existingProducts = list.filter(
            p => availableProducts.indexOf(p.productId) !== -1
        );
        // This version works with integer amounts greater than zero
        const boughtProducts = existingProducts.filter(
            p => parseInt(p.amount, 10) > 0
        );

        return {
            validProducts: boughtProducts
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
