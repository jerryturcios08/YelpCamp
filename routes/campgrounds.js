var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var middleware = require("../middleware");

// INDEX - show all campgrounds
router.get("/", function(req, res) {
	// Get all campgrounds from DB
	Campground.find({}, function(err, allCampgrounds) {
		if (err) {
			req.flash("error", "An error has occurred! Please try again later.");
			console.log(err);
		} else {
			res.render("campgrounds/index", {
				campgrounds: allCampgrounds,
				page: 'campgrounds'
			});
		}
	});
});

// CREATE - add new campground to DB
router.post("/", middleware.isLoggedIn, function(req, res) {
	// get data from form and add to campgrounds array
	var name = req.body.name;
	var price = req.body.price;
	var image = req.body.image;
	var desc = req.body.description;
	var author = {
		id: req.user._id,
		username: req.user.username
	}

	var newCampground = {
		name: name,
		price: price,
		image: image,
		description: desc,
		author: author
	}

	// create a new campground and save to DB
	Campground.create(newCampground, function(err, newlyCreated) {
		if (err) {
			req.flash("error", "An error has occurred! Please try again later.");
			console.log(err);
			res.redirect("/campgrounds");
		} else {
			// redirect back to campgrounds page
			req.flash("success", "Successfully created campground!");
			console.log(newlyCreated);
			res.redirect("/campgrounds");
		}
	});
});

// NEW - show form to create new campground
router.get("/new", middleware.isLoggedIn, function(req, res) {
	res.render("campgrounds/new");
});

// SHOW - shows more info about one campground
router.get("/:id", function(req, res) {
	// Find the campground with provided ID
	Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground) {
		if (err) {
			req.flash("error", "Campground not found!");
			console.log(err);
		} else {
			console.log(foundCampground);
			// render show template with that campground
			res.render("campgrounds/show", {
				campground: foundCampground
			});
		}
	});
});

// EDIT - edit campground route
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res) {
	// Find the campground with provided ID
	Campground.findById(req.params.id, function(err, foundCampground) {
		if (err) {
			req.flash("error", "Campground not found!");
			console.log(err);
		} else {
			res.render("campgrounds/edit", {
				campground: foundCampground
			});
		}
	});
});

// UPDATE - update campground route
router.put("/:id", middleware.checkCampgroundOwnership, function(req, res) {
	// Find and update the correct campground
	Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground) {
		if (err) {
			req.flash("error", "Campground not found!");
			res.redirect("/campgrounds");
		} else {
			req.flash("success", "Successfully updated campground!");
			res.redirect("/campgrounds/" + req.params.id);
		}
	});
});

// DESTROY - delete campground route
router.delete("/:id", middleware.checkCampgroundOwnership, function(req, res) {
	// Find and delete the correct campground
	Campground.findByIdAndRemove(req.params.id, function(err) {
		if (err) {
			req.flash("error", "Campground not found!");
			res.redirect("/campgrounds");
		} else {
			req.flash("success", "Successfully deleted campground!");
			res.redirect("/campgrounds");
		}
	});
});

module.exports = router;
