'use strict';

var _dep = new Deps.Dependency;
var Contact = function (id, name, email, tags) {
    
    this._id = id;
    this.name = name;
    this.email = email;
    this.tags = tags;

    this.addTag = function (tag) {
        this.tags.push(tag);
        _dep.changed();
    };

    this.removeTag = function (tag) {
        var index = this.tags.indexOf(tag);
        this.tags.splice(index, 1);
        _dep.changed();
    };

    this.validate = function() {
        var err = [];

        // check for required
        if (!this.email || !this.name) {
            if (!this.email)
                err.push('Email Field Required!');
            if (!this.name)
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
        var contactToSave = _.pick(Router.getData(), 'name', 'email', 'tags');
        contactToSave.userId = Meteor.userId();
        
        // update?        
        if (this._id) {                        
            Contacts.update({_id: this._id}, {$set: contactToSave}, callback.bind(this));
        } else {                        
            Contacts.insert(contactToSave, callback.bind(this));
        }

        function callback (err, result) {            
            if (err) {
                callbackSave.fail("Could not insert/update contact " + err.reason);
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
Template.tags.events = {

    "keypress #tag": function (e, tmpl) {
        if (e.keyCode == 13) {
            e.preventDefault();

            // get value of tag
            var tagControl = tmpl.find('#tag');
            var newTag = tagControl.value.trim();
            if (newTag) {                

                var contact = Router.getData();
                if (contact.tags) contact.tags.push(newTag);
                else contact.tags = [newTag];

                tagControl.value = "";
                _dep.changed();
            }

        }
    },

    "click button": function (e, tmpl) {
        var tag = this.toString();
        var contact = tmpl.data;

        contact.tags.splice(contact.tags.indexOf(tag), 1);        
        _dep.changed();
    }

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
                            _this.tags
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

            fail: alert.bind(null)
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
    });
};

Template.tags.currentTags = function () {
    _dep.depend();

    var contact = Router.getData();

    return contact ? contact.tags : [];
}