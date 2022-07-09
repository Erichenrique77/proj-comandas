<?php

    include('../../conexao/conn.php');

    $requestData = $_REQUEST;

    // verificar se os campos foram preenchidos
    if (empty($requestData['NOME']) && empty($requestData['LOGIN']) && empty($requestData['SENHA'])){
        $dados = array(
            "tipo" => 'error',
            "mensagem" => 'Existe(m) campo(s) obrigatório(s) não preenchido(s)'
        );
 
    } else{
        $ID = isset($requestData['ID']) ? $requestData['ID'] : '';
        $operacao = isset($requestData['operacao']) ? $requestData['operacao'] : '';

        //se a operação for insert, vou inserir um novo registro
        if ($operacao == 'insert'){
            try{
                $stmt = $pdo->prepare ('INSERT INTO EMPRESA (NOME, LOGIN, SENHA) VALUES (:a, :b, :c)');
                $stmt->execute(array(
                    ':a' => utf8_decode($requestData['NOME']),
                    ':b' => $requestData['LOGIN'],
                    ':c' => md5($requestData['SENHA'])
                ));

                $dados = array(
                    "tipo" => 'success',
                    "mensagem" => 'Registro salvo com sucesso!'
                );
            } catch(PDOException $e) {
                $dados = array(
                    "tipo" => 'error',
                    "mensagem" => 'Não foi possível salvar o registro'.$e
                );
            }

            //atualizar registro
        } else{
            try{
                $stmt = $pdo->prepare ("UPDATE EMPRESA SET NOME = :a, LOGIN = :b, SENHA = :c WHERE ID = :id");
                $stmt->execute(array(
                    ':id' => $ID,
                    ':a' => utf8_decode($requestData['NOME']),
                    ':b' => $requestData['LOGIN'],
                    ':c' => md5($requestData['SENHA'])
                ));

                $dados = array(
                    "tipo" => 'success',
                    "mensagem" => 'Registro alterado com sucesso!'
                );
            } catch(PDOException $e) {
                $dados = array(
                    "tipo" => 'error',
                    "mensagem" => 'Não foi possível alterar o registro'.$e
                );
            }
        }
    }
echo json_encode($dados);