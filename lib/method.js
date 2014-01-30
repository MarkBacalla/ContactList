Meteor.methods({
    addContact: function (contact) {

        if (contact.email === "") {
            throw new Meteor.Error(413, "Missing title!");
        }
    
        if (contact.name === "") {
            throw new Meteor.Error(413, "Missing email!");
        }

        contact.userId = Meteor.userId();
        if (!contact.userId) {
            throw new Meteor.Error(413, "User must be logged in!");
        }

        // return Contacts.upsert({_id: contact._id}, {$set: contact} );
        if (contact._id)
            return Contacts.insert(contact);
        else
            return Contacts.update({_id: contact._id}, {$set: contact});

    },

    addEmail: function (newEmail) {
        
        // validate

        return Emails.insert(newEmail);
    },

    resendVerifaction: function() {
        var userId = Meteor.userId();
        if (!this.isSimulation)
            Accounts.sendVerificationEmail(userId);
    }

});
