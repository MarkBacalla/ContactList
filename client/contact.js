Session.set('currentTags', []);

Template.tags.events = {

    "submit": function (e, tmpl) {
        e.preventDefault();

        // get value of tag
        var tagControl = tmpl.find('#tag');
        var newTag = tagControl.value.trim();
        if (newTag) {
            var currentTags = Session.get('currentTags');
            currentTags.push(newTag);
            Session.set('currentTags', currentTags);

            tagControl.value = "";
        }

    }
}


Template.tags.currentTags = function() {
    return Session.get('currentTags');
}



Template.addContact.events = {

    "submit #contactForm": function(e, tmpl) {
        var emailControl = tmpl.find("#email");
        var nameControl = tmpl.find("#name");
        e.preventDefault();

        var newContact = {
            email: emailControl.value,
            name: nameControl.value,
            tags: Session.get('currentTags')
        };

        Meteor.call("addContact", newContact, function (err, result) {
            if (err) 
                alert("Could not insert contact " + err.reason);
            else {
                alert("User Inserted!");
                emailControl.value = "";
                nameControl.value = "";
            }

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