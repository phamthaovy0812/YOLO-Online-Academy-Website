import CourseModel from "../models/Course.model.js";
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
    

}