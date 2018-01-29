<?php
$file = $_FILES['photo']['tmp_name'];
$name = $_FILES['photo']['name'];
if(!move_uploaded_file($file, "img/".$_POST['project']."-".$name)){
   die("Error uploading photo");
}

$temp = json_encode(
    [json_decode(file_get_contents('data.json')), 
    $_POST]
);


if(file_put_contents('data.json', $temp)){
    echo "Portfolio saved!";
} else {
    echo "Error saving";
}
