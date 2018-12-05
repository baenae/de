<?php

//Alles in Ordnung, darf der User rein?!
$access = false;

//Prüfen ob Argumente kommen
if(count($_GET) > 0) 
{
	//Prüfen ob die richtigen Argumente da sind
	if (isset($_GET["scroll"]) && isset($_GET["click"]))
	{
		//HAt ein User auch wirklich geklickt und gescrollt?!
		if ($_GET["scroll"] === "SCROLL" && $_GET["click"] === "CLICK") 
		{
			$access = true;
		}
	}
}

header("Content-Type: text/plain charset=utf-8");
header('Access-Control-Allow-Origin: *');

// respond to preflights
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') 
{
	// return only the headers and not the content
	// only allow CORS if we're doing a GET - i.e. no saving for now.
	if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']) && $_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD'] == 'GET') 
	{
		header('Access-Control-Allow-Origin: *');
		header('Access-Control-Allow-Headers: X-Requested-With');
	}
	exit;
}

//Es handelt sich um einen Menschen
if ($access === true) 
{
	$str = file_get_contents('../personal_data/connect.json');
}
//Es handelt sich nur um einen Fake User, dann leere Daten ausgeben
else 
{
	$str = file_get_contents('dontconnect.json');
}	

echo($str);

?>