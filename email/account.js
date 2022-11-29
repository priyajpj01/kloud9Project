const sgMail = require('@sendgrid/mail')


var sendWelcomeEmail=(email,name)=>
{
sgMail.send({
    to: email,
    from: 'priyajpj01@gmail.com',
    subject: 'Thanks for joining in!',
    text: `Welcome to the app, ${name}. Let me know how you get along with the app.`

})



}