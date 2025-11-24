// Menu responsivo
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('nav ul');
    
    if (mobileMenu) {
        mobileMenu.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }
    
    // Inicializar dados de exemplo se necessário
    if (typeof initializeData === 'function') {
        initializeData();
    }
});

// Função para formatar valores monetários
function formatCurrency(value) {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(value);
}

// Função para exibir mensagens de feedback
function showMessage(message, type = 'success') {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;
    messageDiv.textContent = message;
    
    // Estilo para a mensagem
    messageDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 4px;
        color: white;
        z-index: 1000;
        font-weight: bold;
        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        transition: opacity 0.3s;
    `;
    
    if (type === 'success') {
        messageDiv.style.backgroundColor = '#4caf50';
    } else if (type === 'error') {
        messageDiv.style.backgroundColor = '#f44336';
    } else {
        messageDiv.style.backgroundColor = '#2196f3';
    }
    
    document.body.appendChild(messageDiv);
    
    // Remover após 3 segundos
    setTimeout(() => {
        messageDiv.style.opacity = '0';
        setTimeout(() => {
            if (messageDiv.parentNode) {
                messageDiv.parentNode.removeChild(messageDiv);
            }
        }, 300);
    }, 3000);
}