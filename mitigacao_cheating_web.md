# Mitigação de Trapaças e Engenharia Reversa no DevTools

Para estudantes de Sistemas de Informação (SI), o Console do Navegador (F12) é o primeiro lugar que eles vão olhar. Se o seu jogo armazena as respostas, pistas ou soluções em texto puro no código JavaScript local, eles facilmente burlarão o jogo digitando comandos no console ou inspecionando variáveis.

Como o seu projeto é **estático (sem servidor backend tradicional)**, a segurança absoluta não existe (pois todo o código que roda no cliente pode ser depurado). No entanto, você pode aplicar técnicas avançadas de engenharia de software para **tornar a engenharia reversa extremamente difícil** ou **matematicamente inviável**.

Abaixo estão as 4 estratégias recomendadas, das mais simples às mais avançadas:

---

## 🔒 1. Validação Inversa usando Hashing (SHA-256)
**Recomendado para verificar respostas digitadas/acusações.**

Em vez de salvar no seu código JavaScript:
`const culpado = "mordomo";` (o que seria visível no F12), você salva apenas o **hash SHA-256** da resposta em letras minúsculas:
`const culpadoHash = "7864f1d431dc8e0d49f056d68b8e8f8101a049f7e44c2decd8d1e2e9d249f0ec";`

### Como funciona:
*   SHA-256 é uma função de hash criptográfica de via única. É matematicamente impossível converter o hash de volta para a palavra "mordomo".
*   Quando o jogador digita uma acusação, você gera o hash do texto que ele inseriu e compara com o hash guardado. Se baterem, ele acertou.
*   **Para o aluno de SI:** Ele olhará o código e verá apenas uma string incompreensível de 64 caracteres. A única forma de descobrir a resposta sem jogar seria por ataque de força bruta (inviável se a resposta for uma frase ou palavra não óbvia).

### Exemplo de código seguro em JS:
```javascript
// Função para gerar Hash SHA-256 a partir de um texto
async function gerarHash(texto) {
  const msgBuffer = new TextEncoder().encode(texto.trim().toLowerCase());
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

// Validação no jogo
const HASH_CORRETO = "7864f1d431dc8e0d49f056d68b8e8f8101a049f7e44c2decd8d1e2e9d249f0ec"; // hash de "mordomo"

async function verificarAcusacao(inputUsuario) {
  const hashInput = await gerarHash(inputUsuario);
  if (hashInput === HASH_CORRETO) {
    alert("Correto! Você desvendou o caso.");
    // Desbloqueia próxima fase
  } else {
    alert("Resposta incorreta.");
  }
}
```

---

## 🌪️ 2. Ofuscação de Código (JavaScript Obfuscator)
Se você tem uma lógica interna complexa que diz como o mistério é resolvido, você deve passar o seu arquivo `app.js` final por um **ofuscador de código**.

Ferramentas gratuitas como o [JavaScript Obfuscator](https://javascript-obfuscator.herokuapp.com/) transformam o seu código limpo em um labirinto ilegível de variáveis hexadecimais, mantendo o funcionamento idêntico.

### Recursos ativáveis na ofuscação:
1.  **Anti-Debugging (Auto-Defesa):** O código insere loops de `debugger;` infinitos se detectar que o console F12 está aberto. Isso congela a aba do navegador do usuário que tentar inspecionar o código.
2.  **String Encryption:** Todas as palavras (strings) legíveis do jogo são encriptadas em um array de base e decodificadas em tempo de execução via funções matemáticas complexas.
3.  **Renomeação de Variáveis:** Transforma funções como `verificarCulpado()` em `_0x4f12()`.

> [!WARNING]
> Guarde sempre uma cópia do seu código original (`app.js`) para fazer edições. Só aplique a ofuscação no arquivo que será enviado para a hospedagem final.

---

## 🔑 3. Criptografia de Conteúdo por Chave Dinâmica
Se as pistas de uma fase futura estão guardadas em um arquivo JSON ou texto, você pode criptografar esse arquivo usando **AES-256** (usando a biblioteca CryptoJS).

### Como funciona:
*   A chave de descriptografia para a Fase 2 é a própria resposta correta da Fase 1 (ou o hash dela).
*   O seu código baixa a Fase 2 encriptada do servidor (um amontoado de caracteres ilegíveis).
*   Se o usuário digitar a resposta certa da Fase 1, o JS usa essa palavra como senha para tentar descriptografar o arquivo da Fase 2. Se a senha for certa, a fase carrega. Se for errada, a fase não abre.
*   **Para o aluno de SI:** Mesmo que ele entre na aba "Network" do DevTools e baixe o arquivo da Fase 2 diretamente, ele não conseguirá lê-lo pois o arquivo está fisicamente encriptado no servidor e o código JavaScript dele não possui a chave embutida (a chave vem do input do próprio jogador ao resolver a Fase 1).

---

## ⚡ 4. Serverless Functions (Hospedagem Híbrida Segura)
Se você quer 100% de segurança de que ninguém verá a validação, a resposta deve ser processada fora do navegador do usuário.

Plataformas de hospedagem gratuita como a **Vercel** e a **Netlify** permitem que você crie **Serverless Functions** (funções executadas no servidor).

### Como funciona:
1.  Você cria uma função backend simples em Node.js (ex: `api/verificar.js`).
2.  Essa pasta `api` fica oculta no servidor. O navegador não tem acesso a ela.
3.  Quando o jogador tenta fazer uma acusação, o seu HTML envia a resposta via `fetch('/api/verificar', { method: 'POST', body: ... })`.
4.  O servidor verifica a resposta e apenas retorna `true` ou `false`.
5.  **Para o aluno de SI:** Sem chances de burlar. Ele pode abrir o DevTools e colocar breakpoints onde quiser, mas ele nunca terá acesso ao arquivo que contém as respostas corretas, pois elas nunca saem do servidor.

---

## 🛠️ O que fazer no seu caso? (Recomendação Prática)

Como se trata de um trabalho acadêmico de Sistemas de Informação, a combinação de **Validação com Hash SHA-256 (Opção 1)** + **Ofuscação de Código (Opção 2)** é a mais divertida e educativa. Ela protege o seu jogo contra trapaças diretas de forma muito elegante e mostra conhecimentos avançados de criptografia básica direto no Front-end estático!
