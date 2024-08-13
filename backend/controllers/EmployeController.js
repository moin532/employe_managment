const Employee = require("../models/EmployeeModel");
const upload = require("../upploadMiddleware");
// POST : localhost:400/api/v1/employe

exports.CreateEmploye = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({
        success: false,
        error: err.message,
      });
    }

    try {
      console.log(req.body);
      const { Name, Email, Mobile, Designation, gender, Course } = req.body;
      const Image = req.file ? `/uploads/${req.file.filename}` : null;

      await Employee.create({
        Name: Name,
        Email: Email,
        Mobile: Mobile,
        Designation: Designation,
        gender: gender,
        Course: Course,
        Image: Image, // Save the image path
      });

      res.status(200).send({
        success: true,
      });
    } catch (error) {
      console.log(error);
      res.status(400).json({
        success: false,
        error: error.message,
      });
    }
  });
};

// GET : localhost:400/api/v1/all/employe
exports.GetAllEmploye = async (req, res) => {
  try {
    const emp = await Employee.find({});

    if (!emp) {
      return res.status(404).json({ success: false, err: "no employee found" });
    }

    res.status(200).json({
      success: true,
      emp,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      err: error,
    });
  }
};

//UPDATE :  localhost:400/api/v1/update/id
exports.updateEmployee = async (req, res) => {
  try {
    console.log(req.body);
    const emp = await Employee.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    console.log(emp);
    if (!emp) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.status(200).json({
      success: true,
      emp,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      err: error.message,
    });
  }
};

//DELETE :  localhost:400/api/v1/delete/id
exports.DeleteEmploye = async (req, res) => {
  try {
    const emp = await Employee.findByIdAndDelete(req.params.id);

    if (!emp) {
      return res.status(404).json({ success: false, err: "no employee found" });
    }

    res.status(200).json({
      success: true,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      err: error,
    });
  }
};

exports.getSingle = async (req, res) => {
  try {
    const emp = await Employee.findById(req.params.id);

    if (!emp) {
      return res.status(404).json({ success: false, err: "no employee found" });
    }

    res.status(200).json({
      success: true,
      emp,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      err: error,
    });
  }
};
