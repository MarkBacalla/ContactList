Session.set('currentTags', []);

Template.tags.events = {

    "submit": function (e, tmpl) {
        e.preventDefault();

        var newTag = tmpl.find('#tag').value.trim();
        if (newTag) {
            var currentTags = Session.get('currentTags');
            currentTags.push(newTag);
            Session.set('currentTags', currentTags);
        }

    }
}


Template.tags.currentTags = function() {
    return Session.get('currentTags');
}



Template.addContact.events = {

    "submit #contactForm": function(e, tmpl) {
        e.preventDefault();

        var newContact = {
            email: tmpl.find("#email").value,
            name: tmpl.find("#name").value,
            tags: Session.get('currentTags')
        };

        Meteor.call("addContact", newContact, function (err, result) {
            if (err) 
                alert("Could not insert contact " + err.reason);
            else
                alert("User Inserted!");
        })

    }
}


Template.addContact.rendered = function () {
    $("#contactForm").validate({        
        highlight: function(element) {
            $(element).closest('.form-group').removeClass('has-success').addClass('has-error');
        },
        success: function(element) {
            element
            .text('OK!').addClass('valid')
            .closest('.form-group').removeClass('has-error').addClass('has-success');
        }
        // errorPlacement: function (error, element) {
        //     error.appendTo(element.parent().next());
        // }
    }); 
}