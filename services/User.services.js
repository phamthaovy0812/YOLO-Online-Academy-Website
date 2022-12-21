import User from"../models/User.model.js"

export default {
    async getUserByUsername(name){
        console.log("getUserByUsername",name);
        try {
            const user = await User.findOne({username: name});
            if(!user){
                console.log("NULLL");
                return null;
            }
            else{
                return user;
            }
            
          
        } catch (error) {
            return null;

        }
        return null;
    }
}