const express = require("express");
const {
  createInventoryController,
  getInventoryController,
  getDonarsController,
  getHospitalsController,
  getOrganisationController,
  getOrganisationForHospitalController,
  getInventoryHospitalController,
  getRecentInventoryController,
} = require("../controllers/inventoryController.js");

const router = express.Router();

// Inventory routes
router.post("/create-inventory", createInventoryController);
router.get("/get-inventory", getInventoryController);
router.get("/get-inventory-hospital", getInventoryHospitalController);
router.get("/get-donars", getDonarsController);
router.get("/get-hospitals", getHospitalsController);
router.get("/get-organisation", getOrganisationController);
router.get(
  "/get-organisation-for-hospital",
  getOrganisationForHospitalController
);
router.get("/get-recent-inventory", getRecentInventoryController);

module.exports = router;
