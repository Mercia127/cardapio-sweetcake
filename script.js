let carrinho = [];

function carregarProdutos(){
    const produtos = JSON.parse(localStorage.getItem("produtosSweetCake")) || [];
    const lista = document.getElementById("listaProdutosLoja");

    lista.innerHTML = "";

    produtos.forEach(function(produto){
        if(produto.ativo === false) return;

        lista.innerHTML += `
            <div class="produto">
                <h3>${produto.nome}</h3>
                <p>R$ ${produto.preco}</p>
                <button onclick="adicionarProduto('${produto.nome}', ${produto.preco})">Adicionar</button>
            </div>
        `;
    });
}

function adicionarProduto(nome, preco){
    carrinho.push({nome: nome, preco: preco});
    atualizarCarrinho();
}

function atualizarCarrinho(){
    let total = 0;
    const itens = document.getElementById("itensCarrinho");

    itens.innerHTML = "";

    carrinho.forEach(function(item){
        total += item.preco;
        itens.innerHTML += <div>${item.nome} - R$ ${item.preco}</div>;
    });

    document.getElementById("totalCarrinho").innerText = total.toFixed(2).replace(".", ",");
}

function finalizarPedido(){
    if(carrinho.length === 0){
        alert("Adicione pelo menos um produto ao carrinho.");
        return;
    }

    let total = 0;
    let texto = "Olá, gostaria de fazer um pedido:%0A%0A";

    carrinho.forEach(function(item){
        total += item.preco;
        texto += "- " + item.nome + " - R$ " + item.preco + "%0A";
    });

    texto += "%0ATotal: R$ " + total.toFixed(2).replace(".", ",");
    texto += "%0A%0AForma de pagamento:";
    texto += "%0ARetirada ou entrega:";

    window.open("https://wa.me/5519984152639?text=" + texto, "_blank");
}
try{
    carregarProdutos();
}catch(erro){
    alert("ERRO: " + erro);
}