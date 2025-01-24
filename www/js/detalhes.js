// Recuperar o ID salvo no localStorage
var id = parseInt(localStorage.getItem('detalhes'));

// Pegar os produtos do localStorage
var produtos = JSON.parse(localStorage.getItem('produto'));

// Comparando o produto escolhido com o produto salvo no localStorage
var item = produtos.find(produto => produto.id === id);

if (item) {
    console.log('Produto encontrado', item);

    // Alimentar com os valores do item
    $("#promo-detalhes").html(item.preco_promocional.toLocaleString('pt-br', {style: 'currency', currency: 'BRL'}));
    $("#price-detalhes").html(item.preco.toLocaleString('pt-br', {style: 'currency', currency: 'BRL'}));
    $("#img-detalhes").attr('src', item.imagem);
    $("#descricao-produto").html(item.descricao);
    $("#nome-produto").html(item.nome);
    $("#rating-detail").html(item.rating);
    $("#like-detail").html(item.likes);
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
    // Se o produto não for encontrado, exibir mensagem de erro
    console.log('Produto não encontrado');
}

var carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

// Função para adicionar produto ao carrinho
function addCarrinho(item, quantidade) {
    var ItemNoCarrinho = carrinho.find(c => c.item.id === item.id);

    if (ItemNoCarrinho) {
        // Verifica se já tem o item no carrinho
        // Adiciona quantidade e atualiza o total
        ItemNoCarrinho.quantidade += quantidade;
        ItemNoCarrinho.total_item += quantidade * item.preco_promocional;
    } else {
        carrinho.push({
            item: item,
            quantidade: quantidade,
            total_item: quantidade * item.preco_promocional
        });
    }

    // Atualizar o localStorage do carrinho
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
}

// Clicou no adicionar carrinho
$(".add-cart").on('click', function () {
    addCarrinho(item, 1);

    

        // Create toast with icon
    var toastIcon = app.toast.create({
        icon: app.theme === 'ios' ? '<i class="f7-icons"></i>' : '<i class="material-icons"></i>',
        text: `Produto adicionado ao carrinho`,
        position: 'center',
        closeTimeout: 2000,
    });

    toastIcon.open();
});
