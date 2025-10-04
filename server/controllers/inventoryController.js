const mongoose = require("mongoose");
const inventoryModel = require("../models/inventoryModel");
const userModel = require("../models/userModel");

// CREATE INVENTORY
const createInventoryController = async (req, res) => {
  try {
    const { email, inventoryType, bloodGroup, quantity, userId } = req.body;

    const user = await userModel.findOne({ email });
    if (!user) throw new Error("User not found");

    if (inventoryType === "out") {
      const organisation = new mongoose.Types.ObjectId(userId);

      // calculate total blood
      const totalIn =
        (
          await inventoryModel.aggregate([
            { $match: { organisation, inventoryType: "in", bloodGroup } },
            { $group: { _id: "$bloodGroup", total: { $sum: "$quantity" } } },
          ])
        )[0]?.total || 0;

      const totalOut =
        (
          await inventoryModel.aggregate([
            { $match: { organisation, inventoryType: "out", bloodGroup } },
            { $group: { _id: "$bloodGroup", total: { $sum: "$quantity" } } },
          ])
        )[0]?.total || 0;

      const available = totalIn - totalOut;
      if (available < quantity) {
        return res.status(400).json({
          success: false,
          message: `Only ${available} ML of ${bloodGroup} available`,
        });
      }

      req.body.hospital = user._id;
    } else if (inventoryType === "in") {
      req.body.donar = user._id;
    }

    const inventory = new inventoryModel(req.body);
    await inventory.save();
    return res.status(201).json({ success: true, message: "Record created" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// GET ALL INVENTORY for organisation
const getInventoryController = async (req, res) => {
  try {
    const { userId } = req.query;
    const inventory = await inventoryModel
      .find({ organisation: userId })
      .populate("donar hospital")
      .sort({ createdAt: -1 });
    res.status(200).json({ success: true, inventory });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET DONARS
const getDonarsController = async (req, res) => {
  try {
    const { userId } = req.query;
    const donarIds = await inventoryModel.distinct("donar", {
      organisation: userId,
    });
    const donars = await userModel.find({ _id: { $in: donarIds } });
    res.status(200).json({ success: true, donars });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ GET HOSPITALS (newly created)
const getHospitalsController = async (req, res) => {
  try {
    const { userId } = req.query;
    const hospitalIds = await inventoryModel.distinct("hospital", {
      organisation: userId,
    });
    const hospitals = await userModel.find({ _id: { $in: hospitalIds } });
    res.status(200).json({ success: true, hospitals });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET ORGANISATION
const getOrganisationController = async (req, res) => {
  try {
    const { userId } = req.query;
    const organisationIds = await inventoryModel.distinct("organisation", {
      donar: userId,
    });
    const organisations = await userModel.find({
      _id: { $in: organisationIds },
    });
    res.status(200).json({ success: true, organisations });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET ORGANISATION for hospital
const getOrganisationForHospitalController = async (req, res) => {
  try {
    const { userId } = req.query;
    const organisationIds = await inventoryModel.distinct("organisation", {
      hospital: userId,
    });
    const organisations = await userModel.find({
      _id: { $in: organisationIds },
    });
    res.status(200).json({ success: true, organisations });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET INVENTORY HOSPITAL
const getInventoryHospitalController = async (req, res) => {
  try {
    // Use query params instead of req.body
    const { userId, inventoryType, donar } = req.query;

    const query = { hospital: userId };
    if (inventoryType) query.inventoryType = inventoryType;
    if (donar) query.donar = donar;

    const inventory = await inventoryModel
      .find(query)
      .populate("donar hospital organisation")
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, inventory });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET RECENT INVENTORY
const getRecentInventoryController = async (req, res) => {
  try {
    const { userId } = req.query;
    const inventory = await inventoryModel
      .find({ organisation: userId })
      .sort({ createdAt: -1 })
      .limit(3);
    res.status(200).json({ success: true, inventory });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  createInventoryController,
  getInventoryController,
  getDonarsController,
  getHospitalsController,
  getOrganisationController,
  getOrganisationForHospitalController,
  getInventoryHospitalController,
  getRecentInventoryController,
};
