// Inicializar gerenciador de clientes
const gerenciadorClientes = new GerenciadorClientes();

// Carregar clientes ao iniciar a página
document.addEventListener('DOMContentLoaded', function() {
    carregarClientes();
    
    // Configurar evento do formulário
    const formCliente = document.getElementById('form-cliente');
    if (formCliente) {
        formCliente.addEventListener('submit', function(e) {
            e.preventDefault();
            cadastrarCliente();
        });
    }
    
    // Formatar campos
    document.getElementById('cpf').addEventListener('input', formatarCPF);
    document.getElementById('telefone').addEventListener('input', formatarTelefone);
    document.getElementById('placa').addEventListener('input', formatarPlaca);
});

function cadastrarCliente() {
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const cpf = document.getElementById('cpf').value;
    const telefone = document.getElementById('telefone').value;
    const endereco = document.getElementById('endereco').value;
    const veiculo = document.getElementById('veiculo').value;
    const placa = document.getElementById('placa').value;
    
    const novoCliente = new Cliente(null, nome, email, telefone, endereco, cpf);
    novoCliente.veiculo = veiculo;
    novoCliente.placa = placa;
    
    const id = gerenciadorClientes.adicionarCliente(novoCliente);
    
    showMessage(`Cliente "${nome}" cadastrado com sucesso! ID: ${id}`);
    carregarClientes();
    
    // Limpar formulário
    document.getElementById('form-cliente').reset();
}

function carregarClientes() {
    const clientes = gerenciadorClientes.listarClientes();
    const tbody = document.querySelector('#tabela-clientes tbody');
    
    tbody.innerHTML = '';
    
    clientes.forEach(cliente => {
        const tr = document.createElement('tr');
        
        tr.innerHTML = `
            <td>${cliente.id}</td>
            <td>${cliente.nome}</td>
            <td>${cliente.email}</td>
            <td>${cliente.telefone}</td>
            <td>${cliente.veiculo || '-'}</td>
            <td>${cliente.placa || '-'}</td>
            <td>
                <button class="btn" onclick="editarCliente(${cliente.id})">Editar</button>
                <button class="btn btn-secondary" onclick="excluirCliente(${cliente.id})">Excluir</button>
            </td>
        `;
        
        tbody.appendChild(tr);
    });
}

function editarCliente(id) {
    const cliente = gerenciadorClientes.obterClientePorId(id);
    
    // Preencher formulário com dados do cliente
    document.getElementById('nome').value = cliente.nome;
    document.getElementById('email').value = cliente.email;
    document.getElementById('cpf').value = cliente.cpf;
    document.getElementById('telefone').value = cliente.telefone;
    document.getElementById('endereco').value = cliente.endereco;
    document.getElementById('veiculo').value = cliente.veiculo || '';
    document.getElementById('placa').value = cliente.placa || '';
    
    // Alterar comportamento do botão
    const btnSubmit = document.querySelector('#form-cliente button[type="submit"]');
    btnSubmit.textContent = 'Atualizar Cliente';
    btnSubmit.onclick = function(e) {
        e.preventDefault();
        atualizarCliente(id);
    };
    
    showMessage(`Editando cliente: ${cliente.nome}`, 'info');
}

function atualizarCliente(id) {
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const cpf = document.getElementById('cpf').value;
    const telefone = document.getElementById('telefone').value;
    const endereco = document.getElementById('endereco').value;
    const veiculo = document.getElementById('veiculo').value;
    const placa = document.getElementById('placa').value;
    
    const dadosAtualizados = {
        nome,
        email,
        cpf,
        telefone,
        endereco,
        veiculo,
        placa
    };
    
    if (gerenciadorClientes.atualizarCliente(id, dadosAtualizados)) {
        showMessage('Cliente atualizado com sucesso!');
        carregarClientes();
        
        // Restaurar comportamento normal do formulário
        const btnSubmit = document.querySelector('#form-cliente button[type="submit"]');
        btnSubmit.textContent = 'Cadastrar Cliente';
        btnSubmit.onclick = function(e) {
            e.preventDefault();
            cadastrarCliente();
        };
        
        document.getElementById('form-cliente').reset();
    } else {
        showMessage('Erro ao atualizar cliente!', 'error');
    }
}

function excluirCliente(id) {
    const cliente = gerenciadorClientes.obterClientePorId(id);
    
    if (confirm(`Tem certeza que deseja excluir o cliente "${cliente.nome}"?`)) {
        if (gerenciadorClientes.removerCliente(id)) {
            showMessage('Cliente excluído com sucesso!');
            carregarClientes();
        } else {
            showMessage('Erro ao excluir cliente!', 'error');
        }
    }
}

function formatarPlaca(e) {
    let value = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, '');
    if (value.length > 7) value = value.substring(0, 7);
    
    if (value.length > 3) {
        value = value.substring(0, 3) + '-' + value.substring(3);
    }
    
    e.target.value = value;
}