//Recuperar O ID salvo no localStorage
var id = parseInt(localStorage.getItem('detalhes'));

//Pegar os produtos do localStorage
var produtos = JSON.parse(localStorage.getItem('produto', id));

//Comparando o produto escolhido com o produto salvo no localStorage
var item = produtos.find(produtos => produtos.id === id);


if (item) {
    console.log('produto Encontrado', item);

    //Alimentar com os valores do Item
    $("#promo-detalhes").html(item.preco_promocional.toLocaleString('pt-br', {style: 'currency', currency: 'BRL'}));
    $("#price-detalhes").html(item.preco.toLocaleString('pt-br', {style: 'currency', currency: 'BRL'}));
    $("#img-detalhes").attr('src', item.imagem);
    $("#descricao-produto").html(item.descricao);
    $("#nome-produto").html(item.nome);
    $("#rating-detail").html(item.rating);
    $("#like-detail").html(item.likes);
    $("#Reviews-detail").html(item.reviews);
    $("#Reviews-detail").html(item.reviews);

    var tabdetalhes = $("#table-detalhes");

    item.detalhes.forEach(detalhe => {
        var linha = `
            <tr>
                <td>${detalhe.caracteristica}</td>
                <td>${detalhe.detalhes}</td>
            </tr>
        `;
         tabdetalhes.append(linha);
    });
} else {
    //Se o produto não for encontrado, exibir mensagem de erro
    console.log('Produto não encontrado');
}

var carrinho = JSON.parse(localStorage.getItem(carrinho)) || [];

//Função para adicionar produto ao carrinho
function addCarrinho(item,quantidade) {
    var ItenNoCarrinho = carrinho.find(c => c.item.id === item.id);

    if(ItenNoCarrinho){
        ItenNoCarrinho.quantidade += quantidade;
        
    }
}








