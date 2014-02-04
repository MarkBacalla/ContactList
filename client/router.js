Router.configure({
    layoutTemplate: 'layout'
});

Router.map(function() {
    this.route("contact", {
        path: '/contact/:id?',
        data: function() {
            var id = this.params.id;
            var contact = Contacts.findOne({_id: id });
            // XXX I want you to get rid of Session's 'currentTags' field completely
            // instead let's update the contact directly when a tag is added and removed
            Session.set('currentTags', contact && contact.tags ? contact.tags : []); // reset currentTags
            return contact;            
        }
    });

    this.route("contacts", {
        path: '/',
        template: 'contactList'
    });

});
