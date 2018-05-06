var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
	{
		name: "Cloud's Rest",
		image: "https://images.unsplash.com/photo-1490733325962-96398c69612a?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=4f8db8749b54d68890beccedd7772186&auto=format&fit=crop&w=1400&q=60",
		description: "Lorem ipsum dolor sit amet, mel an verear noluisse, ex vis percipit voluptatibus. Commodo platonem ea sea, mei ea fabulas indoctum. Ei stet expetendis has, vim partem iisque an. Te eos tantas semper ponderum, ne eam dolore signiferumque, an delenit accusamus mei. Ea ius minimum adolescens, quo an graeci constituto, nisl suas cu eam. Oratio consetetur vis in, at tritani prodesset disputationi nam. Te mei erant melius, ad ius dolor mollis dolorum. Usu id volumus mnesarchum percipitur, ei usu iisque viderer. Has cu saepe invenire, at stet sanctus abhorreant per, vim ea blandit mediocrem ullamcorper. Nam ex epicurei disputationi, iudicabit vulputate cum et, probo error dicant ea pri. Tantas erroribus in vis. Partiendo neglegentur eum cu, ei usu ferri dolore. Sit congue suscipiantur te, vis cu luptatum vulputate. An assum option integre his, eum no affert tation tamquam, quem exerci constituam quo te."
	},
	{
		name: "Desert Mesa",
		image: "https://images.unsplash.com/photo-1455122990967-5f5b1030f719?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=18e01f89892b18ede93bb4dd2ce1d070&auto=format&fit=crop&w=1400&q=60",
		description: "Lorem ipsum dolor sit amet, mel an verear noluisse, ex vis percipit voluptatibus. Commodo platonem ea sea, mei ea fabulas indoctum. Ei stet expetendis has, vim partem iisque an. Te eos tantas semper ponderum, ne eam dolore signiferumque, an delenit accusamus mei. Ea ius minimum adolescens, quo an graeci constituto, nisl suas cu eam. Oratio consetetur vis in, at tritani prodesset disputationi nam. Te mei erant melius, ad ius dolor mollis dolorum. Usu id volumus mnesarchum percipitur, ei usu iisque viderer. Has cu saepe invenire, at stet sanctus abhorreant per, vim ea blandit mediocrem ullamcorper. Nam ex epicurei disputationi, iudicabit vulputate cum et, probo error dicant ea pri. Tantas erroribus in vis. Partiendo neglegentur eum cu, ei usu ferri dolore. Sit congue suscipiantur te, vis cu luptatum vulputate. An assum option integre his, eum no affert tation tamquam, quem exerci constituam quo te."
	},
	{
		name: "Canyon Floor",
		image: "https://images.unsplash.com/photo-1485343034225-9e5b5cb88c6b?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=a28fc68742556a682ecac876ab4b9c2c&auto=format&fit=crop&w=1400&q=60",
		description: "Lorem ipsum dolor sit amet, mel an verear noluisse, ex vis percipit voluptatibus. Commodo platonem ea sea, mei ea fabulas indoctum. Ei stet expetendis has, vim partem iisque an. Te eos tantas semper ponderum, ne eam dolore signiferumque, an delenit accusamus mei. Ea ius minimum adolescens, quo an graeci constituto, nisl suas cu eam. Oratio consetetur vis in, at tritani prodesset disputationi nam. Te mei erant melius, ad ius dolor mollis dolorum. Usu id volumus mnesarchum percipitur, ei usu iisque viderer. Has cu saepe invenire, at stet sanctus abhorreant per, vim ea blandit mediocrem ullamcorper. Nam ex epicurei disputationi, iudicabit vulputate cum et, probo error dicant ea pri. Tantas erroribus in vis. Partiendo neglegentur eum cu, ei usu ferri dolore. Sit congue suscipiantur te, vis cu luptatum vulputate. An assum option integre his, eum no affert tation tamquam, quem exerci constituam quo te."
	}
];

function seedDB() {
	Campground.remove({}, function(err) {
		// Remove all campgrounds
		if (err) {
			console.log(err);
		}
		console.log("Removed campgrounds!");

		// Add a few campgrounds
		data.forEach(function(seed) {
			Campground.create(seed, function(err, campground) {
				if (err) {
					console.log(err);
				} else {
					console.log("Added a campground!");

					// Create a comment
					Comment.create({
						text: "This place is great, but I wish there was internet.",
						author: "Homer"
					}, function(err, comment) {
						if (err) {
							console.log(err);
						} else {
							campground.comments.push(comment);
							campground.save();
							console.log("Created new comment!");
						}
					});
				}
			});
		});
	});
	// Add a few comments
}

module.exports = seedDB;
