
'use strict';

Template.emailContent.contact = function () {
    return Session.get('currentContact');
};

Template.email.events = {
    "click .btn-primary": function (e, tmpl) {
        var contact = Session.get('currentContact');
        
        var email = {
            userId: Meteor.userId(),
            to: contact,
            subject: tmpl.find('#inputSubject').value,
            message: tmpl.find('#message').value
        };

        // insert email
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