<?php

    $hostname = "mysql.adsolucoestecnologia.com.br";
    $dbname = "adsolucoestecn15";
    $username = "adsolucoestecn15";
    $password = "TR31NAM3NT0";

    try{
        $pdo = new PDO ('mysql:host='.$hostname.';dbname='.$dbname, $username, $password);
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        //echo 'A conexão com o Banco de Dados '.$dbname. ', foi realizado com sucesso! ';

    }  catch (PDOException $e){
        echo 'Error: '.$e->getMessage();
    }