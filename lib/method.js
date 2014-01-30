// XXX Good idea to use methods, but why did choose to do
// these validations in this method instead of your allow/deny rules?

Meteor.methods({
    addContact: function (contact) {

        // Validate
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

        return Contacts.upsert({_id: contact._id}, {$set: _.omit(contact, "_id")} );

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
