/* 

@author Benjamin Sasse
@date 2018-11-28

Lieber Entwicklerkollege, fühl dich frei einiges/alles zu kopieren und zu benutzen.
Schreibe mir gerne eine E-Mail dazu.
Den Code findest du auch unter GitHub

INFO
Die Kontaktdaten (JSON) werden erst geladen, wenn auf ein connect-Button geklickt wurde.
Dieses Script überprüft ob das Ergebis richtig ist und gibt die Kontaktdaten frei.
Dabei wird geschaut ob es sich um einen Menschen oder Bot handelt

*/

//Welche Connection soll geöffnet werden
var selectedConnection = "";

//Daten die geladen wurden für Connection
var connectionData = undefined;

//Das Click und ScrollData Objekt wird einfach gespeichert um sicherzustellen, dass ein Mensch nach unten gescrollt hat
var scrollData = undefined;
var clickData = undefined;

//Die URL zum Service mit den Kontakt-Daten
const SERVICE_URL = 'http://www.baenae.de/de/getConnect.php?';

$(document).ready(function () {
	//Funktion auf alle Buttons der Verbindung
	$("#connect a").each(function( index ) {
		$(this).click(function(eventData) { 
			if (undefined !== eventData.currentTarget) {
				clickData = eventData;
			}
			
			openConnection($(this).attr("id")) 
		});
	});

	//Daten werden erst freigeschaltet, wenn gescrollt wurde
	//Hierdurch sicherstellen, dass es sich um einen Menschen handelt
	$( window ).scroll(function(eventData) {
		if(undefined !== eventData.currentTarget) {
			scrollData = eventData;
		}
	});
	
	//Schließen des Fehler fensters
	$("#closeButton").click(function(options) { cancel()});
});

/**
 * Was geöffnet werden soll
 * @param id - Was hat der User geklicked, z.b. "whatsapp"
 */
function openConnection(id) {
	selectedConnection = id;

	//Der Suchmaschienen Schutz wurde noch nicht freigeschaltet
	if (connectionData === undefined) {
		this.loadJSON();
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

	//URL erzeugen
	let url = SERVICE_URL;

	//Hier wird sichergestellt, dass einmal gescrollt wurde, als sicherung, dass es ein Mensch war
	if (undefined !== scrollData && undefined !== scrollData.currentTarget) {
		url += "&scroll=" + scrollData.type.toUpperCase();
	}
	
	//Und hier der click
	if (undefined !== clickData && undefined !== clickData.originalEvent && clickData.originalEvent.clientX > 0 && clickData.originalEvent.clientY > 0) {
		url += "&click=" + clickData.type.toUpperCase();
	}
	
	var jqxhr = $.getJSON(url, function() {})
	.done(function(json) {
		connectionData = json["connect"];
		openConnectContent();
	})
	.fail(function() {
		$("#modal").fadeIn(300);
	})
	.always(function() {});
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

	$("#modal").fadeOut(300);
}