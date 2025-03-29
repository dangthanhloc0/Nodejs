import pkg from 'bloom-filters'

import { pool } from './db.js';


const {BloomFilter} = pkg;

const filter = new BloomFilter(1000,5);

export const  loadUserIntoBloom = async () => {
    const [rows] = await pool.query('SELECT email FROM users');
    rows.forEach(row => {
        filter.add(row.email);  
    });
    console.log('load bloomFilter suscessfully');
    
}

export {filter}