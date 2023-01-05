import nodemailer from 'nodemailer';

export default function sendEmail(){
    var transporter = nodemailer.createTransport({
    service : 'gmail',
    auth:{
        user : ' ',
        pass:" "
    }
    });

    var mailOptions = {
        from :"ohyeartaokhua@gmail.com",
        to : "taothao0163@gmail.com",
        subject:"NODEJS",
        text:"sadasdas"
    }

    transporter.sendMail(mailOptions, function(err,info){
        if(err)
        {
            console.log("err : ",err) 
        } 
        else {
            console.log(info.response) 
        }
    })
}
