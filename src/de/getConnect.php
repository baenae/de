<?php
	
	//Alles in Ordnung, darf der User rein?!
	$access = false;

	//Prüfen ob Argumente kommen
	if(count($_GET) > 0) 
	{
		//Prüfen ob die richtigen Argumente da sind
		if (isset($_GET["player"]) && isset($_GET["npc"]))
		{
			//Hat der Spieler richtig gespielt?!
			if (
				$_GET["player"] == "SCHERE" && $_GET["npc"] == "PAPIER"
				||
				$_GET["player"] == "STEIN" && $_GET["npc"] == "SCHERE"
				||
				$_GET["player"] == "PAPIER" && $_GET["npc"] == "STEIN"
			) 
			{
				$access = true;
			}
		}
	}

	
	if ($access === true) 
	{
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

		$str = file_get_contents('../personal_data/connect.json');
		echo($str);
	} 
	//Schere, Stein, Papier hat nicht geklappt
	else 
	{
		header("HTTP/1.0 401 Unauthorized");
	}

?>