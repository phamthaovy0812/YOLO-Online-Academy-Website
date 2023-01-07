import express from  'express';
import Account  from  '../controllers/account.controller.js';
import bodyParser from 'body-parser';
import Login  from  '../middlewares/Authen.js';
var jsonParser = bodyParser.json();
const router = express.Router();

router.get('/signup',(req,res)=>{
    res.render("vwAccount/signup");
  })

router.post('/signup', (req, res)=>{
    req.body.role=0;
    req.body.avatar="https://haycafe.vn/wp-content/uploads/2022/02/Avatar-trang-den.png";
    
    Account.CreateAccount(req)
    res.render("vwAccount/signup");
});

router.get('/login',(req,res)=>{
    res.render('vwAccount/login');
})

router.post('/login', async (req, res)=>{
   
    var dataRes = await  Login(req);
    
  
    if(dataRes && dataRes.status == 200)
    {
        console.log(dataRes)
        req.session.auth = true
        req.session.authAccount = dataRes
        res.redirect('/');
    }

    res.render("vwAccount/login");  
});

router.get('/changeInfo',(req,res)=>{
    res.render("vwStudent/editprofile")
})
router.post('/changeInfo', async (req, res)=>{
    
    var dataRes = await Account.UpdateInfoAccount(req);
    // var dataRes = await  Login(req);
    
    
    req.session.authAccount.email = dataRes.email ;
    req.session.authAccount.fullname = dataRes.detail.fullname

     console.log(req.session.authAccount )
    // if(dataRes && dataRes.status == 200)
    // {
    //     console.log(dataRes)
    //     req.session.auth = true
    //     req.session.authAccount = dataRes
    //     res.redirect('/');
    // }

    res.render("vwStudent/editprofile") 
});
router 
    .route('/')
        .get(Account.GetAllAccount);
        // .post(jsonParser,Account.CreateAccount)
router
    .route('/:id')
        .delete(Account.DeleteAccount)
        .get( Account.GetOneAccount)
        .patch(jsonParser,Account.UpdatePasswordAccount);


    
 
export default router ;  