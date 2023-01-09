import express from  'express';
import Account  from  '../controllers/account.controller.js';
import bodyParser from 'body-parser';
import Login  from  '../middlewares/Authen.js';
import CourseModel from '../models/Course.model.js'
import Student from '../controllers/student.controller.js';
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
    console.log("id course",req.body._id, req.session.id)
    const url = `/api/accounts/courseDetail/${req.body._id}`
    console.log(url)
    const data = await Student.UpdateEnrollCourse(req)
    console.log(data)
    res.redirect(url);
})
router.get("/home", Account.topCourse);

router.post('/login', async (req, res)=>{
   
    var dataRes = await  Login(req);
    
    if(dataRes && dataRes.status == 200)
    {
        
        req.session.auth = true
        req.session.authAccount = dataRes
        const url='/api/accounts/home';
       
        req.session.save(function (err) {
            // session saved
            res.redirect(url); // sua thi sua o day anha Vy, sua dieu huong home a'
        })
    }

    res.render("vwAccount/login");  
});

router.post('/logout',async function (req,res){
    req.session.auth=false;
    req.session.authAccount=null;
    const url='/api/students/home';
    res.redirect(url);
})





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