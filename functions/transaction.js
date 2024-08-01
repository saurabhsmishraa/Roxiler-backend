import ProductTransaction from '../models/ProductTransaction.js';

export default async function (req) {
    try {
        const page = parseInt(req.query.page) - 1 || 0;
        const limit = !isNaN(parseInt(req.query.limit)) ? parseInt(req.query.limit) : 10;
        const skip = page * limit;
        const search = req.query.search || '';
        const month = !isNaN(parseInt(req.query.month)) ? parseInt(req.query.month) : 3;


        const query = {};

        // Add search parameters to the query object
        if (search && search != '') {
            const searchRegex = new RegExp(search, 'i'); // case-insensitive search
            query.$or = [
                { title: searchRegex },
                { description: searchRegex },
                { price: searchRegex }
            ];
        }

        // Filter by month regardless of year
        if (month) {
            const monthIndex = new Date(`${month} 1, 2000`).getMonth() + 1; // January is 0, December is 11
            query.$expr = {
                $eq: [{ $month: "$dateOfSale" }, monthIndex]
            };
        }
        const data = await ProductTransaction.find(query).skip(skip).limit(limit);
        const totalCount = await ProductTransaction.countDocuments(query);
        const responseData = {
            success: true,
            totalCount,
            page: page + 1,
            limit,
            month,
            data: data
        }
        return responseData;

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
}