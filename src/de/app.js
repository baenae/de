/* 

@author Benjamin Sasse
@date 2018-11-28

Lieber Entwicklerkollege, fühl dich frei einiges/alles zu kopieren und zu benutzen.
Schreibe mir gerne eine E-Mail dazu.
Den Code findest du auch unter GitHub

INFO
Die Kontaktdaten (JSON) werden erst geladen, wenn der User eine Runde Schere/Stein/Papier gespielt hat.
Dadurch kann sichergestellt werden, dass die Daten nicht durch Google oder andere Bots indiziert werden können.

Die Hand des Spielers und des NPCs werden an ein PHP Script gepostet. 
Dieses Script überprüft ob das Ergebis richtig ist und gibt die Kontaktdaten frei.

Dabei ist der NPC Deutsch und der User Englisch um eine automatisierte Zuweisung zu verhindern

*/

const SCHERE = "schere";
const STEIN = "stein";
const PAPIER = "papier";

//Schere stein papier des Computers
var npcChoice = "";

//Schere Stein papier des Spielers
var playerChoise = "";

//Welche Connection soll geöffnet werden
var selectedConnection = "";

//Daten die geladen wurden für Connection
var connectionData = undefined;

$(document).ready(function () {
	$("#connect a").each(function( index ) {
		$(this).click(function() { openConnection($(this).attr("id")) });
	});

	$("#userSelect_schere").click(function(options) { selectPlayerHand(SCHERE, options)});
	$("#userSelect_stein").click(function(options) { selectPlayerHand(STEIN, options)});
	$("#userSelect_papier").click(function(options) { selectPlayerHand(PAPIER, options)});

	$("#goButton").click(function(options) { loadJSON()});
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

	//Der Suchmaschienen Schutz wurde noch nicht freigeschaltet
	if (connectionData === undefined) {
		$('#dialogWindowForm').removeClass("hide");
 		$('#dialogWindowLoading').addClass("hide");
 		$('#dialogWindowError').addClass("hide");

		generateNPCHand();
		$("#modal").fadeIn(300);
		$('#npcChoice').text(npcChoice);
	} 
	//Es wurde schon freigeschaltet
	else {
		openConnectContent();
	}
}

/**
 * lädt die JSON Daten mit den Connect zeug vom Server
 */
function loadJSON() {
 	let success = false;

 	//Haben beide gespielt
 	if (npcChoice !== '' && playerChoise !== '')
 	{
 		$('#dialogWindowForm').addClass("hide");
 		$('#dialogWindowLoading').removeClass("hide");

 		//URL erzeugen
 		let url = 'http://www.baenae.de/de/getConnect.php?player=' + playerChoise.toUpperCase() + '&npc=' + npcChoice.toUpperCase();

		var jqxhr = $.getJSON(url, function() {})
		.done(function(json) {
			connectionData = json["connect"];
			openConnectContent();
		})
		.fail(function() {
			$('#dialogWindowLoading').addClass("hide");
			$('#dialogWindowError').removeClass("hide");

			//Zugangsbutton einblenden
			$("#goButton").addClass("hide");
		})
		.always(function() {});
 	}
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
			$("#goButton").removeClass("hide");

			//Alle select klassen entfernen und das aktuelle einblenden
			$("#userSelect_schere").removeClass("current");
			$("#userSelect_stein").removeClass("current");
			$("#userSelect_papier").removeClass("current");

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

/**
 * Öffnet ein connect Element
 */
function openConnectContent() {
	//Fenster scliessen
	cancel();

	//wenn es noch keine Daten gibt, dann kontrolliert beenden
	if (undefined === connectionData) {
		console.error("openConnectContent without Data");
	} else {
		//Gibt es schon ein Element, wenn ja dann dieses entfernen
		if (undefined !== $('#connectOpen')) {
			$('#connectOpen').remove();
		}

		//Content erzeugen
		if (selectedConnection !== "") {

			//die richtigen Daten finden
			for (let connectionEntity of connectionData) {
				
				//das aktuelle Element wurde gefunden
				if (connectionEntity.id == selectedConnection) {

					//Wrapper erzeugen
					let container = $('<li id="connectOpen"></li>');

					//die richtigen Daten finden
					for(let key in connectionEntity) {
						//ID wird nicht behandelt und Title gesondert
						if (key !== 'id' && key !== 'title' && key !== "URL") {
							let content = $('<div><label>' + key + ': </label>' + connectionEntity[key] + '</div>');
							content.prependTo(container);
						}
					}

					//URL Gesondert behandeln
					if (connectionEntity["URL"]) {
						let url = $('<div><label>URL: </label>' + connectionEntity['URL'] + ' <i class="fas fa-external-link-alt"></div>');
						url.prependTo(container);
					}

					//Titel gesondert eintragen
					let title = $('<div><h3>' + connectionEntity["title"] + '</div>');
					title.prependTo(container);

					//Hinter das geklickte Element hinzufügen
					let toElement = $('#' + selectedConnection).parent();
					container.insertAfter(toElement);

				}
			}
		}
	}
}

/**
 * Wenn man abbrechen klickt im Modal Screen
 */
function cancel() {
	//Auswahl zurücksetzen
	playerChoise = "";

	//Zugangsbutton einblenden
	$("#goButton").addClass("hide");

	//Alle select klassen entfernen und das aktuelle einblenden
	$("#userSelect_schere").removeClass("current");
	$("#userSelect_stein").removeClass("current");
	$("#userSelect_papier").removeClass("current");

	$("#modal").fadeOut(300);
	$("#dialogWindow").animate({scale: "0.8"}, 500);
}