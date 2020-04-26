const { formOrder } = require("../../src/controllers/orderController");
const {
    getValidatedProducts
} = require("../../src/controllers/productController");

describe("pureTech Tests", () => {
    describe("products Validator tests", () => {
        it("should filter out wrong products", () => {
            const validProducts = [
                {
                    productId: "soup",
                    amount: 10
                },
                {
                    productId: "milk",
                    amount: 13
                }
            ];
            const allProducts = [
                ...validProducts,
                {
                    productId: "bananas",
                    amount: 80
                },
                {
                    productId: "mango",
                    amount: 42
                }
            ];
            const expectedRes = {
                validProducts: validProducts
            };

            const validatedProducts = getValidatedProducts(allProducts);
            expect(validatedProducts).toEqual(expectedRes);
        });

        it("should leave all products", () => {
            const allProducts = [
                {
                    productId: "soup",
                    amount: 10
                },
                {
                    productId: "milk",
                    amount: 13
                },
                {
                    productId: "bread",
                    amount: 6
                }
            ];
            const expectedRes = {
                validProducts: allProducts
            };

            const validatedProducts = getValidatedProducts(allProducts);
            expect(validatedProducts).toEqual(expectedRes);
        });

        it("wrong input structure", () => {
            const allProducts = ["soup", "milk", "bread"];
            const expectedRes = {
                validProducts: []
            };

            const validatedProducts = getValidatedProducts(allProducts);
            expect(validatedProducts).toEqual(expectedRes);
        });

        it("empty input", () => {
            const allProducts = [];
            const expectedRes = {
                validProducts: allProducts
            };

            const validatedProducts = getValidatedProducts(allProducts);
            expect(validatedProducts).toEqual(expectedRes);
        });

        it("no input", () => {
            const expectedRes = {
                validProducts: []
            };

            const validatedProducts = getValidatedProducts();
            expect(validatedProducts).toEqual(expectedRes);
        });
    });

    describe("formOrder tests", () => {
        it("should form empty order", () => {
            const products = [];
            const orderRes = formOrder({ products });
            const expectedRes = {
                subtotal: "0p",
                discounts: ["no valid discounts"],
                total: "0p"
            };
            expect(expectedRes).toEqual(orderRes);
        });

        it("should form order without discount", () => {
            const products = [
                {
                    productId: "soup",
                    amount: 1
                },
                {
                    productId: "milk",
                    amount: 4
                },
                {
                    productId: "bread",
                    amount: 3
                }
            ];
            const orderRes = formOrder({ products });
            const expectedRes = {
                subtotal: "$8.20",
                discounts: ["no valid discounts"],
                total: "$8.20"
            };
            expect(expectedRes).toEqual(orderRes);
        });

        it("should form order with apple discount", () => {
            const products = [
                {
                    productId: "milk",
                    amount: 6
                },
                {
                    productId: "apple",
                    amount: 3
                }
            ];
            const reqData = { products, date: new Date() };
            const orderRes = formOrder(reqData);
            const expectedRes = {
                subtotal: "$10.80",
                discounts: ["Apples 10% off: -30p"],
                total: "$10.50"
            };
            expect(expectedRes).toEqual(orderRes);
        });

        it("should form order with bread discount", () => {
            const products = [
                {
                    productId: "soup",
                    amount: 2
                },
                {
                    productId: "bread",
                    amount: 3
                }
            ];
            const orderRes = formOrder({ products });
            const expectedRes = {
                subtotal: "$3.60",
                discounts: ["Bread for soups 50% off : -40p"],
                total: "$3.20"
            };
            expect(expectedRes).toEqual(orderRes);
        });

        it("should form order with both discounts", () => {
            const products = [
                {
                    productId: "soup",
                    amount: 6
                },
                {
                    productId: "bread",
                    amount: 2
                },
                {
                    productId: "apple",
                    amount: 3
                }
            ];
            const reqData = { products, date: new Date() };
            const orderRes = formOrder(reqData);
            const expectedRes = {
                subtotal: "$8.20",
                discounts: [
                    "Apples 10% off: -30p",
                    "Bread for soups 50% off : -80p"
                ],
                total: "$7.10"
            };
            expect(expectedRes).toEqual(orderRes);
        });
    });
});
