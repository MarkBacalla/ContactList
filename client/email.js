
Template.emailContent.contact = function () {
    return Session.get('currentContact');
};

Template.email.events = {
    "click .btn-primary": function (e, tmpl) {
        var contact = Session.get('currentContact');
        
        var email = {
            userId: contact.userId,
            to: contact,
            subject: tmpl.find('#inputSubject').value,
            message: tmpl.find('#message').value
        };
        // Emails.insert(email);

        Meteor.call("addEmail", email, function (err, result) {
            if (err) 
                alert("Could not insert email " + err.reason);
            else {
                alert("Email sent!");
                $('#emailModal').modal('hide');
            }


        });

    }
}