import  express from  'express';
import Admin from "../controllers/admin.controller.js";
import bodyParser from 'body-parser';
var jsonParser = bodyParser.json();
const router = express.Router();

router 
    .route('/')
        .get(Admin.GetAllAdmin);
router    
    .route('/:id')
        .patch(jsonParser, Admin.UpdateAdmin);
  
export default  router ;  