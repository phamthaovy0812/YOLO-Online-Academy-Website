import { json } from "express";
import Account from "../models/Account.model.js";
import Student from "./student.controller.js";
import Teacher from "./teacher.controller.js";
import Admin from "./admin.controller.js";
import bcrypt from "bcryptjs";

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

  const {email, username, password,role} = req.body;

  try {

    const handleCreateAccount = async ()=>{
      const newAccount = new Account({
        email, 
        username, 
        password,
        role
      });
  
      const dataToSave = await newAccount.save();
  
      if (dataToSave.role == 1) {
        Teacher.CreateTeacher(req, res, dataToSave._id);
      }
      else if (dataToSave.role == 2) {
        Admin.CreateAdmin(req, res, dataToSave._id);
      }
      else  {
        Student.CreateStudent(req, res, dataToSave._id);
      } 
  
      const mergedObject = Object.assign({}, req.body, dataToSave._doc);
      res.status(200).json(mergedObject);
    }

    Account.findOne({ $or:[{username},{email}]})
    .then(function(doc) {
          if(doc)
          {
            res.status(300).json("account or Email exist");
          }
          else {
            handleCreateAccount();
          }
     });
     
   
    
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
    } 
    else if (queryAccount.role == 1) {
      Teacher.DeleteTeacher(req, res, id);
    }
    else if( queryAccount.role == 2 )
    {
      Admin.DeleteAdmin(req, res, id);
    }
    const data = await Account.findByIdAndDelete(id);
    res.send(`Document with ${data.name} has been deleted..`);
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: "ID invalid",
    });
  }
};

const UpdateAccount = async (req, res) => {
  try {
    const id = req.params.id;
    const password = await bcrypt.hash(req.body.password, 10);
    
    const data = await Account.findByIdAndUpdate(id, { password },{
      returnOriginal: false
    });
    res.send(data)
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: "ID invalid",
    });
  }
};

export default { GetAllAccount, CreateAccount, DeleteAccount, GetOneAccount, UpdateAccount };
