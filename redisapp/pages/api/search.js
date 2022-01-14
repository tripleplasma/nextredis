import { searchCars } from "../../lib/redis";

export default async function handler(req,res){
    const cars = await searchCars();
    res.status(200).json({cars});
}