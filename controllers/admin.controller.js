import Admin from '../models/admin.model.js';
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

  const categoryCensor = async(req, res) => {
    const categoryList = [{"name":"DEVELOPMENT test"}, {"name":"Business"}, {"name":"Design"}];
    res.render('Admin/categoryCensor',{category:categoryList})
  }

  const teacherCensor = async(req, res) => {
    const teacherList = [{"fullname":"Nguyen Thi Minh Thao", "skill":"ReactJS, React Hooks"}, {"fullname": "Bui Quang Thanh", "skill": "Python, Data Science"},{"fullname": "Bui Thi Dung", "skill": "Out Trinh"}];
    res.render('Admin/teacherCensor',{teacher: teacherList})
  }

  const studentCensor = async(req, res) => {
    const studentList = [{"fullname": "Pham Thao Vy"}, {"fullname": "Pham Hong Tan"}, {"fullname": "Ha Thi Thanh Tu"}];
    res.render('Admin/studentCensor', {student: studentList})
  }

  export default { GetAllAdmin, CreateAdmin, DeleteAdmin, UpdateAdmin, categoryCensor, teacherCensor, studentCensor };