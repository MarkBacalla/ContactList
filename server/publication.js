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

//------------ Contacts
Contacts.deny ({
    insert: function(userId, contact) {        
        // insert via Method.addContact    
        // validate - deny if (no userid, not currentUser, blank name and email)
        var result = !userId  
                        || contact.userId !== userId
                        || !contact.name.trim()
                        || !contact.email.trim()
        return result;
    },

    remove: function() {
        // XXX this rule is not good enough, who is allowed to do this?
        return true;
    },

    update: function(userId, contact, fieldNames, modifier) {
        // XXX this rule is not good enough, who is allowed to do this?
        var result = !userId
                    || _(fieldNames).contains("_id");
        return result;
    }
});

// XXX With your deny rules, this block is not necessary.
Contacts.allow({
    insert: function(userId, contact) {
        return true;
    },

    update: function() {

        return true;
    }

});

//------------ Emails
Emails.deny({

    insert: function(userId, email) {
        return (!userId || email.userId !== userId);
    },

    remove: function () {
        // XXX this rule is not good enough, who is allowed to do this?
        return true;
    },

    update: function() {
        // XXX this rule is not good enough, who is allowed to do this?
        return true;
    }

});

// XXX With your deny rules, this block is not necessary.
Emails.allow({
    insert: function(userId, email) {
        return true;
    }
});