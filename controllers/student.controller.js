import CourseModel from "../models/Course.model.js";
import Student from "../models/student.model.js";
import CourseController from "./Course.controller.js";


const GetAllStudent = async (req, res) => {
  try {
    const student = await Student.find();

    res.status(200).json({
      status: "success",
      length: student.length,
      student,
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: "Missing require fail",
    });
  }
};

const CreateStudent = async (req, id_account) => {
  const data = new Student({
    id_account: id_account,
    fullname: req.fullname,
  });

  try {
    const dataToSave = await data.save();
    return JSON.stringify(dataToSave);
  } catch (error) {
    return JSON.stringify({ message: error.message });
  }
};

const DeleteStudent = async (req, res, id_account) => {
  try {
    const id = req.params.id;
    const data = await Student.findOneAndDelete({ id_account: id_account });
    res.send(`Document with data has been deleted..`);
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: "ID invalid",
    });
  }
};


  const UpdateRating = async (req) =>{
    const id = req.session.authAccount?.account?._id ;
    const data = await Student.findOne({ "id_account" : id})

    const rating = {
      id_course : req.params.id,
      scores : req.body.scores, 
      comment : req.body.comment
    }
    const ratingCourse = {
      id_course: req.params.id,
      scores: req.body.scores,
      comment: req.body.comment,
      id_user:id,
      name:data.fullname,
      pathImage:"https://cdn3d.iconscout.com/3d/premium/thumb/graduate-student-6368706-5250853.png",
    }   
    console.log(data)
    const ratingList = data.rating_list;
    ratingList.push(rating)

    const dataUpdate = await Student.findOneAndUpdate({ "id_account" : id}, { rating_list :ratingList }, {
      returnOriginal: false
    })
    const course = await CourseModel.findOne({"_id":req.params.id});
    const newinfor=course.list_reviews;
    newinfor.push(ratingCourse)

    const updated = await CourseModel.findOneAndUpdate({ "_id": req.params.id }, { list_reviews: newinfor }, { returnOriginal: false });
    console.log(updated)

    const updateNumberReview = await CourseController.updateScoresandReview();
    return dataUpdate;
  }

const UpdateEnrollCourse = async (req) => {
  const id = req.session.authAccount?.account?._id;
  if(id!=null)
  {
    const data = await Student.findOne({ id_account: id });

    const course = {
      id_course: req.body._id,
      name_course: req.body.title,
      avatar_course: req.body.avatar,
    };
    const courses_enroll = data.courses_enroll;
    courses_enroll.push(course);

    const dataUpdate = await Student.findOneAndUpdate(
      { id_account: id },
      { courses_enroll: courses_enroll },
      {
        returnOriginal: false,
      }
    );
    return dataUpdate;
  }
  return null;
};

const UpdateCart = async (req) => {
  const id = req.session.authAccount?.account?._id;
  const data = await Student.findOne({ id_account: id });

  const course = {
    id_course: req.body._id,
    name_course: req.body.title,
    avatar_course: req.body.avatar,
  };
  const cart = data.cart;
  cart.push(course);

  const cartUpdate = await Student.findOneAndUpdate(
    { id_account: id },
    { cart: cart },
    {
      returnOriginal: false,
    }
  );

  return cartUpdate;
};

const UpdateWishList = async (req) => {
  const id = req.session.authAccount?.account?._id ;
  // const id = req.session.authAccount._id;
  const data = await Student.findOne({ id_account: id });
  // id_course: req.params.id,
  //     name_course: courses.title,
  //     avatar_course: courses.image,
  const course = {
    id_course: req.params.id,
    name_course:  req.body.title,
    avatar_course: req.body.image,
  };
  const wishlist = data.wishlist;
  wishlist.push(course);

  const dataUpdate = await Student.findOneAndUpdate(
    { id_account: id },
    { wishlist: wishlist },
    {
      returnOriginal: false,
    }
  );
  return dataUpdate;
};

const DeleteWishList = async (req) => {
  const id = req.session.authAccount?.account?._id;
  const data = await Student.findOne({ id_account: id });

  const course = {
    id_course: req.body.idCourse,
    name_course: req.body.name_course,
    avatar_course: req.body.avatar_course,
  };
  const wishlist = data.wishlist;

  for (var i = 0; i < wishlist.length; i++) {
    if (wishlist[i].id_course == course.id_course) {
      wishlist.splice(i, 1);
    }
  }

  const categoryUI = async (req,res)=>{
    const categoryView = {"name":"DEVELOPMENT test"}
    res.render('Student/category',{category:categoryView})
  };
  
  
  const dataUpdate = await Student.findOneAndUpdate(
    { id_account: id },
    { wishlist: wishlist },
    {
      returnOriginal: false,
    }
  );
  return dataUpdate;
};

