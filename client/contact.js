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

    },

    "click button": function () {
        
        var currentTags = _.without(Session.get('currentTags'), this.toString());
        Session.set('currentTags', currentTags);
    }

}


Template.tags.currentTags = function() {
    return Session.get('currentTags');
}



Template.contact.events = {

    "submit #contactForm": function(e, tmpl) {
        e.preventDefault();
        
        var emailControl = tmpl.find("#email");
        var nameControl = tmpl.find("#name");

        var contact = {
            _id: this._id,
            email: emailControl.value,
            name: nameControl.value,
            tags: Session.get('currentTags')
        };

        // insert/update Contact
        Meteor.call("addContact", contact, function (err, result) {
            if (err) 
                alert("Could not insert/update contact " + err.reason);
            else {
                
                if (result.insertedId) {
                    alert("User Inserted!");
                    
                    // reset controls
                    emailControl.value = "";
                    nameControl.value = "";
                    Session.set('currentTags', []);
                } else {
                    alert("User updated!")
                }

            }

        });

    }

}


Template.contact.rendered = function () {
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