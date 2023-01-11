import { json } from "express";
import Account from "../models/account.model.js";
import Student from "./student.controller.js";
import StudentModel from "../models/student.model.js";
import Teacher from "./teacher.controller.js";
import TeacherModel from "../models/teacher.model.js";
import Admin from "./admin.controller.js";
import AdminModel from '../models/admin.model.js';
import bcrypt from "bcryptjs";
import CourseModel from "../models/Course.model.js";
import CourseController from "./Course.controller.js";
import SubCategoryModel from "../models/SubCategory.model.js";
import CategoryModel from "../models/Category.model.js";
import db from "../utils/db.js";



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
 
  const data = {
    id: req.session.authAccount?.account?._id,
    oldpassword:req.body.oldpassword,
    newpassword: req.body.newpassword,
    retypepassword: req.body.retypepassword,
  };
  var dataRes;
  console.log(req.body)
  console.log(data);
  //console.log(bcrypt.compareSync( req.body.oldpassword, req.session.authAccount?.account?.password ));
  var user=null;
  if(!bcrypt.compareSync( req.body.oldpassword, req.session.authAccount?.account?.password ) ||data.newpassword!=data.retypepassword){
    dataRes={status:300,user,message: "can't change pass, error input"};
    console.log("error update");

  }else{
    const newpass=await bcrypt.hash(req.body.newpassword, 10);
    const response = await Account.findByIdAndUpdate(data.id, { password: newpass },
      { returnOriginal: false });
    user=response;
    dataRes={status:200,user,message: "success"};
  }
  return dataRes;
  
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
  const { email, username, password, role, avatar } = req;

  try {
    const handleCreateAccount = async () => {
      const newAccount = new Account({
        avatar,
        email,
        username,
        password,
        role
      });

      console.log( { email, username, password, role, avatar } )
      const dataToSave = await newAccount.save();

      if (dataToSave.role === 1) {
        
        console.log("ID:", req, dataToSave._id)
        Teacher.CreateTeacher(req, dataToSave._id);
      } else if (dataToSave.role === 2) {
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

      const mergedObject = Object.assign({}, req, dataToSave._doc);
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

const profile = async (req, res) => {
  const user = req.session.authAccount;
  res.render("vwStudent/profile", {
    infor: user.account,
    detailinfor:user.detail,
    isLogin: req.session.auth,
    acc: req.session.authAccount,
  });
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
  res.render('vwStudent/profile', { studentlist: studentList, teacherlist: teacherList, wishlist: wishList, isLogin: req.session.auth,
    acc: req.session.authAccount });
}


// const AccountData = async (req, res) => {
//   // const toppopularcourse=[{"title":"Mobile for beginer","description":"day la mot khoa hoc mobile danh cho nguoi moi bat dau.","price":"$113","image":"/student/js.png"},{"title":"web for beginer","description":"day la mot khoa hoc web danh cho nguoi moi bat dau.","price":"$1133","image":"/student/js.png"},{"title":"nau an for beginer","description":"day la mot khoa hoc web danh cho nguoi moi bat dau.","price":"$123","image":"/student/js.png"},{"title":"web for beginer","description":"day la mot khoa hoc web danh cho nguoi moi bat dau.","price":"$13","image":"/student/js.png"}]
//   // const topviewcourse=[{"title":"Mobile for beginer","description":"day la mot khoa hoc mobile danh cho nguoi moi bat dau.","price":"$113","image":"/student/js.png"},{"title":"web for beginer","description":"day la mot khoa hoc web danh cho nguoi moi bat dau.","price":"$1133","image":"/student/js.png"},{"title":"nau an for beginer","description":"day la mot khoa hoc web danh cho nguoi moi bat dau.","price":"$123","image":"/student/js.png"},{"title":"web for beginer","description":"day la mot khoa hoc web danh cho nguoi moi bat dau.","price":"$13","image":"/student/js.png"},{"title":"Mobile for beginer","description":"day la mot khoa hoc mobile danh cho nguoi moi bat dau.","price":"$113","image":"/student/js.png"},{"title":"Mobile for beginer","description":"day la mot khoa hoc mobile danh cho nguoi moi bat dau.","price":"$113","image":"/student/js.png"},{"title":"Mobile for beginer","description":"day la mot khoa hoc mobile danh cho nguoi moi bat dau.","price":"$113","image":"/student/js.png"},{"title":"Mobile for beginer","description":"day la mot khoa hoc mobile danh cho nguoi moi bat dau.","price":"$113","image":"/student/js.png"},{"title":"Mobile for beginer","description":"day la mot khoa hoc mobile danh cho nguoi moi bat dau.","price":"$113","image":"/student/js.png"},{"title":"Mobile for beginer","description":"day la mot khoa hoc mobile danh cho nguoi moi bat dau.","price":"$113","image":"/student/js.png"}]
//   // const Newcourse=[{"title":"Mobile for beginer","description":"day la mot khoa hoc mobile danh cho nguoi moi bat dau.","price":"$113","image":"/student/js.png"},{"title":"web for beginer","description":"day la mot khoa hoc web danh cho nguoi moi bat dau.","price":"$1133","image":"/student/js.png"},{"title":"nau an for beginer","description":"day la mot khoa hoc web danh cho nguoi moi bat dau.","price":"$123","image":"/student/js.png"},{"title":"web for beginer","description":"day la mot khoa hoc web danh cho nguoi moi bat dau.","price":"$13","image":"/student/js.png"},{"title":"Mobile for beginer","description":"day la mot khoa hoc mobile danh cho nguoi moi bat dau.","price":"$113","image":"/student/js.png"},{"title":"Mobile for beginer","description":"day la mot khoa hoc mobile danh cho nguoi moi bat dau.","price":"$113","image":"/student/js.png"},{"title":"Mobile for beginer","description":"day la mot khoa hoc mobile danh cho nguoi moi bat dau.","price":"$113","image":"/student/js.png"},{"title":"Mobile for beginer","description":"day la mot khoa hoc mobile danh cho nguoi moi bat dau.","price":"$113","image":"/student/js.png"},{"title":"Mobile for beginer","description":"day la mot khoa hoc mobile danh cho nguoi moi bat dau.","price":"$113","image":"/student/js.png"},{"title":"Mobile for beginer","description":"day la mot khoa hoc mobile danh cho nguoi moi bat dau.","price":"$113","image":"/student/js.png"}]
//   // const mostCategory=[{"name":"Mobile Development"}]
//   //   res.render('vwAccount/home',{viewcourse: topviewcourse,newcourse: Newcourse, popularcourse:toppopularcourse,mostcategory:mostCategory,isLogin:req.session.auth,acc: req.session.authAccount});

//   res.render("vwStudent/profile", { authaccount: req.session.authAccount });
// };
const detailCourseUI = async (req, res) => {
  try {
    const user = req.session.authAccount;
    const allSubcategory = await SubCategoryModel.find().lean();
    const categories = await CategoryModel.find().lean();
    console.log(allSubcategory);
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
       return res.render("Student/courseDetail", { cate: categories, subcate:allSubcategory,course: story, chapter: story.chapter, user: user.account, review:story.list_reviews,isLogin: req.session.auth, acc: req.session.authAccount , id_course : req.params.id, avatar : story.image, title:story.title,isBuy:isBuy, isAddCart:isAddCart, isWishList:isWishList });
       // , 
     });
   }  
   else {
    CourseModel.findOne({ _id: req.params.id }).lean().populate({ path: 'chapter', populate: { path: 'lessons' } }).populate({ path: "author_id" }).exec(function (err, story) {
      if (err) return (err);
      console.log(story);
      return res.render("Student/courseDetail", {
        cate: categories,
        subcate: allSubcategory, course: story, chapter: story.chapter, review: story.list_reviews, isLogin: req.session.auth,
        acc: req.session.authAccount, });
      // , user: user.account, isLogin: req.session.auth, acc: req.session.authAccount
    });}

    
  } catch (error) {
    CourseModel.findOne({ _id: req.params.id }).lean().populate({ path: 'chapter', populate: { path: 'lessons' } }).populate({ path: "author_id" }).exec(function (err, story) {
      if (err) return (err);
      return res.render("Student/courseDetail", { cate:categories,course: story, chapter: story.chapter, isLogin: req.session.auth,
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
  const allSubcategory = await SubCategoryModel.find().lean();
  const categories = await CategoryModel.find().populate({ path: "sub_categories" }).lean();
  const coursetop = await CourseController.getClickManyView(); 
  const toppopularcourse =await CourseController.getCourseImpress();
  const Newcourse = await CourseController.getNewCreate();
  const mostCategory = [{ "name": "Mobile Development" }]
  const sub=await CourseController.getSubcategory();
  var name;
  sub.map(item=>{
    name=item.subcategory;
  })
  console.log(name);
  res.render('vwAccount/home', { cate:categories,subcate:allSubcategory,viewcourse: coursetop, newcourse: Newcourse, popularcourse: toppopularcourse, mostcategory: name, isLogin: req.session.auth, acc: req.session.authAccount });
};

const SearchCourse=async(req,res)=>{
  try{
    var search='';
    if (req.query.search){
      search= req.query.search;
    }
    
    var page=1;
    if (req.query.page){
      page= req.query.page;
    }
    const limit =5;

    // console.log(req.query.search)
    const dataCourse=await CourseModel.find({
      $or:[
        { title: { $regex: search, $options: 'i'}},
        { slug_category: { $regex: search, $options: 'i'}}
      ]
    }
    ).limit(limit*1).skip((page-1)*limit).lean();

    const count=await CourseModel.find({
      $or:[
        { title: { $regex: search, $options: 'i'}},
        { slug_category: { $regex: search, $options: 'i'}}
      ]
    }
    ).countDocuments();
    // console.log(dataCourse);
    res.render('vwAccount/search',{courseSearch: dataCourse, totalPage:Math.ceil(count/limit), currentPage:page})

  }catch (error)
  {
    console.log(error.message); 

  }

}
const fullcouse = async (req, res) => {
  
}
const handleFullCourse = async (req, res) => {
  const listCourse = await CourseModel.find({ sub_category: req.params.id }).lean();
  res.render('wAccount/fullcourses', { listCourse: listCourse });
}

 const getfullcourseSub= async(req, res)=>{
 
   const id = req.params.id;
   console.log(id);
   const course = await CourseModel.find({sub_category: req.params.id}).lean();
   const subcategory = await SubCategoryModel.find({_id:id}).lean();
  console.log(course);  
   console.log(subcategory);
   const allSubcategory = await SubCategoryModel.find().lean();
   const categories = await CategoryModel.find().populate({ path: "sub_categories" }).lean();

    var empty=true;
    if(course){
      empty=false;
    }
   res.render('vwAccount/fullcourses', { cate: categories, subcate:allSubcategory,course: course, check: empty, name: subcategory[0].name });
  
}
const ViewGetfullcourseSub = async (req, res) => {
  const id = req.params.id;
  console.log(id);
 
  res.render('vwAccount/fullcourses');
    }
export default {
  getfullcourseSub,
  ViewGetfullcourseSub,
  fullcouse,
  handleFullCourse,
  GetAllAccount,
  CreateAccount,
  DeleteAccount,
  GetOneAccount,
  UpdatePasswordAccount,
  UpdateInfoAccount,
  AccountDataCourse,
  accountUI,
  detailCourseUI,
  topCourse,
  SearchCourse,
  profile
};