const UpdateStudent = async (req) => {
  const id = req.session.authAccount?.account?._id;
  const data = await Student.findOneAndUpdate(
    { id_account: id },
    { fullname: req.body.fullname },
    {
      returnOriginal: false,
    }
  );

  return data;
};

const categoryUI = async (req, res) => {
  const categoryView = { name: "DEVELOPMENT test" };
  res.render("Student/category", { category: categoryView });
};

const topCourse = async (req, res) => {
  const coursetop = await CourseModel.find().lean();
  const toppopularcourse = await CourseModel.find().lean();
  const topviewcourse = await CourseModel.find().lean();

  const Newcourse = await CourseModel.find().lean();

  const mostCategory = [{ name: "Mobile Development" }];
  res.render("vwAccount/home", {
    viewcourse: coursetop,
    newcourse: Newcourse,
    popularcourse: toppopularcourse,
    mostcategory: mostCategory,
    isLogin: req.session.auth,
    acc: req.session.authAccount,
  });
};

const payCourse = async (req, res) => {
  const id = req.session.authAccount?.account?._id ;
  const data = await Student.findOne({ "id_account" : id})
 
  const PayCourse = data.courses_enroll
  console.log("=>",PayCourse)
  console.log({ paycourse: PayCourse})
  res.render("vwStudent/shopping", { paycourse: PayCourse, isLogin: req.session.auth,
    acc: req.session.authAccount });
};

const WishList = async (req, res) => {
  const wishList = [
    {
      title:
        "Mobile for beginerrrrrrrrrrr rrrrrrr rrrrrr rrrrrr rrrrr rrrrrrrrr",
      sub_category: "Web developmet",
      author_id: { fullname: "Pham Vy" },
      number_review: "12344",
      scores_review: "4.5",
      subtitle: "day la mot khoa hoc mobile danh cho nguoi moi bat dau.",
      price: "$113",
      image: "/student/js.png",
    },
    {
      title: "Mobile for beginer",
      sub_category: "Web developmet",
      author_id: { fullname: "Nguyen Thao" },
      number_review: "12344",
      scores_review: "4.5",
      subtitle: "day la mot khoa hoc mobile danh cho nguoi moi bat dau.",
      price: "$113",
      image: "/student/js.png",
    },
    {
      title: "Mobile for beginer",
      sub_category: "Web developmet",
      author_id: { fullname: "Bui Thanh" },
      number_review: "12344",
      scores_review: "4.5",
      subtitle: "day la mot khoa hoc mobile danh cho nguoi moi bat dau.",
      price: "$113",
      image: "/student/js.png",
    },
    {
      title: "Mobile for beginer",
      sub_category: "Web developmet",
      author_id: { fullname: "Nguyen Tan" },
      number_review: "12344",
      scores_review: "4.5",
      subtitle: "day la mot khoa hoc mobile danh cho nguoi moi bat dau.",
      price: "$113",
      image: "/student/js.png",
    },
  ];
  res.render("vwStudent/profile", { wish: wishList });
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

const detailCourseUI = async (req, res) => {
  const course = await CourseModel.find().lean();
  console.log(req.params.id);
  const user = req.session.authAccount;
  CourseModel.findOne({ _id: req.params.id })
    .lean()
    .populate({ path: "chapter", populate: { path: "lessons" } })
    .exec(function (err, story) {
      if (err) return err;
      res.render("Student/viewlesson", {
        course: story,
        chapter: story.chapter,
        user: user.account,
        isLogin: req.session.auth,
        acc: req.session.authAccount,
      });
    });
};
const  addWishList = async (req, res) => {
    const userID = req.body.idUser;
    const courseID = req.params.id;
    const courses = await CourseModel.findOne({ _id: courseID });
    const objectCourse = {
      id_course: req.params.id,
      name_course: courses.title,
      avatar_course: courses.image,

    };
  const updateAccount = UpdateWishList(req)
  const data = await Student.findOne({ "id_account": userID });
    const wishlists = data.wishlist;
    wishlists.push(objectCourse)


  const userCurrent = await Student.findOneAndUpdate({ "id_account": userID }, { wishlist: wishlists }, {
      returnOriginal: false
    });



  res.redirect("/api/accounts/courseDetail/" + courseID);

  }


export default { addWishList,detailCourseUI, profile,WishList,categoryUI,DeleteWishList, GetAllStudent, CreateStudent, DeleteStudent, UpdateStudent, UpdateRating, UpdateEnrollCourse, UpdateWishList,topCourse,payCourse,UpdateCart};
