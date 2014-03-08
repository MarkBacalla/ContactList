'use strict';

var currentContact = null;

var Contact = function (id, name, email, tags) {
    
    this._id = id;
    this.name = name;
    this.email = email;
    this.tags = tags || [];
    this._deps = {
        tags: new Deps.Dependency
    };

    this.addTag = function (tag) {
        this.tags.push(tag);
        this._deps.tags.changed();
    };

    this.removeTag = function (tag) {
        var index = this.tags.indexOf(tag);
        this.tags.splice(index, 1);
        this._deps.tags.changed();
    };

    this.getTags = function () {
        this._deps.tags.depend();
        return this.tags;
    }

    this.resetTags = function() {
        this.tags = [];
        this._deps.tags.changed();
    }

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
        var contactToSave = _.pick(this, 'name', 'email', 'tags');
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
                    callbackSave.success("User Inserted!");
                    this.resetTags();
                                        
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

                currentContact.addTag(newTag);
                tagControl.value = "";
            }

        }
    },

    "click button": function (e, tmpl) {
        var tag = this.toString();
        var contact = tmpl.data;

        currentContact.removeTag(tag);
    }   

};


Template.contact.events = {

    "submit #contactForm": function(e, tmpl) {
        e.preventDefault();
        var _this = this;
        
        var emailControl = tmpl.find("#email");
        var nameControl = tmpl.find("#name");
                        
        currentContact.name = nameControl.value.trim();
        currentContact.email = emailControl.value.trim();

        currentContact.save({
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

Template.contact.created = function () {
    
    var data = Router.getData() || {};
    currentContact = new Contact(data._id, data.name, data.email, data.tags);
};

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

    return currentContact.getTags();
}