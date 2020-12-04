<?php
if (isset($_POST['form'])) 
{
  if(!empty($_POST['mail']) AND !empty($_POST['mdp']))
  {
    header("location:jeu_de_la_vie.php");
  }
}
?>

<!DOCTYPE html>
<html>
	<head>
   	<meta charset="utf-8">
   	<title>Connexion</title>
  </head>
  <body>
    <div class="bulle">
      <h2 style="text-align: center;">Connexion</h2>
      <br>
      <form method="POST">        
      <div class="form">
        <div style="display: flex; align-items: center; justify-content: center;">
          <div>
            <label for="mail">Adresse mail :&ensp;</label>
          </div>
          <div>
            <input type="text" id="mail" name="mail">
          </div>
        </div>   
        <br>
        <div style="display: flex; align-items: center; justify-content: center;">
          <div>
            <label for="mdp">Mot de passe :&ensp;</label>
          </div>  
          <div>
            <input type="password" id="mdp" name="mdp">
          </div>
        </div>    
        <br>
        <div style="display: flex; align-items: center; justify-content: center;">
          <br>
          <div>
            <input type="submit" id="bouton" name="form" value="Se connecter">
          </div>
        </div>
      </div>
  </body>
</html>