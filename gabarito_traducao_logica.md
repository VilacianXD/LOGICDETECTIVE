# 🕵️‍♂️ Guia de Tradução Lógica - Logic Detective

Este guia documenta o processo de elaboração e tradução das pistas dos 12 casos do **Logic Detective**. As pistas foram projetadas para progredir em complexidade linguística e lógica conforme a dificuldade aumenta, usando características físicas em vez de nomes diretos nos níveis médio (características de pessoas) e difícil (características de pessoas, locais e objetos), baseando-se na **Lógica Proposicional Clássica**.

---

## 🟢 Casos Fáceis (3 Suspeitos + 3 Locais)
Nos casos fáceis (Casos 1 a 4), os suspeitos e locais são mapeados diretamente. As pistas envolvem proposições simples, disjunções e implicações simples.

### Caso 1: Mistério no Bar
*   **Símbolos**:
    *   Pessoas: $S$ = Jack Spade, $F$ = Don Falcone, $L$ = Lola Mercer
    *   Locais: $E$ = O Escritório dos Fundos, $B$ = O Beco das Sombras, $C$ = O Balcão do Bar
*   **Tabela de Tradução**:

| Pista Natural (Jogo) | Estrutura Proposicional | Fórmula Lógica |
| :--- | :--- | :--- |
| **1.** "O informante da esquina garante que viu Don Falcone no Beco das Sombras no horário estimado do crime." | Don no Beco das Sombras | $B(F)$ |
| **2.** "Se Lola Mercer estava no Escritório dos Fundos, então Don Falcone não estava no Beco das Sombras." | Se Lola no Escritório dos Fundos, então não Don no Beco das Sombras | $E(L) \rightarrow \neg B(F)$ |
| **3.** "Jack Spade estava no Balcão do Bar ou no Escritório dos Fundos." | Jack no Balcão do Bar ou Jack no Escritório dos Fundos | $C(S) \lor E(S)$ |
| **4.** "O culpado estava no Escritório dos Fundos." | Culpado está no Escritório dos Fundos | $Culpado \in E$ |

---

### Caso 2: Traição no Cais
*   **Símbolos**:
    *   Pessoas: $V$ = Vito "O Navalha" Genovese, $E$ = Evelyn Vance, $M$ = Inspetor Miller
    *   Locais: $P$ = O Píer de Carga, $G$ = O Galpão Abandonado, $D$ = As Docas de Névoa
*   **Tabela de Tradução**:

| Pista Natural (Jogo) | Estrutura Proposicional | Fórmula Lógica |
| :--- | :--- | :--- |
| **1.** "O Inspetor Miller estava no Píer de Carga." | Inspetor no Píer de Carga | $P(M)$ |
| **2.** "Se Vito "O Navalha" Genovese estava no Galpão Abandonado, então o Inspetor Miller não estava no Píer de Carga." | Se Vito no Galpão Abandonado, então não Inspetor no Píer de Carga | $G(V) \rightarrow \neg P(M)$ |
| **3.** "Evelyn Vance estava nas Docas de Névoa ou no Galpão Abandonado." | Evelyn no Docas de Névoa ou Evelyn no Galpão Abandonado | $D(E) \lor G(E)$ |
| **4.** "O culpado estava nas Docas de Névoa." | Culpado está no Docas de Névoa | $Culpado \in D$ |

---

### Caso 3: O Silêncio na Mansão
*   **Símbolos**:
    *   Pessoas: $S$ = Mordomo Sterling, $R$ = Dr. Julian Ross, $G$ = Glória DuPont
    *   Locais: $E$ = A Estufa de Flores, $H$ = O Hall de Mármore, $B$ = A Biblioteca Privada
*   **Tabela de Tradução**:

| Pista Natural (Jogo) | Estrutura Proposicional | Fórmula Lógica |
| :--- | :--- | :--- |
| **1.** "O Mordomo Sterling estava na Biblioteca Privada." | Mordomo no Biblioteca Privada | $B(S)$ |
| **2.** "Se Glória DuPont estava na Estufa de Flores, então o Mordomo Sterling não estava na Biblioteca Privada." | Se Glória no Estufa de Flores, então não Mordomo no Biblioteca Privada | $E(G) \rightarrow \neg B(S)$ |
| **3.** "O Dr. Julian Ross estava no Hall de Mármore ou na Estufa de Flores." | Dr. no Hall de Mármore ou Dr. no Estufa de Flores | $H(R) \lor E(R)$ |
| **4.** "O culpado estava no Hall de Mármore." | Culpado está no Hall de Mármore | $Culpado \in H$ |

