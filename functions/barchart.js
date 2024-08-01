import ProductTransaction from "../models/ProductTransaction.js";

export default async function (req) {
    try {
        const month = !isNaN(parseInt(req.query.month)) ? parseInt(req.query.month) : 3;
        const monthQuery = month == 0 ? {} : {
            $expr: {
                $eq: [{ $month: "$dateOfSale" }, month]
            }
        }
        const projectQuery = {
            _id: 0,
            price: 1
        }
        const data = await ProductTransaction.find(monthQuery, projectQuery);

        let accumulator = {};

        for (let i = 1; i <= 10; i++) {
            let range = i * 100;

            if (i == 10)
                range = '901-above';
            else if (i == 1)
                range = '0-100';
            else
                range = `${range - 100 + 1}-${range}`;

            accumulator[range] = 0;
        }

        const response = data.reduce((acc, curr) => {
            const currPrice = parseFloat(curr.price);

            let priceRange = Math.ceil(currPrice / 100) * 100;

            if (priceRange == 100)
                priceRange = '0-100';
            else if (priceRange > 900)
                priceRange = '901-above';
            else
                priceRange = `${priceRange - 100 + 1}-${priceRange}`;

            acc[priceRange]++;

            return acc;
        }, accumulator);

        return response;
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
}