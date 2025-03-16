// Elementos do formulário de cadastro
const inputNome = document.querySelector('#input-nome');
const inputEmail = document.querySelector('#input-email');
const inputSenha = document.querySelector('#input-senha');
const inputConfirmSenha = document.querySelector('#input-confirm-senha');
const botaoCadastrar = document.querySelector('#btn-cadastrar');
const togglePassword = document.querySelector(".toggle-password");
const toggleConfirmPassword = document.querySelector(".toggle-confirm-password");

// Elementos de mensagem
const mensagemDiv = document.querySelector('.cadastro-status');

// Formulário de cadastro
document.getElementById('form-cadastro').addEventListener('submit', (event) => {
    event.preventDefault();
    cadastrarUsuario();
});

togglePassword.addEventListener("click", function () {
    if (inputSenha.type === "password") {
        inputSenha.type = "text";
        togglePassword.classList.add("visible");
    } else {
        inputSenha.type = "password";
        togglePassword.classList.remove("visible");
    }
});

toggleConfirmPassword.addEventListener("click", function () {
    if (inputConfirmSenha.type === "password") {
        inputConfirmSenha.type = "text";
        toggleConfirmPassword.classList.add("visible");
    } else {
        inputConfirmSenha.type = "password";
        toggleConfirmPassword.classList.remove("visible");
    }
});

const cadastrarUsuario = () => {
        const email = inputEmail.value;
        const senha = inputSenha.value;
        const nome = inputNome.value;
        const confirmSenha = inputConfirmSenha.value;


        if(nome == "") {
            mostrarMensagem("Nome inválido, revise o campo e tente novamente", "erro");
            return;
        }

        if (!email.includes("@") || !email.includes(".") || email.length < 7) {
            mostrarMensagem("Email inválido, revise o campo e tente novamente", "erro");
            return;
        }

        if (senha.length < 6) {
            mostrarMensagem("A senha deve ter pelo menos 6 caracteres.", "erro");
            return;
        }

        if(confirmSenha != senha) {
            mostrarMensagem("As senhas não coincidem, revise os campos e tente novamente", "erro");
            return;
        }

    const novoUsuario = {
        nome: nome.trim(),
        email: email.trim().toLowerCase(),
        senha: senha
    };

    fetch('http://localhost:3000/usuarios', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(novoUsuario)
    })
    .then(response => {
        if (!response.ok) throw new Error('Erro no cadastro');
        return response.json();
    })
    .then(() => {
        mostrarMensagem('Cadastro realizado com sucesso!', 'sucesso');
        limparFormCadastro();
    })
    .catch(error => {
        console.error(error);
        mostrarMensagem('Erro de conexão, verifique sua internet e tente novamente', 'aviso');
    });
};

// Funções auxiliares
const mostrarMensagem = (texto, tipo) => {
    mensagemDiv.textContent = texto;
    mensagemDiv.style.display = "block";

    // Removendo classes antigas e adicionando a nova conforme o tipo
    mensagemDiv.classList.remove("sucesso", "erro", "aviso");
    mensagemDiv.classList.add(tipo);

    // Esconde a mensagem após 3 segundos
    setTimeout(() => {
        mensagemDiv.style.display = "none";
    }, 5000);
};

const limparFormCadastro = () => {
    inputNome.value = '';
    inputEmail.value = '';
    inputSenha.value = '';
    inputConfirmSenha.value = '';
};