(function() {

// ==========================================================================
// SEGURANÇA E CRIPTOGRAFIA (Wrappers LocalStorage e Hash)
// ==========================================================================
const DB_KEY = "detectivesecretkey123!";

function encryptData(dataStr) {
    let result = "";
    for (let i = 0; i < dataStr.length; i++) {
        result += String.fromCharCode(dataStr.charCodeAt(i) ^ DB_KEY.charCodeAt(i % DB_KEY.length));
    }
    return btoa(unescape(encodeURIComponent(result)));
}

function decryptData(cipherText) {
    if (!cipherText) return null;
    try {
        let decoded = decodeURIComponent(escape(atob(cipherText)));
        let result = "";
        for (let i = 0; i < decoded.length; i++) {
            result += String.fromCharCode(decoded.charCodeAt(i) ^ DB_KEY.charCodeAt(i % DB_KEY.length));
        }
        return result;
    } catch (e) {
        return null;
    }
}

function setSecureItem(key, value) {
    const serialized = typeof value === 'object' ? JSON.stringify(value) : String(value);
    localStorage.setItem(key, encryptData(serialized));
}

function getSecureItem(key, isJson = false) {
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    const decrypted = decryptData(raw);
    if (!decrypted) return null;
    return isJson ? JSON.parse(decrypted) : decrypted;
}

async function gerarHash(texto) {
    const msgBuffer = new TextEncoder().encode(texto.trim().toLowerCase());
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

/* ==========================================================================
   LOGIC DETECTIVE - MOTOR DO JOGO E BANCO DE DESAFIOS (Murdle de Lógica)
   ========================================================================== */

// 1. BANCO DE DADOS DE DESAFIOS (12 Desafios: 4 Fáceis, 4 Médios, 4 Difíceis)
const challenges = [
    {
        id: 1,
        difficulty: "easy",
        title: "Caso 1: Mistério no Bar",
        suspects: ["Jack Spade", "Don Falcone", "Lola Mercer"],
        locations: ["O Escritório dos Fundos", "O Beco das Sombras", "O Balcão do Bar"],
        weapons: [],
        solutionHashSuspect: "b569189d4cf9e3f7d2761c353568e34153f4171916b72d22ec27b9c209076797",
        solutionHashComplete: "60ce9a6439c82a07aacdb7de0362e72a41151d82aa357b4f86ac39e86607a9ab",
        victim: {
            name: "Thomas \"Silencioso\" Vance",
            sex: "M",
            age: "52",
            height: "1,70 m",
            eyes: "Castanhos",
            scar: "Pequena marca de queimadura no ombro esquerdo",
            description: "Thomas \"Silencioso\" Vance era um homem de 52 anos e 1,70 m de altura, conhecido por sua discrição absoluta e olhos castanhos profundos. Sua única marca física particular era uma pequena queimadura antiga no ombro esquerdo, um segredo que ele escondeu até o dia em que silenciaram sua voz para sempre."
        },
        suspectsData: {
            "Jack Spade": { sex: "M", age: "34", height: "1,82 m", eyes: "Azuis", scar: "Cicatriz linear no supercílio direito", description: "Jack Spade é o segurança do bar, um homem de 34 anos com 1,82 m de altura e olhos azuis gélidos e atentos. Spade exibe no rosto o preço de seu trabalho perigoso: uma cicatriz linear nítida sobre o supercílio direito, ganha ao apartar uma briga violenta de clientes no estabelecimento." },
            "Don Falcone": { sex: "M", age: "58", height: "1,78 m", eyes: "Pretos", scar: "Nenhuma", description: "Don Falcone, com seus 58 anos e 1,78 m de altura, comanda o crime local com punho de ferro. Seus olhos pretos penetrantes e calculistas não revelam qualquer emoção sob a aba de seu chapéu elegante." },
            "Lola Mercer": { sex: "F", age: "26", height: "1,68 m", eyes: "Verdes", scar: "Cicatriz fina no punho esquerdo", description: "Lola Mercer é uma misteriosa cantora de jazz de 26 anos com 1,68 m de altura. Seus olhos verdes hipnotizantes atraem olhares todas as noites no palco do bar, mas uma observação atenta revela uma cicatriz fina e desbotada no punho esquerdo, que ela costuma cobrir com elegantes pulseiras de prata." }
        },
        locationsData: {
            "O Escritório dos Fundos": { description: "Mesa de mogno empoeirada, forte cheiro de charuto barato" },
            "O Beco das Sombras": { description: "Chão de paralelepípedos úmido, latas de lixo de metal amassadas" },
            "O Balcão do Bar": { description: "Superfície de madeira envernizada e gasta, banquetas de couro rasgadas" }
        },
        weaponsData: {
        },
        symbols: {
            "S": "Jack Spade",
            "F": "Don Falcone",
            "L": "Lola Mercer",
            "E": "O Escritório dos Fundos",
            "B": "O Beco das Sombras",
            "C": "O Balcão do Bar"
        },
        clues: {
            portuguese: [
                "O informante da esquina garante que viu Don Falcone no Beco das Sombras no horário estimado do crime.",
                "Se Lola Mercer estava no Escritório dos Fundos, então Don Falcone não estava no Beco das Sombras.",
                "Jack Spade estava no Balcão do Bar ou no Escritório dos Fundos.",
                "O culpado estava no Escritório dos Fundos."
            ],
            logic: [
                "B(F)",
                "E(L) → ¬ B(F)",
                "C(S) ∨ E(S)",
                "Culpado ∈ E"
            ]
        },
        explanation: "Pela Pista 1, sabemos que Don Falcone estava no Beco das Sombras: B(F). Pela Pista 2, temos E(L) → ¬ B(F). Como sabemos que B(F) é VERDADE, o consequente ¬ B(F) é FALSO. Aplicando a regra de contraposição (Modus Tollens): B(F) ∧ (E(L) → ¬ B(F)) ⊢ ¬ E(L). Portanto, Lola Mercer não estava no Escritório dos Fundos. Como Don Falcone já ocupava o Beco das Sombras (B(F)), Lola Mercer não podia estar no Beco (¬ B(L)). Por exclusão dos três locais possíveis (Escritório, Beco e Balcão), Lola Mercer só poderia estar no Balcão do Bar: C(L). Como Lola Mercer estava no Balcão do Bar (C(L)), Jack Spade não podia estar no Balcão do Bar: ¬ C(S). Pela Pista 3, temos a disjunção C(S) ∨ E(S). Aplicando o Silogismo Disjuntivo com ¬ C(S) nos dá E(S). Logo, Jack Spade estava no Escritório dos Fundos. A Pista 4 afirma que o culpado estava no Escritório dos Fundos (Culpado ∈ E). Como demonstramos que Jack Spade estava no Escritório dos Fundos (E(S)), ele é o assassino!"
    },
    {
        id: 2,
        difficulty: "easy",
        title: "Caso 2: Traição no Cais",
        suspects: ["Vito \"O Navalha\" Genovese", "Evelyn Vance", "Inspetor Miller"],
        locations: ["O Píer de Carga", "O Galpão Abandonado", "As Docas de Névoa"],
        weapons: [],
        solutionHashSuspect: "633d24d16044be915e6a22d2f6e56dea196b71998b67371d354db56d807bcf8d",
        solutionHashComplete: "0ba2deffccdf88560a76e2b707cb6da5b6fe25f0ad26f536d1ea9fe5190e2a72",
        victim: {
            name: "Arthur Pendelton",
            sex: "M",
            age: "45",
            height: "1,76 m",
            eyes: "Cinzentos",
            scar: "Nenhuma",
            description: "Arthur Pendelton, com seus 45 anos e 1,76 m de altura, era um dos poucos oficiais íntegros das docas. Seus olhos cinzentos e cansados testemunharam anos de contrabando, mas ele sempre buscou levar uma vida pacífica, interrompida ao recusar a propina errada."
        },
        suspectsData: {
            "Vito \"O Navalha\" Genovese": { sex: "M", age: "38", height: "1,80 m", eyes: "Pretos", scar: "Cicatriz profunda na bochecha esquerda", description: "Vito Genovese é um capanga impiedoso de 38 anos com 1,80 m de altura e olhos pretos vazios de remorso. Ele é conhecido como \"O Navalha\" não apenas pela arma que usa, mas pela marca que carrega: uma cicatriz profunda e feia na bochecha esquerda, lembrança de um acerto de contas passado." },
            "Evelyn Vance": { sex: "F", age: "29", height: "1,72 m", eyes: "Azuis", scar: "Nenhuma", description: "Evelyn Vance é uma bela mulher de 29 anos e 1,72 m de altura. Atrás de seus olhos azuis sedutores esconde-se uma mente fria, capaz de manipular os homens mais perigosos do distrito portuário com apenas algumas palavras." },
            "Inspetor Miller": { sex: "M", age: "48", height: "1,75 m", eyes: "Castanhos", scar: "Cicatriz cirúrgica no pescoço", description: "O Inspetor Miller é um investigador cansado de 48 anos com 1,75 m de altura e olhos castanhos cínicos. Ele carrega uma longa cicatriz cirúrgica no pescoço decorrente de um atentado que quase o matou, o que parece ter extinguido qualquer rastro de moralidade em sua carreira." }
        },
        locationsData: {
            "O Píer de Carga": { description: "Guindastes de metal enferrujados, caixotes de madeira empilhados" },
            "O Galpão Abandonado": { description: "Janelas de vidro trincadas, poeira espessa cobrindo o chão" },
            "As Docas de Névoa": { description: "Névoa densa e fria, cheiro forte de maresia e óleo diesel" }
        },
        weaponsData: {
        },
        symbols: {
            "V": "Vito \"O Navalha\" Genovese",
            "E": "Evelyn Vance",
            "M": "Inspetor Miller",
            "P": "O Píer de Carga",
            "G": "O Galpão Abandonado",
            "D": "As Docas de Névoa"
        },
        clues: {
            portuguese: [
                "O Inspetor Miller estava no Píer de Carga.",
                "Se Vito \"O Navalha\" Genovese estava no Galpão Abandonado, então o Inspetor Miller não estava no Píer de Carga.",
                "Evelyn Vance estava nas Docas de Névoa ou no Galpão Abandonado.",
                "O culpado estava nas Docas de Névoa."
            ],
            logic: [
                "P(M)",
                "G(V) → ¬ P(M)",
                "D(E) ∨ G(E)",
                "Culpado ∈ D"
            ]
        },
        explanation: "Pela Pista 1, sabemos que o Inspetor Miller estava no Píer de Carga: P(M). Pela Pista 2, temos G(V) → ¬ P(M). Como P(M) é VERDADE, o consequente ¬ P(M) é FALSO. Aplicando a regra do Modus Tollens: P(M) ∧ (G(V) → ¬ P(M)) ⊢ ¬ G(V). Portanto, Vito Genovese não estava no Galpão Abandonado. Como o Inspetor Miller já ocupava o Píer de Carga (P(M)), Vito Genovese também não podia estar no Píer (¬ P(V)). Por exclusão dos três locais possíveis, Vito Genovese só poderia estar nas Docas de Névoa: D(V). Como Vito Genovese estava nas Docas de Névoa (D(V)), Evelyn Vance não podia estar nas Docas: ¬ D(E). Pela Pista 3, temos a disjunção D(E) ∨ G(E). Aplicando o Silogismo Disjuntivo com ¬ D(E) nos dá G(E). Logo, Evelyn Vance estava no Galpão Abandonado. A Pista 4 diz que o culpado estava nas Docas de Névoa (Culpado ∈ D). Como demonstramos que Vito Genovese estava nas Docas de Névoa (D(V)), ele é o culpado!"
    },
    {
        id: 3,
        difficulty: "easy",
        title: "Caso 3: O Silêncio na Mansão",
        suspects: ["Mordomo Sterling", "Dr. Julian Ross", "Glória DuPont"],
        locations: ["A Estufa de Flores", "O Hall de Mármore", "A Biblioteca Privada"],
        weapons: [],
        solutionHashSuspect: "6d5fa08f4d509d8348fbd3d143242399a4f56796429ff145db80d597338ef0d1",
        solutionHashComplete: "4096b4c8c7e469373eca6e9dc4e4801365b2995369a4ef486b31b896c83164a0",
        victim: {
            name: "Charles DuPont",
            sex: "M",
            age: "71",
            height: "1,65 m",
            eyes: "Cinzentos",
            scar: "Nenhuma",
            description: "Charles DuPont era um industrial arrogant de 71 anos e 1,65 m de altura. Seus olhos cinzentos eram tão frios quanto sua fortuna, e sua presença frágil revelava um homem que sempre viveu protegido por guarda-costas, mas que acabou sucumbindo a um inimigo interno."
        },
        suspectsData: {
            "Mordomo Sterling": { sex: "M", age: "54", height: "1,85 m", eyes: "Castanhos", scar: "Nenhuma", description: "O Mordomo Sterling é um homem reservado de 54 anos com imponentes 1,85 m de altura e olhos castanhos inexpressivos. Impecavelmente alinhado, ele dedicou a vida a ocultar os segredos sombrios e podres da família DuPont." },
            "Dr. Julian Ross": { sex: "M", age: "46", height: "1,78 m", eyes: "Castanhos", scar: "Pequena cicatriz no queixo", description: "O Dr. Julian Ross é o médico da família de 46 anos e 1,78 m de altura, dono de uma postura calma e olhos castanhos reconfortantes. O único detalhe áspero em sua aparência polida é uma pequena cicatriz horizontal no queixo, resultante de um acidente em seus dias de universidade." },
            "Glória DuPont": { sex: "F", age: "24", height: "1,63 m", eyes: "Verdes", scar: "Pequena marca circular na testa", description: "Glória DuPont é uma jovem impulsiva de 24 anos com 1,63 m de altura e brilhantes olhos verdes. Rebelde e frequentadora de antros de apostas, ela ostenta uma pequena marca circular na testa de um antigo adorno que removeu, símbolo de sua tentativa de chocar a alta sociedade." }
        },
        locationsData: {
            "A Estufa de Flores": { description: "Painéis de vidro embaçados pela umidade, cheiro adocicado de orquídeas exóticas" },
            "O Hall de Mármore": { description: "Piso de mármore branco polido e frio, lustre de cristal antigo e opaco" },
            "A Biblioteca Privada": { description: "Estantes de carvalho altas, poltronas de veludo verde desgastadas" }
        },
        weaponsData: {
        },
        symbols: {
            "S": "Mordomo Sterling",
            "R": "Dr. Julian Ross",
            "G": "Glória DuPont",
            "E": "A Estufa de Flores",
            "H": "O Hall de Mármore",
            "B": "A Biblioteca Privada"
        },
        clues: {
            portuguese: [
                "O Mordomo Sterling estava na Biblioteca Privada.",
                "Se Glória DuPont estava na Estufa de Flores, então o Mordomo Sterling não estava na Biblioteca Privada.",
                "O Dr. Julian Ross estava no Hall de Mármore ou na Estufa de Flores.",
                "O culpado estava no Hall de Mármore."
            ],
            logic: [
                "B(S)",
                "E(G) → ¬ B(S)",
                "H(R) ∨ E(R)",
                "Culpado ∈ H"
            ]
        },
        explanation: "Pela Pista 1, sabemos que o Mordomo Sterling estava na Biblioteca Privada: B(S). Pela Pista 2, temos E(G) → ¬ B(S). Como B(S) é VERDADE, o consequente ¬ B(S) é FALSO. Aplicando a regra de contraposição (Modus Tollens): B(S) ∧ (E(G) → ¬ B(S)) ⊢ ¬ E(G). Portanto, Glória DuPont não estava na Estufa de Flores. Como o Mordomo Sterling já ocupava a Biblioteca Privada (B(S)), Glória DuPont também não podia estar na Biblioteca (¬ B(G)). Por exclusão dos três locais possíveis, Glória DuPont só poderia estar no Hall de Mármore: H(G). Como Glória DuPont estava no Hall de Mármore (H(G)), o Dr. Julian Ross não podia estar no Hall de Mármore: ¬ H(R). Pela Pista 3, temos a disjunção H(R) ∨ E(R). Aplicando o Silogismo Disjuntivo com ¬ H(R) nos dá E(R). Logo, o Dr. Julian Ross estava na Estufa de Flores. A Pista 4 diz que o culpado estava no Hall de Mármore (Culpado ∈ H). Como deduzimos que Glória DuPont estava no Hall de Mármore (H(G)), ela é a assassina!"
    },
    {
        id: 4,
        difficulty: "easy",
        title: "Caso 4: O Expresso da Meia-Noite",
        suspects: ["Condutor Harris", "Rocky \"Iron Fist\" Malone", "Senador Sterling"],
        locations: ["A Cabine Presidencial", "O Vagão Restaurante", "O Corredor de Serviço"],
        weapons: [],
        solutionHashSuspect: "d56e39047a6d2ed4df1e37e3229986f80b9952f75a30536ae2021380957d5794",
        solutionHashComplete: "e86f2fbe09f10a8d3398f02fa4e86101a9c6c7cccf6fac661a0e48a86ee8a25f",
        victim: {
            name: "Jornalista Arthur Coburn",
            sex: "M",
            age: "31",
            height: "1,74 m",
            eyes: "Castanhos",
            scar: "Nenhuma",
            description: "Arthur Coburn era um jovem repórter obstinado de 31 anos e 1,74 m de altura. Dono de olhos castanhos expressivos e idealistas, sua audácia em expor a podridão da bancada política acabou custando sua vida no trem."
        },
        suspectsData: {
            "Condutor Harris": { sex: "M", age: "62", height: "1,73 m", eyes: "Azuis", scar: "Cicatriz de corte no dorso da mão esquerda", description: "O Condutor Harris é um funcionário ferroviário cansado de 62 anos com 1,73 m de altura e olhos azuis melancólicos. Ele exibe uma cicatriz de corte antiga no dorso da mão esquerda, marca de uma vida inteira de trabalho pesado nos trilhos." },
            "Rocky \"Iron Fist\" Malone": { sex: "M", age: "35", height: "1,88 m", eyes: "Pretos", scar: "Sobrancelha esquerda partida", description: "Rocky Malone é um ex-pugilista intimidador de 35 anos com 1,88 m de altura e olhos pretos como carvão. Seu rosto carrega a assinatura violenta dos ringues de apostas clandestinas: uma sobrancelha esquerda cortada e partida que nunca cicatrizou direito." },
            "Senador Sterling": { sex: "M", age: "50", height: "1,80 m", eyes: "Cinzentos", scar: "Nenhuma", description: "O Senador Sterling é um político influente de 50 anos com 1,80 m de altura e frios olhos cinzentos. Ele se apresenta com uma elegância impecável, escondendo uma ambição implacável sob ternos caros sob medida." }
        },
        locationsData: {
            "A Cabine Presidencial": { description: "Paredes com painéis de madeira polida, cortinas de seda vermelha pesadas" },
            "O Vagão Restaurante": { description: "Mesas com toalhas brancas manchadas, luzes de teto amareladas e trêmulas" },
            "O Corredor de Serviço": { description: "Passagem estreita de metal, barulho alto e constante dos trilhos" }
        },
        weaponsData: {
        },
        symbols: {
            "H": "Condutor Harris",
            "R": "Rocky \"Iron Fist\" Malone",
            "S": "Senador Sterling",
            "C": "A Cabine Presidencial",
            "V": "O Vagão Restaurante",
            "O": "O Corredor de Serviço"
        },
        clues: {
            portuguese: [
                "O Senador Sterling estava no Corredor de Serviço.",
                "Se o Condutor Harris estava no Vagão Restaurante, então o Senador Sterling não estava no Corredor de Serviço.",
                "Rocky \"Iron Fist\" Malone estava na Cabine Presidencial ou no Vagão Restaurante.",
                "O culpado estava no Vagão Restaurante."
            ],
            logic: [
                "O(S)",
                "V(H) → ¬ O(S)",
                "C(R) ∨ V(R)",
                "Culpado ∈ V"
            ]
        },
        explanation: "Pela Pista 1, sabemos que o Senador Sterling estava no Corredor de Serviço: O(S). Pela Pista 2, temos V(H) → ¬ O(S). Como O(S) é VERDADE, o consequente ¬ O(S) é FALSO. Aplicando a regra de contraposição (Modus Tollens): O(S) ∧ (V(H) → ¬ O(S)) ⊢ ¬ V(H). Portanto, o Condutor Harris não estava no Vagão Restaurante. Como o Senador Sterling já ocupava o Corredor de Serviço (O(S)), o Condutor Harris também não podia estar no Corredor (¬ O(H)). Por exclusão dos três locais possíveis, o Condutor Harris só poderia estar na Cabine Presidencial: C(H). Como o Condutor Harris estava na Cabine Presidencial (C(H)), Rocky Malone não podia estar na Cabine Presidencial: ¬ C(R). Pela Pista 3, Rocky Malone estava na Cabine Presidencial ou no Vagão Restaurante: C(R) ∨ V(R). Utilizando o Silogismo Disjuntivo, concluímos que ele estava no Vagão Restaurante: V(R). Pela Pista 4, o culpado estava no Vagão Restaurante. Logo, Rocky \"Iron Fist\" Malone é o assassino!"
    },
    {
        id: 5,
        difficulty: "medium",
        title: "Caso 5: O Fim do Informante",
        suspects: ["Arthur \"Flash\" Coburn", "Mickey Burns", "Advogado Vance"],
        locations: ["O Beco do Lixo", "O Quarto de Pensão 304", "O Velvet Club"],
        weapons: ["Soco-Inglês de Latão", "Revólver Calibre .38", "Fio de Aço de Garrote"],
        solutionHashSuspect: "290956e3f5162b31517c863a9ea1707b1bdc6db3b430d40aa4e6f3aad9ac8c46",
        solutionHashComplete: "63b6fe39536084ac4b36a5c59689c90c30b56729b70eb4a13e2825174be47b1d",
        victim: {
            name: "Jimmy \"Duas-Caras\" Carter",
            sex: "M",
            age: "33",
            height: "1,77 m",
            eyes: "Verdes",
            scar: "Cicatriz vertical atravessando o lábio superior",
            description: "Jimmy Carter tinha 33 anos e 1,77 m de altura, com marcantes olhos verdes. O corpo exibe uma severa contusão na têmpora esquerda, compatível com um golpe violento desferido por um objeto metálico pesado e rombo."
        },
        suspectsData: {
            "Arthur \"Flash\" Coburn": { sex: "M", age: "28", height: "1,75 m", eyes: "Castanhos", scar: "Nenhuma", description: "Arthur \"Flash\" Coburn is um fotógrafo de 28 anos e 1,75 m de altura. Com seus olhos castanhos astutos e uma câmera sempre em mãos, ele costuma registrar de longe as cenas mais trágicas e violentas do distrito." },
            "Mickey Burns": { sex: "M", age: "40", height: "1,82 m", eyes: "Cinzentos", scar: "Pequena cicatriz na orelha direita", description: "Mickey Burns é um barman musculoso de 40 anos com 1,82 m de altura e olhos cinzentos de expressão fechada. Ele ostenta uma pequena cicatriz na orelha direita de uma briga de bar no passado, um lembrete físico de que ele sabe lidar com encrenqueiros." },
            "Advogado Vance": { sex: "M", age: "47", height: "1,79 m", eyes: "Azuis", scar: "Nenhuma", description: "O Advogado Vance é um refinado defensor público de 47 anos com 1,79 m de altura e calculistas olhos azuis. Sempre polido, ele conhece as leis do distrito como ninguém e vive no limiar entre a corte e o crime." }
        },
        locationsData: {
            "O Beco do Lixo": { description: "Poças de água suja refletindo a luz neon, canos de escoamento enferrujados" },
            "O Quarto de Pensão 304": { description: "Papel de parede desbotado e descascando, cama de solteiro com colchão rangente" },
            "O Velvet Club": { description: "Iluminação suave em tons de vermelho, cortinas de veludo escuro nas janelas" }
        },
        weaponsData: {
            "Soco-Inglês de Latão": { description: "Metal pesado com marcas profundas de uso. Curiosamente, a peça está limpa de resíduos biológicos, mas apresenta traços de fuligem de pólvora em seu estojo." },
            "Revólver Calibre .38": { description: "Cano encurtado com numeração raspada no tambor. A empunhadura de madeira apresenta uma leve rachadura recente e há resquícios de fiapos de cabelo na soleira de metal do cabo." },
            "Fio de Aço de Garrote": { description: "Cabo de madeira improvisado nas pontas, com marcas de óleo de motor" }
        },
        symbols: {
            "C": "Arthur \"Flash\" Coburn",
            "M": "Mickey Burns",
            "V": "Advogado Vance",
            "B": "O Beco do Lixo",
            "Q": "O Quarto de Pensão 304",
            "L": "O Velvet Club",
            "S": "Soco-Inglês de Latão",
            "R": "Revólver Calibre .38",
            "F": "Fio de Aço de Garrote"
        },
        clues: {
            portuguese: [
                "A perícia descobriu que o fotógrafo de 28 anos com olhos castanhos estava portando o Soco-Inglês de Latão.",
                "Um suspeito estava no Velvet Club se e somente se estava portando um Revólver Calibre .38.",
                "O dossiê aponta: se o defensor de 47 anos com olhos azuis carregava o Fio de Aço de Garrote, então ele estava no Quarto de Pensão 304.",
                "O recepcionista anotou que o homem de 1,79 m de altura subiu para o Quarto de Pensão 304 ou foi visto saindo em direção ao Beco do Lixo.",
                "A revista na pasta do homem de 1,79 m de altura confirmou que ele não portava o Revólver Calibre .38."
            ],
            logic: [
                "S(C)",
                "L ↔ R",
                "F(V) → Q(V)",
                "Q(V) ∨ B(V)",
                "¬ R(V)"
            ]
        },
        explanation: "Pela Pista 1, sabemos que Arthur Coburn estava com o Soco-Inglês de Latão: S(C). Pela Pista 5, temos ¬ R(V) (o Advogado Vance não estava com o Revólver Calibre .38). Como o Soco-Inglês está com Arthur Coburn (S(C)) e o Revólver não está com Vance, a única arma restante para o Advogado Vance é o Fio de Aço de Garrote: F(V). Consequentemente, por exclusão das armas, o Revólver Calibre .38 só pode estar com Mickey Burns: R(M). Pela Pista 3, temos F(V) → Q(V). Como provamos F(V) na etapa anterior, aplicamos o Modus Ponens: F(V) ∧ (F(V) → Q(V)) ⊢ Q(V). Logo, o Advogado Vance estava no Quarto de Pensão 304. Como Vance está no Quarto de Pensão 304 (Q(V)), os outros locais (Beco do Lixo e Velvet Club) devem pertencer a Coburn e Burns. Pela Pista 2: L ↔ R (Estar no Velvet Club equivale a portar o Revólver). Como provamos que Mickey Burns tem o Revólver (R(M)), concluímos que ele estava no Velvet Club: L(M). Por exclusão de locais, Arthur Coburn estava no Beco do Lixo: B(C). Sendo o assassino daquele local (Velvet Club), Mickey Burns é o culpado com o Revólver Calibre .38!"
    },
    {
        id: 6,
        difficulty: "medium",
        title: "Caso 6: Dívida de Jogo",
        suspects: ["Frankie \"Cicatriz\"", "Detetive Miller", "Madame Rouge"],
        locations: ["O Cofre do Cassino", "A Sala de Pôquer VIP", "O Estacionamento Subterrâneo"],
        weapons: ["Barra de Ferro", "Navalha de Barbeiro", "Veneno de Cianeto"],
        solutionHashSuspect: "75dc221ea34049e62caee2fa887bf549e2ab450cbf9cf8881f559524e98044ac",
        solutionHashComplete: "ffa733baf29b5e47c1336b3fb25bf12217adca1dd802e2167bdcff030a1f8e14",
        victim: {
            name: "Albert Higgins",
            sex: "M",
            age: "36",
            height: "1,71 m",
            eyes: "Pretos",
            scar: "Nenhuma",
            description: "Albert Higgins era um crupiê meticuloso de 36 anos e 1,71 m de altura, com olhos pretos ágeis. O corpo foi encontrado deitado de costas, exibindo uma incisão cirúrgica limpa e profunda na carótida externa direita."
        },
        suspectsData: {
            "Frankie \"Cicatriz\"": { sex: "M", age: "32", height: "1,84 m", eyes: "Castanhos", scar: "Cicatriz linear na bochecha direita", description: "Frankie é um cobrador de dívidas de 32 anos e 1,84 m de altura, com frios olhos castanhos. Sua característica mais marcante e assustadora é uma longa cicatriz linear na bochecha direita, que vai da têmpora ao maxilar, herança de sua vida no crime." },
            "Detetive Miller": { sex: "M", age: "44", height: "1,76 m", eyes: "Azuis", scar: "Pequena cicatriz na palma da mão direita", description: "O Detetive Miller é um investigator corrupto de 44 anos com 1,76 m de altura e cansados olhos azuis. Uma pequena cicatriz na palma da mão direita é a única marca visível no policial, resultado de uma luta com faca em um beco escuro há anos." },
            "Madame Rouge": { sex: "F", age: "37", height: "1,70 m", eyes: "Verdes", scar: "Nenhuma", description: "Madame Rouge é a dona elegante do cassino, com 37 anos e 1,70 m de altura. Seus olhos verdes são enigmáticos e atraentes, escondendo uma implacabilidade fria quando o assunto é o faturamento de sua casa." }
        },
        locationsData: {
            "O Cofre do Cassino": { description: "Porta de aço maciço com segredo mecânico, prateleiras metálicas numeradas" },
            "A Sala de Pôquer VIP": { description: "Mesa de feltro verde circular, cinzeiros de cristal cheios de cinzas" },
            "O Estacionamento Subterrâneo": { description: "Colunas de concreto manchadas de óleo, fraca luz de lâmpadas fluorescentes" }
        },
        weaponsData: {
            "Barra de Ferro": { description: "Pesada e enferrujada, com marcas de tinta vermelha fresca nas pontas." },
            "Navalha de Barbeiro": { description: "Lâmina extremamente afiada com cabo de osso. Sob forte luz, a junta articulada revela minúsculas manchas escurecidas e traços de polimento recente." },
            "Veneno de Cianeto": { description: "Frasco de vidro escuro com selo de proteção rompido." }
        },
        symbols: {
            "F": "Frankie \"Cicatriz\"",
            "M": "Detetive Miller",
            "R": "Madame Rouge",
            "C": "O Cofre do Cassino",
            "P": "A Sala de Pôquer VIP",
            "E": "O Estacionamento Subterrâneo",
            "B": "Barra de Ferro",
            "N": "Navalha de Barbeiro",
            "V": "Veneno de Cianeto"
        },
        clues: {
            portuguese: [
                "Impressões digitais do policial de 44 anos com olhos azuis foram encontradas na maçaneta interna do Cofre do Cassino.",
                "O manobrista confirmou que a mulher de 37 anos com enigmáticos olhos verdes desceu com a chave para o Estacionamento Subterrâneo.",
                "Se o homem com uma cicatriz linear na bochecha direita estava na Sala de Pôquer VIP, então ele estava com a Navalha de Barbeiro.",
                "Se o policial de 44 anos não carregava o Cianeto, então a mulher de 37 anos com olhos verdes portava a Navalha de Barbeiro.",
                "O policial com olhos azuis estava com o Cianeto se e somente se a mulher de 37 anos carregava a Barra de Ferro."
            ],
            logic: [
                "C(M)",
                "E(R)",
                "P(F) → N(F)",
                "¬ V(M) → N(R)",
                "V(M) ↔ B(R)"
            ]
        },
        explanation: "Pela Pista 1, sabemos que o Detetive Miller estava no Cofre do Cassino: C(M). Pela Pista 2, sabemos que a Madame Rouge estava no Estacionamento Subterrâneo: E(R). Por exclusão dos três locais possíveis, o cobrador Frankie 'Cicatriz' só poderia estar na Sala de Pôquer VIP: P(F). Pela Pista 3, temos P(F) → N(F). Como provamos P(F) na etapa anterior, aplicamos o Modus Ponens: P(F) ∧ (P(F) → N(F)) ⊢ N(F). Logo, Frankie 'Cicatriz' estava com a Navalha de Barbeiro. Sabendo que Frankie está com a Navalha (N(F)), concluímos que a Madame Rouge não está com a Navalha: ¬ N(R). Pela Pista 4, temos ¬ V(M) → N(R). Como ¬ N(R) é VERDADE, o consequente é FALSO. Aplicando o Modus Tollens: ¬ N(R) ∧ (¬ V(M) → N(R)) ⊢ V(M). Logo, o Detetive Miller estava com o Veneno de Cianeto. Pela Pista 5, temos a bicondicional V(M) ↔ B(R). Como provamos que V(M) é VERDADE: V(M) ∧ (V(M) ↔ B(R)) ⊢ B(R). Portanto, a Madame Rouge estava com a Barra de Ferro. O assassino estava na Sala de Pôquer VIP, logo o culpado é Frankie 'Cicatriz' com a Navalha de Barbeiro!"
    },
    {
        id: 7,
        difficulty: "medium",
        title: "Caso 7: Chantagem na Alta Sociedade",
        suspects: ["Jornalista Kent", "Duquesa Beatrice", "Vito Genovese"],
        locations: ["A Adega de Vinhos", "O Jardim Francês", "O Salão de Bilhar"],
        weapons: ["Pistola com Silenciador", "Faca de Trincheira", "Arsênico no Licor"],
        solutionHashSuspect: "8f5591369768d42f3abdae98c156b0d591173aa8db93ca2cc3f8dc485442d42a",
        solutionHashComplete: "adc631f5a6cc0234a166634559a3b4d25bdf8b0c748c2ffc08538d0c99e1b944",
        victim: {
            name: "Lorde Harrington",
            sex: "M",
            age: "49",
            height: "1,83 m",
            eyes: "Azuis",
            scar: "Antiga cicatriz de duelo no antebraço direito",
            description: "Lorde Harrington era um nobre falido de 49 anos com 1,83 m de altura e orgulhosos olhos azuis. Foi encontrado sentado em sua poltrona, sem marcas de violência física ou perfurações, mas com as pupilas extremamente dilatadas e um sutil aroma de amêndoas amargas em sua respiração."
        },
        suspectsData: {
            "Jornalista Kent": { sex: "M", age: "30", height: "1,75 m", eyes: "Castanhos", scar: "Nenhuma", description: "O Jornalista Kent é um repórter esperto de 30 anos e 1,75 m de altura. Com olhos castanhos observadores, ele usa sua caneta para derrubar reputações de figurões da elite política do distrito." },
            "Duquesa Beatrice": { sex: "F", age: "42", height: "1,67 m", eyes: "Verdes", scar: "Pequena cicatriz sob o olho esquerdo", description: "A Duquesa Beatrice é uma mulher aristocrata de 42 anos e 1,67 m de altura, com belos olhos verdes. Esconde sob a maquiagem uma pequena cicatriz sob o olho esquerdo, marca antiga que evoca segredos de seu passado conturbado." },
            "Vito Genovese": { sex: "M", age: "45", height: "1,80 m", eyes: "Pretos", scar: "Cicatriz em formato de cruz no ombro direito", description: "Vito Genovese é um assassino profissional de 45 anos com 1,80 m de altura e olhos pretos impassíveis. Sob a camisa esconde uma cicatriz em formato de cruz no ombro direito, feita deliberadamente por sua antiga organização criminosa na Sicília." }
        },
        locationsData: {
            "A Adega de Vinhos": { description: "Temperatura muito fria e úmida, prateleiras com garrafas poeirentas" },
            "O Jardim Francês": { description: "Arbustos de cerca viva bem podados, fonte de pedra com água parada" },
            "O Salão de Bilhar": { description: "Mesa de bilhar central com pano verde manchado, luminária suspensa de latão" }
        },
        weaponsData: {
            "Pistola com Silenciador": { description: "Cano ainda quente ao toque e culatra com marcas de pólvora recém-queimada." },
            "Faca de Trincheira": { description: "Lâmina serrilhada de aço militar, guarda em formato de soco-inglês" },
            "Arsênico no Licor": { description: "Frasco pequeno com conta-gotas. O bico dosador exibe resquícios de um composto químico incolor e inodoro altamente concentrado." }
        },
        symbols: {
            "K": "Jornalista Kent",
            "B": "Duquesa Beatrice",
            "V": "Vito Genovese",
            "A": "A Adega de Vinhos",
            "J": "O Jardim Francês",
            "S": "O Salão de Bilhar",
            "P": "Pistola com Silenciador",
            "T": "Faca de Trincheira",
            "L": "Arsênico no Licor"
        },
        clues: {
            portuguese: [
                "O jardineiro viu a mulher de 42 anos com uma pequena cicatriz sob o olho esquerdo perto da fonte do Jardim Francês.",
                "Se o jornalista de 30 anos com olhos castanhos estava na Adega de Vinhos, então ele portava a Pistola com Silenciador.",
                "O sicário de 45 anos com olhos pretos estava no Salão de Bilhar se e somente se o jornalista de 30 anos estava na Adega de Vinhos.",
                "O homem de 1,80 m com olhos pretos estava com o Arsênico no Licor ou a mulher de 42 anos portava a Pistola com Silenciador.",
                "O sicário de 45 anos com olhos pretos não estava na Adega de Vinhos."
            ],
            logic: [
                "J(B)",
                "A(K) → P(K)",
                "S(V) ↔ A(K)",
                "L(V) ∨ P(B)",
                "¬ A(V)"
            ]
        },
        explanation: "Pela Pista 1, sabemos que a Duquesa Beatrice estava no Jardim Francês: J(B). Como os locais são únicos, restam apenas a Adega de Vinhos (A) e o Salão de Bilhar (S) para serem distribuídos entre Kent e Vito Genovese. Pela Pista 3: S(V) ↔ A(K). Para que os locais sejam distintos, a única atribuição logicamente consistente que satisfaz a relação bicondicional e mantém os locais separados é: S(V) (Vito Genovese no Salão de Bilhar) e A(K) (Jornalista Kent na Adega de Vinhos). Pela Pista 2, temos A(K) → P(K). Como provamos A(K) na etapa anterior, aplicamos o Modus Ponens: A(K) ∧ (A(K) → P(K)) ⊢ P(K). Logo, o Jornalista Kent estava com a Pistola com Silenciador. Como Kent tem a Pistola (P(K)), a Duquesa Beatrice não pode ter a Pistola: ¬ P(B). Pela Pista 4, temos a disjunção L(V) ∨ P(B). Como ¬ P(B) é VERDADE, aplicamos o Silogismo Disjuntivo: ¬ P(B) ∧ (L(V) ∨ P(B)) ⊢ L(V). Logo, Vito Genovese estava com o Arsênico no Licor. Por exclusão de armas, a Duquesa Beatrice estava com a Faca de Trincheira: T(B). Sendo o assassino daquele local (Salão de Bilhar), Vito Genovese é o culpado com o Arsênico no Licor!"
    },
    {
        id: 8,
        difficulty: "medium",
        title: "Caso 8: Conspiração Industrial",
        suspects: ["Químico Sterling", "Diretor Blackwell", "Magnata DuPont"],
        locations: ["A Sala de Arquivos", "A Recepção Central", "O Laboratório Químico"],
        weapons: ["Seringa com Sedativo", "Pasta com Documento Explosivo", "Gás Monóxido no Duto"],
        solutionHashSuspect: "3f2a07dac15b68cd350d19b7e4a27a69c8f4e150d04beb6114687bd18b89e2cd",
        solutionHashComplete: "e7cebd562dab82402bbf810eb8cd6d6c474b64ef884d4790a719b8ecc55afe99",
        victim: {
            name: "Dr. Hans Reinhardt",
            sex: "M",
            age: "56",
            height: "1,72 m",
            eyes: "Cinzentos",
            scar: "Marca de queimadura na bochecha direita",
            description: "O Dr. Reinhardt tinha 56 anos e 1,72 m de altura, com tristes olhos cinzentos e uma marca de queimadura por ácido na bochecha direita. Foi encontrado sem quaisquer lesões físicas ou sinais de agressão, embora a coloração de sua pele exibisse uma tonalidade rosada incomum."
        },
        suspectsData: {
            "Químico Sterling": { sex: "M", age: "27", height: "1,78 m", eyes: "Azuis", scar: "Nenhuma", description: "O Químico Sterling é um jovem pesquisador de 27 anos com 1,78 m de altura e brilhantes olhos azuis. Sua ambição desmedida no laboratório superava qualquer compromisso ético para subir na hierarquia corporativa." },
            "Diretor Blackwell": { sex: "M", age: "43", height: "1,81 m", eyes: "Castanhos", scar: "Nenhuma", description: "O Diretor Blackwell é um administrador implacável de 43 anos e 1,81 m de altura. Seus olhos castanhos são focados estritamente nas margens de lucro, comandando ações escusas de sua imponente mesa de mogno." },
            "Magnata DuPont": { sex: "M", age: "60", height: "1,77 m", eyes: "Pretos", scar: "Cicatriz cirúrgica no tórax", description: "O Magnata DuPont é o proprietário das indústrias, com 60 anos, 1,77 m de altura e olhos pretos austeros. Ele ostenta uma longa cicatriz cirúrgica no tórax por conta de uma cirurgia cardíaca complexa, refletindo a fragilidade de um império que ele defende a qualquer custo." }
        },
        locationsData: {
            "A Sala de Arquivos": { description: "Armários de aço cinza com gavetas numeradas, pastas de papelão pardo organizadas" },
            "A Recepção Central": { description: "Piso de linóleo brilhante e barulhento, balcão de recepção de madeira escura" },
            "O Laboratório Químico": { description: "Bancadas de ardósia preta, cheiro forte e picante de solventes" }
        },
        weaponsData: {
            "Seringa com Sedativo": { description: "Agulha hipodérmica fina levemente entortada, contendo gotas residuais de um sedativo." },
            "Pasta com Documento Explosivo": { description: "Couro marrom desgastado, com fecho de latão manchado" },
            "Gás Monóxido no Duto": { description: "Cilindro portátil de metal cinza com a válvula de vedação de borracha amarela rompida e marcador de pressão zerado." }
        },
        symbols: {
            "S": "Químico Sterling",
            "B": "Diretor Blackwell",
            "D": "Magnata DuPont",
            "A": "A Sala de Arquivos",
            "R": "A Recepção Central",
            "L": "O Laboratório Químico",
            "Se": "Seringa com Sedativo",
            "P": "Pasta com Documento Explosivo",
            "G": "Gás Monóxido no Duto"
        },
        clues: {
            portuguese: [
                "O vigia relatou que o homem de 60 anos com olhos pretos e austeros entrou no Laboratório Químico.",
                "Se o diretor de 43 anos com olhos castanhos estava com o Gás Monóxido no Duto, então ele esteve fisicamente na Sala de Arquivos.",
                "O jovem pesquisador de 27 anos com olhos azuis estava com a Pasta com Documento Explosivo se e somente se o homem de 60 anos não estava com o Gás Monóxido no Duto.",
                "O chaveiro eletrônico registrou que o diretor de 43 anos acessou a Sala de Arquivos ou esteve no Laboratório Químico.",
                "O exame médico no jovem pesquisador de 27 anos atestou que ele não manuseou a Seringa com Sedativo."
            ],
            logic: [
                "L(D)",
                "G(B) → A(B)",
                "P(S) ↔ ¬ G(D)",
                "A(B) ∨ L(B)",
                "¬ Se(S)"
            ]
        },
        explanation: "Pela Pista 1, sabemos que o Magnata DuPont estava no Laboratório Químico: L(D). Como os locais são únicos, deduzimos que o Diretor Blackwell não estava no Laboratório Químico: ¬ L(B). Pela Pista 4, temos a disjunção A(B) ∨ L(B). Como ¬ L(B) é VERDADE, aplicamos o Silogismo Disjuntivo: ¬ L(B) ∧ (A(B) ∨ L(B)) ⊢ A(B). Portanto, o Diretor Blackwell estava na Sala de Arquivos. Por exclusão dos três locais disponíveis, o Químico Sterling estava na Recepção Central: R(S). Pela Pista 5: ¬ Se(S) (Químico Sterling não manuseou a Seringa com Sedativo). Pela Pista 3: P(S) ↔ ¬ G(D). Se o Químico Sterling estivesse com o Gás Monóxido, não portaria a Pasta (¬ P(S)), exigindo que o Magnata DuPont portasse o Gás Monóxido (G(D)). Isso geraria uma contradição com duas pessoas portando o Gás Monóxido. Portanto, o Químico Sterling não pode portar o Gás Monóxido: ¬ G(S). Como Sterling não tem a Seringa (¬ Se(S)) e não tem o Gás (¬ G(S)), por exclusão ele deve portar a Pasta com Documento Explosivo: P(S). Pela Pista 3, sendo P(S) VERDADE, deduzimos que ¬ G(D) é VERDADE, logo o Magnata DuPont não tem o Gás Monóxido. Restando Seringa e Gás para Blackwell e DuPont, o Magnata DuPont fica com a Seringa com Sedativo: Se(D), e o Diretor Blackwell fica com o Gás Monóxido no Duto: G(B). Esta configuração satisfaz a Pista 2, pois G(B) é VERDADE e A(B) é VERDADE. O culpado estava na Sala de Arquivos, logo é o Diretor Blackwell com o Gás Monóxido no Duto!"
    },
    {
        id: 9,
        difficulty: "difficult",
        title: "Caso 9: Contrabando no Porto",
        suspects: ["Marinheiro Jack", "Capitão Blackwood", "Senhorita Carmine", "Estivador Boris"],
        locations: ["O Portão de Carga", "O Armazém Central", "A Loja de Penhores", "A Doca Seca"],
        weapons: ["Rifle Mosquetão", "Gancho de Carga", "Corda de Cânhamo", "Barra de Direção"],
        solutionHashSuspect: "73bce0a4b7e60a845813fee2eff1ecd407e117d79189b16cd7005eed4a373177",
        solutionHashComplete: "e1622399975001b47a0613d48112034a27a5dfdd1239195b2ebb844619b99b53",
        victim: {
            name: "Oficial de Alfândega Ross",
            sex: "M",
            age: "41",
            height: "1,79 m",
            eyes: "Castanhos",
            scar: "Nenhuma",
            description: "O Oficial Ross tinha 41 anos e 1,79 m de altura, com focados olhos castanhos. Foi encontrado sem vida nas docas; o corpo apresenta marcas de perfuração profunda e um rasgo em formato arqueado na região lombar."
        },
        suspectsData: {
            "Marinheiro Jack": { sex: "M", age: "29", height: "1,74 m", eyes: "Azuis", scar: "Cicatriz de arpão na panturrilha direita", description: "O Marinheiro Jack é um contrabandista ágil de 29 anos com 1,74 m de altura e olhos azuis marinhos. Ele exibe uma cicatriz de arpão de pesca na panturrilha direita, marca de um dia tempestuoso no mar que quase custou sua perna." },
            "Capitão Blackwood": { sex: "M", age: "51", height: "1,83 m", eyes: "Cinzentos", scar: "Nenhuma", description: "O Capitão Blackwood é um líder rígido de 51 anos com 1,83 m de altura e olhos cinzentos como a neblina do porto. Ele mantém uma postura militar ereta, exigindo disciplina absoluta de seus marinheiros no cais." },
            "Senhorita Carmine": { sex: "F", age: "35", height: "1,70 m", eyes: "Verdes", scar: "Nenhuma", description: "A Senhorita Carmine é uma receptadora de luxo de 35 anos e 1,70 m de altura, com belos olhos verdes felinos. Sua elegância impecável mascara seus negócios ilícitos com as maiores quadrilhas de contrabandistas." },
            "Estivador Boris": { sex: "M", age: "39", height: "1,92 m", eyes: "Pretos", scar: "Grande cicatriz no peito", description: "Boris é um estivador de 39 anos com impressionantes 1,92 m de altura e olhos pretos soturnos. Ele exibe uma grande cicatriz de corte horizontal no peito, marca de uma facada que ele sobreviveu nas docas, e é o encarregado do trabalho bruto da gangue." }
        },
        locationsData: {
            "O Portão de Carga": { description: "Grade de ferro alta com cadeado pesado, guarita com vidros sujos" },
            "O Armazém Central": { description: "Estrutura metálica com telhado de zinco, pilhas de fardos e sacos" },
            "A Loja de Penhores": { description: "Prateleiras cheias de objetos antigos e relógios, grade protetora de latão" },
            "A Doca Seca": { description: "Fosso de concreto profundo e úmido, andaimes de madeira nas laterais" }
        },
        weaponsData: {
            "Rifle Mosquetão": { description: "Coronha de madeira riscada, cano longo de ferro oxidado" },
            "Gancho de Carga": { description: "Gancho de ferro curvo e pontiagudo, usado na movimentação de fardos" },
            "Corda de Cânhamo": { description: "Fibra grossa e áspera de cânhamo, com nós de marinheiro nas pontas" },
            "Barra de Direção": { description: "Peça automotiva de aço maciço, com resquícios de graxa lubrificante preta" }
        },
        symbols: {
            "J": "Marinheiro Jack",
            "B": "Capitão Blackwood",
            "C": "Senhorita Carmine",
            "O": "Estivador Boris",
            "P": "O Portão de Carga",
            "A": "O Armazém Central",
            "L": "A Loja de Penhores",
            "D": "A Doca Seca",
            "R": "Rifle Mosquetão",
            "G": "Gancho de Carga",
            "H": "Corda de Cânhamo",
            "S": "Barra de Direção"
        },
        clues: {
            portuguese: [
                "O guarda anotou que o marujo de 29 anos com cicatriz de arpão na panturrilha se apresentou no local de grade de ferro alta com cadeado pesado.",
                "O encarregado confirmou que o gigante de 1,92 m com uma cicatriz no peito estava no fosso de concreto profundo e úmido.",
                "Se o comandante de 1,83 m portava o gancho de ferro curvo e pontiagudo, então ele estava no armazém de estrutura metálica com telhado de zinco.",
                "Estar no local de grade de ferro alta com cadeado pesado equivale a portar o rifle de cano longo de ferro oxidado.",
                "Estar no estabelecimento com prateleiras cheias de objetos antigos equivale a portar a corda de fibra grossa com nós de marinheiro se e somente se o gigante de 1,92 m não estava no local de grade de ferro com cadeado.",
                "Se o gigante com uma cicatriz no peito estava com a peça de aço maciço manchada de graxa, então o comandante de 1,83 m portava o gancho de ferro curvo.",
                "A revista provou ser falso que o gigante de 1,92 m estivesse portando a corda de fibra grossa ou o gancho de ferro curvo.",
                "O armeiro declarou que o comandante de olhos cinzentos não retirou o rifle de cano longo de ferro oxidado do estoque."
            ],
            logic: [
                "P(J)",
                "D(O)",
                "G(B) → A(B)",
                "P ↔ R",
                "(L ↔ H) ↔ ¬ P(O)",
                "S(O) → G(B)",
                "¬ (H(O) ∨ G(O))",
                "¬ R(B)"
            ]
        },
        explanation: "Pela Pista 1, sabemos que o Marinheiro Jack estava no Portão de Carga: P(J). Pela Pista 4, temos P ↔ R (Estar no Portão de Carga equivale a portar o Rifle Mosquetão), logo o Marinheiro Jack estava com o Rifle Mosquetão: R(J). Pela Pista 2, sabemos que o Estivador Boris estava na Doca Seca: D(O). A sua arma: não pode ser o Rifle Mosquetão (que está com Jack), nem a Corda de Cânhamo, nem o Gancho de Carga (Pista 7: ¬ (H(O) ∨ G(O))). Logo, Boris só pode estar com a Barra de Direção: S(O). Pela Pista 6, como Boris tem a Barra de Direção (S(O)), por Modus Ponens concluímos que o Capitão Blackwood tem o Gancho de Carga: G(B). Pela Pista 3, como Blackwood tem o Gancho de Carga (G(B)), por Modus Ponens concluímos que o Capitão Blackwood estava no Armazém Central: A(B). Pela Pista 5, como Boris não estava no Portão de Carga (estava na Doca Seca), ¬ P(O) é verdadeiro. A bicondicional exige que (L ↔ H) seja verdadeiro. Assim, a Senhorita Carmine está na Loja de Penhores com a Corda de Cânhamo: L(C) e H(C). O culpado estava no Armazém Central, logo é o Capitão Blackwood com o Gancho de Carga!",
        investigations: {
            "Marinheiro Jack": { phase: 0, text: "Jack alega que limpou o convés do barco a noite toda, mas suas botas estão perfeitamente secas e limpas." },
            "Capitão Blackwood": { phase: 1, text: "O comandante permaneceu em silêncio altivo, limpando a sujeira sob as unhas com a ponta de um canivete." },
            "Senhorita Carmine": { phase: 1, text: "Carmine exala um perfume importado caro e forte, que destoa muito do cheiro forte de maresia e óleo do cais." },
            "Estivador Boris": { phase: 2, text: "Boris queixou-se constantemente de fortes dores lombares devido ao carregamento manual de cargas." },
            "O Portão de Carga": { phase: 2, text: "O vigia relatou que a lâmpada da guarita piscava e falhava, prejudicando o registro visual dos que passavam." },
            "O Armazém Central": { phase: 1, text: "O chão poeirento de madeira do armazém exibe marcas de arrasto e fibras finas de cânhamo rompidas." },
            "A Loja de Penhores": { phase: 0, text: "Um relógio de bolso antigo e quebrado com ponteiros emperrados exatamente às 08:15." },
            "A Doca Seca": { phase: 1, text: "Pequenos respingos de graxa lubrificante automotiva preta sobre os andaimes de madeira do fosso." },
            "Rifle Mosquetão": { phase: 2, text: "O ferrolho do rifle está lubrificado, mas as bordas do cano exibem marcas de ferrugem por falta de uso." },
            "Gancho de Carga": { phase: 2, text: "A ponta curvada de ferro exibe vestígios de ferrugem desgastada e minúsculos fiapos de lã azul-escura áspera." },
            "Corda de Cânhamo": { phase: 2, text: "Apresenta cortes limpos em suas pontas e ausência completa de fluidos corporais." },
            "Barra de Direção": { phase: 0, text: "Uma peça pesada de aço maciço que exibe arranhões superficiais de uso mecânico comum." }
        }
    },
    {
        id: 10,
        difficulty: "difficult",
        title: "Caso 10: Traição sob os Holofotes",
        suspects: ["Ilusionista Raven", "Diretor Sinclair", "Atriz Evelyn", "Crítico Malone"],
        locations: ["Os Camarins", "A Galeria de Iluminação", "O Palco Principal", "A Bilheteria"],
        weapons: ["Punhal de Aço Damasceno", "Fio de Garrote Oculto", "Dose de Clorofórmio", "Veneno no Cálice de Adereço"],
        solutionHashSuspect: "598e9b1cb75b4887cf7f340850e8280943fd24a2f38dbe98f2bd3e7a5aec6c7f",
        solutionHashComplete: "29fe495f47d78bf0b4f7aa809f2addbde7ff7a022710b68eb5e0830ad8533c68",
        victim: {
            name: "Diretor de Palco Moreau",
            sex: "M",
            age: "47",
            height: "1,71 m",
            eyes: "Castanhos",
            scar: "Nenhuma",
            description: "O Diretor Moreau tinha 47 anos e 1,71 m de altura, com olhos castanhos expressivos. Foi encontrado sem vida no teatro; sua face apresenta leve vermelhidão ao redor da boca e do nariz, sem sinais de perfuração, estrangulamento ou substâncias corrosivas."
        },
        suspectsData: {
            "Ilusionista Raven": { sex: "M", age: "36", height: "1,80 m", eyes: "Pretos", scar: "Cicatriz no polegar esquerdo", description: "O Ilusionista Raven é um mágico de 36 anos com 1,80 m de altura e olhos pretos e misteriosos. Ele exibe uma cicatriz fina no polegar esquerdo, marca de um truque de cartas com lâminas que deu errado na sua juventude." },
            "Diretor Sinclair": { sex: "M", age: "55", height: "1,76 m", eyes: "Azuis", scar: "Nenhuma", description: "O Diretor Sinclair é o produtor do teatro, com 55 anos, 1,76 m de altura e olhos azuis calculistas. Ele tenta esconder a ruína financeira que ameaça fechar o estabelecimento sob ternos caros." },
            "Atriz Evelyn": { sex: "F", age: "28", height: "1,65 m", eyes: "Verdes", scar: "Pequena cicatriz no joelho direito", description: "A Atriz Evelyn é a diva da companhia, com 28 anos e 1,65 m de altura, ostentando brilhantes olhos verdes. Ela tenta cobrir com a maquiagem teatral uma pequena cicatriz no joelho direito, lembrança de uma queda no palco em sua estreia." },
            "Crítico Malone": { sex: "M", age: "32", height: "1,78 m", eyes: "Castanhos", scar: "Cicatriz na clavícula esquerda", description: "O Crítico Malone é um jornalista investigativo de 32 anos com 1,78 m de altura e atentos olhos castanhos. Ele carrega uma cicatriz de osso quebrado na clavícula esquerda, fraturada por um informante violento que tentou impedi-lo de publicar um furo." }
        },
        locationsData: {
            "Os Camarins": { description: "Espelho com lâmpadas amarelas incandescentes, cabides com figurinos teatrais" },
            "A Galeria de Iluminação": { description: "Passarela de metal suspensa, refletores pesados com lentes de vidro" },
            "O Palco Principal": { description: "Piso de tábuas de madeira escura e rangente, cortina de veludo vermelho pesado" },
            "A Bilheteria": { description: "Cabine pequena de madeira com janela de vidro circular, gaveta de dinheiro trancada" }
        },
        weaponsData: {
            "Punhal de Aço Damasceno": { description: "Lâmina de aço com padrões ondulados nítidos, cabo de ébano escuro" },
            "Fio de Garrote Oculto": { description: "Cabo de anéis metálicos nas pontas, fio ultra-fino de aço trançado" },
            "Dose de Clorofórmio": { description: "Lenço de linho embebido com cheiro doce e forte de éter" },
            "Veneno no Cálice de Adereço": { description: "Taça de latão ornamentada com falsas gemas, pó fino no fundo" }
        },
        symbols: {
            "R": "Ilusionista Raven",
            "S": "Diretor Sinclair",
            "E": "Atriz Evelyn",
            "M": "Crítico Malone",
            "C": "Os Camarins",
            "G": "A Galeria de Iluminação",
            "P": "O Palco Principal",
            "B": "A Bilheteria",
            "U": "Punhal de Aço Damasceno",
            "F": "Fio de Garrote Oculto",
            "D": "Dose de Clorofórmio",
            "V": "Veneno no Cálice de Adereço"
        },
        clues: {
            portuguese: [
                "O eletricista declarou que o produtor de 55 anos com olhos azuis subiu até a passarela de metal suspensa com refletores.",
                "Um repórter fotografou a diva de olhos verdes com uma cicatriz no joelho enquanto ela passava pela cabine de madeira com janela de vidro circular.",
                "Se o jornalista de 32 anos com uma cicatriz na clavícula estava com o lenço de linho com odor anestésico, ele estava no palco de piso de tábuas de madeira escura.",
                "Estar no camarim com espelhos iluminados por lâmpadas incandescentes equivale a carregar a taça de latão ornamentada com falsas gemas contendo um pó fino.",
                "Estar na passarela de metal suspensa equivale a portar o fio ultra-fino de aço trançado com anéis nas pontas se e somente se o mágico de 1,80 m não estava na cabine de madeira de janela circular.",
                "Se o jornalista de 32 anos estava com o lenço de linho com odor anestésico, então a diva de olhos verdes com uma cicatriz no joelho portava o punhal com padrões ondulados na lâmina.",
                "Provou-se ser falso que a diva de olhos verdes portasse o fio ultra-fino de aço trançado ou a taça de latão ornamentada.",
                "O laudo provou que o jornalista com uma cicatriz na clavícula não teve contato com o punhal de padrões ondulados e não esteve no camarim com espelhos iluminados."
            ],
            logic: [
                "G(S)",
                "B(E)",
                "D(M) → P(M)",
                "C ↔ V",
                "(G ↔ F) ↔ ¬ B(R)",
                "D(M) → U(E)",
                "¬ (F(E) ∨ V(E))",
                "¬ U(M) ∧ ¬ C(M)"
            ]
        },
        explanation: "Pela Pista 1, o Diretor Sinclair estava na Galeria de Iluminação: G(S). Pela Pista 2, a Atriz Evelyn estava na Bilheteria: B(E). Portanto, o Ilusionista Raven não estava na Bilheteria: ¬ B(R) é VERDADE. Pela Pista 5, com o lado direito da bicondicional VERDADE, o lado esquerdo também deve ser VERDADE: a pessoa na Galeria de Iluminação estava com o Fio de Garrote Oculto (G ↔ F). Como Sinclair estava na Galeria de Iluminação (G(S)), concluímos que Sinclair tinha o Fio de Garrote Oculto: F(S). Pela Pista 7, a Atriz Evelyn não tinha o Fio de Garrote nem o Veneno no Cálice de Adereço. Pela Pista 8, sabemos que Malone não tem o Punhal e não estava nos Camarins: ¬ U(M) ∧ ¬ C(M). Como Sinclair está na Galeria (G(S)) e Evelyn está na Bilheteria (B(E)), e Malone não estava nos Camarins (¬ C(M)), Malone só pode estar no Palco Principal (P(M)). Por exclusão de locais, o Ilusionista Raven estava nos Camarins: C(R). Pela Pista 4 (C ↔ V), concluímos que Raven tinha o Veneno no Cálice de Adereço: V(R). Como Sinclair tem o Fio (F(S)) e Raven tem o Veneno (V(R)), restam apenas o Punhal e a Dose para Evelyn e Malone. Como Malone não tem o Punhal (¬ U(M)), Malone deve portar a Dose de Clorofórmio: D(M). Por exclusão, a Atriz Evelyn tem o Punhal: U(E). Esta configuração atende perfeitamente à Pista 6 (D(M) → U(E)) e à Pista 3 (D(M) → P(M)). O culpado é o Crítico Malone com a Dose de Clorofórmio no Palco Principal!",
        investigations: {
            "Ilusionista Raven": { phase: 0, text: "Raven tentou descontrair os oficiais no local realizando pequenos truques de desaparecimento de moedas." },
            "Diretor Sinclair": { phase: 1, text: "O produtor estava visivelmente nervoso, roendo as unhas e revisando pastas de contabilidade bancária." },
            "Atriz Evelyn": { phase: 1, text: "Evelyn repassava suas falas em sussurros, apertando um lenço perfumado com essência suave de lavanda." },
            "Crítico Malone": { phase: 2, text: "Malone fez anotações rápidas em um pequeno bloco de notas, mantendo seu cachimbo apagado entre os dentes." },
            "Os Camarins": { phase: 0, text: "O espelho do camarim principal exibe fotografias amareladas de espetáculos e cartões de parabéns antigos." },
            "A Galeria de Iluminação": { phase: 1, text: "Marcas de fuligem e fricção intensa no corrimão de aço da passarela de luzes suspensa." },
            "O Palco Principal": { phase: 1, text: "No piso de tábuas escuras, a perícia recolheu fiapos microscópicos de veludo vermelho e traços de maquiagem." },
            "A Bilheteria": { phase: 2, text: "Um rolo de ingressos antigos de uma peça fracassada, manchado de café na lateral." },
            "Punhal de Aço Damasceno": { phase: 2, text: "Lâmina polida com padrões ondulados nítidos, sem qualquer resíduo biológico ou poeira química." },
            "Fio de Garrote Oculto": { phase: 0, text: "Um fio ultra-fino de aço trançado que cabe facilmente em um estojo de maquiagem redondo." },
            "Dose de Clorofórmio": { phase: 2, text: "O lenço de linho de odor adocicado revela traços de fibras de casaco tweed e partículas de cinzas de tabaco." },
            "Veneno no Cálice de Adereço": { phase: 0, text: "O fundo da taça de latão apresenta uma fina película cinzenta inodora e seca." }
        }
    },
    {
        id: 11,
        difficulty: "difficult",
        title: "Caso 11: Emboscada nas Sombras",
        suspects: ["Informante Slate", "Don Barrows", "Juíza Helena", "Matador Umbra"],
        locations: ["O Beco das Ratazanas", "O Canteiro de Obras", "O Esgoto Subterrâneo", "A Fábrica de Tecidos"],
        weapons: ["Cano de Ferro Cortado", "Maçarico a Gás", "Martelo Pesado", "Revólver Silenciado"],
        solutionHashSuspect: "8db532b9ce70706f795bb46f1ceab91928b22b4edee13e87022d76bb74fe8d98",
        solutionHashComplete: "66367e56a89032eb79246ee1449888936b4079e319c5339aa8d12a9a72f359ab",
        victim: {
            name: "Inspetor Higgins",
            sex: "M",
            age: "46",
            height: "1,78 m",
            eyes: "Cinzentos",
            scar: "Cicatriz de tiro no ombro esquerdo",
            description: "O Inspetor Higgins tinha 46 anos e 1,78 m de altura, com cansados olhos cinzentos e uma cicatriz de tiro no ombro esquerdo. Foi encontrado sem vida no esgoto; o corpo apresenta uma perfuração circular precisa e estreita no tórax, com queimadura concêntrica de pólvora na pele circundante."
        },
        suspectsData: {
            "Informante Slate": { sex: "M", age: "31", height: "1,73 m", eyes: "Azuis", scar: "Nenhuma", description: "O Informante Slate tem 31 anos, 1,73 m de altura e olhos azuis evasivos. Ele trabalha nos arquivos da polícia e prefere o silêncio de escritórios, de onde vaza informações valiosas para a máfia." },
            "Don Barrows": { sex: "M", age: "57", height: "1,82 m", eyes: "Pretos", scar: "Cicatriz no supercílio direito", description: "Don Barrows é o violento líder de 57 anos com 1,82 m de altura e olhos pretos frios. Ele ostenta uma cicatriz de corte no supercílio direito, uma lembrança de suas brigas de juventude nas ruas, antes de governar seu território com crueldade." },
            "Juíza Helena": { sex: "F", age: "44", height: "1,68 m", eyes: "Castanhos", scar: "Nenhuma", description: "A Juíza Helena é uma magistrada corrupta de 44 anos e 1,68 m de altura. Seus olhos castanhos severos transmitem uma falsa aura de integridade nos tribunais, escondendo os subornos que recebia." },
            "Matador Umbra": { sex: "M", age: "38", height: "1,85 m", eyes: "Castanhos", scar: "Cicatriz de queimadura na mão direita", description: "O Matador Umbra é um sicário enigmático de 38 anos com 1,85 m de altura e olhos castanhos impassíveis. Ele possui uma pequena cicatriz de queimadura nas costas da mão direita, única marca do assassino encarregado de limpezas silenciosas." }
        },
        locationsData: {
            "O Beco das Ratazanas": { description: "Entulho acumulado nos cantos, paredes de tijolos vermelhos cobertas de limo" },
            "O Canteiro de Obras": { description: "Terra batida enlameada pelas chuvas, andaimes de metal inacabados erguidos" },
            "O Esgoto Subterrâneo": { description: "Escorrimento constante de água escura, ar úmido com odor acentuado" },
            "A Fábrica de Tecidos": { description: "Teares mecânicos de ferro pesados e barulhentos, fiapos de algodão no ar" }
        },
        weaponsData: {
            "Cano de Ferro Cortado": { description: "Tubo de encanamento de ferro galvanizado, com bordas serradas e ásperas" },
            "Maçarico a Gás": { description: "Bico queimador de latão chamuscado, mangueira de borracha vermelha" },
            "Martelo Pesado": { description: "Cabeça de ferro forjado de 5kg, cabo longo de madeira de freixo" },
            "Revólver Silenciado": { description: "Acabamento em aço escuro oxidado, silenciador artesanal rosqueável" }
        },
        symbols: {
            "S": "Informante Slate",
            "B": "Don Barrows",
            "H": "Juíza Helena",
            "U": "Matador Umbra",
            "R": "O Beco das Ratazanas",
            "C": "O Canteiro de Obras",
            "E": "O Esgoto Subterrâneo",
            "F": "A Fábrica de Tecidos",
            "Ca": "Cano de Ferro Cortado",
            "M": "Maçarico a Gás",
            "T": "Martelo Pesado",
            "V": "Revólver Silenciado"
        },
        clues: {
            portuguese: [
                "O gerente confirmou que o líder da gangue de 57 anos com cicatriz no supercílio estava na fábrica com teares mecânicos barulhentos e fiapos de algodão.",
                "Um patrulheiro viu o arquivista de 31 anos com olhos azuis oculto no beco de tijolos vermelhos com limo nas paredes.",
                "Se o atirador de 38 anos com cicatriz de queimadura na mão portava o revólver de aço escuro com silenciador artesanal, ele estava escondido na galeria subterrânea com escoamento de água escura.",
                "Estar no beco de tijolos vermelhos com limo nas paredes equivale a portar o tubo de encanamento de ferro com bordas serradas.",
                "Estar no terreno de terra batida enlameada e andaimes inacabados equivale a portar o bico queimador de latão com mangueira vermelha se e somente se o arquivista de 31 anos não estava na fábrica com teares mecânicos.",
                "Se o líder de 57 anos com cicatriz no supercílio estava com o Martelo Pesado, então a magistrada de 44 anos portava o bico queimador de latão com mangueira vermelha.",
                "A busca na maleta provou ser falso que o atirador com cicatriz de queimadura portasse o tubo de encanamento de ferro ou a ferramenta de cabeça de ferro de 5kg.",
                "O escrivão atestou que a magistrada com olhos castanhos não carregava a ferramenta de cabeça de ferro de 5kg em suas mãos."
            ],
            logic: [
                "F(B)",
                "R(S)",
                "V(U) → E(U)",
                "R ↔ Ca",
                "(C ↔ M) ↔ ¬ F(S)",
                "T(B) → M(H)",
                "¬ (Ca(U) ∨ T(U))",
                "¬ T(H)"
            ]
        },
        explanation: "Pela Pista 1, sabemos que Don Barrows estava na Fábrica de Tecidos: F(B). Como os locais são únicos, o Informante Slate não estava na Fábrica de Tecidos (¬ F(S) é VERDADE). Pela Pista 5, com o lado direito da bicondicional VERDADE, o lado esquerdo também deve ser VERDADE: C ↔ M (estar no Canteiro de Obras equivale a portar o Maçarico a Gás). Pela Pista 2, sabemos que o Informante Slate estava no Beco das Ratazanas: R(S). Pela Pista 4 (R ↔ Ca), como Slate estava no Beco (R(S)), ele estava com o Cano de Ferro Cortado: Ca(S). Pela Pista 7, temos ¬ (Ca(U) ∨ T(U)) (o Matador Umbra não estava com o Cano de Ferro nem com o Martelo Pesado). Pela Pista 8, temos ¬ T(H) (a Juíza Helena não estava com o Martelo Pesado). Como Slate estava com o Cano de Ferro (Ca(S)) e nem Umbra nem Helena estavam com o Martelo, por exclusão de armas, Don Barrows só poderia estar com o Martelo Pesado: T(B). Pela Pista 6 (T(B) → M(H)), aplicando Modus Ponens, deduzimos que a Juíza Helena tem o Maçarico a Gás: M(H). Pela equivalência C ↔ M, como a Juíza Helena tem o Maçarico a Gás (M(H)), ela estava no Canteiro de Obras: C(H). Por exclusão de locais e armas, o Matador Umbra estava no Esgoto Subterrâneo com o Revólver Silenciado: E(U) e V(U). Pela Pista 3, temos V(U) → E(U). Como provamos V(U) na etapa anterior, por Modus Ponens: V(U) ∧ (V(U) → E(U)) ⊢ E(U). O culpado estava no Esgoto Subterrâneo, logo o culpado é o Matador Umbra com o Revólver Silenciado!",
        investigations: {
            "Informante Slate": { phase: 0, text: "Slate alegou que estava dormindo na hora do crime, mas não soube responder sobre os sinos da paróquia local." },
            "Don Barrows": { phase: 1, text: "Don Barrows tragava um charuto cubano com calma, assoprando fumaça na direção do investigador." },
            "Juíza Helena": { phase: 1, text: "Helena ajeitava constantemente seus óculos de leitura, alegando ter reuniões urgentes na corte de justiça." },
            "Matador Umbra": { phase: 2, text: "O atirador manteve silêncio absoluto durante as perguntas, com as mãos escondidas sob o casaco escuro." },
            "O Beco das Ratazanas": { phase: 0, text: "Uma lata de conserva amassada com restos de alimentos que atraem insetos no canto do paralelepípedo." },
            "O Canteiro de Obras": { phase: 1, text: "Fragmentos de fuligem de solda e respingos de faíscas de ferro derretido sobre a terra batida." },
            "O Esgoto Subterrâneo": { phase: 1, text: "A perícia detectou uma poça escura de graxa lubrificante industrial diluída e pegadas de bota antiderrapante." },
            "A Fábrica de Tecidos": { phase: 2, text: "Um pequeno frasco de lubrificante de teares vazio jogado embaixo de uma engrenagem pesada." },
            "Cano de Ferro Cortado": { phase: 2, text: "Apresenta marcas de oxidação natural comum de ferro, sem limo ou resíduos biológicos." },
            "Maçarico a Gás": { phase: 0, text: "A ponta de latão exibe manchas azuladas causadas pelo calor extremo de uso anterior." },
            "Martelo Pesado": { phase: 0, text: "O cabo de madeira está lascado na base, com marcas de cimento seco e poeira cinza." },
            "Revólver Silenciado": { phase: 2, text: "O silenciador artesanal rosqueável exibe oxidação ácida severa e traços de limo verde e gordura industrial." }
        }
    },
    {
        id: 12,
        difficulty: "difficult",
        title: "Caso 12: Execução sob a Névoa",
        suspects: ["Secretária Sterling", "Don Salieri", "Detetive Kelly", "Mafioso Genovese"],
        locations: ["O Pátio de Carga", "O Cais Abandonado", "O Armazém do Porto", "A Falésia do Farol"],
        weapons: ["Armadilha de Aço", "Faca de Açougueiro", "Arpão Enferrujado", "Corrente de Carga"],
        solutionHashSuspect: "2b9f365908b2ca06d2b8b7a9fc572e2bc5719280b311bff4cb9116b587d32fe5",
        solutionHashComplete: "593dd6c764b2f0e1bb550f889d9ebda09a9c01e4339cf2f125dd47b0d4951f1d",
        victim: {
            name: "Contador Albert \"Dízimo\"",
            sex: "M",
            age: "50",
            height: "1,69 m",
            eyes: "Azuis",
            scar: "Nenhuma",
            description: "O Contador Albert tinha 50 anos e 1,69 m de altura, com amendoados olhos azuis. Foi encontrado sem vida sob a Falésia do Farol; o corpo apresenta lesões profundas de corte e mutilação na parede abdominal, sem fraturas ósseas por queda ou esmagamento."
        },
        suspectsData: {
            "Secretária Sterling": { sex: "F", age: "26", height: "1,66 m", eyes: "Castanhos", scar: "Sinal de nascença no pescoço", description: "A Secretária Sterling tem 26 anos, 1,66 m de altura e atentos olhos castanhos. Ela exibe uma pequena marca escura semelhante a uma cicatriz ou sinal de nascença no pescoço, e era a única com acesso direto aos relatórios da mesa de Salieri." },
            "Don Salieri": { sex: "M", age: "61", height: "1,75 m", eyes: "Pretos", scar: "Nenhuma", description: "Don Salieri é o respeitado chefe mafioso de 61 anos com 1,75 m de altura e olhos pretos como abismos. Seu comportamento calmo esconde um homem implacável que comanda execuções sem hesitar a partir de sua alfaiataria." },
            "Detetive Kelly": { sex: "M", age: "42", height: "1,81 m", eyes: "Verdes", scar: "Cicatriz no queixo", description: "O Detetive Kelly é um investigador experiente de 42 anos com 1,81 m de altura e astutos olhos verdes. Emprega sua cicatriz fina de navalha no queixo como lembrete de confrontos anteriores, sendo ainda mais frio com os criminosos." },
            "Mafioso Genovese": { sex: "M", age: "45", height: "1,84 m", eyes: "Cinzentos", scar: "Cicatriz na testa", description: "Genovese é o fiel executor de 45 anos com 1,84 m de altura e olhos cinzentos inexpressivos. Ele possui uma longa cicatriz linear na testa, escondida rente ao cabelo, marca de um tiroteio no porto do qual ele sobreviveu para servir a Salieri." }
        },
        locationsData: {
            "O Pátio de Carga": { description: "Vagões de trem cargueiros estacionados, piso de cascalho e trilhos de ferro" },
            "O Cais Abandonado": { description: "Tábuas de madeira podres e úmidas, pilares cobertos de cracas marinhas" },
            "O Armazém do Porto": { description: "Portas de enrolar de metal enferrujado, caixas e barris empilhados na penumbra" },
            "A Falésia do Farol": { description: "Penhasco rochoso íngreme sobre o oceano, forte ventania e barulho das ondas" }
        },
        weaponsData: {
            "Armadilha de Aço": { description: "Mandíbulas denteadas de ferro pesado, mola de alta pressão enferrujada" },
            "Faca de Açougueiro": { description: "Lâmina larga e afiada de 10 polegadas, cabo de madeira fixado com rebites" },
            "Arpão Enferrujado": { description: "Ponta de arpão com farpa metálica oxidada pela água salgada, cabo quebrado" },
            "Corrente de Carga": { description: "Elos espessos de aço forjado, coberta de fuligem industrial preta" }
        },
        symbols: {
            "S": "Secretária Sterling",
            "D": "Don Salieri",
            "K": "Detetive Kelly",
            "G": "Mafioso Genovese",
            "P": "O Pátio de Carga",
            "C": "O Cais Abandonado",
            "A": "O Armazém do Porto",
            "F": "A Falésia do Farol",
            "Ar": "Armadilha de Aço",
            "Fa": "Faca de Açougueiro",
            "Ap": "Arpão Enferrujado",
            "Co": "Corrente de Carga"
        },
        clues: {
            portuguese: [
                "Um velho pescador viu a assistente de 26 anos com sinal de nascença no pescoço parada no cais de tábuas podres e pilares com cracas.",
                "O vigia registrou que o braço direito de 45 anos com uma cicatriz na testa entrou no armazém de portas de metal enferrujado na penumbra.",
                "Se o chefe de 61 anos com olhos pretos portava a lâmina larga de 10 polegadas com rebites no cabo, ele subiu até o penhasco rochoso com ventania constante.",
                "Estar no armazém de portas de metal enferrujado na penumbra equivale a portar a corrente de elos espessos e manchada de fuligem.",
                "Estar no pátio de cascalho com vagões de trem estacionados equivale a portar o arpão de ponta de metal oxidada se e somente se a assistente de 26 anos não estava no armazém de portas de metal enferrujado.",
                "Se a assistente de 26 anos com sinal de nascença no pescoço estava com a Armadilha de Aço, então o investigador de 42 anos com cicatriz no queixo estava com o arpão de ponta de metal oxidada.",
                "A busca na alfaiataria provou ser falso que o chefe de 61 anos portasse o dispositivo de mandíbulas denteadas ou a corrente de elos espessos e manchada de fuligem.",
                "O inventário atesta que o investigador com cicatriz no queixo não carregava o dispositivo de mandíbulas denteadas de ferro da corporação."
            ],
            logic: [
                "C(S)",
                "A(G)",
                "Fa(D) → F(D)",
                "A ↔ Co",
                "(P ↔ Ap) ↔ ¬ A(S)",
                "Ar(S) → Ap(K)",
                "¬ (Ar(D) ∨ Co(D))",
                "¬ Ar(K)"
            ]
        },
        explanation: "Pela Pista 1, sabemos que a Secretária Sterling estava no Cais Abandonado: C(S). Como os locais são únicos, ela não estava no Armazém do Porto (¬ A(S) é VERDADE). Pela Pista 5, como o lado direito da bicondicional é VERDADE (¬ A(S)), o lado esquerdo também deve ser VERDADE: P ↔ Ap (estar no Pátio de Carga equivale a portar o Arpão Enferrujado). Pela Pista 2, sabemos que o Mafioso Genovese estava no Armazém do Porto: A(G). Pela Pista 4 (A ↔ Co), concluímos que ele estava com a Corrente de Carga: Co(G). Pela Pista 7, temos ¬ (Ar(D) ∨ Co(D)) (Don Salieri não estava com a Armadilha de Aço nem com a Corrente de Carga). Pela Pista 8, temos ¬ Ar(K) (o Detetive Kelly não estava com a Armadilha de Aço). Como Genovese estava com a Corrente de Carga (Co(G)), e nem Salieri nem Kelly estavam com a Armadilha, por exclusão de armas, a Secretária Sterling estava com a Armadilha de Aço: Ar(S). Pela Pista 6 (Ar(S) → Ap(K)), aplicando Modus Ponens, deduzimos que o Detetive Kelly estava com o Arpão Enferrujado: Ap(K). Pela equivalência P ↔ Ap, como Kelly tem o Arpão (Ap(K)), ele estava no Pátio de Carga: P(K). Por exclusão de locais, Don Salieri estava na Falésia do Farol: F(D). Por exclusão de armas, Don Salieri estava com a Faca de Açougueiro: Fa(D). Pela Pista 3, temos Fa(D) → F(D). Como provamos Fa(D) na etapa anterior, por Modus Ponens: Fa(D) ∧ (Fa(D) → F(D)) ⊢ F(D). Como o culpado estava na Falésia do Farol (Culpado ∈ F), ele é Don Salieri com a Faca de Açougueiro!",
        investigations: {
            "Secretária Sterling": { phase: 0, text: "Sterling secava as lágrimas com um lenço, reclamando da umidade gélida que subia do mar." },
            "Don Salieri": { phase: 1, text: "Salieri ajeitou o colarinho de seu casaco de seda preta sob medida com precisão obsessiva e silenciosa." },
            "Detetive Kelly": { phase: 1, text: "O detetive mascava chiclete de menta com vigor, observando a movimentação dos faróis costeiros no mar." },
            "Mafioso Genovese": { phase: 2, text: "Genovese batia os sapatos no chão impacientemente, queixando-se do atraso da equipe pericial." },
            "O Pátio de Carga": { phase: 0, text: "Uma nota fiscal antiga de transporte de caixotes de maçãs datada de três semanas atrás, rasgada ao meio." },
            "O Cais Abandonado": { phase: 1, text: "Marcas de oxidação de ferro recentes nas amarras de madeira e pedaços de algas marinhas secas." },
            "O Armazém do Porto": { phase: 2, text: "Um par de luvas de borracha furadas e amareladas jogado sobre uma pilha de redes de pesca velhas." },
            "A Falésia do Farol": { phase: 1, text: "La vegetação rasteira exibe marcas de pisadas profundas e fios de costura de seda preta presos nos espinhos." },
            "Armadilha de Aço": { phase: 2, text: "Apresenta poeira seca de depósito e dentes de metal sem qualquer sinal de ativação recente." },
            "Faca de Açougueiro": { phase: 2, text: "A lâmina de aço apresenta marcas de contato salino e vestígios microscópicos de giz de alfaiate branco." },
            "Arpão Enferrujado": { phase: 0, text: "A ponta do arpão está coberta de sal marinho seco e restos de algas marinhas desidratadas." },
            "Corrente de Carga": { phase: 0, text: "Os elos de metal pesado exibem marcas de graxa lubrificante de guindaste portuário seca." }
        }
    }
];







// 2. ESTADO DO JOGO
let currentDifficulty = null;
let activeChallengeIndex = 0; // Índice relativo dentro da dificuldade selecionada (0 a 3)
let activeChallenge = null;
let currentMode = "portuguese"; // "portuguese" ou "logic"
let gridZoom = 1.0; // Nível de zoom inicial do grid
let gridMarks = {}; // Armazena as marcações do grid: { "rowName-colName": "X", "✔️", "" }
let activeDossierTab = 'suspects';
let maxLives = parseInt(getSecureItem("murdle_max_lives")) || 3;
let lives = getSecureItem("murdle_current_lives") !== null ? parseInt(getSecureItem("murdle_current_lives")) : maxLives;

// Armazenamento de progresso resolvido e falho
let solvedChallenges = getSecureItem("murdle_solved_challenges", true) || [];
let failedChallenges = getSecureItem("murdle_failed_challenges", true) || {};

// Tratamento caso o jogador recarregue a página com 0 vidas (força recomeçar do zero)
if (lives <= 0) {
    maxLives = 3;
    lives = 3;
    solvedChallenges = [];
    failedChallenges = {};
    localStorage.removeItem("murdle_solved_challenges");
    localStorage.removeItem("murdle_failed_challenges");
    localStorage.removeItem("murdle_reward_easy_completed");
    localStorage.removeItem("murdle_reward_medium_completed");
    setSecureItem("murdle_max_lives", maxLives);
    setSecureItem("murdle_current_lives", lives);
}

// Detetive selecionado e nome para assinatura
let selectedDetective = localStorage.getItem("murdle_selected_detective") || "";
let detectiveName = localStorage.getItem("murdle_detective_name") || "";
let isEditingDetective = false;
let previousScreenBeforeRules = "menu-screen";
let previousScreenBeforeCharSelection = "menu-screen";

// 3. INICIALIZAÇÃO
document.addEventListener("DOMContentLoaded", () => {
    // Monitoramento do vídeo de fundo para evitar botão de play nativo travado
    const bgVideo = document.querySelector('.bg-video');
    if (bgVideo) {
        bgVideo.addEventListener('contextmenu', e => e.preventDefault()); // Evita menu de contexto
        
        const playPromise = bgVideo.play();
        if (playPromise !== undefined) {
            playPromise.catch(error => {
                console.warn("Autoplay do vídeo de fundo bloqueado pelo navegador/sistema:", error);
                bgVideo.style.display = 'none'; // Oculta o vídeo para que o botão de play não apareça
            });
        }
        
        // Se o vídeo for pausado pelo sistema posteriormente (ex: economia de energia, perda de foco)
        bgVideo.addEventListener('pause', () => {
            bgVideo.play().catch(error => {
                console.warn("Falha ao retomar vídeo de fundo pausado:", error);
                bgVideo.style.display = 'none';
            });
        });
    }

    updateProgressUI();
    setupDifficultyCards();
    
    // Configurar o Switch de Idioma
    const modeSwitch = document.getElementById("mode-switch");
    if (modeSwitch) {
        modeSwitch.addEventListener("change", (e) => {
            if (e.target.checked) {
                setMode("logic");
            } else {
                setMode("portuguese");
            }
        });
    }

    // Permitir clique nos textos do switch de idioma
    const optPt = document.getElementById("opt-pt");
    if (optPt) {
        optPt.addEventListener("click", () => {
            if (modeSwitch) modeSwitch.checked = false;
            setMode("portuguese");
        });
    }
    
    const optLog = document.getElementById("opt-log");
    if (optLog) {
        optLog.addEventListener("click", () => {
            if (modeSwitch) modeSwitch.checked = true;
            setMode("logic");
        });
    }
    
    // Sincronizar o estado de idioma das pistas no carregamento inicial
    setMode(currentMode);
    
    // Configurar os botões de Zoom do Grid
    setupGridZoom();

    // Sincronizar seletores de acusação com a ficha de relatório policial
    const selectSuspect = document.getElementById("select-suspect");
    const selectLocation = document.getElementById("select-location");
    if (selectSuspect) {
        selectSuspect.addEventListener("change", syncReportWithSelection);
    }
    if (selectLocation) {
        selectLocation.addEventListener("change", syncReportWithSelection);
    }

    // Inicializa as informações do detetive
    initializeDetective();
});

// Sincroniza a acusação feita na tela principal com os campos do relatório policial
function syncReportWithSelection() {
    if (!activeChallenge) return;
    const selectSuspectVal = document.getElementById("select-suspect").value;
    const selectLocationVal = document.getElementById("select-location").value;
    
    const elSuspectName = document.getElementById("report-suspect-name");
    const elSuspectSex = document.getElementById("report-suspect-sex");
    const elSuspectAge = document.getElementById("report-suspect-age");
    const elSuspectHeight = document.getElementById("report-suspect-height");
    const elLocation = document.getElementById("report-location");
    
    if (elLocation && selectLocationVal) {
        elLocation.value = selectLocationVal;
    }
    
    if (elSuspectName) {
        elSuspectName.value = selectSuspectVal;
        const sData = activeChallenge.suspectsData ? activeChallenge.suspectsData[selectSuspectVal] : null;
        if (sData) {
            if (elSuspectSex) elSuspectSex.value = sData.sex;
            if (elSuspectAge) elSuspectAge.value = sData.age;
            if (elSuspectHeight) elSuspectHeight.value = sData.height;
        } else {
            if (elSuspectSex) elSuspectSex.value = "";
            if (elSuspectAge) elSuspectAge.value = "";
            if (elSuspectHeight) elSuspectHeight.value = "";
        }
    }
}

// 4. ATUALIZAR INTERFACE DE PROGRESSO DO MENU E CONTROLAR BLOQUEIOS
function updateProgressUI() {
    const categories = ["easy", "medium", "difficult"];
    categories.forEach(cat => {
        const catChallenges = challenges.filter(c => c.difficulty === cat);
        const solvedInCat = catChallenges.filter(c => solvedChallenges.includes(c.id)).length;
        document.getElementById(`prog-${cat}`).innerText = `${solvedInCat} / ${catChallenges.length} resolvidos`;
        
        // Renderizar botões de seleção de desafios específicos
        const listContainer = document.getElementById(`list-${cat}`);
        if (listContainer) {
            listContainer.innerHTML = "";
            catChallenges.forEach((chal, idx) => {
                const isSolved = solvedChallenges.includes(chal.id);
                const failureType = failedChallenges[chal.id];
                const failureStatus = (typeof failureType === 'object' && failureType !== null) ? failureType.status : failureType;
                const isFailed = !!failureStatus;
                
                const btn = document.createElement("button");
                btn.className = `case-btn ${isSolved ? 'solved' : (isFailed ? 'failed' : '')}`;
                
                // Aplicar classe de estilo de acordo com o status
                if (isSolved) {
                    btn.classList.add("solved");
                } else if (isFailed) {
                    if (failureStatus === "sem-provas") {
                        btn.classList.add("failed-sem-provas");
                    } else {
                        btn.classList.add("failed-inocente");
                    }
                }
                
                // Encurtar título removendo "Caso X: "
                const title = chal.title.replace(/^Caso \d+:\s*/i, "");
                
                let statusHtml = '🔍';
                if (isSolved) {
                    statusHtml = '✔️ SUCESSO';
                } else if (isFailed) {
                    statusHtml = failureStatus === 'sem-provas' ? '⚠️ SEM PROVAS' : '💀 INOCENTE';
                }
                
                btn.innerHTML = `
                    <span>${idx + 1}. ${title}</span>
                    <span class="case-status" style="font-size:0.7rem; font-weight:bold; font-family:var(--font-mono);">${statusHtml}</span>
                `;
                
                // Clique para jogar este caso específico
                btn.onclick = (e) => {
                    e.stopPropagation(); // Evita acionar clique do card pai
                    loadChallenge(cat, idx);
                };
                listContainer.appendChild(btn);
            });
        }
    });
}

function setupDifficultyCards() {
    const cardEasy = document.getElementById("card-easy");
    const cardMedium = document.getElementById("card-medium");
    const cardDifficult = document.getElementById("card-difficult");

    // Identificar IDs correspondentes por categoria
    const easyIds = challenges.filter(c => c.difficulty === "easy").map(c => c.id);
    const mediumIds = challenges.filter(c => c.difficulty === "medium").map(c => c.id);

    // Condições de liberação:
    // Médio libera ao resolver pelo menos 1 Fácil
    const isMediumUnlocked = solvedChallenges.some(id => easyIds.includes(id));
    // Difícil libera ao resolver pelo menos 1 Médio
    const isDifficultUnlocked = solvedChallenges.some(id => mediumIds.includes(id));

    // Card Fácil (sempre ativo)
    cardEasy.classList.remove("locked");
    cardEasy.onclick = () => selectDifficulty("easy");

    // Card Médio
    if (isMediumUnlocked) {
        cardMedium.classList.remove("locked");
        cardMedium.onclick = () => selectDifficulty("medium");
    } else {
        cardMedium.classList.add("locked");
        cardMedium.onclick = null;
    }

    // Card Difícil
    if (isDifficultUnlocked) {
        cardDifficult.classList.remove("locked");
        cardDifficult.onclick = () => selectDifficulty("difficult");
    } else {
        cardDifficult.classList.add("locked");
        cardDifficult.onclick = null;
    }
}

// 5. ALTERNAR MODO DE LEITURA (PT ↔ LÓGICA)
function setMode(mode) {
    currentMode = mode;
    
    const modeSwitch = document.getElementById("mode-switch");
    if (modeSwitch) {
        modeSwitch.checked = (mode === "logic");
    }
    
    const optPt = document.getElementById("opt-pt");
    const optLog = document.getElementById("opt-log");
    const legendBox = document.getElementById("legend-box");
    const gameScreen = document.getElementById("game-screen");
    const caseLogicLegend = document.getElementById("case-logic-legend");

    if (mode === "logic") {
        optLog.classList.add("active");
        optPt.classList.remove("active");
        legendBox.style.display = "block";
        if (caseLogicLegend) caseLogicLegend.style.display = "block";
        gameScreen.classList.add("mode-logic-active");
    } else {
        optPt.classList.add("active");
        optLog.classList.remove("active");
        legendBox.style.display = "none";
        if (caseLogicLegend) caseLogicLegend.style.display = "none";
        gameScreen.classList.remove("mode-logic-active");
    }

    // Se houver um desafio ativo, atualiza a lista de pistas
    if (activeChallenge) {
        renderClues();
    }
}



// Dicionário para rastrear a posição do scroll de cada tela
const screenScrollPositions = {};

function showScreen(screenId) {
    // 1. Salva a posição de rolagem atual da tela que está sendo desativada
    const currentActiveScreen = document.querySelector(".screen.active");
    if (currentActiveScreen) {
        screenScrollPositions[currentActiveScreen.id] = window.scrollY;
    }

    // 2. Remove o estado ativo de todas as telas
    document.querySelectorAll(".screen").forEach(s => {
        s.classList.remove("active");
    });
    
    // 3. Ativa a nova tela alvo
    const activeScreen = document.getElementById(screenId);
    if (activeScreen) {
        activeScreen.classList.add("active");
    }
    
    // 4. Gerenciar classe de tela cheia no body (só ativa no gameplay)
    if (screenId === "game-screen") {
        document.body.classList.add("game-active");
    } else {
        document.body.classList.remove("game-active");
    }

    // 5. Recupera a posição de scroll anterior e rola a tela
    const targetScrollY = screenScrollPositions[screenId] || 0;
    setTimeout(() => {
        window.scrollTo({
            top: targetScrollY,
            behavior: 'instant'
        });
    }, 0);
}

function selectDifficulty(diff) {
    currentDifficulty = diff;
    
    // Acha o primeiro caso não resolvido dessa dificuldade, senão o primeiro caso
    const catChallenges = challenges.filter(c => c.difficulty === diff);
    let indexToLoad = 0;
    
    for (let i = 0; i < catChallenges.length; i++) {
        if (!solvedChallenges.includes(catChallenges[i].id)) {
            indexToLoad = i;
            break;
        }
    }
    
    loadChallenge(diff, indexToLoad);
}

function backToMenu() {
    updateProgressUI();
    setupDifficultyCards();
    showScreen("menu-screen");
}

// 7. CARREGAMENTO DO DESAFIO
function loadChallenge(difficulty, index) {
    const catChallenges = challenges.filter(c => c.difficulty === difficulty);
    activeChallengeIndex = index;
    activeChallenge = catChallenges[index];
    
    gridMarks = {}; // Reseta marcações do grid
    // Mantém as vidas do caso anterior
    updateLivesUI();
    
    // Atualizar Cabeçalho
    const diffBadge = document.getElementById("case-difficulty-badge");
    diffBadge.className = `case-badge ${difficulty}`;
    diffBadge.innerText = difficulty === "easy" ? "Fácil" : (difficulty === "medium" ? "Médio" : "Difícil");
    
    document.getElementById("case-title").innerText = activeChallenge.title;
    document.getElementById("case-index").innerText = `Caso ${activeChallengeIndex + 1} de ${catChallenges.length}`;
    
    // Renderizar Elementos
    renderClues();
    renderCaseLogicLegend(); // Renderizar legenda dinâmica de símbolos do caso
    setupSelectors();
    generateGrid();
    
    // Atualizar visibilidade do botão de Objetos no Dossiê
    const btnWeapons = document.getElementById("btn-dossier-weapons");
    if (btnWeapons) {
        btnWeapons.style.display = activeChallenge.difficulty === "easy" ? "none" : "block";
    }

    // Resetar zoom do grid ao carregar o desafio
    gridZoom = 1.0;
    const table = document.querySelector(".logic-grid");
    if (table) table.style.transform = "scale(1.0)";

    // Se estiver em modo lógica, atualiza exibição da legenda
    const caseLogicLegend = document.getElementById("case-logic-legend");
    if (caseLogicLegend) {
        caseLogicLegend.style.display = currentMode === "logic" ? "block" : "none";
    }
    
    // Atualizar o estado de bloqueio e exibir botão de explicação se resolvido
    updateChallengeLockState();
    
    showScreen("game-screen");
}

// 8. RENDERIZAR PISTAS
function renderClues() {
    const cluesList = document.getElementById("clues-list");
    cluesList.innerHTML = "";
    
    const activeClues = currentMode === "logic" ? activeChallenge.clues.logic : activeChallenge.clues.portuguese;
    
    activeClues.forEach(clue => {
        const li = document.createElement("li");
        
        // Destacar conectivos na visualização lógica para fins didáticos
        if (currentMode === "logic") {
            let formattedClue = clue
                .replace(/¬/g, "<strong>¬</strong>")
                .replace(/∧/g, "<strong>∧</strong>")
                .replace(/∨/g, "<strong>∨</strong>")
                .replace(/⊕/g, "<strong>⊕</strong>")
                .replace(/→/g, "<strong>→</strong>")
                .replace(/↔/g, "<strong>↔</strong>")
                .replace(/∈/g, "<strong>∈</strong>")
                .replace(/≡/g, "<strong>≡</strong>");
            li.innerHTML = formattedClue;
        } else {
            li.innerText = clue;
        }
        
        cluesList.appendChild(li);
    });
}

// 8.1. CONTROLAR E RENDERIZAR O DOSSIÊ EM MODAL CENTRAL
// 8.1. CONTROLAR E RENDERIZAR O DOSSIÊ EM MODAL CENTRAL
function openDossierModal(category) {
    const modal = document.getElementById("dossier-modal");
    const titleEl = document.getElementById("dossier-modal-title");
    const contentEl = document.getElementById("dossier-modal-content");
    
    if (!modal || !contentEl || !activeChallenge) return;
    
    contentEl.innerHTML = "";
    
    if (category === 'victim') {
        titleEl.innerHTML = "💀 Ficha da Vítima";
        if (activeChallenge.victim) {
            const v = activeChallenge.victim;
            contentEl.innerHTML = `
                <div style="margin-bottom: 1rem;">
                    <span style="color: var(--accent-red); font-weight: bold; font-size: 1.25rem;">${v.name}</span><br>
                    <p style="margin-top: 1rem; font-style: italic; color: var(--text-primary); line-height: 1.6; font-family: var(--font-sans); font-size: 1rem;">"${v.description || ''}"</p>
                </div>
            `;
        } else {
            contentEl.innerHTML = "<p>Nenhuma informação sobre a vítima disponível.</p>";
        }
    } else if (category === 'suspects') {
        titleEl.innerHTML = "👥 Dossiê dos Suspeitos";
        
        let tabsHtml = '<div class="dossier-tabs">';
        let contentHtml = '';
        let index = 0;
        
        const suspects = activeChallenge.suspects || [];
        const suspectsData = activeChallenge.suspectsData || {};
        
        suspects.forEach(name => {
            const data = suspectsData[name] || { description: "Sem descrição adicional" };
            const activeClass = index === 0 ? 'active' : '';
            const tabId = `suspect-${index}`;
            
            tabsHtml += `<button class="dossier-tab-btn ${activeClass}" data-tab="${tabId}" onclick="switchDossierTab('${tabId}')">👤 ${name}</button>`;
            
            let extraInfoHtml = '';
            if (activeChallenge.difficulty === "difficult") {
                const escapedName = name.replace(/'/g, "\\'").replace(/"/g, '&quot;');
                extraInfoHtml = `
                    <div class="investigation-box" style="margin-top: 1.5rem; padding-top: 1rem; border-top: 1px dashed var(--border-color);">
                        <button class="menu-btn primary-btn" style="padding: 0.5rem 1rem; font-size: 0.85rem;" onclick="tryInvestigate('${escapedName}', this)">🔍 Investigar Suspeito</button>
                        <p class="investigation-result" style="margin-top: 0.75rem; font-size: 0.9rem; display: none; padding: 0.75rem; background: rgba(0,0,0,0.2); border-radius: 4px; font-family: var(--font-sans); line-height: 1.5;"></p>
                    </div>
                `;
            }

            contentHtml += `
                <div id="dossier-tab-content-${tabId}" class="dossier-tab-content ${activeClass}">
                    <span style="color: var(--accent-amber); font-weight: bold; font-size: 1.15rem;">👤 ${name}</span><br>
                    <p style="margin-top: 1rem; font-style: italic; color: var(--text-primary); line-height: 1.6; font-family: var(--font-sans); font-size: 1rem;">"${data.description || ''}"</p>
                    ${extraInfoHtml}
                </div>
            `;
            index++;
        });
        tabsHtml += '</div>';
        contentEl.innerHTML = tabsHtml + contentHtml;
        
    } else if (category === 'locations') {
        titleEl.innerHTML = "📍 Dossiê dos Locais";
        
        let tabsHtml = '<div class="dossier-tabs">';
        let contentHtml = '';
        let index = 0;
        
        const locations = activeChallenge.locations;
        const locData = activeChallenge.locationsData || {};
        
        locations.forEach(loc => {
            const activeClass = index === 0 ? 'active' : '';
            const tabId = `location-${index}`;
            const data = locData[loc] || { description: "Sem descrição adicional" };
            
            tabsHtml += `<button class="dossier-tab-btn ${activeClass}" data-tab="${tabId}" onclick="switchDossierTab('${tabId}')">📍 ${loc}</button>`;
            
            let extraInfoHtml = '';
            if (activeChallenge.difficulty === "difficult") {
                const escapedName = loc.replace(/'/g, "\\'").replace(/"/g, '&quot;');
                extraInfoHtml = `
                    <div class="investigation-box" style="margin-top: 1.5rem; padding-top: 1rem; border-top: 1px dashed var(--border-color);">
                        <button class="menu-btn primary-btn" style="padding: 0.5rem 1rem; font-size: 0.85rem;" onclick="tryInvestigate('${escapedName}', this)">🔍 Investigar Local</button>
                        <p class="investigation-result" style="margin-top: 0.75rem; font-size: 0.9rem; display: none; padding: 0.75rem; background: rgba(0,0,0,0.2); border-radius: 4px; font-family: var(--font-sans); line-height: 1.5;"></p>
                    </div>
                `;
            }

            contentHtml += `
                <div id="dossier-tab-content-${tabId}" class="dossier-tab-content ${activeClass}">
                    <span style="color: var(--accent-amber); font-weight: bold; font-size: 1.15rem;">📍 ${loc}</span><br>
                    <p style="margin-top: 1rem; font-style: italic; color: var(--text-primary); line-height: 1.6; font-family: var(--font-sans); font-size: 1rem;">"${data.description}"</p>
                    ${extraInfoHtml}
                </div>
            `;
            index++;
        });
        tabsHtml += '</div>';
        contentEl.innerHTML = tabsHtml + contentHtml;
        
    } else if (category === 'weapons') {
        titleEl.innerHTML = "🔪 Dossiê dos Objetos";
        
        let tabsHtml = '<div class="dossier-tabs">';
        let contentHtml = '';
        let index = 0;
        
        const weapons = activeChallenge.weapons || [];
        const wepData = activeChallenge.weaponsData || {};
        
        weapons.forEach(wep => {
            const activeClass = index === 0 ? 'active' : '';
            const tabId = `weapon-${index}`;
            const data = wepData[wep] || { description: "Sem descrição adicional" };
            
            tabsHtml += `<button class="dossier-tab-btn ${activeClass}" data-tab="${tabId}" onclick="switchDossierTab('${tabId}')">🔪 ${wep}</button>`;
            
            let extraInfoHtml = '';
            if (activeChallenge.difficulty === "difficult") {
                const escapedName = wep.replace(/'/g, "\\'").replace(/"/g, '&quot;');
                extraInfoHtml = `
                    <div class="investigation-box" style="margin-top: 1.5rem; padding-top: 1rem; border-top: 1px dashed var(--border-color);">
                        <button class="menu-btn primary-btn" style="padding: 0.5rem 1rem; font-size: 0.85rem;" onclick="tryInvestigate('${escapedName}', this)">🔍 Investigar Objeto</button>
                        <p class="investigation-result" style="margin-top: 0.75rem; font-size: 0.9rem; display: none; padding: 0.75rem; background: rgba(0,0,0,0.2); border-radius: 4px; font-family: var(--font-sans); line-height: 1.5;"></p>
                    </div>
                `;
            }

            contentHtml += `
                <div id="dossier-tab-content-${tabId}" class="dossier-tab-content ${activeClass}">
                    <span style="color: var(--accent-amber); font-weight: bold; font-size: 1.15rem;">🔪 ${wep}</span><br>
                    <p style="margin-top: 1rem; font-style: italic; color: var(--text-primary); line-height: 1.6; font-family: var(--font-sans); font-size: 1rem;">"${data.description}"</p>
                    ${extraInfoHtml}
                </div>
            `;
            index++;
        });
        tabsHtml += '</div>';
        contentEl.innerHTML = tabsHtml + contentHtml;
    }
    
    modal.classList.add("active");
}

window.tryInvestigate = function(name, btn) {
    if (!activeChallenge || !activeChallenge.investigations) return;
    const inv = activeChallenge.investigations[name];
    if (!inv) return;
    
    // Contar marcações no grid
    const activeMarksCount = Object.values(gridMarks).filter(val => val !== "").length;
    let currentPhase = -1;
    if (activeMarksCount >= 38) {
        currentPhase = 2; // >= 80% do grid difícil (48 células)
    } else if (activeMarksCount >= 19) {
        currentPhase = 1; // >= 40% do grid difícil (48 células)
    } else if (activeMarksCount >= 1) {
        currentPhase = 0; // >= 1 marcação
    }
    
    const container = btn.closest('.investigation-box');
    const resultEl = container.querySelector('.investigation-result');
    resultEl.style.display = "block";
    
    if (currentPhase >= inv.phase) {
        resultEl.style.color = "var(--text-primary)";
        resultEl.innerText = inv.text;
    } else {
        resultEl.style.color = "var(--accent-red)";
        resultEl.innerText = "A investigação está muito no início ainda para obter esse tipo de informação.";
    }
};

function closeDossierModal() {
    const modal = document.getElementById("dossier-modal");
    if (modal) modal.classList.remove("active");
}

// Alternar as abas no modal do dossiê
window.switchDossierTab = function(tabId) {
    const tabs = document.querySelectorAll(".dossier-tab-btn");
    const contents = document.querySelectorAll(".dossier-tab-content");
    
    tabs.forEach(tab => {
        if (tab.getAttribute("data-tab") === tabId) {
            tab.classList.add("active");
        } else {
            tab.classList.remove("active");
        }
    });
    
    contents.forEach(content => {
        if (content.id === `dossier-tab-content-${tabId}`) {
            content.classList.add("active");
        } else {
            content.classList.remove("active");
        }
    });
};

// 9. CONFIGURAR SELETORES DE ACUSAÇÃO
function setupSelectors() {
    const selectSuspect = document.getElementById("select-suspect");
    const selectLocation = document.getElementById("select-location");
    const selectWeapon = document.getElementById("select-weapon");
    const groupWeapon = document.getElementById("group-weapon");

    // Limpar selectors
    selectSuspect.innerHTML = '<option value="">-- Selecione o Suspeito --</option>';
    selectLocation.innerHTML = '<option value="">-- Selecione o Local --</option>';
    selectWeapon.innerHTML = '<option value="">-- Selecione a Arma --</option>';

    // Preencher Suspeitos e Locais
    activeChallenge.suspects.forEach(s => {
        const opt = document.createElement("option");
        opt.value = s;
        opt.textContent = s;
        selectSuspect.appendChild(opt);
    });
    
    activeChallenge.locations.forEach(l => {
        const opt = document.createElement("option");
        opt.value = l;
        opt.textContent = l;
        selectLocation.appendChild(opt);
    });

    // Exibir ou ocultar arma
    if (activeChallenge.difficulty === "easy") {
        groupWeapon.style.display = "none";
    } else {
        groupWeapon.style.display = "flex";
        activeChallenge.weapons.forEach(w => {
            const opt = document.createElement("option");
            opt.value = w;
            opt.textContent = w;
            selectWeapon.appendChild(opt);
        });
    }
}

// Função auxiliar para encurtar nomes longos nos cabeçalhos da tabela logic-grid
function getShortName(name) {
    if (!name) return "";
    // Remover apelidos entre aspas, ex: Vito "O Navalha" Genovese -> Vito Genovese
    let clean = name.replace(/\s*".*?"\s*/g, " ");
    
    // Remover artigos e títulos comuns
    clean = clean.replace(/^(O|A|Os|As|Um|Uma|Vice-Presidente|Astrólogo|Almirante|Agente|Grão-Mestre|Conde|Treinador|Policial|Criptozoólogo|Ervanária|Chef|Herborista|Alto Alquimista|Numerólogo|Filólogo|Bispo|Madame|Senhorita|Senhor|Dra\.|Dr\.|Prof\.|Sra\.|Sra|Sr\.|Sr|Don|Inspetor|Mordomo|Condutor|Senador|Advogado|Detetive|Jornalista|Duquesa|Químico|Diretor|Magnata|Marinheiro|Capitão|Estivador|Ilusionista|Atriz|Crítico|Informante|Juíza|Matador|Secretária|Mafioso)\s+/i, "");
    // Remover qualificadores pós-nome
    clean = clean.replace(/,\s*Esq\.?/i, "");
    
    // Tratamentos específicos
    if (clean.toLowerCase().startsWith("meia-noite")) return "Meia-Noite";
    if (clean.toLowerCase().startsWith("sala de")) return "Servidores";
    if (clean.toLowerCase().startsWith("escritório")) return "Escritório";
    if (clean.toLowerCase().startsWith("beco")) return "Beco";
    if (clean.toLowerCase().startsWith("balcão")) return "Balcão";
    if (clean.toLowerCase().startsWith("píer")) return "Píer";
    if (clean.toLowerCase().startsWith("galpão")) return "Galpão";
    if (clean.toLowerCase().startsWith("docas")) return "Docas";
    if (clean.toLowerCase().startsWith("estufa")) return "Estufa";
    if (clean.toLowerCase().startsWith("hall")) return "Hall";
    if (clean.toLowerCase().startsWith("biblioteca")) return "Biblioteca";
    if (clean.toLowerCase().startsWith("cabine")) return "Cabine";
    if (clean.toLowerCase().startsWith("vagão")) return "Vagão";
    if (clean.toLowerCase().startsWith("corredor")) return "Corredor";
    if (clean.toLowerCase().startsWith("quarto")) return "Quarto";
    if (clean.toLowerCase().startsWith("velvet")) return "Velvet";
    if (clean.toLowerCase().startsWith("cofre")) return "Cofre";
    if (clean.toLowerCase().startsWith("estacionamento")) return "Estacionamento";
    if (clean.toLowerCase().startsWith("adega")) return "Adega";
    if (clean.toLowerCase().startsWith("jardim")) return "Jardim";
    if (clean.toLowerCase().startsWith("salão")) return "Salão";
    if (clean.toLowerCase().startsWith("recepção")) return "Recepção";
    if (clean.toLowerCase().startsWith("laboratório")) return "Laboratório";
    if (clean.toLowerCase().startsWith("portão")) return "Portão";
    if (clean.toLowerCase().startsWith("armazém")) return "Armazém";
    if (clean.toLowerCase().startsWith("doca")) return "Doca";
    if (clean.toLowerCase().startsWith("camarins")) return "Camarins";
    if (clean.toLowerCase().startsWith("galeria")) return "Galeria";
    if (clean.toLowerCase().startsWith("palco")) return "Palco";
    if (clean.toLowerCase().startsWith("bilheteria")) return "Bilheteria";
    if (clean.toLowerCase().startsWith("canteiro")) return "Canteiro";
    if (clean.toLowerCase().startsWith("esgoto")) return "Esgoto";
    if (clean.toLowerCase().startsWith("fábrica")) return "Fábrica";
    if (clean.toLowerCase().startsWith("pátio")) return "Pátio";
    if (clean.toLowerCase().startsWith("cais")) return "Cais";
    if (clean.toLowerCase().startsWith("falésia")) return "Falésia";
    
    // Se for local ou arma, tenta pegar a palavra principal (geralmente a primeira se tirarmos os de/da)
    const words = clean.split(/\s+/);
    if (words.length > 1) {
        if (["de", "da", "do", "no", "na", "em", "para", "o", "a", "os", "as"].includes(words[0].toLowerCase())) {
            return words[1];
        }
        return words[0];
    }
    return clean;
}

// 10. GERAÇÃO DINÂMICA DO GRID DE DEDUÇÃO LÓGICA
function generateGrid() {
    const gridContainer = document.getElementById("grid-container");
    gridContainer.innerHTML = "";

    const suspects = activeChallenge.suspects;
    const locations = activeChallenge.locations;
    const weapons = activeChallenge.weapons;
    const difficulty = activeChallenge.difficulty;

    const table = document.createElement("table");
    table.className = "logic-grid";

    // Criar colgroup para garantir a largura física constante de cada coluna no table-layout: fixed
    const colgroup = document.createElement("colgroup");
    
    // Coluna 1 (Categoria lateral rowspan): 30px
    const col1 = document.createElement("col");
    col1.style.width = "30px";
    colgroup.appendChild(col1);
    
    // Coluna 2 (Nomes dos cabeçalhos das linhas): 105px
    const col2 = document.createElement("col");
    col2.style.width = "105px";
    colgroup.appendChild(col2);
    
    // Colunas de dados (Suspeitos + Armas se houver)
    const numDataCols = suspects.length + (difficulty === "easy" ? 0 : weapons.length);
    for (let i = 0; i < numDataCols; i++) {
        const col = document.createElement("col");
        col.style.width = "80px";
        colgroup.appendChild(col);
    }
    table.appendChild(colgroup);

    if (difficulty === "easy") {
        // --- GRID FÁCIL: 3 Suspeitos x 3 Locais ---
        
        // Linha 1: Títulos das Colunas (Suspeitos)
        const trHeaders = document.createElement("tr");
        trHeaders.innerHTML = '<th colspan="2"></th>'; // Célula vazia dupla superior esquerda
        suspects.forEach(s => {
            trHeaders.innerHTML += `<th class="col-header" title="${s}"><span>${getShortName(s)}</span></th>`;
        });
        table.appendChild(trHeaders);

        // Linha 2: Header de Categoria de Colunas
        const trCatCol = document.createElement("tr");
        trCatCol.innerHTML = `<th colspan="2"></th><th colspan="${suspects.length}" class="cat-header col-cat">Suspeitos</th>`;
        table.appendChild(trCatCol);

        // Linhas de Conteúdo (Locais)
        locations.forEach((loc, idx) => {
            const tr = document.createElement("tr");
            
            // Header da linha (Local)
            if (idx === 0) {
                // Header da Categoria de Linhas na primeira linha
                tr.innerHTML = `<th rowspan="${locations.length}" class="cat-header row-cat">Locais</th>`;
            }
            tr.innerHTML += `<td class="row-header" title="${loc}">${getShortName(loc)}</td>`;

            // Células do Grid
            suspects.forEach(sus => {
                tr.appendChild(createCell(loc, sus));
            });
            table.appendChild(tr);
        });

    } else {
        // --- GRID MÉDIO & DIFÍCIL (Com Armas) ---
        const size = suspects.length; // 3 para médio, 4 para difícil

        // Linha 1: Headers superiores das colunas (Suspeitos + Armas)
        const trHeaders = document.createElement("tr");
        trHeaders.innerHTML = '<th colspan="2"></th>';
        suspects.forEach(s => {
            trHeaders.innerHTML += `<th class="col-header" title="${s}"><span>${getShortName(s)}</span></th>`;
        });
        weapons.forEach((w, idx) => {
            const cls = (idx === 0) ? "col-header thick-border-left" : "col-header";
            trHeaders.innerHTML += `<th class="${cls}" title="${w}"><span>${getShortName(w)}</span></th>`;
        });
        table.appendChild(trHeaders);

        // Linha 2: Categorias superiores
        const trCatCol = document.createElement("tr");
        trCatCol.innerHTML = `
            <th colspan="2"></th>
            <th colspan="${size}" class="cat-header col-cat">Suspeitos</th>
            <th colspan="${size}" class="cat-header col-cat thick-border-left">Armas</th>
        `;
        table.appendChild(trCatCol);

        // Seção 1: Locais (linhas) vs (Suspeitos + Armas)
        locations.forEach((loc, idx) => {
            const tr = document.createElement("tr");
            if (idx === 0) {
                tr.innerHTML = `<th rowspan="${size}" class="cat-header row-cat">Locais</th>`;
            }
            tr.innerHTML += `<td class="row-header" title="${loc}">${getShortName(loc)}</td>`;

            // Sub-grid: Locais vs Suspeitos
            suspects.forEach(sus => {
                tr.appendChild(createCell(loc, sus));
            });

            // Sub-grid: Locais vs Armas
            weapons.forEach((w, wIdx) => {
                const isThickLeft = (wIdx === 0);
                tr.appendChild(createCell(loc, w, isThickLeft));
            });
            
            // Borda inferior grossa na última linha de locais
            if (idx === size - 1) {
                tr.className = "thick-border-bottom";
            }
            table.appendChild(tr);
        });

        // Seção 2: Armas (linhas) vs (Suspeitos + Armas)
        weapons.forEach((wRow, idx) => {
            const tr = document.createElement("tr");
            if (idx === 0) {
                tr.innerHTML = `<th rowspan="${size}" class="cat-header row-cat">Armas</th>`;
            }
            tr.innerHTML += `<td class="row-header" title="${wRow}">${getShortName(wRow)}</td>`;

            // Sub-grid: Armas vs Suspeitos
            suspects.forEach(sus => {
                tr.appendChild(createCell(wRow, sus));
            });

            // Sub-grid: Armas vs Armas (Bloqueado)
            weapons.forEach((wCol, colIdx) => {
                const td = document.createElement("td");
                td.className = "cell-blocked";
                if (colIdx === 0) td.classList.add("thick-border-left");
                tr.appendChild(td);
            });
            table.appendChild(tr);
        });
    }

    gridContainer.appendChild(table);
}
// Auxiliar para criar célula do grid
function createCell(rowName, colName, isThickLeft = false) {
    const td = document.createElement("td");
    td.className = "grid-cell";
    if (isThickLeft) {
        td.classList.add("thick-border-left");
    }

    const key = `${rowName}-${colName}`;
    
    // Renderiza a marca se já existir no estado
    if (gridMarks[key]) {
        td.innerText = gridMarks[key];
        if (gridMarks[key] === "❌") td.classList.add("cell-x");
        if (gridMarks[key] === "✔️") td.classList.add("cell-check");
    }

    // Clique para alternar estado: Vazio -> ❌ -> ✔️ -> Vazio
    td.addEventListener("click", () => {
        let currentMark = gridMarks[key] || "";
        let newMark = "";

        if (currentMark === "") {
            newMark = "❌";
            td.innerText = "❌";
            td.className = "grid-cell cell-x";
        } else if (currentMark === "❌") {
            newMark = "✔️";
            td.innerText = "✔️";
            td.className = "grid-cell cell-check";
        } else {
            newMark = "";
            td.innerText = "";
            td.className = "grid-cell";
        }

        if (isThickLeft) td.classList.add("thick-border-left");

        gridMarks[key] = newMark;
    });

    return td;
}

// Limpar todo o grid ativo
function clearActiveGrid() {
    gridMarks = {};
    generateGrid();
}

// Atualizar a interface do contador de vidas
function updateLivesUI() {
    const livesCounter = document.getElementById("lives-counter");
    if (livesCounter) {
        livesCounter.innerText = "❤️".repeat(lives) + "🖤".repeat(maxLives - lives);
    }
}

// Preencher o Relatório Policial de Feedback da Acusação
function fillFeedbackReport(selectSuspect, selectLocation, selectWeapon, status) {
    const now = new Date();
    const optDate = now.toLocaleDateString('pt-BR');
    const optTime = now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

    // Elementos do Relatório de Feedback
    const elDate = document.getElementById("feedback-report-date");
    const elTime = document.getElementById("feedback-report-time");
    const elReportNumber = document.getElementById("feedback-report-number");
    const elCaseId = document.getElementById("feedback-report-case-id");
    const elLocation = document.getElementById("feedback-report-location");
    const elSuspectName = document.getElementById("feedback-report-suspect-name");
    const elSuspectSex = document.getElementById("feedback-report-suspect-sex");
    const elSuspectAge = document.getElementById("feedback-report-suspect-age");
    const elSuspectHeight = document.getElementById("feedback-report-suspect-height");
    const elVictimName = document.getElementById("feedback-report-victim-name");
    const elVictimSex = document.getElementById("feedback-report-victim-sex");
    const elVictimAge = document.getElementById("feedback-report-victim-age");
    const elVictimHeight = document.getElementById("feedback-report-victim-height");
    const elNarrative = document.getElementById("feedback-report-narrative");
    const elEvidence = document.getElementById("feedback-report-evidence");
    const elStamp = document.getElementById("feedback-stamp");

    // Preencher metadados
    if (elDate) elDate.value = optDate;
    if (elTime) elTime.value = optTime;
    if (elReportNumber) elReportNumber.value = `RA-2026${String(activeChallenge.id).padStart(3, '0')}`;
    if (elCaseId) elCaseId.value = `#${String(activeChallenge.id).padStart(4, '0')}`;

    const isSuspectCorrect = (selectSuspect === activeChallenge.solution.suspect);
    const isLocationCorrect = (selectLocation === activeChallenge.solution.location);
    const isWeaponCorrect = (activeChallenge.difficulty === "easy") || (selectWeapon === activeChallenge.solution.weapon);

    // Preencher Local e sua incoerência se houver
    if (elLocation) {
        elLocation.value = selectLocation;
        if (isLocationCorrect) {
            elLocation.style.color = "var(--ink-blue)";
            elLocation.style.textDecoration = "none";
        } else {
            elLocation.style.color = "#b91c1c";
            elLocation.style.textDecoration = "line-through";
        }
    }

    // Preencher Suspeito
    if (elSuspectName) {
        elSuspectName.value = selectSuspect;
        if (isSuspectCorrect) {
            elSuspectName.style.color = "var(--ink-blue)";
            elSuspectName.style.textDecoration = "none";
        } else {
            elSuspectName.style.color = "#b91c1c";
            elSuspectName.style.textDecoration = "line-through";
        }
    }

    // Puxar dados físicos do suspeito selecionado
    const sData = activeChallenge.suspectsData ? activeChallenge.suspectsData[selectSuspect] : null;
    if (sData) {
        if (elSuspectSex) elSuspectSex.value = sData.sex;
        if (elSuspectAge) elSuspectAge.value = sData.age;
        if (elSuspectHeight) elSuspectHeight.value = sData.height;
    } else {
        if (elSuspectSex) elSuspectSex.value = "";
        if (elSuspectAge) elSuspectAge.value = "";
        if (elSuspectHeight) elSuspectHeight.value = "";
    }

    // Preencher Vítima (Sempre correto)
    if (activeChallenge.victim) {
        if (elVictimName) elVictimName.value = activeChallenge.victim.name;
        if (elVictimSex) elVictimSex.value = activeChallenge.victim.sex;
        if (elVictimAge) elVictimAge.value = activeChallenge.victim.age;
        if (elVictimHeight) elVictimHeight.value = activeChallenge.victim.height;
    }

    // Preencher Evidência
    if (elEvidence) {
        if (activeChallenge.difficulty === "easy") {
            elEvidence.value = "Nenhuma arma letal registrada";
            elEvidence.style.color = "var(--ink-blue)";
            elEvidence.style.textDecoration = "none";
        } else {
            elEvidence.value = selectWeapon || "";
            if (isWeaponCorrect) {
                elEvidence.style.color = "var(--ink-blue)";
                elEvidence.style.textDecoration = "none";
            } else {
                elEvidence.style.color = "#b91c1c";
                elEvidence.style.textDecoration = "line-through";
            }
        }
    }

    // Preencher Carimbo
    if (elStamp) {
        elStamp.className = "report-stamp"; // reseta
        if (status === 'culpado') {
            elStamp.innerText = "CULPADO";
            elStamp.classList.add("stamp-culpado");
        } else if (status === 'sem-provas') {
            elStamp.innerText = "SEM PROVAS";
            elStamp.classList.add("stamp-sem-provas");
        } else if (status === 'inocente') {
            elStamp.innerText = "INOCENTE";
            elStamp.classList.add("stamp-inocente");
        } else if (status === 'demitido') {
            elStamp.innerText = "DEMITIDO";
            elStamp.classList.add("stamp-inocente"); // usa cor vermelha
        }
    }

    // Preencher Narrativa
    if (elNarrative) {
        if (status === 'culpado') {
            elNarrative.innerHTML = formatExplanation(activeChallenge.explanation);
        } else if (status === 'demitido') {
            let text = `AVISO OFICIAL DE EXONERAÇÃO DO DETETIVE:\n`;
            text += `Devido ao acúmulo de erros graves e acusações inconsistentes, as vidas do detetive encarregado chegaram a zero. Por ordem superior, você foi oficialmente DEMITIDO do cargo pelo Departamento de Polícia de Logic City.\n\n`;
            text += `RESOLUÇÃO LÓGICA DO CASO:\n`;
            text += `O mistério foi resolvido sem a sua ajuda. O verdadeiro culpado foi o(a) <strong>${activeChallenge.solution.suspect}</strong> no(a) <strong>${activeChallenge.solution.location}</strong>${activeChallenge.difficulty !== 'easy' ? ` portando o(a) <strong>${activeChallenge.solution.weapon}</strong>` : ''}.\n\n`;
            text += `Dedução Formal:\n${activeChallenge.explanation}`;
            elNarrative.innerHTML = text.replace(/\n/g, '<br>');
        } else if (status === 'inocente') {
            const locText = isLocationCorrect 
                ? `no(a) <strong>${selectLocation}</strong>` 
                : `no(a) <span style="color:#b91c1c; font-weight:bold; text-decoration:line-through;">${selectLocation}</span>`;
                
            const wepText = (activeChallenge.difficulty === "easy") 
                ? "" 
                : (isWeaponCorrect 
                    ? ` portando o(a) <strong>${selectWeapon}</strong>` 
                    : ` portando o(a) <span style="color:#b91c1c; font-weight:bold; text-decoration:line-through;">${selectWeapon}</span>`);

            let text = `DEDUÇÃO DO INVESTIGADOR (FALHA GRAVE):\n`;
            text += `A investigação erroneamente acusou o cidadão <span style="color:#b91c1c; font-weight:bold; text-decoration:line-through;">${selectSuspect}</span> de cometer o homicídio ${locText}${wepText}.\n\n`;
            text += `ANÁLISE DE INCOERÊNCIA:\n`;
            text += `O suspeito acusado possui álibi verificado ou é inocente segundo as pistas lógicas! Ao culpar a pessoa errada, o verdadeiro culpado permanece à solta na cidade.\n\n`;
            text += `RESOLUÇÃO LÓGICA DO CASO:\n`;
            text += `A reconstituição material e testemunhos confirmam que o autor do crime foi o(a) <strong>${activeChallenge.solution.suspect}</strong> no(a) <strong>${activeChallenge.solution.location}</strong>${activeChallenge.difficulty !== 'easy' ? ` com o instrumento <strong>${activeChallenge.solution.weapon}</strong>` : ''}.\n\n`;
            text += `Dedução Formal:\n${activeChallenge.explanation}`;
            
            elNarrative.innerHTML = text.replace(/\n/g, '<br>');
        } else {
            // sem-provas
            const locText = isLocationCorrect 
                ? `no(a) <strong>${selectLocation}</strong>` 
                : `no(a) <span style="color:#b91c1c; font-weight:bold; text-decoration:line-through;">${selectLocation}</span>`;
                
            const wepText = (activeChallenge.difficulty === "easy") 
                ? "" 
                : (isWeaponCorrect 
                    ? ` portando o(a) <strong>${selectWeapon}</strong>` 
                    : ` portando o(a) <span style="color:#b91c1c; font-weight:bold; text-decoration:line-through;">${selectWeapon}</span>`);

            let text = `DEDUÇÃO DO INVESTIGADOR (INCOMPLETA):\n`;
            text += `A investigação determinou que o suspeito <span style="color:#15803d; font-weight:bold;">${selectSuspect}</span> é o autor do crime. A denúncia postula que o ato ocorreu ${locText}${wepText}.\n\n`;
            text += `ANÁLISE DE INCOERÊNCIA:\n`;
            text += `Embora o culpado esteja correto, a reconstituição material falhou. O crime não ocorreu ${locText} nem com a arma ${wepText || 'especificada'}.\n`;
            text += `As provas materiais indicam que o crime na verdade ocorreu no(a) <span style="color:#b91c1c; font-weight:bold;">${activeChallenge.solution.location}</span>${activeChallenge.difficulty !== 'easy' ? ` com o instrumento <span style="color:#b91c1c; font-weight:bold;">${activeChallenge.solution.weapon}</span>` : ''}. Sem a correspondência exata do local e do objeto, a denúncia falhará no tribunal por falta de provas (SEM PROVAS).\n\n`;
            text += `RESOLUÇÃO LÓGICA DO CASO:\n`;
            text += `Dedução Formal:\n${activeChallenge.explanation}`;
            
            elNarrative.innerHTML = text.replace(/\n/g, '<br>');
        }
    }

    // Assinatura do Detetive no Feedback
    const elFeedbackSignature = document.getElementById("feedback-report-signature");
    if (elFeedbackSignature) {
        elFeedbackSignature.value = detectiveName || "Detetive Antigravity";
    }
}

// 11. SUBMISSÃO E VALIDAÇÃO DA ACUSAÇÃO
async function submitAccusation() {
    const selectSuspect = document.getElementById("select-suspect").value;
    const selectLocation = document.getElementById("select-location").value;
    const selectWeapon = document.getElementById("select-weapon").value;

    if (!selectSuspect || !selectLocation || (activeChallenge.difficulty !== "easy" && !selectWeapon)) {
        alert("Atenção, Detetive: você precisa selecionar todas as opções de acusação antes de prosseguir.");
        return;
    }

    // Fechar o modal de formulação de acusação ao validar
    closeAccusationModal();

    const modal = document.getElementById("feedback-modal");
    const btnNext = document.getElementById("btn-next-case");

    // Verificar Solução via Hashes
    const userSuspectHash = await gerarHash(selectSuspect);
    const armaCombinacao = (activeChallenge.difficulty === "easy") ? "" : selectWeapon;
    const userSolutionStr = `${selectSuspect}|${selectLocation}|${armaCombinacao}`;
    const userSolutionHash = await gerarHash(userSolutionStr);

    const isSuspectCorrect = (userSuspectHash === activeChallenge.solutionHashSuspect);
    const isSolutionCorrect = (userSolutionHash === activeChallenge.solutionHashComplete);

    let status = 'inocente'; // padrão
    if (isSolutionCorrect) {
        status = 'culpado';
    } else if (isSuspectCorrect) {
        status = 'sem-provas';
    }

    // Preencher o Relatório Policial de Feedback
    fillFeedbackReport(selectSuspect, selectLocation, selectWeapon, status);

    if (status === 'culpado') {
        // --- SUCESSO ---
        // Salvar progresso
        if (!solvedChallenges.includes(activeChallenge.id)) {
            solvedChallenges.push(activeChallenge.id);
            setSecureItem("murdle_solved_challenges", solvedChallenges);
            
            // Remove dos falhos se existia lá
            if (failedChallenges.hasOwnProperty(activeChallenge.id)) {
                delete failedChallenges[activeChallenge.id];
                setSecureItem("murdle_failed_challenges", failedChallenges);
            }
            
            // Verifica se completou Fácil ou Médio e concede a vida extra
            checkAndAwardExtraLife();
            
            // Trava seletores e grid imediatamente ao resolver
            updateChallengeLockState();
        }

        const isGameComplete = (solvedChallenges.length === 12);
        modal.className = "modal active success-theme";

        if (isGameComplete) {
            // --- VITÓRIA TOTAL DO JOGO (12 CASOS RESOLVIDOS) ---
            btnNext.style.display = "inline-flex";
            btnNext.innerText = "Reiniciar Jogo";
            btnNext.onclick = restartGame;
        } else {
            // --- SUCESSO DO CASO NORMAL ---
            const catChallenges = challenges.filter(c => c.difficulty === activeChallenge.difficulty);
            
            btnNext.onclick = nextCase;
            btnNext.style.display = "inline-flex";
            if (activeChallengeIndex < catChallenges.length - 1) {
                btnNext.innerText = "Próximo Caso →";
            } else {
                btnNext.innerText = "Voltar ao Menu Principal";
            }
        }

    } else {
        failedChallenges[activeChallenge.id] = {
            status: status,
            suspect: selectSuspect,
            location: selectLocation,
            weapon: selectWeapon
        };
        setSecureItem("murdle_failed_challenges", failedChallenges);
        
        // Decrementa vidas
        lives--;
        setSecureItem("murdle_current_lives", lives);
        updateLivesUI();

        // Trava o caso atual imediatamente
        updateChallengeLockState();

        if (lives > 0) {
            // --- AINDA TEM VIDAS ---
            modal.className = "modal active error-theme";
            
            const catChallenges = challenges.filter(c => c.difficulty === activeChallenge.difficulty);
            btnNext.onclick = nextCase;
            btnNext.style.display = "inline-flex";
            if (activeChallengeIndex < catChallenges.length - 1) {
                btnNext.innerText = "Próximo Caso →";
            } else {
                btnNext.innerText = "Voltar ao Menu Principal";
            }
            
        } else {
            // --- GAME OVER (DEMISSÃO) ---
            // Exibir o relatório de feedback de erro normal (inocente ou sem-provas) por trás
            modal.className = "modal active error-theme";
            btnNext.style.display = "none"; // Esconde o botão de avançar por trás
            
            // Abrir a janela de demissão por cima (na frente)
            const dismissalModal = document.getElementById("dismissal-modal");
            if (dismissalModal) {
                dismissalModal.classList.add("active");
            }
        }
    }
}

// Fechar Modal
function closeModal() {
    document.getElementById("feedback-modal").classList.remove("active");
}

// Abrir Modal de Acusação
function openAccusationModal() {
    const modal = document.getElementById("accusation-modal");
    if (modal) {
        modal.classList.add("active");
    }
}

// Fechar Modal de Acusação
function closeAccusationModal() {
    const modal = document.getElementById("accusation-modal");
    if (modal) {
        modal.classList.remove("active");
    }
}

// Abrir Relatório Policial e Preencher Dinamicamente com os dados do Caso Ativo
function openPoliceReport() {
    const reportModal = document.getElementById("police-report-modal");
    if (reportModal && activeChallenge) {
        // Obter data e hora atuais do sistema do jogador
        const now = new Date();
        const optDate = now.toLocaleDateString('pt-BR');
        const optTime = now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
        
        // Elementos do Relatório
        const elDate = document.getElementById("report-date");
        const elTime = document.getElementById("report-time");
        const elReportNumber = document.getElementById("report-number");
        const elCaseId = document.getElementById("report-case-id");
        const elNature = document.getElementById("report-nature");
        const elLocation = document.getElementById("report-location");
        const elEvidence = document.getElementById("report-evidence");
        
        const elVictimName = document.getElementById("report-victim-name");
        const elVictimSex = document.getElementById("report-victim-sex");
        const elVictimAge = document.getElementById("report-victim-age");
        const elVictimHeight = document.getElementById("report-victim-height");
        
        const elSuspectName = document.getElementById("report-suspect-name");
        const elSuspectSex = document.getElementById("report-suspect-sex");
        const elSuspectAge = document.getElementById("report-suspect-age");
        const elSuspectHeight = document.getElementById("report-suspect-height");
        const elNarrative = document.getElementById("report-narrative");
        const elSignature = document.getElementById("report-signature");

        // Preencher Data, Hora, ID do Caso e Nº do Relatório
        if (elDate && !elDate.value) elDate.value = optDate;
        if (elTime && !elTime.value) elTime.value = optTime;
        if (elReportNumber) elReportNumber.value = `RP-2026${String(activeChallenge.id).padStart(3, '0')}`;
        if (elCaseId) elCaseId.value = `#${String(activeChallenge.id).padStart(4, '0')}`;
        if (elNature) elNature.value = "Homicídio Proposicional";

        // Preencher Local se selecionado na tela de acusação, caso contrário sugere os do caso
        if (elLocation) {
            const selectLocationVal = document.getElementById("select-location").value;
            elLocation.value = selectLocationVal || activeChallenge.locations.join(" / ");
        }

        // Preencher Evidências (Armas do caso)
        if (elEvidence) {
            elEvidence.value = activeChallenge.difficulty === "easy" ? "Nenhuma arma letal registrada" : activeChallenge.weapons.join(", ");
        }

        // Preencher Vítima e seus dados físicos
        if (activeChallenge.victim) {
            if (elVictimName) elVictimName.value = activeChallenge.victim.name;
            if (elVictimSex) elVictimSex.value = activeChallenge.victim.sex;
            if (elVictimAge) elVictimAge.value = activeChallenge.victim.age;
            if (elVictimHeight) elVictimHeight.value = activeChallenge.victim.height;
        }

        // Preencher Suspeito se selecionado no dropdown de acusação
        const selectSuspectVal = document.getElementById("select-suspect").value;
        if (selectSuspectVal) {
            if (elSuspectName) elSuspectName.value = selectSuspectVal;
            
            // Puxar dados físicos do suspeito selecionado
            const sData = activeChallenge.suspectsData ? activeChallenge.suspectsData[selectSuspectVal] : null;
            if (sData) {
                if (elSuspectSex) elSuspectSex.value = sData.sex;
                if (elSuspectAge) elSuspectAge.value = sData.age;
                if (elSuspectHeight) elSuspectHeight.value = sData.height;
            } else {
                if (elSuspectSex) elSuspectSex.value = "";
                if (elSuspectAge) elSuspectAge.value = "";
                if (elSuspectHeight) elSuspectHeight.value = "";
            }
        } else {
            // Se nenhum suspeito foi selecionado na tela principal
            if (elSuspectName) elSuspectName.value = "";
            if (elSuspectSex) elSuspectSex.value = "";
            if (elSuspectAge) elSuspectAge.value = "";
            if (elSuspectHeight) elSuspectHeight.value = "";
        }

        // Preencher Assinatura do Oficial
        if (elSignature) {
            elSignature.value = detectiveName || "Detetive Antigravity";
        }

        reportModal.classList.add("active");
    }
}

// Fechar Relatório Policial
function closePoliceReport() {
    const reportModal = document.getElementById("police-report-modal");
    if (reportModal) {
        reportModal.classList.remove("active");
    }
}

// Carregar Próximo Caso
function nextCase() {
    closeModal();
    const catChallenges = challenges.filter(c => c.difficulty === activeChallenge.difficulty);
    
    if (activeChallengeIndex < catChallenges.length - 1) {
        loadChallenge(activeChallenge.difficulty, activeChallengeIndex + 1);
    } else {
        backToMenu();
    }
}

// Resetar todo o jogo (Vidas e Progresso)
function restartGame() {
    solvedChallenges = [];
    failedChallenges = {};
    localStorage.removeItem("murdle_solved_challenges");
    localStorage.removeItem("murdle_failed_challenges");
    localStorage.removeItem("murdle_reward_easy_completed");
    localStorage.removeItem("murdle_reward_medium_completed");
    maxLives = 3;
    lives = 3;
    setSecureItem("murdle_max_lives", maxLives);
    setSecureItem("murdle_current_lives", lives);
    
    closeModal();
    
    // Força o reload para limpar o estado de memória da aplicação de forma limpa
    location.reload();
}

// Reiniciar a carreira de detetive do zero (limpar tudo, mantendo apenas o personagem)
function restartCareer() {
    restartGame();
}


// Confirmar e resetar todo o progresso do jogo
function confirmRestartGame() {
    if (confirm("🚨 ATENÇÃO, DETETIVE: Tem certeza de que deseja apagar todo o seu progresso? Isso limpará o histórico de casos resolvidos e reiniciará suas vidas.")) {
        restartGame();
    }
}

// Verifica se completou Fácil ou Médio e concede a vida extra (coração extra)
function checkAndAwardExtraLife() {
    const easyIds = challenges.filter(c => c.difficulty === "easy").map(c => c.id);
    const mediumIds = challenges.filter(c => c.difficulty === "medium").map(c => c.id);
    
    const isEasyCompleted = easyIds.every(id => solvedChallenges.includes(id));
    const isMediumCompleted = mediumIds.every(id => solvedChallenges.includes(id));
    
    let rewardEasyGranted = getSecureItem("murdle_reward_easy_completed") === "true";
    let rewardMediumGranted = getSecureItem("murdle_reward_medium_completed") === "true";
    
    let lifeAwarded = false;
    let difficultyAwarded = "";
    
    if (isEasyCompleted && !rewardEasyGranted) {
        maxLives++;
        lives++;
        setSecureItem("murdle_max_lives", maxLives);
        setSecureItem("murdle_current_lives", lives);
        setSecureItem("murdle_reward_easy_completed", "true");
        lifeAwarded = true;
        difficultyAwarded = "Fácil";
    }
    
    if (isMediumCompleted && !rewardMediumGranted) {
        maxLives++;
        lives++;
        setSecureItem("murdle_max_lives", maxLives);
        setSecureItem("murdle_current_lives", lives);
        setSecureItem("murdle_reward_medium_completed", "true");
        lifeAwarded = true;
        if (difficultyAwarded) {
            difficultyAwarded += " e Médio";
        } else {
            difficultyAwarded = "Médio";
        }
    }
    
    if (lifeAwarded) {
        updateLivesUI();
        showPromotionModal(difficultyAwarded);
    }
}

// Abre o modal de promoção parabenizando o detetive
function showPromotionModal(difficulty) {
    const modal = document.getElementById("promotion-modal");
    const elName = document.getElementById("promotion-detective-name");
    const elDiff = document.getElementById("promotion-difficulty");
    const elGreeting = document.getElementById("promotion-greeting");
    const elCongrats = document.getElementById("promotion-congrats");
    const elRank = document.getElementById("promotion-rank");
    
    // Identifica o gênero com base em selectedDetective ('marcela' ou 'bruno')
    const isFemale = (selectedDetective === "marcela");
    
    if (modal) {
        if (elName) {
            elName.innerText = detectiveName || "Detetive";
        }
        if (elDiff) {
            elDiff.innerText = difficulty;
        }
        if (elGreeting) {
            elGreeting.innerText = isFemale ? "Prezada" : "Prezado";
        }
        if (elCongrats) {
            elCongrats.innerText = isFemale ? "parabenizá-la" : "parabenizá-lo";
        }
        if (elRank) {
            elRank.innerText = isFemale ? "promovida" : "promovido";
        }
        modal.classList.add("active");
    }
}

// Fecha o modal de promoção
function closePromotionModal() {
    const modal = document.getElementById("promotion-modal");
    if (modal) {
        modal.classList.remove("active");
    }
}

// Abre o modal com o relatório policial completo do caso já resolvido
function showCaseReport() {
    if (!activeChallenge) return;

    const modal = document.getElementById("feedback-modal");
    const btnNext = document.getElementById("btn-next-case");

    const isSolved = solvedChallenges.includes(activeChallenge.id);
    const isFailed = failedChallenges.hasOwnProperty(activeChallenge.id);

    if (modal && btnNext) {
        if (isSolved) {
            // Preencher o Relatório Policial de Feedback com a resposta correta de culpado
            fillFeedbackReport(
                activeChallenge.solution.suspect,
                activeChallenge.solution.location,
                activeChallenge.solution.weapon,
                'culpado'
            );
            modal.className = "modal active success-theme";

            const isGameComplete = (solvedChallenges.length === 12);
            if (isGameComplete) {
                btnNext.style.display = "inline-flex";
                btnNext.innerText = "Reiniciar Jogo";
                btnNext.onclick = restartGame;
            } else {
                const catChallenges = challenges.filter(c => c.difficulty === activeChallenge.difficulty);
                btnNext.onclick = nextCase;
                btnNext.style.display = "inline-flex";
                if (activeChallengeIndex < catChallenges.length - 1) {
                    btnNext.innerText = "Próximo Caso →";
                } else {
                    btnNext.innerText = "Voltar ao Menu Principal";
                }
            }
        } else if (isFailed) {
            const failData = failedChallenges[activeChallenge.id];
            const failStatus = (typeof failData === 'object' && failData !== null) ? failData.status : failData;
            const failSuspect = (typeof failData === 'object' && failData !== null) ? failData.suspect : activeChallenge.solution.suspect;
            const failLocation = (typeof failData === 'object' && failData !== null) ? failData.location : activeChallenge.solution.location;
            const failWeapon = (typeof failData === 'object' && failData !== null) ? failData.weapon : activeChallenge.solution.weapon;

            // Preencher com a resposta errada do detetive e o status de erro correspondente
            fillFeedbackReport(
                failSuspect,
                failLocation,
                failWeapon,
                failStatus
            );
            modal.className = "modal active error-theme";

            const catChallenges = challenges.filter(c => c.difficulty === activeChallenge.difficulty);
            btnNext.onclick = nextCase;
            btnNext.style.display = "inline-flex";
            if (activeChallengeIndex < catChallenges.length - 1) {
                btnNext.innerText = "Próximo Caso →";
            } else {
                btnNext.innerText = "Voltar ao Menu Principal";
            }
        }
    }
}

// Trava/Destrava seletores, grid e botões dependendo se o caso atual está resolvido
function updateChallengeLockState() {
    if (!activeChallenge) return;

    const isSolved = solvedChallenges.includes(activeChallenge.id);
    const isFailed = failedChallenges.hasOwnProperty(activeChallenge.id);
    const gridContainer = document.getElementById("grid-container");
    const selectSuspect = document.getElementById("select-suspect");
    const selectLocation = document.getElementById("select-location");
    const selectWeapon = document.getElementById("select-weapon");
    const btnSubmit = document.getElementById("btn-submit-accusation");
    const btnClear = document.getElementById("btn-clear-grid");
    const btnOpenAccusation = document.getElementById("btn-open-accusation");

    if (isSolved || isFailed) {
        if (btnOpenAccusation) {
            btnOpenAccusation.innerHTML = "📋 Relatório do Caso";
            btnOpenAccusation.onclick = showCaseReport;
        }

        if (selectSuspect) {
            selectSuspect.value = isSolved ? activeChallenge.solution.suspect : (failedChallenges[activeChallenge.id].suspect || "");
            selectSuspect.disabled = true;
        }
        if (selectLocation) {
            selectLocation.value = isSolved ? activeChallenge.solution.location : (failedChallenges[activeChallenge.id].location || "");
            selectLocation.disabled = true;
        }
        if (selectWeapon) {
            selectWeapon.value = isSolved ? activeChallenge.solution.weapon : (failedChallenges[activeChallenge.id].weapon || "");
            selectWeapon.disabled = true;
        }

        if (btnSubmit) btnSubmit.disabled = true;
        if (btnClear) btnClear.disabled = true;

        if (gridContainer) gridContainer.classList.add("grid-disabled");
    } else {
        if (btnOpenAccusation) {
            btnOpenAccusation.innerHTML = "⚖️ Formular Acusação";
            btnOpenAccusation.onclick = openAccusationModal;
        }

        if (selectSuspect) {
            selectSuspect.value = "";
            selectSuspect.disabled = false;
        }
        if (selectLocation) {
            selectLocation.value = "";
            selectLocation.disabled = false;
        }
        if (selectWeapon) {
            selectWeapon.value = "";
            selectWeapon.disabled = false;
        }

        if (btnSubmit) btnSubmit.disabled = false;
        if (btnClear) btnClear.disabled = false;

        if (gridContainer) gridContainer.classList.remove("grid-disabled");
    }
}

// Função auxiliar para formatar a explicação lógica de forma legível e estruturada
function formatExplanation(text) {
    if (!text) return "";
    
    // Substituir marcadores estruturais (Pistas, Por exclusão, etc.) por quebras de linha com negrito
    let formatted = text
        .replace(/\b(Pela Pista \d+,?)/gi, "<br><br><strong>$1</strong>")
        .replace(/\b(A Pista \d+,?)/gi, "<br><br><strong>$1</strong>")
        .replace(/\b(Por exclusão)/gi, "<br><br><strong>$1</strong>")
        .replace(/\b(Como demonstramos)/gi, "<br><br><strong>$1</strong>")
        .replace(/\b(Como provamos)/gi, "<br><br><strong>$1</strong>")
        .replace(/\b(Sabendo que)/gi, "<br><br><strong>$1</strong>")
        .replace(/\b(Esta configuração)/gi, "<br><br><strong>$1</strong>")
        .replace(/\b(Sendo o assassino)/gi, "<br><br><strong>$1</strong>");
        
    // Destacar regras de inferência lógica comuns
    const logicRules = [
        "Modus Tollens", 
        "Modus Ponens", 
        "Silogismo Disjuntivo", 
        "Contraposição",
        "Modus Tollens",
        "bicondicional",
        "consequente",
        "disjunção"
    ];
    logicRules.forEach(rule => {
        const regex = new RegExp(`\\b${rule}\\b`, "gi");
        formatted = formatted.replace(regex, `<span class="logic-rule">${rule}</span>`);
    });

    // Envolver proposições/fórmulas lógicas do tipo X(Y) em tags code para visualização mono e colorida
    // ex: P(E), Q(M), Sotao(Night), Aparelho(Onix), etc.
    formatted = formatted.replace(/([A-Z][A-Za-z\d]*\([A-Za-z\d\s\u00C0-\u00FF]+\))/g, '<code class="logic-code">$1</code>');

    // Envolver proposições com negação avulsa como ¬ P(M) ou ¬ Aparelho(Raven)
    formatted = formatted.replace(/(¬\s*[A-Z][A-Za-z\d]*\([A-Za-z\d\s\u00C0-\u00FF]+\))/g, '<code class="logic-code">$1</code>');
    
    // Envolver fórmulas curtas com símbolos matemáticos e lógicos avulsos (como Culpado ∈ D ou Culpado ∈ B)
    formatted = formatted.replace(/(Culpado\s*∈\s*[A-Z])/g, '<code class="logic-code">$1</code>');

    // Envolver regras/passos de inferência representados por símbolos matemáticos (ex: A ∧ B ⊢ C)
    // Vamos capturar a sequência que tem conectivos como ∧, ⊢, →, ¬ e envolvê-la
    formatted = formatted.replace(/((?:¬\s*)?[A-Z][A-Za-z\d]*\([^)]+\)\s*(?:[∧∨⊕→↔⊢]\s*(?:\([^)]+\)|(?:¬\s*)?[A-Z][A-Za-z\d]*\([^)]+\)))+)/g, '<code class="logic-code">$1</code>');

    // Limpar quebras de linha duplicadas no início da string
    if (formatted.startsWith("<br><br>")) {
        formatted = formatted.substring(8);
    }
    
    return formatted;
}

