<?php

    //Realizar o include da conexão
    include('../../conexao/conn.php');

    //Obter o request vindo do datatable
    $requestData = $_REQUEST;

    session_start();
    $EMPRESA_ID = $_SESSION['ID'];

    //Obter as colunas vindas do resquest
    $colunas = $requestData['columns'];

    //Preparar o comando sql para obter os dados da categoria
    $sql = "SELECT DATE_FORMAT(p2.DATA, '%d/%m/%Y %H:%i:%s') as DATA, p2.DATA as DATA_ORIGINAL, c.ID as CLIENTE_ID, c.NOME as CLIENTE, p.ID as PRODUTO_ID, p.NOME as PRODUTO, p2.QTDE, p2.STATUS FROM CLIENTE c, PRODUTO p, PEDIDO p2 WHERE p2.CLIENTE_ID = c.ID AND p2.PRODUTO_ID = p.ID AND p2.STATUS = 1 ";

    //Obter o total de registros cadastrados
    $resultado = $pdo->query($sql);
    $qtdeLinhas = $resultado->rowCount();
    
    //Verificando se há filtro determinado
    $filtro = $requestData['search']['value'];
    if( !empty( $filtro ) ){
        //Montar a expressão lógica que irá compor os filtros
        //Aqui você deverá determinar quais colunas farão parte do filtro
        $sql .= " AND (DATA LIKE '$filtro%' ";
        $sql .= " OR CLIENTE LIKE '$filtro%') ";
        $sql .= " OR PRODUTO LIKE '$filtro%') ";
    }
    
    //Obter o total dos dados filtrados
    $resultado = $pdo->query($sql);
    $totalFiltrados = $resultado->rowCount();
    
    //Obter valores para ORDER BY      
    $colunaOrdem = $requestData['order'][0]['column']; //Obtém a posição da coluna na ordenação
    $ordem = $colunas[$colunaOrdem]['data']; //Obtém o nome da coluna para a ordenação
    $direcao = $requestData['order'][0]['dir']; //Obtém a direção da ordenação
    
    //Obter valores para o LIMIT
    $inicio = $requestData['start']; //Obtém o ínicio do limite
    $tamanho = $requestData['length']; //Obtém o tamanho do limite
    
    //Realizar o ORDER BY com LIMIT
    $sql .= " ORDER BY $ordem $direcao LIMIT $inicio, $tamanho ";
    $resultado = $pdo->query($sql);
    $dados = array();
    while($row = $resultado->fetch(PDO::FETCH_ASSOC)){
        $dados[] = array_map('utf8_encode', $row);
    }
    //Monta o objeto json para retornar ao DataTable
    $json_data = array(
        "draw" => intval($requestData['draw']),
        "recordsTotal" => intval($qtdeLinhas),
        "recordsFiltered" => intval($totalFiltrados),
        "data" => $dados
    );



    //Retorna o objeto json para o DataTable
    echo json_encode($json_data);