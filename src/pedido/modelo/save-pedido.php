<?php

    include('../../conexao/conn.php');

    session_start();

    $requestData = $_REQUEST;

    if(empty($requestData['CLIENTE_ID']) && empty($requestData['PRODUTO_ID'])){
        $dados = array(
            "tipo" => 'error',
            "mensagem" => 'Existe(m) campo(s) obrigatório(s) não preenchido(s).'
        );
    }else{
        $ID = isset($requestData['ID']) ? $requestData['ID'] : '';
        $operacao = isset($requestData['operacao']) ? $requestData['operacao'] : '';

        $data = date("Y-m-d H:i:s");

        if($operacao == 'insert'){
            try{
                $stmt = $pdo->prepare("INSERT INTO PEDIDO (CLIENTE_ID, PRODUTO_ID, QTDE, DATA, STATUS) VALUES (:a, :b, :c, :d, :e)");
                $stmt->execute(array(
                    ':a' => $requestData['CLIENTE_ID'],
                    ':b' => $requestData['PRODUTO_ID'],
                    ':c' => $requestData['QTDE'],
                    ':d' => $data,
                    ':e' => 1
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
                $stmt = $pdo->prepare("UPDATE PEDIDO SET PRODUTO_ID = :a, QTDE = :b WHERE ID = :id");
                $stmt->execute(array(
                    ':id' => $ID,
                    ':a' => $requestData['PRODUTO_ID'],
                    ':b' => $requestData['QTDE']
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