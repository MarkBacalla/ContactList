 
 if (Meteor.userId()) {

	Meteor.subscribe("contacts");
	Meteor.subscribe("emails");
}