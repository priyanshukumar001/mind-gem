import dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';

dotenv.config();
// const newAPIKey = localStorage.getItem('newAPIKey');
// console.log(newAPIKey);
// const genAI = new GoogleGenerativeAI(`${process.env.KEY_API}`);
const genAI = new GoogleGenerativeAI('AIzaSyCn_puSAX6QI2f0Hc_WC0--Tb5NBwX7VyQ');
const model = genAI.getGenerativeModel({ model: "gemini-pro" });


export default model;