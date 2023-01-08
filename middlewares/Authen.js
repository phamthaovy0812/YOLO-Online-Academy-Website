import Account from "../models/Account.model.js";
import Student from "../models/student.model.js";
import Teacher from "../models/teacher.model.js";
import Admin from "../models/admin.model.js";
import bcrypt from "bcryptjs";

export default  async( req ) =>{
    var dataRes ;
    const data = await Account.findOne({
        username : req.body.username
    });
       if(!data || !bcrypt.compareSync( req.body.password, data.password ) )
        {
           
            dataRes = {"status":300, message : "wrong username or password"};
        }
        else {
            const account = await Account.findById(data.id);
            if(data.role==1)
            { 
                const teacher = await Teacher.findOne({"id_account":data.id});
                dataRes =  {"status":200, account , detail : teacher};
            }
            else if(data.role==2)
            {
                const admin = await Admin.findOne({"id_account":data.id});
                dataRes = {"status":200, account , detail : admin};
            }
            else {
                const student = await Student.findOne({"id_account":data.id});
                dataRes = {"status":200, account , detail : student}; 
            }
         }

    return dataRes
}