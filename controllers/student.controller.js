import Student from '../models/student.model.js';

const GetAllStudent = async(req, res) =>{
    try{
        const student = await Student.find();

        res.status(200).json({
            status : 'success',
            length : student.length,
            student 
        
        });

    } catch(err){
        res.status(404).json({
            status:'fail',
            message : 'Missing require fail'
        });
    }
};
 
const CreateStudent = async(req,  id_account ) =>{
  const data = new Student({
      id_account: id_account,
      fullname: req.body.fullname
  })

  try {
      const dataToSave = await data.save();
      return json(dataToSave)
  }
  catch (error) {
     return json({message: error.message})
  }
} 


const DeleteStudent = async (req, res, id_account) => {
    try {
      const id = req.params.id;
      const data = await Student.findOneAndDelete({ "id_account" : id_account})
      res.send(`Document with data has been deleted..`)
    } catch (err) {
      res.status(404).json({
        status: "fail",
        message: "ID invalid",
      });
    }
  };

  const UpdateRating = async (req) =>{
    const id = req.session.authAccount?.account?._id ;
    const data = await Student.findOne({ "id_account" : id})

    const rating = {
      id_course : req.body.idPost,
      scores : req.body.scores,
      comment : req.body.comment
    }
    const ratingList = data.rating_list;
    ratingList.push(rating)

    const dataUpdate = await Student.findOneAndUpdate({ "id_account" : id}, { rating_list :ratingList }, {
      returnOriginal: false
    })
 
    return dataUpdate
  }


  const UpdateEnrollCourse = async (req) =>{
    const id = req.session.authAccount?.account?._id ;
    const data = await Student.findOne({ "id_account" : id})

    const course = {
      id_course : req.body.idCourse,
      name_course : req.body.name_course,
      avatar_course : req.body.avatar_course
    }
    const courses_enroll = data.courses_enroll;
    courses_enroll.push(course)

    const dataUpdate = await Student.findOneAndUpdate({ "id_account" : id}, { courses_enroll :courses_enroll }, {
      returnOriginal: false
    })
 
    return dataUpdate
  }

  const UpdateWishList = async (req) =>{
    const id = req.session.authAccount?.account?._id ;
    const data = await Student.findOne({ "id_account" : id})

    const course = {
      id_course : req.body.idCourse,
      name_course : req.body.name_course,
      avatar_course : req.body.avatar_course
    }
    const wishlist = data.wishlist;
    wishlist.push(course)

    const dataUpdate = await Student.findOneAndUpdate({ "id_account" : id}, { wishlist :wishlist }, {
      returnOriginal: false
    })
 
    return dataUpdate
  }

  const UpdateStudent = async (req) => {
    
      const id = req.session.authAccount?.account?._id ;
      const data = await Student.findOneAndUpdate({ "id_account" : id}, {fullname : req.body.fullname}, {
        returnOriginal: false
      })
   
      return data
    
  };


const topCourse= async (req,res)=>{
  const toppopularcourse=[{"title":"Mobile for beginer","description":"day la mot khoa hoc mobile danh cho nguoi moi bat dau.","price":"$113","image":"/student/js.png"},{"title":"web for beginer","description":"day la mot khoa hoc web danh cho nguoi moi bat dau.","price":"$1133","image":"/student/js.png"},{"title":"nau an for beginer","description":"day la mot khoa hoc web danh cho nguoi moi bat dau.","price":"$123","image":"/student/js.png"},{"title":"web for beginer","description":"day la mot khoa hoc web danh cho nguoi moi bat dau.","price":"$13","image":"/student/js.png"}]
  const topviewcourse=[{"title":"Mobile for beginer","description":"day la mot khoa hoc mobile danh cho nguoi moi bat dau.","price":"$113","image":"/student/js.png"},{"title":"web for beginer","description":"day la mot khoa hoc web danh cho nguoi moi bat dau.","price":"$1133","image":"/student/js.png"},{"title":"nau an for beginer","description":"day la mot khoa hoc web danh cho nguoi moi bat dau.","price":"$123","image":"/student/js.png"},{"title":"web for beginer","description":"day la mot khoa hoc web danh cho nguoi moi bat dau.","price":"$13","image":"/student/js.png"},{"title":"Mobile for beginer","description":"day la mot khoa hoc mobile danh cho nguoi moi bat dau.","price":"$113","image":"/student/js.png"},{"title":"Mobile for beginer","description":"day la mot khoa hoc mobile danh cho nguoi moi bat dau.","price":"$113","image":"/student/js.png"},{"title":"Mobile for beginer","description":"day la mot khoa hoc mobile danh cho nguoi moi bat dau.","price":"$113","image":"/student/js.png"},{"title":"Mobile for beginer","description":"day la mot khoa hoc mobile danh cho nguoi moi bat dau.","price":"$113","image":"/student/js.png"},{"title":"Mobile for beginer","description":"day la mot khoa hoc mobile danh cho nguoi moi bat dau.","price":"$113","image":"/student/js.png"},{"title":"Mobile for beginer","description":"day la mot khoa hoc mobile danh cho nguoi moi bat dau.","price":"$113","image":"/student/js.png"}]
  const Newcourse=[{"title":"Mobile for beginer","description":"day la mot khoa hoc mobile danh cho nguoi moi bat dau.","price":"$113","image":"/student/js.png"},{"title":"web for beginer","description":"day la mot khoa hoc web danh cho nguoi moi bat dau.","price":"$1133","image":"/student/js.png"},{"title":"nau an for beginer","description":"day la mot khoa hoc web danh cho nguoi moi bat dau.","price":"$123","image":"/student/js.png"},{"title":"web for beginer","description":"day la mot khoa hoc web danh cho nguoi moi bat dau.","price":"$13","image":"/student/js.png"},{"title":"Mobile for beginer","description":"day la mot khoa hoc mobile danh cho nguoi moi bat dau.","price":"$113","image":"/student/js.png"},{"title":"Mobile for beginer","description":"day la mot khoa hoc mobile danh cho nguoi moi bat dau.","price":"$113","image":"/student/js.png"},{"title":"Mobile for beginer","description":"day la mot khoa hoc mobile danh cho nguoi moi bat dau.","price":"$113","image":"/student/js.png"},{"title":"Mobile for beginer","description":"day la mot khoa hoc mobile danh cho nguoi moi bat dau.","price":"$113","image":"/student/js.png"},{"title":"Mobile for beginer","description":"day la mot khoa hoc mobile danh cho nguoi moi bat dau.","price":"$113","image":"/student/js.png"},{"title":"Mobile for beginer","description":"day la mot khoa hoc mobile danh cho nguoi moi bat dau.","price":"$113","image":"/student/js.png"}]
  const mostCategory=[{"name":"Mobile Development"}]
  res.render('vwAccount/home',{viewcourse: topviewcourse,newcourse: Newcourse, popularcourse:toppopularcourse,mostcategory:mostCategory});
};


export default { GetAllStudent, CreateStudent, DeleteStudent, UpdateStudent, UpdateRating, UpdateEnrollCourse, UpdateWishList,topCourse };
