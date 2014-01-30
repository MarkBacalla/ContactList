Meteor.methods({
    addContact: function (newContact) {

        if (newContact.email === "") {
            throw new Meteor.Error(413, "Missing title!");
        }
    
        if (newContact.name === "") {
            throw new Meteor.Error(413, "Missing email!");
        }

        newContact.userId = Meteor.userId();
        if (!newContact.userId) {
            throw new Meteor.Error(413, "User must be logged in!");
        }

        return Contacts.insert(newContact);

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
