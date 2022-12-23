const Account = require("../models/account.model");
const  {  CreateStudent, DeleteStudent }  = require( './student.controller.js');
const  {  CreateTeacher, DeleteTeacher }  = require( './teacher.controller.js');

exports.GetAllAccount = async (req, res) => {
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
exports.GetOneAccount = async (req, res) => {
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

exports.CreateAccount = async (req, res) => {
  
  try {
    const newAccount = new Account({
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
      role: req.body.role,
    });

    console.log("BODY : ", req.body)

    const dataToSave = await newAccount.save();

    if(dataToSave.role ==0)  { 
      CreateStudent(req, res, dataToSave._id );
    }
    else if(dataToSave.role ==1){
      CreateTeacher( req, res, dataToSave._id);
    }

    const mergedObject = Object.assign({}, req.body, dataToSave._doc) 
    res.status(200).json(mergedObject);
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.DeleteAccount = async (req, res) => {
  try {
    const id = req.params.id;
    const queryAccount = await Account.findById(id);
    if( queryAccount.role == 0 ){
      DeleteStudent(req, res, id);
    }
    else if( queryAccount.role== 1 )
    {
      DeleteTeacher(req, res, id);
    }
    // else if( queryAccount.role == 2 )
    // {

    // }
    const data = await Account.findByIdAndDelete(id);
    res.send(`Document with ${data.name} has been deleted..`)
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: "ID invalid",
    });
  }
};
  