---

### Caso 4: O Expresso da Meia-Noite
*   **Símbolos**:
    *   Pessoas: $H$ = Condutor Harris, $R$ = Rocky "Iron Fist" Malone, $S$ = Senador Sterling
    *   Locais: $C$ = A Cabine Presidencial, $V$ = O Vagão Restaurante, $O$ = O Corredor de Serviço
*   **Tabela de Tradução**:

| Pista Natural (Jogo) | Estrutura Proposicional | Fórmula Lógica |
| :--- | :--- | :--- |
| **1.** "O Senador Sterling estava no Corredor de Serviço." | Senador no Corredor de Serviço | $O(S)$ |
| **2.** "Se o Condutor Harris estava no Vagão Restaurante, então o Senador Sterling não estava no Corredor de Serviço." | Se Condutor no Vagão Restaurante, então não Senador no Corredor de Serviço | $V(H) \rightarrow \neg O(S)$ |
| **3.** "Rocky "Iron Fist" Malone estava na Cabine Presidencial ou no Vagão Restaurante." | Rocky no Cabine Presidencial ou Rocky no Vagão Restaurante | $C(R) \lor V(R)$ |
| **4.** "O culpado estava no Vagão Restaurante." | Culpado está no Vagão Restaurante | $Culpado \in V$ |

---

## 🟡 Casos Médios (3 Suspeitos + 3 Locais + 3 Itens)
Nos casos médios (Casos 5 a 8), adiciona-se uma terceira dimensão (Armas). As pistas usam características físicas das pessoas e introduzem o conectivo de Equivalência Material ou Bicondicional ($P \leftrightarrow Q$).

### Caso 5: O Fim do Informante
*   **Símbolos**:
    *   Pessoas: $C$ = Arthur "Flash" Coburn, $M$ = Mickey Burns, $V$ = Advogado Vance
    *   Locais: $B$ = O Beco do Lixo, $Q$ = O Quarto de Pensão 304, $L$ = O Velvet Club
    *   Objetos/Armas: $S$ = Soco-Inglês de Latão, $R$ = Revólver Calibre .38, $F$ = Fio de Aço de Garrote
*   **Tabela de Tradução**:

| Pista Natural (Jogo) | Estrutura Proposicional | Fórmula Lógica |
| :--- | :--- | :--- |
| **1.** "A perícia descobriu que o fotógrafo de 28 anos com olhos castanhos estava portando o Soco-Inglês de Latão." | Arthur com Soco-Inglês de Latão | $S(C)$ |
| **2.** "Um suspeito estava no Velvet Club se e somente se estava portando um Revólver Calibre .38." | Velvet Club se e somente se Revólver Calibre .38 | $L \leftrightarrow R$ |
| **3.** "O dossiê aponta: se o defensor de 47 anos com olhos azuis carregava o Fio de Aço de Garrote, então ele estava no Quarto de Pensão 304." | Se Advogado com Fio de Aço de Garrote, então Advogado no Quarto de Pensão 304 | $F(V) \rightarrow Q(V)$ |
| **4.** "O recepcionista anotou que o homem de 1,79 m de altura subiu para o Quarto de Pensão 304 ou foi visto saindo em direção ao Beco do Lixo." | Advogado no Quarto de Pensão 304 ou Advogado no Beco do Lixo | $Q(V) \lor B(V)$ |
| **5.** "A revista na pasta do homem de 1,79 m de altura confirmou que ele não portava o Revólver Calibre .38." | não Advogado com Revólver Calibre .38 | $\neg R(V)$ |

---

### Caso 6: Dívida de Jogo
*   **Símbolos**:
    *   Pessoas: $F$ = Frankie "Cicatriz", $M$ = Detetive Miller, $R$ = Madame Rouge
    *   Locais: $C$ = O Cofre do Cassino, $P$ = A Sala de Pôquer VIP, $E$ = O Estacionamento Subterrâneo
    *   Objetos/Armas: $B$ = Barra de Ferro, $N$ = Navalha de Barbeiro, $V$ = Veneno de Cianeto
*   **Tabela de Tradução**:

