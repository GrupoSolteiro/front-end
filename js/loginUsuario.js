document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("form-login");
    const inputCredencial = document.getElementById("input-credencial");
    const inputSenha = document.getElementById("input-senha");
    const loginStatus = document.querySelector(".login-status");
    const togglePassword = document.querySelector(".toggle-password");

    // Função para exibir mensagens na div login-status
    function exibirMensagem(texto, tipo) {
        loginStatus.textContent = texto;
        loginStatus.style.display = "block";

        // Removendo classes antigas e adicionando a nova conforme o tipo
        loginStatus.classList.remove("sucesso", "erro", "aviso");
        loginStatus.classList.add(tipo);

        // Esconde a mensagem após 3 segundos
        setTimeout(() => {
            loginStatus.style.display = "none";
        }, 5000);
    }

    // Alternar visibilidade da senha
    togglePassword.addEventListener("click", function () {
        if (inputSenha.type === "password") {
            inputSenha.type = "text";
            togglePassword.classList.add("visible");
        } else {
            inputSenha.type = "password";
            togglePassword.classList.remove("visible");
        }
    });

    // Validação do formulário
    form.addEventListener("submit", function (event) {
        event.preventDefault();
        const credencial = inputCredencial.value.trim().toLowerCase();
        const senha = inputSenha.value.trim();

        fetch('http://localhost:3000/usuarios')
            .then(response => response.json())
            .then(usuarios => {
                const usuarioEncontrado = usuarios.find(user =>
                    (user.email.toLowerCase() === credencial || user.nome.toLowerCase() === credencial) &&
                    user.senha === senha
                );

                if (usuarioEncontrado) {
                    exibirMensagem(`Login bem sucedido! Redirecionando...`, 'sucesso');
                    inputCredencial.classList.remove("input-error");
                    inputSenha.classList.remove("input-error");
                    form.reset();
                    localStorage.setItem("usuario", JSON.stringify(usuarioEncontrado));
                    setTimeout(() => {
                        window.location.href = "./dashboard.html";
                    }, 3000);

                    return;
                }
                const usuarioExiste = usuarios.some(user =>
                    user.email.toLowerCase() === credencial || user.nome.toLowerCase() === credencial
                );

                    if(!usuarioExiste) {
                        exibirMensagem("Email ou nome inválido, revise o campo e tente novamente", 'erro');
                        inputCredencial.classList.add("input-error");
                        inputSenha.classList.remove("input-error");
                        return;
                    }
                        exibirMensagem("Senha inválida, revise o campo e tente novamente", 'erro');
                        inputCredencial.classList.remove("input-error");
                        inputSenha.classList.add("input-error");
                        return;
    
            })
            .catch(error => {
                console.error("Erro de conexão:", error);
                exibirMensagem("Erro de conexão, verifique sua internet e tente novamente", 'aviso');
            });
        
    });
});
