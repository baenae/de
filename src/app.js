//  bind scroll to anchor links
$(document).on("click", "a[href^='#']", function (e) {
	var id = $(this).attr("href");
	if ($(id).length > 0) {
		e.preventDefault();
		console.log(id);
		// trigger scroll
		controller.scrollTo(id);

		// if supported by the browser we can even update the URL.
		if (window.history && window.history.pushState) {
			history.pushState("", document.title, id);
		}
	}
});


var ScrollMagic;
var TweenMax;
var controller;

$(document).ready(function () {
	// init controller
	controller = new ScrollMagic.Controller();

	// change behaviour of controller to animate scroll instead of jump
	controller.scrollTo(function (newpos) {
		TweenMax.to(window, 0.5, {scrollTo: {y: (newpos -220)}});
	});


	let scene1 = new ScrollMagic.Scene();
	scene1.setPin('#header', {pushFollowers: false});
	//scene1.addIndicators();
	scene1.addTo(controller);

	let scene2 = new ScrollMagic.Scene({triggerElement: '#triggerScale1'});
	scene2.setClassToggle('#page', 'scrollScale1');
	//scene2.addIndicators();
	scene2.addTo(controller);

	let scene3 = new ScrollMagic.Scene({triggerElement: '#triggerScale2'});
	scene3.setClassToggle('#page', 'scrollScale2');
	//scene2.addIndicators();
	scene3.addTo(controller);
});





