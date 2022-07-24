<?php

    include('../../conexao/conn.php');

    session_start();

    $EMPRESA_ID = $_SESSION['ID'];

    $CLIENTE_ID = $_REQUEST['CLIENTE_ID'];

    $sql = "SELECT DATE_FORMAT(p2.DATA, '%d/%m/%Y %H:%i:%s') as DATA, p.NOME as PRODUTO,p.VALOR, p2.QTDE
            FROM CLIENTE c, PRODUTO p, PEDIDO p2 
            WHERE p2.CLIENTE_ID = c.ID AND p2.PRODUTO_ID = p.ID AND p2.STATUS = 1 AND c.ID = $CLIENTE_ID";

    $resultado = $pdo->query($sql);

    if($resultado){
        while($row = $resultado->fetch(PDO::FETCH_ASSOC)){
            $dados[] = array_map('utf8_encode', $row);
        }
    }

    echo json_encode($dados);