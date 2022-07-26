<?php

    include('../../conexao/conn.php');

    session_start();

    $EMPRESA_ID = $_SESSION['ID'];

    $DATA = date("Y-m-d");

    $sql = "SELECT SUM(VALORRECEBIDO) as VALOR 
            FROM VENDA v, CLIENTE c, EMPRESA e
            WHERE c.ID = v.CLIENTE_ID AND c.EMPRESA_ID = e.ID AND e.ID = $EMPRESA_ID AND `DATA` LIKE '%$DATA%';";

    $resultado = $pdo->query($sql);

    if($resultado){
        while($row = $resultado->fetch(PDO::FETCH_ASSOC)){
            $VALOR = $row['VALOR'];
        }
    }

    $DESCRICAO = 'FECHANDO DAS VENDAS DO DIA: '.date("d/m/Y");
    $data = date("Y-m-d H:i:s");

    try{
        $stmt = $pdo->prepare("INSERT INTO CAIXA (DATA, VALOR, DESCRICAO, LANCAMENTO, EMPRESA_ID) VALUES (:a, :b, :c, :d, :e)");
        $stmt->execute(array(
            ':a' => $data,
            ':b' => $VALOR,
            ':c' => $DESCRICAO,
            ':d' => 1,
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

    echo json_encode($dados);