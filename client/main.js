var verifyEmail = function () {	
    return Meteor.user().emails[0].verified;
};

Template.layout.verifiedEmail = verifyEmail

Template.verifyEmail.events = {
	
	"click .btn-primary": function (e, tmpl) {
		e.preventDefault();

		Meteor.call('resendVerifaction');

		alert('Email Sent!');
	}
}