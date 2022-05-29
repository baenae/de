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

	document.addEventListener('contextmenu', event => event.preventDefault());
});

/**
 * Was geöffnet werden soll
 * @param pageId - Was hat der User geklicked
 */
function openPage(pageId) {
	$('#start').css('display', 'none');
	$('#businessshootingshowcase').css('display', 'none');
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
	$('#composingshowcase').css('display', 'none');
	$('#productphotographyshowcase').css('display', 'none');
	$('#portraitshowcase').css('display', 'none');
	$('#aktshowcase').css('display', 'none');
	$('#landscapeshowcase').css('display', 'none');
	$('#todo').css('display', 'none');

	$('#' + pageId).css('display', 'block');

	return false;
}

function openImage(src) {
	$('#modal').modal('show');
	$('#img01').attr('src', src);
	return false;
}