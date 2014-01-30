// XXX Love how simple the publications are here, excellent.
// Publications
Meteor.publish('contacts', function () {    
    // XXX Just FYI - results sent from the server are not guaranteed
    // to be sorted when they arrive at the client - so no sort here.
    return Contacts.find({ userId: this.userId }, { sort: { name: 1 }});
});

Meteor.publish('emails', function () {
    return Emails.find({ userId: this.userId });
});

// XXX Great use of allow/deny rules, thank you!
// Allowed/Denied Operations
Contacts.deny ({
    insert: function(userId, contact) {        
        // insert via Method.addContact    
        return (!userId || contact.userId !== userId);
    },

    remove: function() {
        return true;
    },

    update: function(userId, contact, fieldNames, modifier) {
        
        return true;
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