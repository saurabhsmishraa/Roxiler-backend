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
            category: 1
        }
        const data = await ProductTransaction.find(monthQuery, projectQuery);

        const response = data.reduce((acc, curr) => {
            acc[curr.category] ? acc[curr.category]++ : acc[curr.category] = 1;

            return acc;
        }, {});

        return response;
    } catch (error) {
        console.log(error);

    }


}