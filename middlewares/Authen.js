import Account from "../models/Account.model.js";
import Student from "../models/student.model.js";
import Teacher from "../models/teacher.model.js";
import Admin from "../models/admin.model.js";
import bcrypt from "bcryptjs";

export default (req, res) =>{
    const handleResponse = async (data)=>{

        const account = await Account.findById(data.id);

        if(data.role==1)
        { 
            const teacher = await Teacher.findOne({"id_account":data.id});
            res.status(200).json({account , teacher});
        }
        else if(data.role==2)
        {
            const admin = await Admin.findOne({"id_account":data.id});
            res.status(200).json({account , admin});
        }
        else {
            const student = await Student.findOne({"id_account":data.id});
            res.status(200).json({account , student});
        }
      
    }

 
    Account.findOne({
        username : req.body.username
    })
    .then(data =>{
 
        if(!data || !bcrypt.compareSync( req.body.password, data.password ) )
        {
            res.status(300).json("wrong username or password");
        }
        else {
             return data;
         }
    })
    .then( data=>{
        handleResponse(data);
    })
    .catch(err =>{
        res.status(400).json(err);
    })
}