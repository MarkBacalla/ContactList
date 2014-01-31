Router.configure({
    layoutTemplate: 'layout'
});

Router.map(function() {
    this.route("contact", {
        path: '/contact/:id?',
        data: function() {
            var id = this.params.id;
            // XXX If you don't have a contact, you can actually
            // just return nothing here without blowing up your template code.
            // So can you refactor these 8 lines into 3?
            // -- fixed
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
