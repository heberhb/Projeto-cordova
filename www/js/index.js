fetch('js/backend.json')
    .then(response => response.json())  // Corrigido "Response" para "response"
    .then(data => {
        // Salvar os dados vindos do back-end localmente
        // Vamos Utilizar o LocalStorage

        //'produto' é o apelido do objeto que está salvando localmente 
        localStorage.setItem('produto', JSON.stringify(data));
        console.log("Dados Salvo no localStorage");

        // Simular Carregamento Online
        setTimeout(() => {

            // Esvaziar a Área Produtos
            //Obs: Tem que ser dentro do Time, senão esvazia a lista antes
            $("#produtos").empty(); 

            // Listando produtos vindo do arquivo JSON local
            data.forEach(produto => {  // Corrigido "produtos" para "produto" para melhor semântica
                // Variável responsável para guardar os dados do Objeto
                var produtoHTML = `
                <!-- Item Card -->
                                <div class="item-card">
                                    <a data-id="${produto.id}" href="#" class="item">
                                        <div class="img-container">
                                            <img src="${produto.imagem}" alt="">
                                        </div>
                                        <div class="nome-rating">
                                            <span class="color-gray margin-left">${produto.nome}
                                            </span>
                                            <span class="bold margin-right">
                                                <i class="mdi mdi-star"></i>
                                                ${produto.rating}
                                            </span>
                                        </div>
                                        <div class="price margin-left">
                                            ${produto.preco_promocional.toLocaleString('pt-br', {style: 'currency', currency: 'BRL'})}
                                            <!-- Formatando para Moeda BR -->
                                        </div>
                                    </a>
                                </div>
            `;
                // Sem esse comando, a lista não é carregada
                // Comando para carregar a lista
                $("#produtos").append(produtoHTML);
            });

            //Criando um evento Click para armazenar o Id do Produto
            $(".item").on('click', function(){
                //Armazendo id atribuido data-id na classe $(this) => Item , e adicionando na variavel Id
                var id = $(this).attr('data-id');
                //Adicionando o id com o apelido detalhes para redirecionar para o HTML Detalhes
                localStorage.setItem('detalhes', id);
                console.log('Id Salvo no LocalStorage', id)
                

                app.views.main.router.navigate('/detalhes/');
                console.log(produtos)
            });
            // Tempo para carregamento da simulação online
        }, 3000);
    })
    // Caso ocorra um erro ao carregar a lista de produtos, esse código de erro é acionado
    .catch(error => console.error('Erro ao fazer fetch dos dados'));

    //Ver qwuantos itens tem dentro do carrinho
    setTimeout(() => {
        var carrinho = JSON.parse(localStorage.getItem('carrinho'));
        //Alimentar a sacolinha do carrinho 
        $('.btn-cart').attr('data-count', carrinho.length);
    },3000 );