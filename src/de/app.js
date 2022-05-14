$(document).ready(function () {
	if ("onhashchange" in window) {
		window.onhashchange = function() {
			openPage(window.location.hash.replace(/#/gi, ''));
		}
	}

	if (window.location.hash) {
		openPage(window.location.hash.replace(/#/gi, ''))
	} else {
		openPage('start');
	}

});

/**
 * Was geöffnet werden soll
 * @param pageId - Was hat der User geklicked
 */
function openPage(pageId) {
	$('#start').css('display', 'none');
	$('#buchen').css('display', 'none');
	$('#bewerben').css('display', 'none');
	$('#portfolio').css('display', 'none');
	$('#leistungen').css('display', 'none');
	$('#privatesshooting').css('display', 'none');
	$('#businessshooting').css('display', 'none');
	$('#software').css('display', 'none');
	$('#art').css('display', 'none');
	$('#contact').css('display', 'none');
	$('#privatepolicy').css('display', 'none');
	$('#tfp').css('display', 'none');

	$('#' + pageId).css('display', 'block');
	/*
	if (pageId === 'sstart') {
		$('#' + pageId).css('display', 'flex');
	} else {

	}*/

	//openPhotoSubPage('photoindex');

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