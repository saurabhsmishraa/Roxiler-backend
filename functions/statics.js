import ProductTransaction from "../models/ProductTransaction.js";
export default async function (req) {
    try {
        const month = !isNaN(parseInt(req.query.month)) ? parseInt(req.query.month) : 3;
        const monthQuery = month == 0 ? {} : {
            $expr: {
                $eq: [{ $month: "$dateOfSale" }, month]
            }
        }
        const projectionQuery = {
            _id: 0,
            price: 1,
            sold: 1,
            dateOfSale: 1
        }


        const data = await ProductTransaction.find(monthQuery, projectionQuery);

        const response = data.reduce((acc, curr) => {
            const currPrice = parseFloat(curr.price);
            acc.totalSale += curr.sold ? 1 : 0;
            acc.unsoldCount += curr.sold ? 0 : 1;
            return acc;
        }, { totalCount: data.length, totalSale: 0, soldCount: 0, unsoldCount: 0, });
        response.totalSale = response.totalSale.toFixed(2);
        return response;
    } catch (error) {
        console.log(error);
    }
}