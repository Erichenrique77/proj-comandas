<?php

    include('../../conexao/conn.php');

    $sql = $pdo->query("SELECT *, count(ID) as achou FROM EMPRESA WHERE LOGIN = '".$_REQUEST['LOGIN']."' AND SENHA = '".md5($_REQUEST['SENHA'])."'");

    while($resultado = $sql->fetch(PDO::FETCH_ASSOC)){
        if($resultado['achou'] == 1){
            session_start();
            $_SESSION['ID'] = $resultado['ID'];
            $dados = array(
                'tipo' => 'success',
                'mensagem' => 'Login efetuado com sucesso!'
            );
        }else{
            $dados = array(
                'tipo' => 'error',
                'mensagem' => 'Login ou senha incorreto!'
            );
        }
    }

    echo json_encode($dados);