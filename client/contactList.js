
Template.contactList.contacts = function() {
    return Contacts.find({}, { sort: {name:1}});
}


Template.tagList.allTags = function() {
    var tagList = Contacts.find({}, { 'tags': 1}).fetch();
    
    var tags = _.chain(tagList)
                    .pluck('tags')
                    .compact()
                    .flatten()
                    .value()
                    .sort();

    
    return tags;

}