// Renderiza a legenda de símbolos dinâmicos para o modo lógico proposicional
function renderCaseLogicLegend() {
    const legendContainer = document.getElementById("case-legend-grid");
    if (!legendContainer) return;
    legendContainer.innerHTML = "";
    
    if (!activeChallenge || !activeChallenge.symbols) return;
    
    const symbols = activeChallenge.symbols;
    for (const [sym, fullName] of Object.entries(symbols)) {
        const item = document.createElement("div");
        item.className = "case-legend-item";
        item.innerHTML = `<code class="logic-code">${sym}</code> = <span>${fullName}</span>`;
        legendContainer.appendChild(item);
    }
}

// 12. CONTROLE DE ZOOM DO GRID DE DEDUÇÃO
function setupGridZoom() {
    const btnZoomIn = document.getElementById("btn-zoom-in");
    const btnZoomOut = document.getElementById("btn-zoom-out");
    
    if (btnZoomIn && btnZoomOut) {
        btnZoomIn.addEventListener("click", () => {
            adjustZoom(0.05); // Aumenta 5% por clique
        });
        
        btnZoomOut.addEventListener("click", () => {
            adjustZoom(-0.05); // Diminui 5% por clique
        });
    }
}

function adjustZoom(delta) {
    const table = document.querySelector(".logic-grid");
    const wrapper = document.querySelector(".grid-scroll-wrapper");
    if (!table || !wrapper) return;
    
    // Calcula o novo fator de zoom temporário
    let newZoom = gridZoom + delta;
    
    // Define limite mínimo (não ficar menor que 50% de escala)
    if (newZoom < 0.5) {
        newZoom = 0.5;
    }
    
    // Se estiver aumentando o zoom, verifica se a tabela já cabe no limite físico do wrapper
    if (delta > 0) {
        // Aplica o zoom temporário
        table.style.transform = `scale(${newZoom})`;
        
        const rectTable = table.getBoundingClientRect();
        const rectWrapper = wrapper.getBoundingClientRect();
        
        // Se a tabela computada projetar uma largura ou altura que encoste ou ultrapasse o contêiner,
        // nós impedimos esse zoom adicional para que ela caiba 100% no espaço determinado.
        // Damos uma tolerância de 6px por segurança.
        if (rectTable.width >= rectWrapper.width - 6 || rectTable.height >= rectWrapper.height - 6) {
            // Reverte para o zoom anterior
            table.style.transform = `scale(${gridZoom})`;
            return;
        }
    } else {
        // Para zoom out, apenas aplica
        table.style.transform = `scale(${newZoom})`;
    }
    
    gridZoom = newZoom;
}

