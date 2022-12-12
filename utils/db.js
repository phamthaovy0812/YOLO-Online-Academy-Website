import mongoose from "mongoose"


// Tấn tạo link mongo r add vào nha , tui chưa rành nên phải tìm hiểu lại , tui mớii test của tui thôii 
mongoose.set('strictQuery', false);
export default {

    run() {
        // Connection URI
        const uri =
            // "mongodb+srv://buiquangthanh:buiquangthanh1709@cluster0.4j0rdaz.mongodb.net/?retryWrites=true&w=majority";
        mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
            console.log("Connected DB");

        }).catch(err => {
            console.log("Failed to connect", err);
        }
        );
    }

}
