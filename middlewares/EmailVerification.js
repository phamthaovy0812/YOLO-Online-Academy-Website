import nodemailer from 'nodemailer';

export default function sendEmail(numberOtp, email){
    var transporter = nodemailer.createTransport({
    service : 'gmail',
    auth:{
        user : "nhtan20@clc.fitus.edu.vn",
        pass:"thanhthao123"
    }
    });

    var mailOptions = {
        from :"nhtan20@clc.fitus.edu.vn",
        to : email,
        subject:"MÃ XÁC NHẬN ONLIEN ACADEMY PROJECT",
        text:`Mã xác nhận của bạn là : ${numberOtp}`
    }

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        } 
      });
} 
