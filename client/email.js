
'use strict';

Template.emailContent.contact = function () {
    return Session.get('currentContact');
};

Template.email.events = {
    "click .btn-primary": function (e, tmpl) {
        var contact = Session.get('currentContact');
        
        var email = {
            // XXX This should probably be the userId of the
            // person sending the email.
            // - fixed
            userId: Meteor.userId(),
            to: contact,
            subject: tmpl.find('#inputSubject').value,
            message: tmpl.find('#message').value
        };
        // Emails.insert(email);

        // Meteor.call('addEmail', email, function (err, result) {
        Emails.insert(email, function (err, result) {
            if (err)
                alert('Could not insert email ' + err.reason);
            else {
                alert('Email sent!');
                $('#emailModal').modal('hide');
            }

        });
    }
};