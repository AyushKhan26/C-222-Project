const { triggerAsyncId } = require("async_hooks");
const { name } = require("ejs");
const express = require("express")
const app = express()
const server = require("http").Server(app)
app.use(express.json())

var nodemailer= require('nodemailer');

const transporter = nodemailer.createTransport({
    port: 465,
    host: "smtp.gmail.com",
    auth:{
        user: ' ',
        pass: ' ',
    },
    secure: true
});

app.post("/send-mail",(req,res)=>{
    const to  = req.body.to
    const mailerdata = {
        from : " ",
        to: to,
        subject: "Reminder for your payement",
        html: `<p>Hi Mr/Mrs ${name} </p>
            <p>This is a reminder Email that your payment amount-${amount} is due on date- ${data}</p>
            <p>Kindly pay before the due date to avoid any inconvenience</p>
            <p>Thanks and regards</p>
        `
        }
        transporter.sendMail(mailerdata, (error,info) => {
            if(error){
               console.log(error)
            }

            res.status(200).send({message: 'Invitation sent!',message_id: info.messageId})
        })
})


server.listen(process.env.port || 5500)