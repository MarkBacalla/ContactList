
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