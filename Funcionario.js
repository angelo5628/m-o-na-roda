class Funcionario {
    constructor(id, nome, email, cargo, telefone, dataAdmissao) {
        this.id = id;
        this.nome = nome;
        this.email = email;
        this.cargo = cargo;
        this.telefone = telefone;
        this.dataAdmissao = dataAdmissao;
    }
}

class GerenciadorFuncionarios {
    constructor() {
        this.funcionarios = JSON.parse(localStorage.getItem('funcionarios')) || [];
        this.nextId = this.funcionarios.length > 0 ? Math.max(...this.funcionarios.map(f => f.id)) + 1 : 1;
    }
    
    adicionarFuncionario(funcionario) {
        funcionario.id = this.nextId++;
        this.funcionarios.push(funcionario);
        this.salvarNoLocalStorage();
        return funcionario.id;
    }
    
    listarFuncionarios() {
        return this.funcionarios;
    }
    
    obterFuncionarioPorId(id) {
        return this.funcionarios.find(f => f.id === id);
    }
    
    atualizarFuncionario(id, dadosAtualizados) {
        const index = this.funcionarios.findIndex(f => f.id === id);
        if (index !== -1) {
            this.funcionarios[index] = { ...this.funcionarios[index], ...dadosAtualizados };
            this.salvarNoLocalStorage();
            return true;
        }
        return false;
    }
    
    removerFuncionario(id) {
        const index = this.funcionarios.findIndex(f => f.id === id);
        if (index !== -1) {
            this.funcionarios.splice(index, 1);
            this.salvarNoLocalStorage();
            return true;
        }
        return false;
    }
    
    salvarNoLocalStorage() {
        localStorage.setItem('funcionarios', JSON.stringify(this.funcionarios));
    }
}