<?php

    include('../../conexao/conn.php');

    session_start();

    $EMPRESA_ID = $_SESSION['ID'];

    $sql = "SELECT * FROM PRODUTO WHERE EMPRESA_ID = ".$EMPRESA_ID." ORDER BY NOME DESC";

    $resultado = $pdo->query($sql);

    if($resultado){
        while($row = $resultado->fetch(PDO::FETCH_ASSOC)){
            $dados[] = array_map('utf8_encode', $row);
        }
    }

    echo json_encode($dados);