// ==========================================================================
// SELEÇÃO E ASSINATURA DO DETETIVE
// ==========================================================================

function selectDetectiveOption(detective) {
    document.querySelectorAll('.char-card').forEach(card => card.classList.remove('selected'));
    const selectedCard = document.getElementById(`char-card-${detective}`);
    if (selectedCard) {
        selectedCard.classList.add('selected');
    }
    
    selectedDetective = detective;
    
    // Atualiza o input de texto automaticamente
    const signatureInput = document.getElementById('char-signature-input');
    if (signatureInput) {
        signatureInput.value = detective === 'marcela' ? 'Detetive Marcela' : 'Detetive Bruno';
    }
}

function confirmDetectiveSelection() {
    const signatureInput = document.getElementById('char-signature-input');
    const signatureVal = signatureInput ? signatureInput.value.trim() : "";
    
    if (!signatureVal) {
        alert("Por favor, digite um nome para a assinatura do detetive.");
        return;
    }
    
    detectiveName = signatureVal;
    localStorage.setItem("murdle_selected_detective", selectedDetective);
    localStorage.setItem("murdle_detective_name", detectiveName);
    
    updateReportSignatures();
    updateHeaderDetectiveBadge();
    
    if (isEditingDetective) {
        showScreen(previousScreenBeforeCharSelection || 'menu-screen');
        isEditingDetective = false;
    } else {
        showScreen('instructions-screen');
    }
}

