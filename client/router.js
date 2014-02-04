Router.configure({
    layoutTemplate: 'layout'
});

Router.map(function() {
    this.route("contact", {
        path: '/contact/:id?',
        data: function() {            
            return Contacts.findOne({_id: this.params.id });
        }
    });

    this.route("contacts", {
        path: '/',
        template: 'contactList'
    });

});
