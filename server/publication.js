// XXX Love how simple the publications are here, excellent.
// Publications
Meteor.publish('contacts', function () {    
    return Contacts.find({ userId: this.userId });
});

Meteor.publish('emails', function () {
    return Emails.find({ userId: this.userId });
});

// XXX Great use of allow/deny rules, thank you!
// Allowed/Denied Operations
Contacts.allow({

    // allow if logged In, currentUser and Not blank name and email
    insert: function(userId, contact) {
        return userId && contact.userId === userId && contact.name.trim() && contact.email.trim();        
    },

    // allow if logged In, and fieldname does not contain an update to _id
    update: function() {
        return userId && !_(fieldNames).contains("_id");
    }

});

Emails.allow({

    // allow if logged In and email creator is logged In user
    insert: function(userId, email) {
        return userId && email.userId === userId;
    }
});