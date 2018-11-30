/* 

@author Benjamin Sasse
@date 2018-11-28

Die Kontaktdaten (JSON) werden erst geladen, wenn der User eine Runde Schere/Stein/Papier gespielt hat.
Dadurch kann sichergestellt werden, dass die Daten nicht durch Google oder andere Bots indiziert werden können.

Die Hand des Spielers und des NPCs werden an ein PHP Script gepostet. 
Dieses Script überprüft ob das Ergebis richtig ist und gibt die Kontaktdaten frei.

Dabei ist der NPC Deutsch und der User Englisch um eine automatisierte Zuweisung zu verhindern

*/

const SCHERE = "schere";
const STEIN = "stein";
const PAPIER = "papier";

var npcChoice = "";
var playerChoise = "";

var selectedConnection = "";

$(document).ready(function () {
	$("#connect a").each(function( index ) {
		$(this).click(function() { openConnection($(this).attr("id")) });
	});

	$("#userSelect_scissors").click(function(options) { selectPlayerHand('scissors', options)});
	$("#userSelect_rock").click(function(options) { selectPlayerHand('rock', options)});
	$("#userSelect_paper").click(function(options) { selectPlayerHand('paper', options)});

	$("#goButton").click(function(options) { loadAccess()});
	$("#closeButton").click(function(options) { cancel()});
});


/**
 * @return Hand des NPSs - SCHERE - STEIN - PAPIER
 */
function generateNPCHand() {
	let random = Math.random() * 10;
	
	if (random < 3) {
		npcChoice = SCHERE;
	} else if (random < 7) {
		npcChoice = STEIN;
	} else {
		npcChoice = PAPIER;
	}
}

/**
 * Was geöffnet werden soll
 * @param id - Was hat der User geklicked, z.b. "whatsapp"
 */
function openConnection(id) {
	selectedConnection = id;

	generateNPCHand();
	$("#modal").fadeIn(300);
	$('#npcChoice').text(npcChoice);
}

/**
 * @selectPlayerChoise - Was hat der User ausgewählt
 * @options - jQuery Clickoptions
 */
function selectPlayerHand(selectPlayerChoise, options) {
	//Sicherstellen, dass wirklich mit maus oder touch geklickt wurde
	if(options !== undefined && options.originalEvent !== undefined) {
		//Funltioniert touch?
		if(options.originalEvent.clientX > 0 && options.originalEvent.clientY > 0) {
			playerChoise = selectPlayerChoise;

			//Zugangsbutton einblenden
			$("#goButton").removeClass("hidden");

			//Alle select klassen entfernen und das aktuelle einblenden
			$("#userSelect_scissors").removeClass("current");
			$("#userSelect_rock").removeClass("current");
			$("#userSelect_paper").removeClass("current");

			//aktuelles einblenden
			$("#userSelect_" + playerChoise).addClass("current");
		} else {
			console.error("No touchposition found");
		}
	}
	else {
		console.error("Options missing");
	}
}

function loadAccess() {

}

/**
 * Wenn man abbrechen klickt im Modal Screen
 */
function cancel() {
	//Auswahl zurücksetzen
	playerChoise = "";

	//Alle select klassen entfernen und das aktuelle einblenden
	$("#userSelect_scissors").removeClass("current");
	$("#userSelect_rock").removeClass("current");
	$("#userSelect_paper").removeClass("current");

	$("#modal").fadeOut(300);
	$("#dialogWindow").animate({scale: "0.8"}, 500);
}