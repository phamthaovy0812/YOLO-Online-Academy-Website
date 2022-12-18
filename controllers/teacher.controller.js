const Teacher = require("../models/teacher.model");

exports.GetAllTeacher = async (req, res) => {
  try {
    const teacher = await Teacher.find();

    res.status(200).json({
      status: "success",
      length: teacher.length,
      teacher,
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: "Missing require fail",
    });
  }
};

exports.CreateTeacher = async (req, res, id_account) => {
  const data = new Teacher({
    id_account: id_account,
    fullname: req.body.fullname,
    skill: req.body.skill,
    description: req.body.description,
  });

    const dataToSave = await data.save();
  
};
