<?php

    include('../../conexao/conn.php');

    $ID = $_REQUEST['ID'];

    //realiza um select no BD
    $sql = "SELECT * FROM EMPRESA WHERE ID = $ID";

    $resultado = $pdo->query($sql);

    //se a consulta tiver resultado, então se existe resultado faça...
    if ($resultado){
        $result = array();

        // a var resultado trrá os dados de forma desorganizada
        //o fetch assoc, vai ordenar esses dados para melhor compreensão.
        while($row = $resultado->fetch(PDO::FETCH_ASSOC)){

            //mapear o array
            $result = array_map('utf8_encode', $row);
        }
        $dados = array(
            'tipo' => 'success',
            'mensagem' => '',
            'dados' => $result
        );
    } else {
        $dados = array(
            'tipo' => 'error',
            'mensagem' => 'Não foi possível encontra o registro solicitado',
            'dados' => array()
        );
    }

echo json_encode($dados);