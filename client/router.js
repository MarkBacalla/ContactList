Router.configure({
    layoutTemplate: 'layout'
});

Router.map(function() {
    this.route("contact", {
        path: '/contact/:id?',
        data: function() {
            var id = this.params.id;
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