| Pista Natural (Jogo) | Estrutura Proposicional | Fórmula Lógica |
| :--- | :--- | :--- |
| **1.** "Impressões digitais do policial de 44 anos com olhos azuis foram encontradas na maçaneta interna do Cofre do Cassino." | Detetive no Cofre do Cassino | $C(M)$ |
| **2.** "O manobrista confirmou que a mulher de 37 anos com enigmáticos olhos verdes desceu com a chave para o Estacionamento Subterrâneo." | Madame no Estacionamento Subterrâneo | $E(R)$ |
| **3.** "Se o homem com uma cicatriz linear na bochecha direita estava na Sala de Pôquer VIP, então ele estava com a Navalha de Barbeiro." | Se Frankie no Sala de Pôquer VIP, então Frankie com Navalha de Barbeiro | $P(F) \rightarrow N(F)$ |
| **4.** "Se o policial de 44 anos não carregava o Cianeto, então a mulher de 37 anos com olhos verdes portava a Navalha de Barbeiro." | Se não Detetive com Veneno de Cianeto, então Madame com Navalha de Barbeiro | $\neg V(M) \rightarrow N(R)$ |
| **5.** "O policial com olhos azuis estava com o Cianeto se e somente se a mulher de 37 anos carregava a Barra de Ferro." | Detetive com Veneno de Cianeto se e somente se Madame com Barra de Ferro | $V(M) \leftrightarrow B(R)$ |

---

### Caso 7: Chantagem na Alta Sociedade
*   **Símbolos**:
    *   Pessoas: $K$ = Jornalista Kent, $B$ = Duquesa Beatrice, $V$ = Vito Genovese
    *   Locais: $A$ = A Adega de Vinhos, $J$ = O Jardim Francês, $S$ = O Salão de Bilhar
    *   Objetos/Armas: $P$ = Pistola com Silenciador, $T$ = Faca de Trincheira, $L$ = Arsênico no Licor
*   **Tabela de Tradução**:

| Pista Natural (Jogo) | Estrutura Proposicional | Fórmula Lógica |
| :--- | :--- | :--- |
| **1.** "O jardineiro viu a mulher de 42 anos com uma pequena cicatriz sob o olho esquerdo perto da fonte do Jardim Francês." | Duquesa no Jardim Francês | $J(B)$ |
| **2.** "Se o jornalista de 30 anos com olhos castanhos estava na Adega de Vinhos, então ele portava a Pistola com Silenciador." | Se Jornalista no Adega de Vinhos, então Jornalista com Pistola com Silenciador | $A(K) \rightarrow P(K)$ |
| **3.** "O sicário de 45 anos com olhos pretos estava no Salão de Bilhar se e somente se o jornalista de 30 anos estava na Adega de Vinhos." | Vito no Salão de Bilhar se e somente se Jornalista no Adega de Vinhos | $S(V) \leftrightarrow A(K)$ |
| **4.** "O homem de 1,80 m com olhos pretos estava com o Arsênico no Licor ou a mulher de 42 anos portava a Pistola com Silenciador." | Vito com Arsênico no Licor ou Duquesa com Pistola com Silenciador | $L(V) \lor P(B)$ |
| **5.** "O sicário de 45 anos com olhos pretos não estava na Adega de Vinhos." | não Vito no Adega de Vinhos | $\neg A(V)$ |

---

### Caso 8: Conspiração Industrial
*   **Símbolos**:
    *   Pessoas: $S$ = Químico Sterling, $B$ = Diretor Blackwell, $D$ = Magnata DuPont
    *   Locais: $A$ = A Sala de Arquivos, $R$ = A Recepção Central, $L$ = O Laboratório Químico
    *   Objetos/Armas: $Se$ = Seringa com Sedativo, $P$ = Pasta com Documento Explosivo, $G$ = Gás Monóxido no Duto
*   **Tabela de Tradução**:

| Pista Natural (Jogo) | Estrutura Proposicional | Fórmula Lógica |
| :--- | :--- | :--- |
| **1.** "O vigia relatou que o homem de 60 anos com olhos pretos e austeros entrou no Laboratório Químico." | Magnata no Laboratório Químico | $L(D)$ |
| **2.** "Se o diretor de 43 anos com olhos castanhos estava com o Gás Monóxido no Duto, então ele esteve fisicamente na Sala de Arquivos." | Se Diretor com Gás Monóxido no Duto, então Diretor no Sala de Arquivos | $G(B) \rightarrow A(B)$ |
| **3.** "O jovem pesquisador de 27 anos com olhos azuis estava com a Pasta com Documento Explosivo se e somente se o homem de 60 anos não estava com o Gás Monóxido no Duto." | Químico com Pasta com Documento Explosivo se e somente se não Magnata com Gás Monóxido no Duto | $P(S) \leftrightarrow \neg G(D)$ |
| **4.** "O chaveiro eletrônico registrou que o diretor de 43 anos acessou a Sala de Arquivos ou esteve no Laboratório Químico." | Diretor no Sala de Arquivos ou Diretor no Laboratório Químico | $A(B) \lor L(B)$ |
| **5.** "O exame médico no jovem pesquisador de 27 anos atestou que ele não manuseou a Seringa com Sedativo." | não Químico com Seringa com Sedativo | $\neg Se(S)$ |

