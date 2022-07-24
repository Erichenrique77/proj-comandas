<?php

    include('../../conexao/conn.php');

    session_start();

    $requestData = $_REQUEST;

    if(empty($requestData['CLIENTE_ID']) && empty($requestData['VALORRECEBIDO'])){
        $dados = array(
            "tipo" => 'error',
            "mensagem" => 'Existe(m) campo(s) obrigatório(s) não preenchido(s).'
        );
    }else{
        $ID = isset($requestData['ID']) ? $requestData['ID'] : '';

        $data = date("Y-m-d H:i:s");

        
            try{
                $stmt = $pdo->prepare("INSERT INTO VENDA (DATA, FPAGAMENTO, VALORRECEBER, TROCO, DESCONTO, VALORRECEBIDO, CLIENTE_ID) VALUES (:a, :b, :c, :d, :e, :f, :g)");
                $stmt->execute(array(
                    ':a' => $data,
                    ':b' => $requestData['FPAGAMENTO'],
                    ':c' => $requestData['VALORRECEBER'],
                    ':d' => $requestData['TROCO'],
                    ':e' => $requestData['DESCONTO'],
                    ':f' => $requestData['VALORRECEBIDO'],
                    ':g' => $requestData['CLIENTE_ID'],
                ));

                $stmt = $pdo->prepare("UPDATE PEDIDO SET STATUS = :a WHERE CLIENTE_ID = :id");
                $stmt->execute(array(
                    ':id' => $requestData['CLIENTE_ID'],
                    ':a' => 2
                ));

                $dados = array(
                    "tipo" => 'success',
                    "mensagem" => 'Conta encerrada com sucesso.'
                );
            } catch(PDOException $e) {
                $dados = array(
                    "tipo" => 'error',
                    "mensagem" => 'Não foi possível encerrar a conta '.$e
                );
            }
        
        }

    echo json_encode($dados);