function openCharacterSelection() {
    isEditingDetective = true;
    
    const activeScreen = document.querySelector('.screen.active');
    if (activeScreen && activeScreen.id !== 'character-selection-screen') {
        previousScreenBeforeCharSelection = activeScreen.id;
    }
    
    showScreen('character-selection-screen');
    
    const signatureInput = document.getElementById('char-signature-input');
    if (signatureInput) {
        signatureInput.value = detectiveName || "";
    }
    
    document.querySelectorAll('.char-card').forEach(card => card.classList.remove('selected'));
    if (selectedDetective) {
        const selectedCard = document.getElementById(`char-card-${selectedDetective}`);
        if (selectedCard) {
            selectedCard.classList.add('selected');
        }
    }
}

function updateReportSignatures() {
    const elSignature = document.getElementById("report-signature");
    if (elSignature) {
        elSignature.value = detectiveName || "Detetive Antigravity";
    }
    const elFeedbackSignature = document.getElementById("feedback-report-signature");
    if (elFeedbackSignature) {
        elFeedbackSignature.value = detectiveName || "Detetive Antigravity";
    }
}

function updateHeaderDetectiveBadge() {
    const badgeContainer = document.getElementById("detective-header-badge");
    const imgEl = document.getElementById("header-det-img");
    const nameEl = document.getElementById("header-det-name");
    
    if (badgeContainer && nameEl && imgEl) {
        if (detectiveName) {
            nameEl.innerText = detectiveName;
            
            if (selectedDetective === "marcela") {
                imgEl.src = "imagens/1ccd43ee-caf4-47d5-aefc-7d2f46f274b92.jpg";
                imgEl.style.display = "block";
            } else if (selectedDetective === "bruno") {
                imgEl.src = "imagens/a6a2d04a-05f9-4499-b854-758fb76f527f2.jpg";
                imgEl.style.display = "block";
            } else {
                imgEl.style.display = "none";
            }
            badgeContainer.style.display = "flex";
        } else {
            badgeContainer.style.display = "none";
        }
    }
}

