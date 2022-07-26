<?php

    include('../../conexao/conn.php');

    session_start();

    $requestData = $_REQUEST;

    if(empty($requestData['DESCRICAO']) && empty($requestData['VALOR']) && empty($requestData['TIPO'])){
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
                $stmt = $pdo->prepare("INSERT INTO CAIXA (DATA, VALOR, DESCRICAO, LANCAMENTO, EMPRESA_ID) VALUES (:a, :b, :c, :d, :e)");
                $stmt->execute(array(
                    ':a' => $data,
                    ':b' => $requestData['VALOR'],
                    ':c' => utf8_decode($requestData['DESCRICAO']),
                    ':d' => $requestData['LANCAMENTO'],
                    ':e' => $_SESSION['ID']
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
                $stmt = $pdo->prepare("UPDATE CAIXA SET VALOR = :a, DESCRICAO = :b, LANCAMENTO = :c WHERE ID = :id");
                $stmt->execute(array(
                    ':id' => $ID,
                    ':a' => $requestData['VALOR'],
                    ':b' => utf8_decode($requestData['DESCRICAO']),
                    ':c' => $requestData['LANCAMENTO']
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