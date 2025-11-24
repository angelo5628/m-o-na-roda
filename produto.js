// Inicializar gerenciador de produtos
const gerenciadorProdutos = new GerenciadorProdutos();

// Carregar produtos ao iniciar a página
document.addEventListener('DOMContentLoaded', function() {
    carregarProdutos();
    
    // Configurar evento do formulário
    const formProduto = document.getElementById('form-produto');
    if (formProduto) {
        formProduto.addEventListener('submit', function(e) {
            e.preventDefault();
            cadastrarProduto();
        });
    }
});

function cadastrarProduto() {
    const nome = document.getElementById('nome').value;
    const descricao = document.getElementById('descricao').value;
    const preco = parseFloat(document.getElementById('preco').value);
    const categoria = document.getElementById('categoria').value;
    const estoque = parseInt(document.getElementById('estoque').value);
    const compatibilidade = document.getElementById('compatibilidade').value;
    
    const novoProduto = new Produto(null, nome, descricao, preco, categoria, estoque);
    novoProduto.compatibilidade = compatibilidade;
    
    const id = gerenciadorProdutos.adicionarProduto(novoProduto);
    
    showMessage(`Produto "${nome}" cadastrado com sucesso! ID: ${id}`);
    carregarProdutos();
    
    // Limpar formulário
    document.getElementById('form-produto').reset();
}

function carregarProdutos() {
    const produtos = gerenciadorProdutos.listarProdutos();
    const tbody = document.querySelector('#tabela-produtos tbody');
    
    tbody.innerHTML = '';
    
    produtos.forEach(produto => {
        const tr = document.createElement('tr');
        
        tr.innerHTML = `
            <td>${produto.id}</td>
            <td>${produto.nome}</td>
            <td>${produto.descricao || '-'}</td>
            <td>${formatCurrency(produto.preco)}</td>
            <td>${formatCategoria(produto.categoria)}</td>
            <td>${produto.estoque}</td>
            <td>
                <button class="btn" onclick="editarProduto(${produto.id})">Editar</button>
                <button class="btn btn-secondary" onclick="excluirProduto(${produto.id})">Excluir</button>
            </td>
        `;
        
        tbody.appendChild(tr);
    });
}

function editarProduto(id) {
    const produto = gerenciadorProdutos.obterProdutoPorId(id);
    
    // Preencher formulário com dados do produto
    document.getElementById('nome').value = produto.nome;
    document.getElementById('descricao').value = produto.descricao || '';
    document.getElementById('preco').value = produto.preco;
    document.getElementById('categoria').value = produto.categoria;
    document.getElementById('estoque').value = produto.estoque;
    document.getElementById('compatibilidade').value = produto.compatibilidade || '';
    
    // Alterar comportamento do botão
    const btnSubmit = document.querySelector('#form-produto button[type="submit"]');
    btnSubmit.textContent = 'Atualizar Produto';
    btnSubmit.onclick = function(e) {
        e.preventDefault();
        atualizarProduto(id);
    };
    
    showMessage(`Editando produto: ${produto.nome}`, 'info');
}

function atualizarProduto(id) {
    const nome = document.getElementById('nome').value;
    const descricao = document.getElementById('descricao').value;
    const preco = parseFloat(document.getElementById('preco').value);
    const categoria = document.getElementById('categoria').value;
    const estoque = parseInt(document.getElementById('estoque').value);
    const compatibilidade = document.getElementById('compatibilidade').value;
    
    const dadosAtualizados = {
        nome,
        descricao,
        preco,
        categoria,
        estoque,
        compatibilidade
    };
    
    if (gerenciadorProdutos.atualizarProduto(id, dadosAtualizados)) {
        showMessage('Produto atualizado com sucesso!');
        carregarProdutos();
        
        // Restaurar comportamento normal do formulário
        const btnSubmit = document.querySelector('#form-produto button[type="submit"]');
        btnSubmit.textContent = 'Cadastrar Produto';
        btnSubmit.onclick = function(e) {
            e.preventDefault();
            cadastrarProduto();
        };
        
        document.getElementById('form-produto').reset();
    } else {
        showMessage('Erro ao atualizar produto!', 'error');
    }
}

function excluirProduto(id) {
    const produto = gerenciadorProdutos.obterProdutoPorId(id);
    
    if (confirm(`Tem certeza que deseja excluir o produto "${produto.nome}"?`)) {
        if (gerenciadorProdutos.removerProduto(id)) {
            showMessage('Produto excluído com sucesso!');
            carregarProdutos();
        } else {
            showMessage('Erro ao excluir produto!', 'error');
        }
    }
}

function formatCategoria(categoria) {
    const categorias = {
        'diagnostico': 'Diagnóstico',
        'performance': 'Performance',
        'entretenimento': 'Entretenimento',
        'seguranca': 'Segurança',
        'manutencao': 'Manutenção'
    };
    
    return categorias[categoria] || categoria;
}