const nodemailer = require('nodemailer');

const selfTypeMail = 'bookings@selftapenow.com'

const mailTransport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: selfTypeMail,
        pass: 'Showmethe$1'
    }
})

function sendEmail(mailData) {
    mailData.map((mail) => {
        const tempMail =  {
            from: selfTypeMail,
            to: mail.recipients,
            // to: 'olegbabiy.ob@gmail.com',
            subject: mail.subject,
            html: mail.htmlBody,
        }
        if (mail.calendarFile) { tempMail.attachments = [ mail.calendarFile ] }
        console.log('tempMail', tempMail)
        return mailTransport.sendMail(tempMail)
            .then((res) => console.log('dbCompaniesOnUpdate:Welcome confirmation email', res))
            .catch((error) => console.error('There was an error while sending the email:', error))
    })
    return null;
}

exports.sendEmail = sendEmail;
exports.selfTypeMail = selfTypeMail;

