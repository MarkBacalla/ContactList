// Reference: http://blog.benmcmahen.com/post/41741539120/building-a-customized-accounts-ui-for-meteor

var trimInput = function(val) {
  return val.replace(/^\s*|\s*$/g, "");
}

var isValidPassword = function(val) {
   return val.length >= 6 ? true : false; 
}

var verifyEmail = function () { 
    return Meteor.user().emails[0].verified;
};

  Meteor.autorun(function() {
    // Whenever this session variable changes, run this function.
    var message = Session.get('displayMessage');
    if (message) {
      var stringArray = message.split('&');
      alert(stringArray[0]);
      // ui.notify(stringArray[0], stringArray[1])
      //   .effect('slide')
      //   .closable();

      Session.set('displayMessage', null);
    }
  });

Template.login.events({

  'submit #login-form' : function(e, t){
    e.preventDefault();
    // retrieve the input field values
    var email = t.find('#login-email').value
      , password = t.find('#login-password').value;

      // Trim and validate your fields here.... 

      // If validation passes, supply the appropriate fields to the
      // Meteor.loginWithPassword() function.
      Meteor.loginWithPassword(email, password, function(err){
        if (err)
          // The user might not have been found, or their passwword
          // could be incorrect. Inform the user that their
          // login attempt has failed. 
          console.log(err);
        else
          // The user has been logged in.
        console.log('Success!');
        Router.go('/');
      });

       return false; 
    }
});

Template.register.events({
  'submit #register-form' : function(e, t) {
    e.preventDefault();
    var email = t.find('#account-email').value
      , password = t.find('#account-password').value;

      // Trim and validate the input
    email = trimInput(email);

    if (isValidPassword(password)) {
        Accounts.createUser({email: email, password : password}, function(err){
          if (err) {            
            // Inform the user that account creation failed
            Session.set('displayMessage', 'Error in Creating User');
          } else {
            // Success. Account has been created and the user
            // has logged in successfully. 
            Session.set('displayMessage', 'User Successfully Created and Logged In');
          }

        });
    } else {
        alert ('Invalid Password!')
    }


    return false;
  }
});


  Template.passwordRecovery.helpers({
    resetPassword : function(t) {
      return Session.get('resetPassword');
    }
  });



  Template.passwordRecovery.events({

      'submit #recovery-form' : function(e, t) {
        e.preventDefault()
        var email = trimInput(t.find('#recovery-email').value)

        if (isNotEmpty(email) && isEmail(email)) {
          Session.set('loading', true);
          Accounts.forgotPassword({email: email}, function(err){
          if (err)
            Session.set('displayMessage', 'Password Reset Error & Doh')
          else {
            Session.set('displayMessage', 'Email Sent & Please check your email.')
          }
          Session.set('loading', false);
        });
        }
        return false; 
      },

      'submit #new-password' : function(e, t) {
        e.preventDefault();
        var pw = t.find('#new-password-password').value;
        if (isNotEmpty(pw) && isValidPassword(pw)) {
          Session.set('loading', true);
          Accounts.resetPassword(Session.get('resetPassword'), pw, function(err){
            if (err)
              Session.set('displayMessage', 'Password Reset Error & Sorry');
            else {
              Session.set('resetPassword', null);
            }
            Session.set('loading', false);
          });
        }
      return false; 
      }
  });

Template.verifyEmail.events = {
    
    "click .btn-primary": function (e, tmpl) {
        e.preventDefault();

        Meteor.call('resendVerification');

        alert('Email Sent!');
    }
}
