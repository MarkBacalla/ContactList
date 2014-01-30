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