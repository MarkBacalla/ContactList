var verifyEmail = function () { 
    return Meteor.user().emails[0].verified;
};

Template.layout.verifiedEmail = verifyEmail

Template.verifyEmail.events = {
    
    "click .btn-primary": function (e, tmpl) {
        e.preventDefault();

        Meteor.call('resendVerification');

        alert('Email Sent!');
    }
}

Deps.autorun(function () {
    var contactList = Contacts.find({}, { sort: {name:1}}).fetch();
    var tags = _.chain(contactList)
                    .pluck('tags')
                    .compact()
                    .flatten()
                    .uniq()
                    .value()
                    .sort();
    Session.set('allTags', tags);
    
});