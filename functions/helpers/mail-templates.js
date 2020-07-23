const moment = require('moment');
const ics = require('ics');
const mail = require('./mail');

function mailTemplate(data, mailType) {
    switch (mailType) {
        case 'user_sign_up': return user_sign_up(data);
        case 'practitioner_sign_up': return practitioner_sign_up(data);
        case 'user_appointment_request': return user_appointment_request(data);
        case 'practitioner_appointment_request': return practitioner_appointment_request(data);
        case 'user_appointment_confirmation': return user_appointment_confirmation(data);
        case 'practitioner_appointment_confirmation': return practitioner_appointment_confirmation(data);
        case 'user_appointment_decline': return user_appointment_decline(data);
        case 'practitioner_cancels_appointment_with_user': return practitioner_cancels_appointment_with_user(data);
        case 'user_cancels_appointment_with_practitioner': return user_cancels_appointment_with_practitioner(data);
        default: break;
    }
    return '';
}

prepareSimpleMail = ({ data, mailType }) => {
    return [
        {
            recipients: data.email,
            subject: 'SELFTAPE NOW',
            htmlBody: `<p>${mailTemplate(data, mailType)}</p>`,
            calendarFile: null,
        }
    ];
}

dateWithOffset = ({ dateTime }) => {
    var usaTime = new Date(dateTime).toLocaleString("en-US", { timeZone: "America/Los_Angeles" });
    bookTime = new moment(new Date(usaTime));
    // var date = new Date(dateTime);
    // var utcDate = new Date(date.toUTCString());
    // utcDate.setHours(utcDate.getHours() - 8);
    // var usDate = new Date(utcDate);
    // bookTime = new moment(new Date(usDate));
    return `${bookTime.format('dddd')}, ${bookTime.format('MMM DD, YYYY')} at ${bookTime.format('hh:mm A')} PT`;
}

typeOfSession = ({ selectedPrice }) => {
    return selectedPrice.name.toLowerCase().includes('min') ? `${selectedPrice.duration} minute` : `${selectedPrice.name}`
}

formatLocation = ({
    street, apartmentNumber, city, zip,
  }) => `${city !== '' ? `${city}, ` : ''}${street}${apartmentNumber !== '' ? `/${apartmentNumber}, ` : ' '}${zip}`;

async function prepareEmail ({ session, session: { lastEditedBy, status, details: { profileClient, profilePractitioner }, payObject } }) {
    let mailData = [];
    let file = null;
    if (session) {
        let appointmentInfo = '';
        switch (status) {
            case 'created':
                // MAIL FOR USER
                // appointmentInfo = mailTemplate(session, 'user_appointment_request');
                // file = await prepareFile(session, profileClient, appointmentInfo);
                // mailData.push({
                //     recipients: profileClient.email,
                //     subject: 'SELFTAPE NOW',
                //     htmlBody: `<p>${appointmentInfo}</p>`,
                //     calendarFile: file,
                // });
                // MAIL FOR PRACTITIONER
                appointmentInfo = mailTemplate(session, 'practitioner_appointment_request');
                file = null;
                mailData.push({
                    recipients: profilePractitioner.email,
                    subject: 'SELFTAPE NOW',
                    htmlBody: `<p>${appointmentInfo}</p>`,
                    calendarFile: file,
                });
            break;
            case 'accepted': // DOUBLE
                if (lastEditedBy === 'practitioner' && payObject.chargeId) {
                    // MAIL FOR USER
                    appointmentInfo = mailTemplate(session, 'user_appointment_confirmation');
                    file = await prepareFile(session, profileClient, appointmentInfo);
                    mailData.push({
                        recipients: profileClient.email,
                        subject: 'SELFTAPE NOW',
                        htmlBody: `<p>${appointmentInfo}</p>`,
                        calendarFile: file,
                    });
                    // MAIL FOR PRACTITIONER
                    appointmentInfo = mailTemplate(session, 'practitioner_appointment_confirmation');
                    file = null;
                    mailData.push({
                        recipients: profilePractitioner.email,
                        subject: 'SELFTAPE NOW',
                        htmlBody: `<p>${appointmentInfo}</p>`,
                        calendarFile: file,
                    });
                }
            break;
            case 'declined':
                if (lastEditedBy === 'practitioner') {
                    // MAIL FOR USER
                    appointmentInfo = mailTemplate(session, 'user_appointment_decline');
                    file = null;
                    mailData.push({
                        recipients: profileClient.email,
                        subject: 'SELFTAPE NOW',
                        htmlBody: `<p>${appointmentInfo}</p>`,
                        calendarFile: file,
                    });
                }
            break;
            case 'canceled':
                if (lastEditedBy === 'practitioner') {
                    // MAIL FOR USER
                    appointmentInfo = mailTemplate(session, 'practitioner_cancels_appointment_with_user');
                    file = null;
                    mailData.push({
                        recipients: profileClient.email,
                        subject: 'SELFTAPE NOW',
                        htmlBody: `<p>${appointmentInfo}</p>`,
                        calendarFile: file,
                    });
                } else {
                    appointmentInfo = mailTemplate(session, 'user_cancels_appointment_with_practitioner');
                    file = null;
                    mailData.push({
                        recipients: profilePractitioner.email,
                        subject: 'SELFTAPE NOW',
                        htmlBody: `<p>${appointmentInfo}</p>`,
                        calendarFile: file,
                    });
                }
            break;
            default: break;
        }
        console.log('mailData', mailData)
    }
    return mailData;
}

