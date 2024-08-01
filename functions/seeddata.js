import axios from 'axios';
import dotenv from 'dotenv';
import ProductTransaction from '../models/ProductTransaction.js';
import { mongoConnect, mongoDisconnect } from '../database/mongoConnect.js'
dotenv.config();

export default async function () {
    let itemIds = [];
    try {
        const response = await axios.get(process.env.API_URL);
        const data = response.data;

        if (Array.isArray(data)) {
            for (const item of data) {
                // Create a new document for each item
                const updatedProduct = await ProductTransaction.findOneAndUpdate(
                    { 'id': item.id }, // Query condition
                    item, // Fields to update
                    { new: true, upsert: true, runValidators: true } // Options: new returns the updated document, upsert creates if not found
                );
                itemIds.push(updatedProduct.id);

            }
            return itemIds;
        } else {
            console.error('API response is not an array');
            return itemIds;
        }
    } catch (err) {
        console.error('Error fetching or inserting data:', err);
        return itemIds;
    } finally {
        return itemIds;
        await mongoDisconnect();
    }

};

