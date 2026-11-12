import * as housesRepo from "../repos/houses.repos.js";
import HTTPError from "../errorhandling/HTTPError.js";

export async function getHouses(req, res) {
        const houses = await housesRepo.getHouses();
        res.status(200).json(houses);
}

export async function getHouseByID(req, res) {
        const house = await housesRepo.getHouseByID(req.params.id);
        if (!house) {
            throw new HTTPError(404, "House not found");
        }
        res.status(200).json(house);
}
