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
            if (id) {
                var contact = Contacts.findOne({_id: id });
                contact && Session.set('currentTags', contact.tags);
                return contact;
            } else {
                Session.set('currentTags', []);
                return { name: '', email: '', tags: []};
            }
            
        }
    });

    this.route("contacts", {
        path: '/',
        template: 'contactList'
    });

});
