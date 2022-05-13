$(document).ready(function () {
	openPhotoSubPage('photoindex');

	if (location.search.match(new RegExp("tfp"))) {
		openPage('tfp');
	}
	else {
		openPage('start');
	}
});

/**
 * Was geöffnet werden soll
 * @param pageId - Was hat der User geklicked
 */
function openPage(pageId) {
	$('#start').css('display', 'none');
	$('#portfolio').css('display', 'none');
	$('#leistungen').css('display', 'none');
	$('#privatesshooting').css('display', 'none');
	$('#businessshooting').css('display', 'none');
	$('#software').css('display', 'none');
	$('#art').css('display', 'none');
	$('#contact').css('display', 'none');
	$('#privatepolicy').css('display', 'none');
	$('#tfp').css('display', 'none');

	if (pageId === 'privatesshooting' || pageId === 'businessshooting' || pageId === 'privatepolicy' || pageId === 'portfolio' || pageId === 'leistungen' || pageId === 'software' || pageId === 'art') {
		$('#' + pageId).css('display', 'block');
	} else {
		$('#' + pageId).css('display', 'flex');
	}

	openPhotoSubPage('photoindex');

	return false;
}

function openPhotoSubPage(pageId) {
	$('#photoindex').css('display', 'none');
	$('#composing').css('display', 'none');
	$('#portraits').css('display', 'none');
	$('#produkt').css('display', 'none');
	$('#unterwegs').css('display', 'none');
	$('#bremen').css('display', 'none');
	$('#akt').css('display', 'none');

	$('#' + pageId).css('display', 'block');

	if (pageId === 'photoindex') {
		$('.photoindex').css('display', 'block');
	} else {
		$('.photoindex').css('display', 'none');
	}

	if (pageId === 'akt') {
		$('.aktinfo').css('display', 'block');
	} else {
		$('.aktinfo').css('display', 'none');
	}

	return false;
}

function makeHyperlinks() {
	$('.imagegallery img').each(function (index){
		var thumbSrc = ($(this).attr('src'));
		var linkSrc = thumbSrc.replace('thumbnails/', '');
		$(this).click(() => {
			//console.log(linkSrc);

			$('#modal').modal('show');
			$('#img01').attr('src', linkSrc);
		});
	});
}