<?php

//inclusão do BD
include('../../conexao/conn.php');

//obter o request vindo do datatable
$requestData = $_REQUEST;

//obter as colunas vindas do resquest, as colunas da tabela do nosso banco de dados
$colunas = $requestData['columns'];

//preparar o comando sql para obter os dados da categoria
// 1=1 siginifica trazer tudo, é como um SELECT * (all)
$sql = "SELECT ID, NOME FROM EMPRESA WHERE 1=1 ";

//obter o total de registros cadastrados
$resultado = $pdo->query($sql);
$qtdeLinhas = $resultado->rowCount();

//verificando se há filtro determinado
$filtro = $requestData['search']['value'];
if( !empty( $filtro ) ){
    //montar a expressão lógica que irá compor os filtros
    //aqui vc deverá determinar quais colunas farão parte do filtro
    $sql .=" AND (ID LIKE '$filtro%' ";
    $sql .=" OR NOME LIKE '$filtro%') ";
}

//obter o total dos dados filtrados
$resultado = $pdo->query($sql);
$totalFiltrados = $resultado->rowCount();

//obtervalores para ORDER BY
$colunaOrdem = $requestData['order'][0]['column']; //obtém a posição da coluna na ordenação
$ordem = $colunas[$colunaOrdem]['data']; //obtém o nome da coluna para a ordenação
$direcao = $requestData['order'][0]['dir']; //obtém a direção da ordenação

//obter valores para o LIMIT
$inicio = $requestData['start']; //obtém o inicio do limite
$tamanho = $requestData['length']; //obtem o tamanho do limite

//realizar o ORDER BY com LIMIT
$sql .= " ORDER BY $ordem $direcao LIMIT $inicio, $tamanho ";
$resultado = $pdo->query($sql);
$dados = array();
while($row = $resultado->fetch(PDO::FETCH_ASSOC)){
    $dados[] = array_map(null, $row);
}

//montar o objeto json para retornar ao DataTable
$json_data = array(
    "draw" => intval($requestData['draw']),
    "recordsTotal" => intval($qtdeLinhas),
    "recordsFiltered" => intval($totalFiltrados),
    "data" => $dados 
);

//retorna a objeto json para o Datatable
echo json_encode($json_data);