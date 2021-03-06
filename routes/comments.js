var express = require("express");
var router = express.Router({
	mergeParams: true
});
var Campground = require("../models/campground");
var Comment = require("../models/comment");
var middleware = require("../middleware");

// Show comment creation form
router.get("/new", middleware.isLoggedIn, function(req, res) {
	// Find campground by ID
	Campground.findById(req.params.id, function(err, campground) {
		if (err) {
			console.log(err);
		} else {
			res.render("comments/new", {
				campground: campground
			});
		}
	});
});

// Create comment
router.post("/", middleware.isLoggedIn, function(req, res) {
	// Find campground by ID
	Campground.findById(req.params.id, function(err, campground) {
		if (err) {
			req.flash("error", "Campground not found!");
			console.log(err);
			res.redirect("/campgrounds");
		} else {
			Comment.create(req.body.comment, function(err, comment) {
				if (err) {
					req.flash("error", "An error has occurred! Please try again later.");
					console.log(err);
				} else {
					// Add username and ID to comment
					comment.author.id = req.user._id;
					comment.author.username = req.user.username;

					// Save comment
					comment.save();
					campground.comments.push(comment);
					campground.save();
					req.flash("success", "Successfully submitted comment!");
					res.redirect("/campgrounds/" + campground._id);
				}
			});
		}
	});
});

// EDIT - edit comment route
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res) {
	// Find comment by ID
	Comment.findById(req.params.comment_id, function(err, foundComment) {
		if (err) {
			req.flash("error", "Comment not found!");
			res.redirect("back");
		} else {
			res.render("comments/edit", {
				campground_id: req.params.id,
				comment: foundComment
			});
		}
	});
});

// UPDATE - update comment route
router.put("/:comment_id", middleware.checkCommentOwnership, function(req, res) {
	// Find and update the correct comment
	Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment) {
		if (err) {
			req.flash("error", "Comment not found!");
			res.redirect("back");
		} else {
			req.flash("success", "Successfully updated comment!");
			res.redirect("/campgrounds/" + req.params.id);
		}
	});
});

// DESTROY - delete comment route
router.delete("/:comment_id", middleware.checkCommentOwnership, function(req, res) {
	// Find and delete the correct comment
	Comment.findByIdAndRemove(req.params.comment_id, function(err) {
		if (err) {
			req.flash("error", "Comment not found!");
			res.redirect("back");
		} else {
			req.flash("success", "Successfully deleted comment!");
			res.redirect("/campgrounds/" + req.params.id);
		}
	});
});

module.exports = router;
