
// =========================================
// LOGIN - TRANSPORTE FÁCIL
// =========================================


// =========================================
// ELEMENTOS
// =========================================

const formLogin =
    document.getElementById("formLogin");


const btnUsuario =
    document.getElementById("btnUsuario");


const btnAdministrador =
    document.getElementById("btnAdministrador");


const btnAcessoResponsavel =
    document.getElementById(
        "btnAcessoResponsavel"
    );


const email =
    document.getElementById("email");


const senha =
    document.getElementById("senha");


const btnMostrarSenha =
    document.getElementById(
        "btnMostrarSenha"
    );


const mensagemErro =
    document.getElementById(
        "mensagemErro"
    );


const btnVoltar =
    document.getElementById("btnVoltar");


// =========================================
// TIPO DE USUÁRIO
// =========================================

let tipoUsuario =
    "usuario";


// =========================================
// LIMPAR MENSAGEM
// =========================================

function limparMensagem() {

    if (!mensagemErro) {

        return;

    }


    mensagemErro.textContent =
        "";

}


// =========================================
// SELECIONAR USUÁRIO
// =========================================

if (btnUsuario) {

    btnUsuario.addEventListener(
        "click",
        function () {

            tipoUsuario =
                "usuario";


            btnUsuario.classList.add(
                "ativo"
            );


            if (btnAdministrador) {

                btnAdministrador.classList.remove(
                    "ativo"
                );

            }


            limparMensagem();

        }
    );

}


// =========================================
// SELECIONAR ADMINISTRADOR
// =========================================

if (btnAdministrador) {

    btnAdministrador.addEventListener(
        "click",
        function () {

            tipoUsuario =
                "administrador";


            btnAdministrador.classList.add(
                "ativo"
            );


            if (btnUsuario) {

                btnUsuario.classList.remove(
                    "ativo"
                );

            }


            limparMensagem();

        }
    );

}


// =========================================
// ACESSO DO RESPONSÁVEL
// =========================================

if (btnAcessoResponsavel) {

    btnAcessoResponsavel.addEventListener(
        "click",
        function () {

            window.location.href =
                "acesso_responsavel.html";

        }
    );

}


// =========================================
// MOSTRAR / ESCONDER SENHA
// =========================================

if (btnMostrarSenha) {

    btnMostrarSenha.addEventListener(
        "click",
        function () {

            if (
                senha.type ===
                "password"
            ) {

                senha.type =
                    "text";


                btnMostrarSenha.textContent =
                    "🙈";

            }

            else {

                senha.type =
                    "password";


                btnMostrarSenha.textContent =
                    "👁";

            }

        }
    );

}


// =========================================
// LOGIN
// =========================================

if (formLogin) {

    formLogin.addEventListener(
        "submit",
        async function (evento) {

            evento.preventDefault();


            // =================================
            // PEGAR DADOS
            // =================================

            const emailDigitado =
                email.value
                    .trim()
                    .toLowerCase();


            const senhaDigitada =
                senha.value
                    .trim();


            limparMensagem();


            // =================================
            // LOGIN DO USUÁRIO
            // =================================

            if (
                tipoUsuario ===
                "usuario"
            ) {

                if (
                    emailDigitado ===
                        "usuario@teste.com"
                    &&
                    senhaDigitada ===
                        "123456"
                ) {

                    window.location.href =
                        "tela_principal.html";

                }

                else {

                    if (mensagemErro) {

                        mensagemErro.textContent =
                            "E-mail ou senha incorretos.";

                    }

                }


                return;

            }


            // =================================
            // LOGIN DO ADMINISTRADOR
            // =================================

            if (
                tipoUsuario ===
                "administrador"
            ) {

                try {

                    const resposta =
                        await fetch(
                            "https://transporte-facil-api.onrender.com/admin/login",
                            {

                                method: "POST",

                                headers: {
                                    "Content-Type": "application/json"
                                },

                                body: JSON.stringify({

                                    usuario: emailDigitado,

                                    senha: senhaDigitada

                                })

                            }
                        );


                    const dados =
                        await resposta.json();


                    if (
                        !resposta.ok ||
                        !dados.sucesso
                    ) {

                        if (mensagemErro) {

                            mensagemErro.textContent =
                                dados.mensagem ||
                                "E-mail ou senha de administrador incorretos.";

                        }

                        return;

                    }


                    // =================================
                    // CRIAR SESSÃO ADMINISTRATIVA
                    // =================================

                    sessionStorage.setItem(
                        "adminLogado",
                        "true"
                    );


                    // =================================
                    // IR PARA O DASHBOARD
                    // =================================

                    window.location.href =
                        "dashboard.html";


                }

                catch (erro) {

                    console.error(
                        "Erro no login administrativo:",
                        erro
                    );


                    if (mensagemErro) {

                        mensagemErro.textContent =
                            "Não foi possível conectar ao servidor.";

                    }

                }


                return;

            }

        }
    );

}


// =========================================
// BOTÃO VOLTAR
// =========================================

if (btnVoltar) {

    btnVoltar.addEventListener(
        "click",
        function () {

            window.location.href =
                "tela_principal.html";

        }
    );

}