---

## 🔴 Casos Difíceis (4 Suspeitos + 4 Locais + 4 Itens)
Nos casos difíceis (Casos 9 a 12), as pistas aumentam em complexidade lógica e textual. São usadas características de pessoas, locais e armas (sem citar seus nomes reais nas pistas). Incorporam-se equivalências complexas aninhadas e negações de disjunções (Leis de De Morgan).

### Caso 9: Contrabando no Porto
*   **Símbolos**:
    *   Pessoas: $J$ = Marinheiro Jack, $B$ = Capitão Blackwood, $C$ = Senhorita Carmine, $O$ = Estivador Boris
    *   Locais: $P$ = O Portão de Carga, $A$ = O Armazém Central, $L$ = A Loja de Penhores, $D$ = A Doca Seca
    *   Objetos/Armas: $R$ = Rifle Mosquetão, $G$ = Gancho de Carga, $H$ = Corda de Cânhamo, $S$ = Barra de Direção
*   **Tabela de Tradução**:

| Pista Natural (Jogo) | Estrutura Proposicional | Fórmula Lógica |
| :--- | :--- | :--- |
| **1.** "O guarda anotou que o marujo de 29 anos com cicatriz de arpão na panturrilha se apresentou no local de grade de ferro alta com cadeado pesado." | Marinheiro no Portão de Carga | $P(J)$ |
| **2.** "O encarregado confirmou que o gigante de 1,92 m com uma cicatriz no peito estava no fosso de concreto profundo e úmido." | Estivador no Doca Seca | $D(O)$ |
| **3.** "Se o comandante de 1,83 m portava o gancho de ferro curvo e pontiagudo, então ele estava no armazém de estrutura metálica com telhado de zinco." | Se Capitão com Gancho de Carga, então Capitão no Armazém Central | $G(B) \rightarrow A(B)$ |
| **4.** "Estar no local de grade de ferro alta com cadeado pesado equivale a portar o rifle de cano longo de ferro oxidado." | Portão de Carga se e somente se Rifle Mosquetão | $P \leftrightarrow R$ |
| **5.** "Estar no estabelecimento com prateleiras cheias de objetos antigos equivale a portar a corda de fibra grossa com nós de marinheiro se e somente se o gigante de 1,92 m não estava no local de grade de ferro com cadeado." | (Loja de Penhores se e somente se Corda de Cânhamo) se e somente se não Estivador no Portão de Carga | $(L \leftrightarrow H) \leftrightarrow \neg P(O)$ |
| **6.** "Se o gigante com uma cicatriz no peito estava com a peça de aço maciço manchada de graxa, então o comandante de 1,83 m portava o gancho de ferro curvo." | Se Estivador com Barra de Direção, então Capitão com Gancho de Carga | $S(O) \rightarrow G(B)$ |
| **7.** "A revista provou ser falso que o gigante de 1,92 m estivesse portando a corda de fibra grossa ou o gancho de ferro curvo." | não (Estivador com Corda de Cânhamo ou Estivador com Gancho de Carga) | $\neg (H(O) \lor G(O))$ |
| **8.** "O armeiro declarou que o comandante de olhos cinzentos não retirou o rifle de cano longo de ferro oxidado do estoque." | não Capitão com Rifle Mosquetão | $\neg R(B)$ |

---

### Caso 10: Traição sob os Holofotes
*   **Símbolos**:
    *   Pessoas: $R$ = Ilusionista Raven, $S$ = Diretor Sinclair, $E$ = Atriz Evelyn, $M$ = Crítico Malone
    *   Locais: $C$ = Os Camarins, $G$ = A Galeria de Iluminação, $P$ = O Palco Principal, $B$ = A Bilheteria
    *   Objetos/Armas: $U$ = Punhal de Aço Damasceno, $F$ = Fio de Garrote Oculto, $D$ = Dose de Clorofórmio, $V$ = Veneno no Cálice de Adereço
