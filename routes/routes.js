import express from 'express';

const router = express.Router();
import seeddata from '../functions/seeddata.js';
import transaction from '../functions/transaction.js';
import statics from '../functions/statics.js';
import barchart from '../functions/barchart.js';
import piechart from '../functions/piechart.js';
import combind from '../functions/combind.js';



router.get('/seed-data', async (req, res) => {
    let response = await seeddata();
    res.status(200);
    res.json({ 'inserted_ids': response });
});



router.get('/transaction', async (req, res) => {
    let result = await transaction(req);
    res.status(200);
    res.json(result);
});



router.get('/statics', async (req, res) => {
    let result = await statics(req);
    res.status(200);
    res.json(result);
});
export default router;



router.get('/bar-chart', async (req, res) => {
    let result = await barchart(req);
    res.status(200).json(result);
});



router.get('/pie-chart', async (req, res) => {
    let result = await piechart(req);
    res.status(200).json(result);
});


router.get('/combind-data', async (req, res) => {
    let result = await combind(req)
    res.status(200).json(result);
})