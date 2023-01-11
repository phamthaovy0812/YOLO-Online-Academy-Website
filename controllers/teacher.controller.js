import Teacher from "../models/teacher.model.js";
import ChapterModel from '../models/Chapter.model.js';
import LessonModel from '../models/Lesson.model.js';
import TeacherSevice from "../services/Teacher.sevice.js";
import CourseModel from "../models/Course.model.js";
import CourseController from "./Course.controller.js";
const GetAllTeacher = async (req, res) => {
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

const CreateTeacher = async (req, res, id_account) => {
  const data = new Teacher({
    id_account: id_account,
    fullname: req.fullname,
    skill: req.skill,
    description: req.description,
  });

  const dataToSave = await data.save();
};

const DeleteTeacher = async (req, res, id_account) => {
  try {
    const id = req.params.id;
    const data = await Teacher.findOneAndDelete({ "id_account": id_account })
    res.send(`Document with data has been deleted..`)
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: "ID invalid",
    });
  }
};

const UpdateTeacher = async (req) => {
  var data ;
  try {
    const id = req.session.authAccount?.account?._id ;
    data = await Teacher.findOneAndUpdate({ "id_account" : id}, {fullname : req.body.fullname}, {
      returnOriginal: false
    })
    
  } catch (err) {
    data = {status : 400, message : "error"}
  }
  return data;
};


const viewCreateCourse = async (req, res) => {
  const user = req.session.authAccount;
  if (user && user.account.role == 1 ){
    const subCategorys = await TeacherSevice.getSubCategory();
    let chapters = await ChapterModel.find().lean();

    ChapterModel.find({}).lean().populate('lessons').exec(function (err, story) {
      if (err) return (err);
      console.log(subCategorys);

      res.render("Teacher/createCourse", {
        chapters: story, subCategory: subCategorys, user: user, isLogin: req.session.auth,
        acc: req.session.authAccount
      });
    });// Ch
  }else{  
    res.render("Error/NoAuthen"); 
  }
  
}
const createCourse = async (req, res) => {
  try {
    const course = req.body;
    const user = req.session.authAccount;
    const chapter = await TeacherSevice.getChapterByTime((course.chapter));
    const IDSubCategory = await TeacherSevice.getIDCategory(course.sub_category);
    var datetime = new Date();
    console.log(chapter);
    const file = req.files;
    const courseObject = {
      title: course.title,
      slug_category: course.sub_category,
      sub_category: IDSubCategory,
      subtitle: course.subtitle,
      description: course.description,
      author_id: user.account._id,
      number_review: course.number_review || 0,
      scores_review: course.scores_review || 0,
      list_reviews: course.list_reviews || [],
      image: file.image[0].path,
      price: course.price,
      lastUpdate: datetime.toISOString().slice(0, 10) || 2022,
      promotion: course.promotion,
      syllabus: course.syllabus,
      videoDemo: file.videoDemo[0].path,
      chapter: chapter || [],

    }
    console.log(courseObject);
    const course_Data = new CourseModel(courseObject);

    const value = await course_Data.save();

    if (value) {
      res.redirect("/api/teachers/homepage"); 
    }
    else {
      res.status(200).json({ message: "Failed" });

    }
  } catch (error) {
    res.status(500).json(error);
  }
}

const homepage = (req, res) => {
  const user = req.session.authAccount;
  console.log(user);
  res.render('Teacher/home', { user: user, isLogin: req.session.auth,
    acc: req.session.authAccount })
};

const editCourse = async (req, res) => {
  const user = req.session.authAccount;
  console.log(user);
  const course = await CourseModel.find({ author_id: user.account._id }).lean();
  console.log(course);

  res.render("Teacher/editCourse", { course: course , isLogin: req.session.auth,
    acc: req.session.authAccount});
};

const editCourseDetail = async (req, res) => {
  try {
    const user = req.session.authAccount;
    const subCategorys = await TeacherSevice.getSubCategory();
    const allchap = await ChapterModel.find({ author: user.account._id }).lean();
    CourseModel.findOne({ _id: req.params.id, }).lean().populate({ path: 'chapter', populate: { path: 'lessons' } }).exec(function (err, story) {
      if (err) return (err);
      res.render("Teacher/editCourseDetail", { course: story, subCategory: subCategorys, chapters: story.chapter, user: user, allChapter: allchap , isLogin: req.session.auth,
        acc: req.session.authAccount});


    });// Ch
  } catch (error) {
    return error
  } 
  



};
const handleUpdateCourse = async (req, res) => {
  try {
    const id = req.params.id;
    const courseUpdatePagram = req.body;
    const file = req.files;
    
    const chapter = await TeacherSevice.getChapterByTime(courseUpdatePagram.chapter);
    console.log(courseUpdatePagram)
    const IDSubCategory = await TeacherSevice.getIDCategory(courseUpdatePagram.sub_category);
    var datetime = new Date();
    const updateCourse = await CourseModel.findByIdAndUpdate(id, {
      title: courseUpdatePagram.title,
      sub_category: IDSubCategory,
      subtitle: courseUpdatePagram.subtitle,
      description: courseUpdatePagram.description,
      author_id: courseUpdatePagram.author_id,
      number_review: courseUpdatePagram.number_review || 0,
      scores_review: courseUpdatePagram.scores_review || 0,
      list_reviews: courseUpdatePagram.list_reviews || [],
      image: file.image[0].path,
      price: courseUpdatePagram.price,
      lastUpdate: datetime.toISOString().slice(0, 10) || 2022,
      promotion: courseUpdatePagram.promotion||"No",
      syllabus: courseUpdatePagram.syllabus,
      videoDemo: file.videoDemo[0].path,

    }, { new: true });





    if (updateCourse)
      res.render("Teacher/editCourseDetail");
    else
      res.send("Failed");
  } catch (error) {

  }

}
const myListCourses = async (req, res) => {
  try {
    const user = req.session.authAccount;
    if (user && user.account.role==1)
    {
      console.log(user);
      const course = await CourseModel.find({ author_id: user.account._id }).lean();
      console.log(course);

      res.render("Teacher/myListCourses", {
        course: course, isLogin: req.session.auth,
        acc: req.session.authAccount
      });
    }
    else{
      res.render("Error/NoAuthen");
    }
  
  } catch (error) {
      return error;
  }
 
};
export default { GetAllTeacher, CreateTeacher, DeleteTeacher, UpdateTeacher, viewCreateCourse, homepage, editCourse, myListCourses, createCourse, editCourseDetail, handleUpdateCourse }