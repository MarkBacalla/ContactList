Router.configure({
    layoutTemplate: 'layout'
});

Router.map(function() {
    this.route("contact", {
        path: '/contact/:id?',
        data: function() {
            var id = this.params.id;
            var contact = Contacts.findOne({_id: id });
            Session.set('currentTags', contact && contact.tags ? contact.tags : []); // reset currentTags
            return contact;            
        }
    });

    this.route("contacts", {
        path: '/',
        template: 'contactList'
    });

});
