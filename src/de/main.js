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

	setInterval(function() {
		var random = Math.floor(Math.random() * 10);
		if (random > 6) {
			$('#startProfileImage').css('backgroundColor', '#A62014');
		} else if (random > 3) {
			$('#startProfileImage').css('backgroundColor', '#F29F05');
		} else {
			$('#startProfileImage').css('backgroundColor', '#03658C');
		}
	}, 3000);
});

/**
 * Was geöffnet werden soll
 * @param pageId - Was hat der User geklicked
 */
function openPage(pageId) {
	var pages = ['start', 'businessshootingshowcase', 'buchen', 'bewerben', 'portfolio', 'leistungen', 'privatesshooting', 'businessshooting', 'software', 'art', 'contact', 'privatepolicy', 'tfp', 'composingshowcase', 'productphotographyshowcase', 'portraitshowcase', 'aktshowcase', 'landscapeshowcase', 'todo'];
	for (var page of pages) {
		$('#' + page).css('display', 'none');
	}

	window.scrollTo(0, 0);

	$('#' + pageId).css('display', 'block');
	return false;
}

function openImage(src) {
	$('#modal').modal('show');
	$('#img01').attr('src', src);
	return false;
}