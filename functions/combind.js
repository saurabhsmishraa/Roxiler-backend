import axios from "axios";
export default async function (req) {
    try {
        const { month } = req.query;
        const [transaction, statics, barchart, piechart] = await Promise.all([
            axios.get('http://localhost:3000/transaction', { params: { month } }),
            axios.get('http://localhost:3000/statics', { params: { month } }),
            axios.get('http://localhost:3000/bar-chart', { params: { month } }),
            axios.get('http://localhost:3000/pie-chart', { params: { month } }),
        ]);
        const response = ({
            transaction: transaction.data,
            statics: statics.data,
            barchart: barchart.data,
            piechart: piechart.data
        })
        return response;

    } catch (error) {
        console.log(error)
    }
}