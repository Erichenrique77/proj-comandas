<?php

    include('../../conexao/conn.php');

    session_start();

    $requestData = $_REQUEST;

    if(empty($requestData['NOME'])){
        $dados = array(
            "tipo" => 'error',
            "mensagem" => 'Existe(m) campo(s) obrigatório(s) não preenchido(s).'
        );
    }else{
        $ID = isset($requestData['ID']) ? $requestData['ID'] : '';
        $operacao = isset($requestData['operacao']) ? $requestData['operacao'] : '';

        if($operacao == 'insert'){
            try{
                $stmt = $pdo->prepare("INSERT INTO PRODUTO (NOME, VALOR, EMPRESA_ID) VALUES (:a, :b, :c)");
                $stmt->execute(array(
                    ':a' => utf8_decode($requestData['NOME']),
                    ':b' => $requestData['VALOR'],
                    ':c' => $_SESSION['ID']
                ));
                $dados = array(
                    "tipo" => 'success',
                    "mensagem" => 'Registro salvo com sucesso.'
                );
            } catch(PDOException $e) {
                $dados = array(
                    "tipo" => 'error',
                    "mensagem" => 'Não foi possível salvar o registro '.$e
                );
            }
        }else{
            try{
                $stmt = $pdo->prepare("UPDATE PRODUTO SET NOME = :a, VALOR = :b WHERE ID = :id");
                $stmt->execute(array(
                    ':id' => $ID,
                    ':a' => utf8_decode($requestData['NOME']),
                    ':b' => $requestData['VALOR']
                ));
                $dados = array(
                    "tipo" => 'success',
                    "mensagem" => 'Registro atualizado com sucesso.'
                );
            } catch(PDOException $e) {
                $dados = array(
                    "tipo" => 'error',
                    "mensagem" => 'Não foi possível atualizar o registro '.$e
                );
            }
        }
    }

    echo json_encode($dados);