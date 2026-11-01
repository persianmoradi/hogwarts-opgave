import { Router } from "express";
import * as housesController from "../controllers/houses.controller.js";

const router = Router();

router.get("/houses", housesController.getHouses);
router.get("/houses/:id", housesController.getHouseByID);

export default router; 