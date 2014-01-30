var verifyEmail = function () {	
    return Meteor.user().emails[0].verified;
};

Template.contact.verifiedEmail = verifyEmail
Template.contacts.verifiedEmail = verifyEmail

Template.verifyEmail.events = {
	
	"click .btn-primary": function (e, tmpl) {
		e.preventDefault();

		Meteor.call('resendVerifaction');

		alert('Email Sent!');
	}
}