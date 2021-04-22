$(document).ready(function () {
	openPage('art');
});

/**
 * Was geöffnet werden soll
 * @param pageId - Was hat der User geklicked
 */
function openPage(pageId) {
	$('#start').css('display', 'none');
	$('#photography').css('display', 'none');
	$('#software').css('display', 'none');
	$('#art').css('display', 'none');
	$('#contact').css('display', 'none');
	$('#privatepolicy').css('display', 'none');

	if (pageId === 'privatepolicy' || pageId === 'photography' || pageId === 'software' || pageId === 'art') {
		$('#' + pageId).css('display', 'block');
	} else {
		$('#' + pageId).css('display', 'flex');
	}

	return false;
}