<?php
if (isset($_POST['bouton'])) 
{
  header("location:index.html");
}
?>

<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Conway's Game of Life</title>
  </head>
  <body onload="init()">
    <div class="script" style="display: flex; align-items: center; justify-content: center;">
      <form method="POST">
      <canvas id="golCanvas" width="650" height="650" >
        Canvas n'est pas pris en compte par votre navigateur.
      </canvas>
      <div class="bouton" style="display: flex; align-items: center; justify-content: center;">
        <input type="submit" id="bouton" name="bouton" value="Arrêter">
      </div>
    </div>
  </body>
  <script src="script.js"> </script>
</html>