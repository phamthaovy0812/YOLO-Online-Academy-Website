import express from  'express';
import Account  from  '../controllers/account.controller.js';
import bodyParser from 'body-parser';
import Login  from  '../middlewares/Authen.js';
var jsonParser = bodyParser.json();
const router = express.Router();

router.get('/signup',(req,res)=>{
    res.render("vwAccount/signup",{ layout: false });
  })

router.post('/signup', (req, res)=>{
    req.body.role=0;
    req.body.avatar="https://haycafe.vn/wp-content/uploads/2022/02/Avatar-trang-den.png";
    
    Account.CreateAccount(req)
    res.render("vwAccount/signup");
});

router.get('/login',(req,res)=>{
    res.render('vwAccount/login', { layout: false });
})

router.post('/login', async (req, res)=>{
    console.log(req.body)
    var dataRes = await  Login(req);
    
   
    if(dataRes.status == 200)
    {
        res.redirect('/');
    }
    res.render("vwAccount/login");  
});
router 
    .route('/')
        .get(Account.GetAllAccount);
        // .post(jsonParser,Account.CreateAccount)
router
    .route('/:id')
        .delete(Account.DeleteAccount)
        .get( Account.GetOneAccount)
        .patch(jsonParser,Account.UpdateAccount);


    
 
export default router ;  