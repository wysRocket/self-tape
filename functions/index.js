const auth = require('./triggers/auth.f');
const sessions = require('./triggers/sessions.f');

exports.onCreateUserProfile = auth.onCreateUserProfile;
exports.onCreatePractitionerProfile = auth.onCreatePractitionerProfile;

exports.onCreateSession = sessions.onCreateSession;
exports.onUpdateSession = sessions.onUpdateSession;