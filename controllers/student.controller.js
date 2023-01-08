import Student from '../models/student.model.js';

const GetAllStudent = async(req, res) =>{
    try{
        const student = await Student.find();

        res.status(200).json({
            status : 'success',
            length : student.length,
            student 
        
        });

    } catch(err){
        res.status(404).json({
            status:'fail',
            message : 'Missing require fail'
        });
    }
};
 
const CreateStudent = async(req,  id_account ) =>{
  const data = new Student({
      id_account: id_account,
      fullname: req.body.fullname
  })

  try {
      const dataToSave = await data.save();
      return json(dataToSave)
  }
  catch (error) {
     return json({message: error.message})
  }
} 


const DeleteStudent = async (req, res, id_account) => {
    try {
      const id = req.params.id;
      const data = await Student.findOneAndDelete({ "id_account" : id_account})
      res.send(`Document with data has been deleted..`)
    } catch (err) {
      res.status(404).json({
        status: "fail",
        message: "ID invalid",
      });
    }
  };

  const UpdateStudent = async (req, res) => {
    try {
      const id = req.params.id;
      const data = await Student.findOneAndUpdate({ "id_account" : id}, req.body, {
        returnOriginal: false
      })
      res.status(200).send(data)
    } catch (err) {
      res.status(404).json({
        status: "fail",
        message: "ID invalid",
      });
    }
  };


  const categoryUI = async (req,res)=>{
    const categoryView = {"name":"DEVELOPMENT test"}
    res.render('Student/category',{category:categoryView})
  };
  
  export default { GetAllStudent, CreateStudent, DeleteStudent, UpdateStudent, categoryUI};