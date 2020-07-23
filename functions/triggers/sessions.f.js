const functions = require('firebase-functions');
const templates = require('../helpers/mail-templates');
const mail = require('../helpers/mail');

exports.onCreateSession = functions.database.ref('/sessions/{uid}').onCreate(async (snapshot, context) => {
    const value = snapshot.val();
    const mailData = await templates.prepareEmail({ session: value });
    return mail.sendEmail(mailData);
});

exports.onUpdateSession = functions.database.ref('/sessions/{uid}').onUpdate(async (change, context) => {
    const after = change.after;
    let session = null;
    let mailData = null;
    if (after && after._data) {
        session = after._data;
        mailData = await templates.prepareEmail({ session });
    }
    return session.status !== 'created' ? mail.sendEmail(mailData) : null;
});