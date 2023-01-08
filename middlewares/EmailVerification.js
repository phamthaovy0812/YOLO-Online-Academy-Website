import nodemailer from 'nodemailer';

export default function sendEmail(){
    var transporter = nodemailer.createTransport({
    service : 'gmail',
    auth:{
        user : "nhtan20@clc.fitus.edu.vn",
        pass:"thanhthao123"
    }
    });

    var mailOptions = {
        from :"nhtan20@clc.fitus.edu.vn",
        to : "taothao0163@gmail.com",
        subject:"NODEJS",
        text:"sadasdas"
    }

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        } 
      });
} 
