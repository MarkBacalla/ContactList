Session.set('currentContact', {});
Session.set('searchTags', []);
Session.set('allTags', []);


Template.contactList.contacts = function() {
    var searchTags = Session.get('searchTags');

    // search tags if exist or get all
    var criteria = searchTags.length ? { tags: { $in: searchTags }} : {};
    var contactList = Contacts.find(criteria, { sort: {name:1}}).fetch();    

    // filter if there is a SearchTag
    if (searchTags.length) {
        contactList = _(contactList).filter(function(item) {
            return _.difference(searchTags, item.tags).length === 0; 
        });
    } 

    // sort string case insensitive
    contactList = _(contactList).sortBy(function (contact) {
        return contact.name.toLowerCase();
    });

    return contactList;
}


Template.tagList.allTags = function() {    
    return _.difference(Session.get('allTags'), Session.get('searchTags')) ;
}

Template.contactCard.events = {

    "click .sendEmail": function (e, tmpl) {        
        e.preventDefault();
        e.stopPropagation();

        Session.set('currentContact', this);
        $('#emailModal').modal("show");
    },

    "click .contact-card": function (e, tmpl) {
        
        Router.go('contact', {id: this._id});
    }
};

Template.tagList.events = {
    "click .tagList li": function (el, tmpl) {
        
        var searchTags = Session.get('searchTags');
        searchTags.push(this.toString());
        Session.set('searchTags', _.uniq(searchTags));
    },

    "submit #search": function (e, tmpl) {
        e.preventDefault();

        var allTags = Session.get('allTags');

        var searchString = tmpl.find('.q').value;

        var searchTags = _(allTags).filter(function (tag) {
            return tag.indexOf(searchString) >= 0;
        });

        Session.set('searchTags', searchTags);
    }
}

Template.tagSearchList.searchTags = function () {
    return Session.get('searchTags');
}

Template.tagSearchList.events = {
    "click button": function (e, tmpl) {
        
        var searchTags = Session.get('searchTags');
        var remove = this.toString();

        Session.set('searchTags', _(searchTags).without(remove));
    }
};

