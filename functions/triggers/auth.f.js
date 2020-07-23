const functions = require('firebase-functions');
const templates = require('../helpers/mail-templates');
const mail = require('../helpers/mail');

exports.onCreateUserProfile = functions.database.ref('/profiles/{uid}/user').onCreate(async (snapshot, context) => {
    const value = snapshot.val();
    const mailData = await templates.prepareSimpleMail({ data: value, mailType: 'user_sign_up' });
    return mail.sendEmail(mailData);
});

exports.onCreatePractitionerProfile = functions.database.ref('/profiles/{uid}/practitioner').onCreate(async (snapshot, context) => {
    const value = snapshot.val();
    const mailData = await templates.prepareSimpleMail({ data: value, mailType: 'practitioner_sign_up' });
    return mail.sendEmail(mailData);
});