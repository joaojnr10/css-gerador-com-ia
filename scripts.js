let botao = document.querySelector(".botao-gerar") /* Botao para gerar código*/
let chave = "SUA_CHAVE_AQUI" //chave de acesso do site groq.
let endereco = "https://api.groq.com/openai/v1/chat/completions" // endereço do site da groq.

/*Criei a funcao que será chamada quando clicar no botao*/
// "async" serve para perguntar para o servidor.
async function gerarcodigo() {
    let texto = document.querySelector(".caixa-texto").value
    let blocoCodigo = document.querySelector(".bloco-codigo")
    let resultadoCodigo = document.querySelector(".resultado-codigo")

    //"fetch" serve para se conectar com a Groq.
    // "await" serve para esperar a resposta do servidor.
    let resposta = await fetch(endereco, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + chave
        },
        body: JSON.stringify({
            //abaixo é o modelo da IA, do site da groq.
            model: "llama-3.3-70b-versatile",
            messages: [
                { // "system" quem é a IA
                    role: "system",
                    content: "Você é um gerador de código HTML e CSS. Responda SOMENTE com código puro. NUNCA use crases, markdown ou explicações. Formato: primeiro <style> com CSS, depois o HTML. Siga EXATAMENTE o que o usuário pedir. Se pedir algo quicando, use translateY no @keyframes. Se pedir algo girando, use rotate."
                },

                { // "user" é resposta do texto que o usuário digita.
                    role: "user",
                    content: texto
                }
            ]
        })
    })

    // serve para filtar tudo o que a IA respondeu.
    let dados = await resposta.json()
    let resultado = dados.choices[0].message.content

    // serve para mostar na tela o que a IA respondeu.
    blocoCodigo.textContent = resultado
    resultadoCodigo.srcdoc = resultado

}

// adicionar evento de ouvinte.
botao.addEventListener("click", gerarcodigo) /*avisa quando o botao for clicado*/