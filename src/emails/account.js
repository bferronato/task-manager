const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'bferronato@gmail.com',
        subject: 'Thanks for joining in!',
        text: `Welcome to the app, ${name}. Let me know how you get along with the app.`
    })
}

const sendCancelAccountEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'bferronato@gmail.com',
        subject: 'We will miss you!',
        text: `We are sorry, ${name}. Why are you left us?`
    })
}

module.exports = {
    sendWelcomeEmail,
    sendCancelAccountEmail
}