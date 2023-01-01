import Admin from '../models/admin.model.js';

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
  
  const UpdateAdmin = async (req, res) => {
    try {
      const id = req.params.id;
      const data = await Admin.findOneAndUpdate({ "id_account" : id}, req.body)
      res.send(data)
    } catch (err) {
      res.status(404).json({
        status: "fail",
        message: "ID invalid",
      });
    }
  };

  export default { GetAllAdmin, CreateAdmin, DeleteAdmin, UpdateAdmin };