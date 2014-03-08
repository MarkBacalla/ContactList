
// Reference: http://www.manuel-schoebel.com/blog/meteorjs-iron-router-filters-before-and-after-hooks
var IR_Filters = {
    // All standard subscriptions you need before anything works
    // the .wait() makes sure that it continues only if the subscription
    // is ready and the data available
    // Use: global
    baseSubscriptions: function() {
        this.subscribe('userData').wait();
    },
    // show login if a guest wants to access private areas
    // Use: {only: [privateAreas] }
    isLoggedIn: function() {
        if (!(Meteor.loggingIn() || Meteor.user())) {
          //Notify.setError(__('Please login.')); // some custom packages
          this.render('login');
          this.stop();
        }
    },
    // make sure to scroll to the top of the page on a new route
    // Use: global
    scrollUp: function() {
        $('body,html').scrollTop(0);
    },
    // if this route depends on data, show the NProgess loading indicator
    // http://ricostacruz.com/nprogress/
    // Use: global
    startNProgress: function() {
        if (_.isFunction(this.data)) {
          NProgress.start();
        }
    },
    // tell google analytics that a page was viewed
    // e.g. https://github.com/datariot/meteor-ganalytics
    // Use: global
    pageview: function() {
        GAnalytics.pageview(this.path);
    },
    // only show route if you are an admin
    // using https://github.com/alanning/meteor-roles
    // Use: {only: [adminAreas]}
    isAdmin: function() {
        if (!Roles.userIsInRole(Meteor.userId(), ['admin'])) {
          this.render('login');
          this.stop();
        }
    },
    // animate old content out using
    // http://daneden.github.io/animate.css/
    // Use: global
    animateContentOut: function() {
        $('#content').removeClass("animated fadeIn fadeInRight");
        $('footer').addClass("hide");
    }
}


Router.configure({
    layoutTemplate: 'layout',
    loadingTemplate: 'loading',
    waitOn: function () {
        return Meteor.subscribe('contacts');
    }
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
        template: 'contactList',
    });

    this.route("register", {
        path: "/register",
        template: 'register'
    })
});

Router.before(IR_Filters.isLoggedIn, { except: ['register']});
