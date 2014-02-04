// XXX If this does not inside a Deps.autorun this will not 
// subscribe automatically when the user starts out anonymous and then logs in
// So you have two choices, remove the Meteor.userId() check or put it inside
// the Deps.autorun() ... choose one and explain your choice. :) 
 if (Meteor.userId()) {

	Meteor.subscribe("contacts");
	Meteor.subscribe("emails");
}