async function prepareFile ({ details: { location }, selectedTime: { dateTime, selectedPrice } }, fromProfile, appointmentInfo) {
    let file = null;
    const start = moment(dateTime).format('YYYY-M-D-H-m').split("-")
    const event = {
        start: start,
        duration: { hours: 0, minutes: selectedPrice.duration },
        title: `Appointment with ${fromProfile.username}`,
        description: appointmentInfo,
        location: location.name,
        organizer: { name: 'SelfType', email: mail.selfTypeMail },
    }
    ics.createEvent(event, (error, value) => {
        if (error) {
          console.log(error)
          return
        }
       file = value;
    });
  const fileName = `appointmentWith${fromProfile.username}${new Date().getTime()}.ics`;
  return {
    filename: fileName,
    content: file
  };
}

const user_sign_up = (data) => `
    Hello ${data.username},<br><br>

    Welcome to SELFTAPE NOW! You now have access to a vast network of qualified practitioners who will help you produce quality selftapes wherever you are, whenever you need them.<br><br>

    Here's your log-in information:<br><br>

    Username: ${data.username}<br><br>

    Now that you've signed up, you can setup your profile and start booking tapes! All you need is a headshot and a bio to get going. You can also assign your preferred payment method in your profile.<br><br>

    We are so excited to have you join the SELFTAPE NOW family. We believe this app will help you finally be able to turn around those last minute selftape auditions with ease, book more jobs, and build an exciting and lucrative career.<br><br>

    Sincerely,<br>
    The SELFTAPE NOW team
`;

const practitioner_sign_up = (data) => `
    Hello ${data.username},<br><br>

    Welcome to SELFTAPE NOW! You are now on your way to making great money doing what you love, while helping actors achieve their dreams in the process. We're excited to have you.<br><br>

    Here's your log-in information:<br><br>

    Username: ${data.username}<br><br>

    Now that you've signed up, it's time to set up your profile and start making money! For a complete profile, you'll need:<br><br>

    A photo of yourself<br>
    A bio<br>
    Pictures of your studio setup<br><br>


    You'll also need to fill out your rate sheet and cancellation fees so actors know what to expect. Remember, you can set your own prices and session lengths.<br><br>

    Once you've completed all that, the last step is filling out your calendar so actors know when you're open for business. As always, you can adjust your availability at any time.<br><br>

    By joining the SELFTAPE NOW team, we believe practitioners like you will make great money doing what you love, using the equipment you've already invested in, and help other actors succeed. Not only that, you'll build a huge network of talented people in the biz. A win-win all around.<br><br>

    To your success!<br><br>

    Sincerely,<br>
    The SELFTAPE NOW team
`;

const user_appointment_request = ({ details: { profileClient, profilePractitioner }, selectedTime } ) => {
    return `
        Hello ${profileClient.username},<br><br>

        Thanks for requesting a selftape appointment through SELFTAPE NOW!<br><br>

        Here are the details:<br>
        Practitioner: ${profilePractitioner.username}<br>
        Requested Date and Time: ${dateWithOffset(selectedTime)}<br>
        Type of Session: ${typeOfSession(selectedTime)}<br><br>

        You will be notified ASAP by the practitioner if they are able to accept your appointment request.<br><br>

        Thank you!<br>
        The SELFTAPE NOW team
    `;
};

const practitioner_appointment_request = ({ details: { profileClient, profilePractitioner }, selectedTime } ) => {
    return `
        Hello ${profilePractitioner.username},<br><br>

        Score! ${profileClient.username} has requested a selftape session with you through SELFTAPE NOW!<br><br>
        
        Here are the details:<br>
        Requested Date and Time: ${dateWithOffset(selectedTime)}<br>
        Type of Session: ${typeOfSession(selectedTime)}<br><br>
        
        Please log into the SELFTAPE NOW app to confirm or decline the request ASAP.<br><br>
        
        Thank you!<br>
        The SELFTAPE NOW team
    `;
};

