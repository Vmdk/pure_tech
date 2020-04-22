const productsList = [
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

const getProductPrice = id => {
    const requestedProduct = productsList.find(p => p.productId === id);
    return requestedProduct.price;
};

module.exports = {
    getProductPrice
};
