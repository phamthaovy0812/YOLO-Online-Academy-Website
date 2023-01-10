import express from  'express';
import Account  from  '../controllers/account.controller.js';
import bodyParser from 'body-parser';
import Login  from  '../middlewares/Authen.js';
import CourseModel from '../models/Course.model.js'
import Student from '../controllers/student.controller.js';
import AccountModel from '../models/Account.model.js';
var jsonParser = bodyParser.json();
const router = express.Router();
import sendEmail from '../middlewares/EmailVerification.js'
router.get('/signup',(req,res)=>{
    res.render("vwAccount/signup",{layout:false});
  })


router.post('/signup', (req, res)=>{
    req.body.role=0;
    req.body.avatar="https://haycafe.vn/wp-content/uploads/2022/02/Avatar-trang-den.png";
    var val = Math.floor(1000 + Math.random() * 9000);
    console.log(val);
    req.session.signup = req.body
    req.session.otp = val;
    AccountModel.findOne({ $or: [{ username: req.body.username }, { email: req.body.email }] }).then(function (doc) {
        if (doc) {
            
          res.render("vwAccount/signup");
          console.log("account or Email exist");
        } else {
            sendEmail(req.session.otp, req.body.email)
            res.redirect("/api/accounts/otp");
        }
      });

    // Account.CreateAccount(req)
});

router.get('/login',(req,res)=>{
    res.render('vwAccount/login',{layout:false});
})

router.get('/otp',(req,res)=>{
    res.render('vwAccount/otp',{layout:false});
})
router.post('/otp',(req,res)=>{
    

    if(req.body.otp == req.session.otp)
    {
        Account.CreateAccount(req.session.signup)
         res.redirect('/api/accounts/login');
    }
    else {
       res.redirect('/api/accounts/otp');
   }
})
router.get("/courseDetail/:id",Account.detailCourseUI);

router.post("/courseDetail/:id",  async (req,res)=>{
  const course = await CourseModel.find().lean();
  const dataAccount = await Student.UpdateRating(req);
  const user = req.session.authAccount;
  
  

  CourseModel.findOne({ _id: req.params.id }).lean().populate({ path: 'chapter', populate: { path: 'lessons' } }).exec(function (err, story) {
      if (err) return (err);
      res.render("Student/courseDetail", { course: story, chapter: story.chapter, user: user });
  
  });
})

router.post("/buy", async(req, res)=>{
    const url = `/api/accounts/courseDetail/${req.body._id}`
    console.log("URL",url)
    const data = await Student.UpdateEnrollCourse(req)
    
    res.redirect(url);
})

router.post("/tocart", async(req, res)=>{
    console.log("req.body ",req.body)
    console.log("session ", req.session)
    const url = `/api/accounts/courseDetail/${req.body._id}`
    console.log("URL",url)
    const data = await Student.UpdateCart(req)
    
    res.redirect(url);
})

router.get("/home", Account.topCourse);

router.post('/login', async (req, res)=>{
   
    var dataRes = await  Login(req);
    var url;
    
    if(dataRes && dataRes.status == 200)
    {
        
        req.session.auth = true
        req.session.authAccount = dataRes;
        if (dataRes.account.role==0){
            url='/api/accounts/home';

        }else if (dataRes.account.role==1){
            url='/api/teachers/homepage';
        } else if (dataRes.account.role==2){
            url='/api/admins/categoryCensor';
        }
        req.session.save(function (err) {
            // session saved
            res.redirect(url); // sua thi sua o day anha Vy, sua dieu huong home a'
        })
    }

    res.render("vwAccount/login");  
})

router.post('/logout',async function (req,res){
    req.session.auth=false;
    req.session.authAccount=null;
    const url='/api/students/home';
    res.redirect(url);
})

router.get('/search',(req,res)=>{
    console.log(req.query);
    res.render('vwAccount/search');
})

router.get("/fullcourses", async (req,res)=>{
    res.render("vwAccount/fullcourses");
   
})

router.get('/changeinfo',(req,res)=>{
    res.render("vwStudent/editprofile",{isLogin: req.session.auth,
        acc: req.session.authAccount})
})

router.post ('/updatepass',async (req, res)=>{
    
   
    var dataRes= await Account.UpdatePasswordAccount(req);
    // var dataRes = await  Login(req);
    if( dataRes.user!=null)
    {
        req.session.authAccount.password= dataRes.password;
    }
    

    console.log(req.session.authAccount )
    res.render("vwStudent/editprofile") 
});

router.post('/updateinfo', async (req, res)=>{
    
    var dataRes = await Account.UpdateInfoAccount(req);
    // var dataRes = await  Login(req);
    
    
    req.session.authAccount.email = dataRes.email ;
    req.session.authAccount.fullname = dataRes.detail.fullname;

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
router.get("*", (req, res) => {
    res.render("Error/404", { layout: false }); // layout false là để k hiển thị header và footer
  })

// router 
//     .route('/')
//         .get(Account.GetAllAccount);
        // .post(jsonParser,Account.CreateAccount)
router
    .route('/:id')
        .delete(Account.DeleteAccount)
        .get( Account.GetOneAccount)
        .patch(jsonParser,Account.UpdatePasswordAccount);

// router.get('/home',(req,res)=>{
//     res.render("vwAccount/home");
// })

// router.get("/home",Account.TopCourse);

export default router ;  