*   **Tabela de Tradução**:

| Pista Natural (Jogo) | Estrutura Proposicional | Fórmula Lógica |
| :--- | :--- | :--- |
| **1.** "O eletricista declarou que o produtor de 55 anos com olhos azuis subiu até a passarela de metal suspensa com refletores." | Diretor no Galeria de Iluminação | $G(S)$ |
| **2.** "Um repórter fotografou a diva de olhos verdes com uma cicatriz no joelho enquanto ela passava pela cabine de madeira com janela de vidro circular." | Atriz no Bilheteria | $B(E)$ |
| **3.** "Se o jornalista de 32 anos com uma cicatriz na clavícula estava com o lenço de linho com odor anestésico, ele estava no palco de piso de tábuas de madeira escura." | Se Crítico com Dose de Clorofórmio, então Crítico no Palco Principal | $D(M) \rightarrow P(M)$ |
| **4.** "Estar no camarim com espelhos iluminados por lâmpadas incandescentes equivale a carregar a taça de latão ornamentada com falsas gemas contendo um pó fino." | Camarins se e somente se Veneno no Cálice de Adereço | $C \leftrightarrow V$ |
| **5.** "Estar na passarela de metal suspensa equivale a portar o fio ultra-fino de aço trançado com anéis nas pontas se e somente se o mágico de 1,80 m não estava na cabine de madeira de janela circular." | (Galeria de Iluminação se e somente se Fio de Garrote Oculto) se e somente se não Ilusionista no Bilheteria | $(G \leftrightarrow F) \leftrightarrow \neg B(R)$ |
| **6.** "Se o jornalista de 32 anos estava com o lenço de linho com odor anestésico, então a diva de olhos verdes com uma cicatriz no joelho portava o punhal com padrões ondulados na lâmina." | Se Crítico com Dose de Clorofórmio, então Atriz com Punhal de Aço Damasceno | $D(M) \rightarrow U(E)$ |
| **7.** "Provou-se ser falso que a diva de olhos verdes portasse o fio ultra-fino de aço trançado ou a taça de latão ornamentada." | não (Atriz com Fio de Garrote Oculto ou Atriz com Veneno no Cálice de Adereço) | $\neg (F(E) \lor V(E))$ |
| **8.** "O laudo provou que o jornalista com uma cicatriz na clavícula não teve contato com o punhal de padrões ondulados e não esteve no camarim com espelhos iluminados." | não Crítico com Punhal de Aço Damasceno e não Crítico no Camarins | $\neg U(M) \land \neg C(M)$ |

---

### Caso 11: Emboscada nas Sombras
*   **Símbolos**:
    *   Pessoas: $S$ = Informante Slate, $B$ = Don Barrows, $H$ = Juíza Helena, $U$ = Matador Umbra
    *   Locais: $R$ = O Beco das Ratazanas, $C$ = O Canteiro de Obras, $E$ = O Esgoto Subterrâneo, $F$ = A Fábrica de Tecidos
    *   Objetos/Armas: $Ca$ = Cano de Ferro Cortado, $M$ = Maçarico a Gás, $T$ = Martelo Pesado, $V$ = Revólver Silenciado
*   **Tabela de Tradução**:

