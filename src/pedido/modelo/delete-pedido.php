<?php

    include('../../conexao/conn.php');

    $DATA = $_REQUEST['DATA'];

    $sql = "DELETE FROM PEDIDO WHERE DATA = '$DATA'";

    $resultado = $pdo->query($sql);

    if($resultado){
        $dados = array(
            "tipo" => 'success',
            "mensagem" => 'Registro excluído com sucesso.'
        );
    }else{
        $dados = array(
            "tipo" => 'error',
            "mensagem" => 'Não foi possível excluir o registro.'
        );
    }

    echo json_encode($dados);