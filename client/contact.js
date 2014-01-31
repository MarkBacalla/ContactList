'use strict';

var Contact = function (id, name, email, tags) {
    
    this._id = id;
    this.name = name;
    this.email = email;
    this.tags = tags;

    this.validate = function() {
        var err = [];

        // check for required
        if (!this.email || !this.name) {
            if (!this.email)
                err.push('Email Field Required!');
            if (!contact.name)
                err.push('Name Field Required!');
        }

        return err.join('\n');        
    };

    this.save = function (callbackSave) {
        // validate
        var err = this.validate();
        if (err) {
            callbackSave.fail (err);
            return;
        }

        // get contactinfo
        var contactToSave = _(this).pick('name', 'email', 'tags')
        contactToSave.userId = Meteor.userId();
        
        // update?
        if (this._id) {                        
            Contacts.update({_id: this._id}, {$set: contactToSave}, callback.bind(this));
        } else {                        
            Contacts.insert(contactToSave, callback.bind(this));
        }

        function callback (err, result) {
            if (err) {
                callback.fail("Could not insert/update contact " + err.reason);
            }
            else {
                // success!
                if (!this._id) {
                    Session.set('currentTags', []);
                    callbackSave.success("User Inserted!");
                    
                                        
                } else {
                    callbackSave.success("User updated!")
                }
            }

        }


    }
};


// XXX - To talk about, file local variables using ReactiveDict
Session.set('currentTags', []);

Template.tags.events = {

    "keypress #tag": function (e, tmpl) {
        if (e.keyCode == 13) {
            e.preventDefault();

            // get value of tag
            var tagControl = tmpl.find('#tag');
            var newTag = tagControl.value.trim();
            if (newTag) {
                var currentTags = Session.get('currentTags');
                currentTags.push(newTag);
                Session.set('currentTags', _.uniq(currentTags));

                tagControl.value = "";
            }

        }
    },

    "click button": function () {        
        Session.set('currentTags', 
            _.without(Session.get('currentTags'), this.toString()));         
    }

};


Template.tags.currentTags = function() {
    return Session.get('currentTags');
};



Template.contact.events = {

    "submit #contactForm": function(e, tmpl) {
        e.preventDefault();
        var _this = this;
        
        var emailControl = tmpl.find("#email");
        var nameControl = tmpl.find("#name");

        var contact = new Contact(_this._id, 
                            nameControl.value.trim(),
                            emailControl.value.trim(),
                            Session.get('currentTags')
            );
        contact.save({
            success: function(msg) {
                alert(msg);
                
                if (!_this._id) {
                    // reset controls
                    emailControl.value = "";
                    nameControl.value = "";
                }
            },

            fail: alert
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
};