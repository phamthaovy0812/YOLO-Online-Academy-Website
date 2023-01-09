import Admin from '../models/admin.model.js';
import Student from '../models/student.model.js';
import Teacher from '../models/teacher.model.js';
// import Category from '../models/category.model.js'
import AccountModel from '../models/Account.model.js';

const GetAllAdmin = async(req, res) =>{
    try{
        const admin = await Admin.find();

        res.status(200).json({
            status : 'success',
            length : admin.length,
            admin 
        
        });

    } catch(err){
        res.status(404).json({
            status:'fail',
            message : 'Missing require fail'
        });
    }
};
 
const CreateAdmin = async(req, res, id_account ) =>{
  const data = new Admin({
      id_account: id_account,
      fullname: req.body.fullname
  })

  try {
      const dataToSave = await data.save();
      res.status(200).json(dataToSave)
  }
  catch (error) {
      res.status(400).json({message: error.message})
  }
} 


const DeleteAdmin = async (req, res, id_account) => {
    try {
      const id = req.params.id;
      const data = await Admin.findOneAndDelete({ "id_account" : id_account})
      res.send(`Document with data has been deleted..`)
    } catch (err) {
      res.status(404).json({
        status: "fail",
        message: "ID invalid",
      });
    }
  };
  
  const UpdateAdmin = async (req) => {
    var data ;
    try {
      const id = req.session.authAccount?.account?._id ;
       data = await Admin.findOneAndUpdate({ "id_account" : id}, {fullname : req.body.fullname}, {
        returnOriginal: false
      })
      
    } catch (err) {
      data =  {status : 400, message : "error"}
    }
    return data
  };

  const BlockStudent = async (req, res) => {
  const id_student = req.params.id;
  console.log(id_student);
  const dataUpdate = await Student.findByIdAndUpdate({_id: id_student},{isBlock:true});
  console.log(dataUpdate)
  return res.redirect("/api/admins/studentCensor");
}
  const BlockTeacher = async (req, res) => {
  const id_teacher = req.params.id;
  console.log(id_teacher);
  const dataUpdate = await Teacher.findByIdAndUpdate({_id: id_teacher},{isBlock:true});
  console.log(dataUpdate)
  return res.redirect("/api/admins/teacherCensor");
}

  // const categoryCensor = async(req, res) => {
  //   const allCategories = await Category.find().lean();
  //   res.render('Admin/categoryCensor',{category:allCategories})
  // }

  const teacherCensor = async(req, res) => {
    const allTeacher = await Teacher.find({isBlock:false}).lean();
    res.render('Admin/teacherCensor',{teacher: allTeacher})
  }

  const studentCensor = async(req, res) => {
    const allStudent= await Student.find({isBlock:false}).lean();
    res.render('Admin/studentCensor', {student: allStudent}) 
  }

  const courseCensor = async (req, res) => {
    const allCourses = await Course.find().lean();
    res.render('Admin/courseCensor', {course: allCourses});
  }


  export default { GetAllAdmin, CreateAdmin, DeleteAdmin, UpdateAdmin, teacherCensor, studentCensor, courseCensor, BlockStudent, BlockTeacher};