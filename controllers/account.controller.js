import Account from "../models/Account.model.js";
import Student from "./student.controller.js";
import Teacher from "./teacher.controller.js";

const GetAllAccount = async (req, res) => {
  try {
    const accounts = await Account.find(); 
    res.status(200).json({
      status: "success",
      length: accounts.length,
      accounts,
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: "Missing require fail",
    });
  }
};
const GetOneAccount = async (req, res) => {
  try {
    const account = await Account.findById(req.params.id);

    res.status(200).json({
      status: "success",
      account,
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: "ID invalid",
    });
  }
};

const CreateAccount = async (req, res) => {
  try {
    const newAccount = new Account({
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
      role: req.body.role,
    });

    console.log("BODY : ", req.body);

    const dataToSave = await newAccount.save();

    if (dataToSave.role == 0) {
      Student.CreateStudent(req, res, dataToSave._id);
    } else if (dataToSave.role == 1) {
      Teacher.CreateTeacher(req, res, dataToSave._id);
    }

    const mergedObject = Object.assign({}, req.body, dataToSave._doc);
    res.status(200).json(mergedObject);
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
};

const DeleteAccount = async (req, res) => {
  try {
    const id = req.params.id;
    const queryAccount = await Account.findById(id);
    if (queryAccount.role == 0) {
      Student.DeleteStudent(req, res, id);
    } else if (queryAccount.role == 1) {
      Teacher.DeleteTeacher(req, res, id);
    }
    // else if( queryAccount.role == 2 )
    // {

    // }
    const data = await Account.findByIdAndDelete(id);
    res.send(`Document with ${data.name} has been deleted..`);
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: "ID invalid",
    });
  }
};

export default { GetAllAccount, CreateAccount, DeleteAccount, GetOneAccount };
