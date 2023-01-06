import  express from  'express';
import Admin from "../controllers/admin.controller.js";
import bodyParser from 'body-parser';
var jsonParser = bodyParser.json();
const router = express.Router();

// router 
//     .route('/')
//         .get(Admin.GetAllAdmin);
// router    
//     .route('/:id')
//         .patch(jsonParser, Admin.UpdateAdmin);

router.get("/category",(req,res)=>{
    const test=[{"name": "Thanh"},{"name":"ngulon"}];
    const test2 = [{"age": "18"},{"age":"81"}];
    res.render('Admin/categoryCensor',{value:test, value2:test2});
})


export default  router ;  