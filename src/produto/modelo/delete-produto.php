<?php

    include('../../conexao/conn.php');

    //recebe a var ID
    $ID = $_REQUEST['ID'];

    //realiza um select no BD
    $sql = "DELETE FROM PRODUTO WHERE ID = $ID";

    $resultado = $pdo->query($sql);

    if ($resultado){
        $dados = array(
            'tipo' => 'success',
            'mensagem' => 'Dado excluído com sucesso!'
        );
    } else{
        $dados = array(
            'tipo' => 'error',
            'mensagem' => 'Não foi possível excuir o registro!'
        );
    }
    
echo json_encode($dados);