function initializeDetective() {
    selectedDetective = localStorage.getItem("murdle_selected_detective") || "";
    detectiveName = localStorage.getItem("murdle_detective_name") || "";
    
    updateReportSignatures();
    updateHeaderDetectiveBadge();
    
    if (!detectiveName) {
        showScreen('character-selection-screen');
    } else {
        showScreen('menu-screen');
    }
}

function openInstructionsScreen() {
    // Descobre qual tela está ativa antes de abrir o manual
    const activeScreen = document.querySelector('.screen.active');
    if (activeScreen && activeScreen.id !== 'instructions-screen') {
        previousScreenBeforeRules = activeScreen.id;
    }
    
    showScreen('instructions-screen');
}

function closeInstructionsScreen() {
    // Se veio da tela de seleção de personagem inicial, vai para o menu.
    // Caso contrário, retorna à tela em que o jogador estava jogando/navegando.
    if (previousScreenBeforeRules === 'character-selection-screen' || previousScreenBeforeRules === 'instructions-screen') {
        showScreen('menu-screen');
    } else {
        showScreen(previousScreenBeforeRules || 'menu-screen');
    }
}



    // Exposição controlada de funções globais para compatibilidade com onclick no HTML
    window.openInstructionsScreen = openInstructionsScreen;
    window.openCharacterSelection = openCharacterSelection;
    window.selectDetectiveOption = selectDetectiveOption;
    window.confirmDetectiveSelection = confirmDetectiveSelection;
    window.closeInstructionsScreen = closeInstructionsScreen;
    window.confirmRestartGame = confirmRestartGame;
    window.backToMenu = backToMenu;
    window.openDossierModal = openDossierModal;
    window.clearActiveGrid = clearActiveGrid;
    window.openAccusationModal = openAccusationModal;
    window.closeModal = closeModal;
    window.restartCareer = restartCareer;
    window.closeDossierModal = closeDossierModal;
    window.closeAccusationModal = closeAccusationModal;
    window.submitAccusation = submitAccusation;
    window.closePoliceReport = closePoliceReport;
    window.closePromotionModal = closePromotionModal;
})();
