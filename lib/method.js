
Meteor.methods({

    resendVerification: function() {
        var userId = Meteor.userId();
        if (!this.isSimulation)
            Accounts.sendVerificationEmail(userId);
    }

});
