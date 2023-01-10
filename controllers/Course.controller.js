import CourseModel from "../models/Course.model.js";
import SubCategoryModel from "../models/SubCategory.model.js";
import studentModel from "../models/student.model.js";
export default {
    test(req, res) {

        res.render('courses/create');
    },
    async create(req, res) {
        try {
            const course = req.body;
            const file = req.files;
            const courseObject = {
                title: course.title,
                sub_category: course.sub_category,
                subtitle: course.subtitle,
                description: course.description,
                author_id: course.author_id,
                number_review: course.number_review,
                scores_review: course.scores_review,
                list_reviews: course.list_reviews,
                image: file.image[0].path,
                price: course.price,
                lastUpdate: course.lastUpdate,
                promotion: course.promotion,
                syllabus: course.syllabus,
                videoDemo: file.videoDemo[0].path,
                chapter: course.chapter,
            }
            console.log(courseObject);

            const course_Data = new CourseModel(courseObject);
            
            const value = await course_Data.save();
            if (value) {
                res.status(200).json(value);
            }
            else {
                res.status(200).json({ message: "Failed" });

            }
        } catch (error) {
            res.status(500).json(error);
        }  
    },
    async update(req,res){
        try {
            const id = req.params.id;
            const courseUpdatePagram = req.body;
            const file = req.files;
            const updateCourse = await CourseModel.findByIdAndUpdate(id, {
               title: courseUpdatePagram.title,
                sub_category: courseUpdatePagram.sub_category,
                subtitle: courseUpdatePagram.subtitle,
                description: courseUpdatePagram.description,
                author_id: courseUpdatePagram.author_id,
                number_review: courseUpdatePagram.number_review,
                scores_review: courseUpdatePagram.scores_review,
                list_reviews: courseUpdatePagram.list_reviews,
                image: file.image[0].path,
                price: courseUpdatePagram.price,
                lastUpdate: courseUpdatePagram.lastUpdate,
                promotion: courseUpdatePagram.promotion,
                syllabus: courseUpdatePagram.syllabus,
                videoDemo: file.videoDemo[0].path,
                chapter: courseUpdatePagram.chapter,

            }, { new: true });
            res.status(200).json(updateCourse);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    async getAllCourse(req,res){
        try {
            const courseList = await CourseModel.find();
            console.log(courseList);
            if (JSON.stringify(courseList) === '[]') {
                res.status(200).json({ message: "Empy list" });
            }
            else {
                res.status(200).json(courseList);
            }
        } catch (error) {
            res.status(500).json(error);

        }
    },
    async getCourse(req,res){
        try {
            const id = req.params.id;
            const course = await CourseModel.findById(id);
            if (course) {
                res.status(200).json(course);
            }
            else {
                res.status(200).json({ message: "Lesson not found" });
            }

        } catch (error) {
            res.status(500).json(error);
        }
    },
    async deleteCourse(req,res){
        try {
            await CourseModel.findByIdAndDelete(req.params.id);
            res.status(200).json({ message: "Success" });
        } catch (error) {

            res.status(500).json(error);
        }
    },  
    show(req,res){
        res.render('courses/showVideo');
    }  ,
    uploadImage(req,res){
        console.log('uploadImage');
        res.send("Tinh nang them anh");
    },
    async getCourseManyRating(req,res){
        try {
           
            await CourseModel.find({ "list_reviews.0": { "$exists": true } }).sort({ "list_reviewsLength": -1 }).limit(5).exec(function (err, result) {
                res.json(result)
            });
            
        } catch (error) {
            
        }
    },
    async updateScoresandReview(req,res){
        try {
            const scores_reviews = await CourseModel.find({ "list_reviews.0": { "$exists": true } });


            scores_reviews.forEach( async function (item) {
    
                var scoreTaget = 0;
                var countReview = 0;
                item["list_reviews"].forEach(function (score) {
                    scoreTaget += parseFloat(score.scores) ;
                    countReview += 1;
                   
                })
                await CourseModel.findOneAndUpdate({ _id: item._id }, { scores_review: parseInt(scoreTaget / (item["list_reviews"]).length), number_review: countReview }, {
                    upsert: true,
                }).exec(function (err, result) {
                   
                })

            });
        } catch (error) {
            
        }

        const scores_reviews_test = await CourseModel.find({ "list_reviews.0": { "$exists": true } });
        res.json(scores_reviews_test)
    },
            
    async getCourseImpress(req, res) {
        const course=await CourseModel.find({ "scores_review": { "$exists": true } }).sort({ "scores_review": -1 }).limit(5).lean()
        return course;
    }
    ,
    async getNewCreate(req,res){
        try {
            const lastedCreate=CourseModel.find().sort({ "created_at": 1 }).limit(10).lean();
            return lastedCreate;
        } catch (error) {
            return errors.message
        }
       
    },
    
    async getCourseLastEnroll(req,res){
        try {
            var mp = new Map();
            const courseEnroll = await studentModel.find({ "courses_enroll.0": { "$exists": true } });
            courseEnroll.forEach(function (item) {

                item.courses_enroll.forEach(function (id_course) {
                    if (id_course.id_course.length > 0 && id_course.id_course) {

                        if (mp.has(id_course.id_course))
                            mp.set(id_course.id_course, mp.get(id_course.id_course) + 1)
                        else
                            mp.set(id_course.id_course, 1)
                    }

                })
            });

            let mp_sort = new Map([...mp.entries()].sort((a, b) => b[1] - a[1]));
            const course_Sort=[]
            var count=0;
            for (let [key, value] of mp_sort) {
                const course_SortObject = await CourseModel.findOne({ _id:key}).lean();
                course_Sort.push(course_SortObject);
                if(count==4){break;}
                count+=1;
                
            }
            return course_Sort;
           
        } catch (error) {

        }
    },
    async addView(req,res){
        try {
            console.log(req.body);
            const course = await CourseModel.findOne({ _id: req.body.id }).lean();

            var numbercurrentview = course.numberClick; 
            numbercurrentview = numbercurrentview+1;
            const courseUpdate = await CourseModel.findOneAndUpdate({ _id: req.body.id},{numberClick:numbercurrentview},{returnOriginal:true});
        } catch (error) {
            
        }
    },
    async getClickManyView(req,res){
        const course = await CourseModel.find({ "numberClick": { "$exists": true } }).sort({ "numberClick": -1 }).limit(10).lean()
        return course;
    },
    async getSubcategory(req,res){
        const courseEnroll = await studentModel.find({ "courses_enroll.0": { "$exists": true } }).lean(); 
        const IDCouse = getNumberStudentEnroll(courseEnroll);
        const category_Have_User =[]
        
        for (let [key, value] of IDCouse) {
            const course_SortObject = await CourseModel.findOne({ _id: key }).lean();
            category_Have_User.push({ id_subcate: course_SortObject.sub_category.valueOf(), id_course: key, numberstudent: value, nameCourses: course_SortObject.title});

            
            
        }
        let map = category_Have_User.reduce((prev, next) => {
            if (next.id_subcate in prev) {
                prev[next.id_subcate].numberstudent += next.numberstudent;
            } else {
                prev[next.id_subcate] = next;
            }
            return prev;
        }, {});
        const kq=[]
        let result = Object.keys(map).map(id => map[id]);
        var count=0;
        for(let a of result) {
            count += 1;
             const subca= await SubCategoryModel.findOne({_id: a.id_subcate.valueOf()}).lean();
            const course = await CourseModel.findOne({_id: a.id_course}).lean();
            kq.push({ subcategory: subca, course: course, allStudent: a.numberstudent})
            if(count==1){
                break;
            }
            
        }
        
        return kq;
    }

           

}

function getNumberStudentEnroll(courseEnroll) {
    try {
        var mp = new Map();

        courseEnroll.forEach(function (item) {

            item.courses_enroll.forEach(function (id_course) {
                if (id_course.id_course.length > 0 && id_course.id_course) {

                    if (mp.has(id_course.id_course))
                        mp.set(id_course.id_course, mp.get(id_course.id_course) + 1)
                    else
                        mp.set(id_course.id_course, 1)
                }

            })
        });

        var mp_sort = new Map([...mp.entries()].sort((a, b) => b[1] - a[1]));
        return mp_sort;
    } catch (error) {

    }
}