const user_appointment_confirmation = ({ details: { profileClient, profilePractitioner }, selectedTime } ) => {
    return `
        Hello ${profileClient.username},<br><br>

        Great news! ${profilePractitioner.username} has confirmed your appointment. You are now all set to slay your audition.<br><br>
        
        Here are the finalized details of your appointment:<br>
        Practitioner: ${profilePractitioner.username}<br>
        Date and Time:  ${dateWithOffset(selectedTime)}<br>
        Type of Session: ${typeOfSession(selectedTime)}<br>
        Address: ${formatLocation(profilePractitioner.address)}<br><br>
        
        Now that you're confirmed, you can upload your sides so your practitioner can see them in advance. Simply open the SELFTAPE NOW app, go to Upcoming Sessions and tap on your session. There you'll find the "Upload Sides" button where you can upload a PDF or image of your sides to the app.<br><br>

        Your appointment begins exactly at the scheduled time, so be sure to arrive a few minutes early to find parking and get yourself situated. If you have any questions, you can reach your practitioner through the SELFTAPE NOW app. Simply go to your Profile ---> Sessions ---> Your appointment and you’ll be able to message them.<br><br>
        
        Break a leg!<br>
        The SELFTAPE NOW team<br><br>
    
        P.S. Don't forget to leave your practitioner a review after your session! Every bit of feedback supports their business.
    `;
};

const practitioner_appointment_confirmation = ({ details: { profileClient, profilePractitioner }, selectedTime } ) => {
    return `
        Hello ${profilePractitioner.username},<br><br>

        You are all set to put ${profileClient.username} on tape!<br><br>
        
        Here are the finalized details of your appointment:<br>
        User: ${profileClient.username}<br>
        Date and Time: ${dateWithOffset(selectedTime)}<br>
        Type of Session: ${typeOfSession(selectedTime)}<br>
        
        Make sure to let your client know any pertinent details for arrival, i.e. codes for getting into the studio, parking information, etc... Your appointment begins exactly at the scheduled time, so if they arrive late that is deducted from their scheduled amount of time, per your discretion.<br><br>
        
        Remember to have them check in when they arrive and check out when they leave, so we can be sure of everyone's safety. If you have any questions, you can reach your client through the SELFTAPE NOW app. Simply go to your Profile ---> Sessions ---> Your appointment and you’ll be able to message them.<br><br>
        
        Break a leg!<br>
        The SELFTAPE NOW team<br><br>
        
        P.S. Don't forget to leave your actor a review after your session! Every bit of feedback helps them with future bookings.
    `;
};

const user_appointment_decline = ({ details: { profileClient, profilePractitioner } } ) => {
    return `
        Hello ${profileClient.username},<br><br>

        Unfortunately, ${profilePractitioner.username} had to decline your appointment. We sincerely apologize for the inconvenience.<br><br>
        
        The good news is there are many other qualified practitioners in your area right now who are available to help you out. Simply log back in to the SELFTAPE NOW app, search your area, and request a session with another practitioner. They will get back to you ASAP.<br><br>
        
        Thank you again for using SELFTAPE NOW! Please don't hesitate to reach out if you have any questions.<br><br>
        
        Sincerely,<br>
        The SELFTAPE NOW Team
    `;
};

const practitioner_cancels_appointment_with_user = ({ details: { profileClient, profilePractitioner } } ) => {
    return `
        Hello ${profileClient.username},<br><br>

        We sincerely apologize, but ${profilePractitioner.username} had to cancel your appointment. You will be fully refunded for your session within 24-48 hours.<br><br>
        
        The good news is there are many other qualified practitioners in your area right now who are available to help you out. Simply log back into the SELFTAPE NOW app, search your area, and request a session with another practitioner. They will get back to you ASAP.<br><br>
        
        Thank you again for using SELFTAPE NOW! Please don't hesitate to reach out if you have any questions.<br><br>
        
        Sincerely,<br>
        The SELFTAPE NOW Team
    `;
};

const user_cancels_appointment_with_practitioner = ({ details: { profileClient, profilePractitioner } } ) => {
    return `
        Hello ${profilePractitioner.username},<br><br>

        We sincerely apologize, but ${profileClient.username} had to cancel your appointment. You will receive your cancellation fee within 24-48 hours.<br><br>
        
        Please let us know if you have any further questions.<br><br>
        
        Sincerely,<br>
        The SELFTAPE NOW Team
    `;
}

exports.mailTemplate = mailTemplate;
exports.prepareEmail = prepareEmail;
exports.prepareSimpleMail = prepareSimpleMail;