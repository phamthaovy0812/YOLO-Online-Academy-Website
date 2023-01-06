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
  const detailUI = async (req,res)=>{
    
    const courseDetail={"title":"JavaScript for Beginners test","price":"$50.00 test","subtitle":"Learn javascript online and supercharge your web design with this Javascript for beginners training course. Test","lastUpdate":"11/2022 test","image":"/student/js.png","number_review":"18 test"}
    res.render('Student/courseDetail',{course:courseDetail});
}
  
  export default { GetAllStudent, CreateStudent, DeleteStudent, UpdateStudent, detailUI};