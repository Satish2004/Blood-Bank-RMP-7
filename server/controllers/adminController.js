const userModel = require("../models/userModel");

// Get all donors
const getDonarList = async (req, res) => {
  try {
    const donarData = await userModel
      .find({ role: "donar" })
      .sort({ createdAt: -1 });
    res
      .status(200)
      .send({
        success: true,
        message: "Donor data fetched successfully",
        donarData,
      });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ success: false, message: "Error fetching donors", error });
  }
};

// Get all hospitals
const getHospitalList = async (req, res) => {
  try {
    const hospitalData = await userModel
      .find({ role: "hospital" })
      .sort({ createdAt: -1 });
    res
      .status(200)
      .send({
        success: true,
        message: "Hospital data fetched successfully",
        hospitalData,
      });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ success: false, message: "Error fetching hospitals", error });
  }
};

// Get all organisations
const getOrganisationList = async (req, res) => {
  try {
    const organisationData = await userModel
      .find({ role: "organisation" })
      .sort({ createdAt: -1 });
    res
      .status(200)
      .send({
        success: true,
        message: "Organisation data fetched successfully",
        organisationData,
      });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ success: false, message: "Error fetching organisations", error });
  }
};

// Delete user
const deleteUser = async (req, res) => {
  try {
    await userModel.findByIdAndDelete(req.params.id);
    res
      .status(200)
      .send({ success: true, message: "User deleted successfully" });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ success: false, message: "Error deleting user", error });
  }
};

module.exports = {
  getDonarList,
  getHospitalList,
  getOrganisationList,
  deleteUser,
};
