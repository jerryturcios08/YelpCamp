var Campground = require("../models/campground");
var Comment = require("../models/comment");

// All middleware
var middlewareObj = {};

middlewareObj.checkCampgroundOwnership = function(req, res, next) {
	if (req.isAuthenticated()) {
		// Find the campground with provided ID
		Campground.findById(req.params.id, function(err, foundCampground) {
			if (err) {
				req.flash("error", "Campground not found!");
				res.redirect("back");
			} else {
				if (foundCampground.author.id.equals(req.user._id)) {
					next();
				} else {
					req.flash("error", "You don't have permission to do that!");
					res.redirect("back");
				}
			}
		});
	} else {
		req.flash("error", "Please login first!");
		res.redirect("back");
	}
}

middlewareObj.checkCommentOwnership = function(req, res, next) {
	if (req.isAuthenticated()) {
		// Find the comment with provided ID
		Comment.findById(req.params.comment_id, function(err, foundComment) {
			if (err) {
				req.flash("error", "Comment not found!");
				res.redirect("back");
			} else {
				if (foundComment.author.id.equals(req.user._id)) {
					next();
				} else {
					req.flash("error", "You don't have permission to do that!");
					res.redirect("back");
				}
			}
		});
	} else {
		req.flash("error", "Please login first!");
		res.redirect("back");
	}
}

middlewareObj.isLoggedIn = function(req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	} else {
		req.flash("error", "Please login first!");
		res.redirect("/login");
	}
}

module.exports = middlewareObj;
