import * as housesRepo from "../repos/houses.repos.js";

export async function getHouses(req, res) {
    try {
        const houses = await housesRepo.getHouses();
        res.status(200).json(houses);
    }
    catch (error) {
        console.log(error);
        res.status(500).send({ message: "Error connecting to database" });
    }
}

export async function getHouseByID(req, res) {
    try {
        const house = await housesRepo.getHouseByID(req.params.id);
        if (!house) {
            return res.status(404).send({ message: "House not found" });
        }
        res.status(200).json(house);
    }
    catch (error) {
        console.log(error);
        res.status(500).send({ message: "Error connecting to database" });
    }
}