| Pista Natural (Jogo) | Estrutura Proposicional | Fórmula Lógica |
| :--- | :--- | :--- |
| **1.** "O gerente confirmou que o líder da gangue de 57 anos com cicatriz no supercílio estava na fábrica com teares mecânicos barulhentos e fiapos de algodão." | Don no Fábrica de Tecidos | $F(B)$ |
| **2.** "Um patrulheiro viu o arquivista de 31 anos com olhos azuis oculto no beco de tijolos vermelhos com limo nas paredes." | Informante no Beco das Ratazanas | $R(S)$ |
| **3.** "Se o atirador de 38 anos com cicatriz de queimadura na mão portava o revólver de aço escuro com silenciador artesanal, ele estava escondido na galeria subterrânea com escoamento de água escura." | Se Matador com Revólver Silenciado, então Matador no Esgoto Subterrâneo | $V(U) \rightarrow E(U)$ |
| **4.** "Estar no beco de tijolos vermelhos com limo nas paredes equivale a portar o tubo de encanamento de ferro com bordas serradas." | Beco das Ratazanas se e somente se Cano de Ferro Cortado | $R \leftrightarrow Ca$ |
| **5.** "Estar no terreno de terra batida enlameada e andaimes inacabados equivale a portar o bico queimador de latão com mangueira vermelha se e somente se o arquivista de 31 anos não estava na fábrica com teares mecânicos." | (Canteiro de Obras se e somente se Maçarico a Gás) se e somente se não Informante no Fábrica de Tecidos | $(C \leftrightarrow M) \leftrightarrow \neg F(S)$ |
| **6.** "Se o líder de 57 anos com cicatriz no supercílio estava com o Martelo Pesado, então a magistrada de 44 anos portava o bico queimador de latão com mangueira vermelha." | Se Don com Martelo Pesado, então Juíza com Maçarico a Gás | $T(B) \rightarrow M(H)$ |
| **7.** "A busca na maleta provou ser falso que o atirador com cicatriz de queimadura portasse o tubo de encanamento de ferro ou a ferramenta de cabeça de ferro de 5kg." | não (Matador com Cano de Ferro Cortado ou Matador com Martelo Pesado) | $\neg (Ca(U) \lor T(U))$ |
| **8.** "O escrivão atestou que a magistrada com olhos castanhos não carregava a ferramenta de cabeça de ferro de 5kg em suas mãos." | não Juíza com Martelo Pesado | $\neg T(H)$ |

---

### Caso 12: Execução sob a Névoa
*   **Símbolos**:
    *   Pessoas: $S$ = Secretária Sterling, $D$ = Don Salieri, $K$ = Detetive Kelly, $G$ = Mafioso Genovese
    *   Locais: $P$ = O Pátio de Carga, $C$ = O Cais Abandonado, $A$ = O Armazém do Porto, $F$ = A Falésia do Farol
    *   Objetos/Armas: $Ar$ = Armadilha de Aço, $Fa$ = Faca de Açougueiro, $Ap$ = Arpão Enferrujado, $Co$ = Corrente de Carga
*   **Tabela de Tradução**:

| Pista Natural (Jogo) | Estrutura Proposicional | Fórmula Lógica |
| :--- | :--- | :--- |
| **1.** "Um velho pescador viu a assistente de 26 anos com sinal de nascença no pescoço parada no cais de tábuas podres e pilares com cracas." | Secretária no Cais Abandonado | $C(S)$ |
| **2.** "O vigia registrou que o braço direito de 45 anos com uma cicatriz na testa entrou no armazém de portas de metal enferrujado na penumbra." | Mafioso no Armazém do Porto | $A(G)$ |
| **3.** "Se o chefe de 61 anos com olhos pretos portava a lâmina larga de 10 polegadas com rebites no cabo, ele subiu até o penhasco rochoso com ventania constante." | Se Don com Faca de Açougueiro, então Don no Falésia do Farol | $Fa(D) \rightarrow F(D)$ |
| **4.** "Estar no armazém de portas de metal enferrujado na penumbra equivale a portar a corrente de elos espessos e manchada de fuligem." | Armazém do Porto se e somente se Corrente de Carga | $A \leftrightarrow Co$ |
| **5.** "Estar no pátio de cascalho com vagões de trem estacionados equivale a portar o arpão de ponta de metal oxidada se e somente se a assistente de 26 anos não estava no armazém de portas de metal enferrujado." | (Pátio de Carga se e somente se Arpão Enferrujado) se e somente se não Secretária no Armazém do Porto | $(P \leftrightarrow Ap) \leftrightarrow \neg A(S)$ |
| **6.** "Se a assistente de 26 anos com sinal de nascença no pescoço estava com a Armadilha de Aço, então o investigador de 42 anos com cicatriz no queixo estava com o arpão de ponta de metal oxidada." | Se Secretária com Armadilha de Aço, então Detetive com Arpão Enferrujado | $Ar(S) \rightarrow Ap(K)$ |
| **7.** "A busca na alfaiataria provou ser falso que o chefe de 61 anos portasse o dispositivo de mandíbulas denteadas ou a corrente de elos espessos e manchada de fuligem." | não (Don com Armadilha de Aço ou Don com Corrente de Carga) | $\neg (Ar(D) \lor Co(D))$ |
| **8.** "O inventário atesta que o investigador com cicatriz no queixo não carregava o dispositivo de mandíbulas denteadas de ferro da corporação." | não Detetive com Armadilha de Aço | $\neg Ar(K)$ |

---

