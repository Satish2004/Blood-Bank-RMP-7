const express = require("express");
const {
  getDonarList,
  getHospitalList,
  getOrganisationList,
  deleteUser,
} = require("../controllers/adminController");
const adminMiddleware = require("../middlewares/adminMiddleware");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

// Admin-only routes
router.get("/donar-list", authMiddleware, adminMiddleware, getDonarList);
router.get("/hospital-list", authMiddleware, adminMiddleware, getHospitalList);
router.get(
  "/organisation-list",
  authMiddleware,
  adminMiddleware,
  getOrganisationList
);
router.delete("/delete-user/:id", authMiddleware, adminMiddleware, deleteUser);

module.exports = router;
