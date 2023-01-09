import { json } from "express";
import Account from "../models/Account.model.js";
import Student from "./student.controller.js";
import StudentModel from "../models/student.model.js";
import Teacher from "./teacher.controller.js";
import TeacherModel from "../models/teacher.model.js";
import Admin from "./admin.controller.js";
import AdminModel from '../models/admin.model.js';
import bcrypt from "bcryptjs";
import CourseModel from "../models/Course.model.js";



const GetAllAccount = async (req) => {
  var allAccount =[]
 
  const accounts = await Account.find();
  
  console.log(accounts)
  for(var i=0;i<accounts.length;i++)
  {
    var detail ;
    if(accounts[i].role==0)
    {
      detail = await StudentModel.findOne({"id_account":accounts[i]._id});

    }
    else if(accounts[i].role==1)
    {
      detail = await TeacherModel.findOne({"id_account":accounts[i]._id});
    }
    else if(accounts[i].role==2)
    {
      detail = await AdminModel.findOne({"id_account":accounts[i]._id});
    }
    allAccount.push({"account":accounts[i],"detail":detail});
   
  }
  return allAccount;
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

const DeleteAccount = async (req, res) => {
  try {
    const id = req.params.id;
    const queryAccount = await Account.findById(id);
    if (queryAccount.role == 0) {
      Student.DeleteStudent(req, res, id);
    } else if (queryAccount.role == 1) {
      Teacher.DeleteTeacher(req, res, id);
    } else if (queryAccount.role == 2) {
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

const UpdatePasswordAccount = async (req, res) => {
  try {
    const id = req.params.id;
    const password = await bcrypt.hash(req.body.password, 10);

    const data = await Account.findByIdAndUpdate(
      id,
      { password },
      {
        returnOriginal: false,
      }
    );
    res.send(data);
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: "ID invalid",
    });
  }
};

const UpdateInfoAccount = async (req) => {
  var dataRes;
  const data = {
    id: req.session.authAccount?.account?._id,
    fullname: req.body.fullname,
    email: req.body.email,
  };
  const existEmail = await Account.findOne({ email: data.email });
  if (existEmail) {
    dataRes = { status: 300, message: "exist email" };
  } else {

    const response = await Account.findByIdAndUpdate(data.id, { email: data.email },
      { returnOriginal: false });

    var responseRole;
    if (req.session.authAccount?.account?.role == 0) {
      responseRole = await Student.UpdateStudent(req);
    }
    else if (req.session.authAccount?.account?.role == 1) {
      responseRole = await Teacher.UpdateTeacher(req);
    }
    else {
      responseRole = await Admin.UpdateAdmin(req);
    }

    dataRes = { ...response._doc, detail: responseRole, status: 200, message: "update success" }
  }
  return dataRes;

  // try {
  //   const id = req.params.id;

  //   console.log(req.body)

  //   res.send(data)
  // } catch (err) {
  //   res.status(404).json({
  //     status: "fail",
  //     message: "ID invalid",
  //   });
  // }
};

// const isLogin=async (req,res)=>{
//   const accAuth=req.session.auth;
//   const dataRes=req.session.authAccount;
//   res.render('/layouts/main',{islogin:accAuth,data:dataRes});


// }

const CreateAccount = async (req) => {
  const { email, username, password, role, avatar } = req.body;

  try {
    const handleCreateAccount = async () => {
      const newAccount = new Account({
        avatar,
        email,
        username,
        password,
        role,
        isBlock
      });

      const dataToSave = await newAccount.save();

      if (dataToSave.role == 1) {
        Teacher.CreateTeacher(req, dataToSave._id);
      } else if (dataToSave.role == 2) {
        Admin.CreateAdmin(req, dataToSave._id);
      } else {
        Student.CreateStudent(req, dataToSave._id);
      }

      Account.findOne({ $or: [{ username }, { email }] })
        .then(function (doc) {

          if (doc) {
            return json("account or Email exist");
          }
          else {

            handleCreateAccount();
          }
        });

      const mergedObject = Object.assign({}, req.body, dataToSave._doc);
      console.log(mergedObject);
      return json(mergedObject);
    };

    Account.findOne({ $or: [{ username }, { email }] }).then(function (doc) {
      if (doc) {
        return json("account or Email exist");
      } else {
        handleCreateAccount();
      }
    });
  } catch (err) {
    return json({
      status: "fail",
      message: err.message,
    });
  }
};
// const BlockAccount = async(req, res)=>{
//   try{
//     const id = req.params.id;
//     const queryAccount = await Account.findById(id);
//     if(queryAccount.role == 0){
//       Student.BlockStudent(req);
//     }
//     // else if (queryAccount.role == 0){
//     //   Studen
//     // }
//     const data = await Account.findByOneAndUpdate(id);
//     res.send(`Document with ${data.name} has been blocked..`);
//   }
//   catch(err){
//     res.status(404).json({
//       status: "fail",
//       message: "ID invalid",
//     });
//   }
// };

const AccountDataCourse = async (req, res) => {

  const teacherList = [{ "title": "Mobile for beginer", "description": "day la mot khoa hoc mobile danh cho nguoi moi bat dau.", "price": "$113", "image": "/student/js.png" }, { "title": "web for beginer", "description": "day la mot khoa hoc web danh cho nguoi moi bat dau.", "price": "$1133", "image": "/student/js.png" }]
  const studentList = [{ "title": "Mobile for beginer", "description": "day la mot khoa hoc mobile danh cho nguoi moi bat dau.", "price": "$113", "image": "/student/js.png" }, { "title": "web for beginer", "description": "day la mot khoa hoc web danh cho nguoi moi bat dau.", "price": "$1133", "image": "/student/js.png" }, { "title": "nau an for beginer", "description": "day la mot khoa hoc web danh cho nguoi moi bat dau.", "price": "$123", "image": "/student/js.png" }, { "title": "web for beginer", "description": "day la mot khoa hoc web danh cho nguoi moi bat dau.", "price": "$13", "image": "/student/js.png" }]
  const wishList = [{ "title": "Mobile for beginer", "description": "day la mot khoa hoc mobile danh cho nguoi moi bat dau.", "price": "$113", "image": "/student/js.png" }, { "title": "web for beginer", "description": "day la mot khoa hoc web danh cho nguoi moi bat dau.", "price": "$1133", "image": "/student/js.png" }, { "title": "nau an for beginer", "description": "day la mot khoa hoc web danh cho nguoi moi bat dau.", "price": "$123", "image": "/student/js.png" }, { "title": "web for beginer", "description": "day la mot khoa hoc web danh cho nguoi moi bat dau.", "price": "$13", "image": "/student/js.png" }]
  res.render('vwStudent/profile', { studentlist: studentList, teacherlist: teacherList, wishlist: wishList });
}


const AccountData = async (req, res) => {
  // const toppopularcourse=[{"title":"Mobile for beginer","description":"day la mot khoa hoc mobile danh cho nguoi moi bat dau.","price":"$113","image":"/student/js.png"},{"title":"web for beginer","description":"day la mot khoa hoc web danh cho nguoi moi bat dau.","price":"$1133","image":"/student/js.png"},{"title":"nau an for beginer","description":"day la mot khoa hoc web danh cho nguoi moi bat dau.","price":"$123","image":"/student/js.png"},{"title":"web for beginer","description":"day la mot khoa hoc web danh cho nguoi moi bat dau.","price":"$13","image":"/student/js.png"}]
  // const topviewcourse=[{"title":"Mobile for beginer","description":"day la mot khoa hoc mobile danh cho nguoi moi bat dau.","price":"$113","image":"/student/js.png"},{"title":"web for beginer","description":"day la mot khoa hoc web danh cho nguoi moi bat dau.","price":"$1133","image":"/student/js.png"},{"title":"nau an for beginer","description":"day la mot khoa hoc web danh cho nguoi moi bat dau.","price":"$123","image":"/student/js.png"},{"title":"web for beginer","description":"day la mot khoa hoc web danh cho nguoi moi bat dau.","price":"$13","image":"/student/js.png"},{"title":"Mobile for beginer","description":"day la mot khoa hoc mobile danh cho nguoi moi bat dau.","price":"$113","image":"/student/js.png"},{"title":"Mobile for beginer","description":"day la mot khoa hoc mobile danh cho nguoi moi bat dau.","price":"$113","image":"/student/js.png"},{"title":"Mobile for beginer","description":"day la mot khoa hoc mobile danh cho nguoi moi bat dau.","price":"$113","image":"/student/js.png"},{"title":"Mobile for beginer","description":"day la mot khoa hoc mobile danh cho nguoi moi bat dau.","price":"$113","image":"/student/js.png"},{"title":"Mobile for beginer","description":"day la mot khoa hoc mobile danh cho nguoi moi bat dau.","price":"$113","image":"/student/js.png"},{"title":"Mobile for beginer","description":"day la mot khoa hoc mobile danh cho nguoi moi bat dau.","price":"$113","image":"/student/js.png"}]
  // const Newcourse=[{"title":"Mobile for beginer","description":"day la mot khoa hoc mobile danh cho nguoi moi bat dau.","price":"$113","image":"/student/js.png"},{"title":"web for beginer","description":"day la mot khoa hoc web danh cho nguoi moi bat dau.","price":"$1133","image":"/student/js.png"},{"title":"nau an for beginer","description":"day la mot khoa hoc web danh cho nguoi moi bat dau.","price":"$123","image":"/student/js.png"},{"title":"web for beginer","description":"day la mot khoa hoc web danh cho nguoi moi bat dau.","price":"$13","image":"/student/js.png"},{"title":"Mobile for beginer","description":"day la mot khoa hoc mobile danh cho nguoi moi bat dau.","price":"$113","image":"/student/js.png"},{"title":"Mobile for beginer","description":"day la mot khoa hoc mobile danh cho nguoi moi bat dau.","price":"$113","image":"/student/js.png"},{"title":"Mobile for beginer","description":"day la mot khoa hoc mobile danh cho nguoi moi bat dau.","price":"$113","image":"/student/js.png"},{"title":"Mobile for beginer","description":"day la mot khoa hoc mobile danh cho nguoi moi bat dau.","price":"$113","image":"/student/js.png"},{"title":"Mobile for beginer","description":"day la mot khoa hoc mobile danh cho nguoi moi bat dau.","price":"$113","image":"/student/js.png"},{"title":"Mobile for beginer","description":"day la mot khoa hoc mobile danh cho nguoi moi bat dau.","price":"$113","image":"/student/js.png"}]
  // const mostCategory=[{"name":"Mobile Development"}]
  //   res.render('vwAccount/home',{viewcourse: topviewcourse,newcourse: Newcourse, popularcourse:toppopularcourse,mostcategory:mostCategory,isLogin:req.session.auth,acc: req.session.authAccount});

  res.render("vwStudent/profile", { authaccount: req.session.authAccount });
};
const detailCourseUI = async (req, res) => {
  try {
    const user = req.session.authAccount;
    
   if(user){
      var account = await StudentModel.findOne({ "id_account":req.session.authAccount.account._id})
       
      var isBuy = false ;
      var isAddCart = false;
      var isWishList = false ;
      var listEnroll = account.courses_enroll;
      for( var i=0;i<listEnroll.length ; i++)
      {
        if(listEnroll[i].id_course == req.params.id)
          isBuy = true;
      }
      var listCart = account.cart;
      for( var i=0;i<listCart.length ; i++)
      {
        if(listCart[i].id_course == req.params.id)
        isAddCart = true;
      }

      var wishlist = account.wishlist;
      for( var i=0;i<wishlist.length ; i++)
      {
        if(wishlist[i].id_course == req.params.id)
        isWishList = true;
      }
       console.log(" BUY IS ", req.params.id, account.courses_enroll,isBuy)
     CourseModel.findOne({ _id: req.params.id }).lean().populate({ path: 'chapter', populate: { path: 'lessons' } }).populate({ path: "author_id" }).exec(function (err, story) {
       if (err) return (err);
       return res.render("Student/courseDetail", { course: story, chapter: story.chapter, user: user.account, review:story.list_reviews,isLogin: req.session.auth, acc: req.session.authAccount , id_course : req.params.id, avatar : story.image, title:story.title,isBuy:isBuy, isAddCart:isAddCart, isWishList:isWishList });
       // , 
     });
   }
   else {
    CourseModel.findOne({ _id: req.params.id }).lean().populate({ path: 'chapter', populate: { path: 'lessons' } }).populate({ path: "author_id" }).exec(function (err, story) {
      if (err) return (err);
      console.log(story);
      return res.render("Student/courseDetail", { course: story, chapter: story.chapter, review: story.list_reviews, isLogin: req.session.auth,
        acc: req.session.authAccount, });
      // , user: user.account, isLogin: req.session.auth, acc: req.session.authAccount
    });}

    
  } catch (error) {
    CourseModel.findOne({ _id: req.params.id }).lean().populate({ path: 'chapter', populate: { path: 'lessons' } }).populate({ path: "author_id" }).exec(function (err, story) {
      if (err) return (err);
      return res.render("Student/courseDetail", { course: story, chapter: story.chapter, isLogin: req.session.auth,
        acc: req.session.authAccount, });
      // , user: user.account, isLogin: req.session.auth, acc: req.session.authAccount
    });
  }
  
};


const accountUI = async (req, res) => {
  const profile = { "avatar": "/avata.png", "email": "ptvy@gmail.com", "username": "vyvy", "password": "1", "role": "3" };
  res.render('vwStudent/profile', { account: profile });
}

const topCourse = async (req, res) => {
  const coursetop = await CourseModel.find().lean();
  const toppopularcourse = await CourseModel.find().lean();
  const topviewcourse = await CourseModel.find().lean();
  
  const Newcourse = await CourseModel.find().lean();

  const mostCategory = [{ "name": "Mobile Development" }]
  res.render('vwAccount/home', { viewcourse: coursetop, newcourse: Newcourse, popularcourse: toppopularcourse, mostcategory: mostCategory, isLogin: req.session.auth, acc: req.session.authAccount });
};

export default {
  GetAllAccount,
  CreateAccount,
  DeleteAccount,
  GetOneAccount,
  UpdatePasswordAccount,
  UpdateInfoAccount,
  AccountData,
  AccountDataCourse,
  accountUI,
  detailCourseUI,
  topCourse
};