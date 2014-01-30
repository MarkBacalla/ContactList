var verifyEmail = function () {
    return Meteor.user().emails[0].verified;
};

Template.contact.verifiedEmail = verifyEmail;
Template.contacts.verifiedEmail = verifyEmail;
