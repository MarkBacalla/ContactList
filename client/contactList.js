Session.set('currentContact', {});
Session.set('searchTags', []);

Template.contactList.contacts = function() {
    var contactList = Contacts.find({}, { sort: {name:1}}).fetch();
    var searchTags = Session.get('searchTags');

    if (searchTags.length) {
        contactList = _(contactList).filter(function(item) {
            return _.intersection(item.tags, searchTags).length > 0; 
        });
    } 

    return contactList;
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

Template.contactCard.events = {

    "click .sendEmail": function (e, tmpl) {        
        Session.set('currentContact', this);
        $('#emailModal').modal("show");
    }
};

Template.tagList.events = {
    "click .tagList li": function (el, tmpl) {
        
        var searchTags = Session.get('searchTags');
        searchTags.push(this.toString());
        Session.set('searchTags', searchTags);
    }
}

Template.tagSearchList.searchTags = function () {
    return Session.get('searchTags');
}