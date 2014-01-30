// Publications
Meteor.publish('contacts', function () {
    return Contacts.find({ userId: this.userId }, { sort: { name: 1 }});
});

Meteor.publish('emails', function () {
    return Emails.find({ userId: this.userId });
});


// Allowed/Denied Operations
Contacts.deny ({
    insert: function(userId, contact) {
        // deny if not logged in and userId of contact is not current userId
        //return (!userId || contact.userId !== userId);
        console.log(contact.name);
        return true;
    },

    remove: function() {
        return true;
    },

    update: function(userId, contact, fieldNames, modifier) {
        
        return (!userId || contact.userId !== userId);
    }
});

Emails.deny({

    insert: function(userId, email) {
        return (!userId || email.userId !== userId);
    },

    remove: function () {
        return true;
    },

    update: function() {
        return true;
    }

});