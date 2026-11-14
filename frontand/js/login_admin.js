// =========================================
// LOGIN ADMINISTRATIVO
// TRANSPORTE FÁCIL
// =========================================


// =========================================
// ELEMENTOS
// =========================================

const formLogin =
    document.getElementById("formLogin");

const btnVoltar =
    document.getElementById("btnVoltar");


// =========================================
// ENDEREÇO DO BACKEND
// =========================================

const API_URL =
    "https://transporte-facil-api.onrender.com";


// =========================================
// BOTÃO VOLTAR
// =========================================

if (btnVoltar) {

    btnVoltar.addEventListener(
        "click",
        function () {

            window.location.href =
                "tela_inicial.html";

        }
    );

}


// =========================================
// LOGIN ADMINISTRATIVO
// =========================================

if (formLogin) {

    formLogin.addEventListener(
        "submit",
        async function (evento) {

            evento.preventDefault();


            // =================================
            // PEGAR DADOS
            // =================================

            const usuario =
                document.getElementById(
                    "usuario"
                ).value.trim();

            const senha =
                document.getElementById(
                    "senha"
                ).value;


            // =================================
            // ENVIAR DADOS PARA O BACKEND
            // =================================

            try {

                const resposta =
                    await fetch(
                        `${API_URL}/admin/login`,
                        {

                            method: "POST",

                            headers: {
                                "Content-Type": "application/json"
                            },

                            body: JSON.stringify({

                                usuario: usuario,

                                senha: senha

                            })

                        }
                    );


                const dados =
                    await resposta.json();


                // =================================
                // VERIFICAR RESPOSTA
                // =================================

                if (!resposta.ok || !dados.sucesso) {

                    alert(
                        dados.mensagem ||
                        "Usuário ou senha incorretos."
                    );

                    return;

                }


                // =================================
                // CRIAR SESSÃO ADMINISTRATIVA
                // =================================

                sessionStorage.setItem(
                    "adminLogado",
                    "true"
                );


                console.log(
                    "Login administrativo realizado."
                );


                // =================================
                // IR PARA O DASHBOARD
                // =================================

                window.location.href =
                    "dashboard.html";


            }

            catch (erro) {

                console.error(
                    "Erro ao realizar login:",
                    erro
                );

                alert(
                    "Não foi possível conectar ao servidor."
                );

            }

        }
    );

}