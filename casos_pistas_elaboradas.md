# 🕵️‍♂️ Pistas Elaboradas (Tema Noir) - Logic Detective

Este arquivo contém a elaboração de todas as pistas dos 12 casos do jogo em linguagem natural. Nos níveis médio e difícil, as pistas usam as características físicas em vez de nomes reais. As equivalências lógicas proposicionais de cada pista e a respectiva lore estão documentadas abaixo.

---

## 🟢 Casos Fáceis (3 Suspeitos + 3 Locais)

### Caso 1: Mistério no Bar
*   **Mapeamento de Lore**:
    *   Pessoa 1 = Jack Spade
    *   Pessoa 2 = Don Falcone
    *   Pessoa 3 = Lola Mercer
    *   Local 1 = O Escritório dos Fundos
    *   Local 2 = O Beco das Sombras
    *   Local 3 = O Balcão do Bar
*   **Pistas Elaboradas**:
    1. *Pista 1*: "O informante da esquina garante que viu Don Falcone no Beco das Sombras no horário estimado do crime."
       * Lógica: `Beco(Don)` | `Local 2(Pessoa 2)`
    2. *Pista 2*: "Se Lola Mercer estava no Escritório dos Fundos, então Don Falcone não estava no Beco das Sombras."
       * Lógica: `Escritório(Lola) → ¬ Beco(Don)` | `Local 1(Pessoa 3) → ¬ Local 2(Pessoa 2)`
    3. *Pista 3*: "Jack Spade estava no Balcão do Bar ou no Escritório dos Fundos."
       * Lógica: `Balcão(Jack) ∨ Escritório(Jack)` | `Local 3(Pessoa 1) ∨ Local 1(Pessoa 1)`
    4. *Pista 4*: "O culpado estava no Escritório dos Fundos."
       * Lógica: `Culpado ∈ Escritório` | `Culpado ∈ Local 1`

### Caso 2: Traição no Cais
*   **Mapeamento de Lore**:
    *   Pessoa 1 = Vito "O Navalha" Genovese
    *   Pessoa 2 = Evelyn Vance
    *   Pessoa 3 = Inspetor Miller
    *   Local 1 = O Píer de Carga
    *   Local 2 = O Galpão Abandonado
    *   Local 3 = As Docas de Névoa
*   **Pistas Elaboradas**:
    1. *Pista 1*: "O Inspetor Miller estava no Píer de Carga."
       * Lógica: `Píer(Inspetor)` | `Local 1(Pessoa 3)`
    2. *Pista 2*: "Se Vito "O Navalha" Genovese estava no Galpão Abandonado, então o Inspetor Miller não estava no Píer de Carga."
       * Lógica: `Galpão(Vito) → ¬ Píer(Inspetor)` | `Local 2(Pessoa 1) → ¬ Local 1(Pessoa 3)`
    3. *Pista 3*: "Evelyn Vance estava nas Docas de Névoa ou no Galpão Abandonado."
       * Lógica: `Docas(Evelyn) ∨ Galpão(Evelyn)` | `Local 3(Pessoa 2) ∨ Local 2(Pessoa 2)`
    4. *Pista 4*: "O culpado estava nas Docas de Névoa."
       * Lógica: `Culpado ∈ Docas` | `Culpado ∈ Local 3`

### Caso 3: O Silêncio na Mansão
*   **Mapeamento de Lore**:
    *   Pessoa 1 = Mordomo Sterling
    *   Pessoa 2 = Dr. Julian Ross
    *   Pessoa 3 = Glória DuPont
    *   Local 1 = A Estufa de Flores
    *   Local 2 = O Hall de Mármore
    *   Local 3 = A Biblioteca Privada
*   **Pistas Elaboradas**:
    1. *Pista 1*: "O Mordomo Sterling estava na Biblioteca Privada."
       * Lógica: `Biblioteca(Mordomo)` | `Local 3(Pessoa 1)`
    2. *Pista 2*: "Se Glória DuPont estava na Estufa de Flores, então o Mordomo Sterling não estava na Biblioteca Privada."
       * Lógica: `Estufa(Glória) → ¬ Biblioteca(Mordomo)` | `Local 1(Pessoa 3) → ¬ Local 3(Pessoa 1)`
    3. *Pista 3*: "O Dr. Julian Ross estava no Hall de Mármore ou na Estufa de Flores."
       * Lógica: `Hall(Dr.) ∨ Estufa(Dr.)` | `Local 2(Pessoa 2) ∨ Local 1(Pessoa 2)`
    4. *Pista 4*: "O culpado estava no Hall de Mármore."
       * Lógica: `Culpado ∈ Hall` | `Culpado ∈ Local 2`

### Caso 4: O Expresso da Meia-Noite
*   **Mapeamento de Lore**:
    *   Pessoa 1 = Condutor Harris
    *   Pessoa 2 = Rocky "Iron Fist" Malone
    *   Pessoa 3 = Senador Sterling
    *   Local 1 = A Cabine Presidencial
    *   Local 2 = O Vagão Restaurante
    *   Local 3 = O Corredor de Serviço
*   **Pistas Elaboradas**:
    1. *Pista 1*: "O Senador Sterling estava no Corredor de Serviço."
       * Lógica: `Corredor(Senador)` | `Local 3(Pessoa 3)`
    2. *Pista 2*: "Se o Condutor Harris estava no Vagão Restaurante, então o Senador Sterling não estava no Corredor de Serviço."
       * Lógica: `Vagão(Condutor) → ¬ Corredor(Senador)` | `Local 2(Pessoa 1) → ¬ Local 3(Pessoa 3)`
    3. *Pista 3*: "Rocky "Iron Fist" Malone estava na Cabine Presidencial ou no Vagão Restaurante."
       * Lógica: `Cabine(Rocky) ∨ Vagão(Rocky)` | `Local 1(Pessoa 2) ∨ Local 2(Pessoa 2)`
    4. *Pista 4*: "O culpado estava no Vagão Restaurante."
       * Lógica: `Culpado ∈ Vagão` | `Culpado ∈ Local 2`

## 🟡 Casos Médios (3 Suspeitos + 3 Locais + 3 Itens)

### Caso 5: O Fim do Informante
*   **Mapeamento de Lore**:
    *   Pessoa 1 = Arthur "Flash" Coburn
    *   Pessoa 2 = Mickey Burns
    *   Pessoa 3 = Advogado Vance
    *   Local 1 = O Beco do Lixo
    *   Local 2 = O Quarto de Pensão 304
    *   Local 3 = O Velvet Club
    *   Arma 1 = Soco-Inglês de Latão
    *   Arma 2 = Revólver Calibre .38
    *   Arma 3 = Fio de Aço de Garrote
*   **Pistas Elaboradas**:
    1. *Pista 1*: "A perícia descobriu que o fotógrafo de 28 anos com olhos castanhos estava portando o Soco-Inglês de Latão."
       * Lógica: `Soco-Inglês(Arthur)` | `Arma 1(Pessoa 1)`
    2. *Pista 2*: "Um suspeito estava no Velvet Club se e somente se estava portando um Revólver Calibre .38."
       * Lógica: `Velvet ↔ Revólver` | `Local 3 ↔ Arma 2`
    3. *Pista 3*: "O dossiê aponta: se o defensor de 47 anos com olhos azuis carregava o Fio de Aço de Garrote, então ele estava no Quarto de Pensão 304."
       * Lógica: `Fio(Advogado) → Quarto(Advogado)` | `Arma 3(Pessoa 3) → Local 2(Pessoa 3)`
    4. *Pista 4*: "O recepcionista anotou que o homem de 1,79 m de altura subiu para o Quarto de Pensão 304 ou foi visto saindo em direção ao Beco do Lixo."
       * Lógica: `Quarto(Advogado) ∨ Beco(Advogado)` | `Local 2(Pessoa 3) ∨ Local 1(Pessoa 3)`
    5. *Pista 5*: "A revista na pasta do homem de 1,79 m de altura confirmou que ele não portava o Revólver Calibre .38."
       * Lógica: `¬ Revólver(Advogado)` | `¬ Arma 2(Pessoa 3)`

### Caso 6: Dívida de Jogo
*   **Mapeamento de Lore**:
    *   Pessoa 1 = Frankie "Cicatriz"
    *   Pessoa 2 = Detetive Miller
    *   Pessoa 3 = Madame Rouge
    *   Local 1 = O Cofre do Cassino
    *   Local 2 = A Sala de Pôquer VIP
    *   Local 3 = O Estacionamento Subterrâneo
    *   Arma 1 = Barra de Ferro
    *   Arma 2 = Navalha de Barbeiro
    *   Arma 3 = Veneno de Cianeto
*   **Pistas Elaboradas**:
    1. *Pista 1*: "Impressões digitais do policial de 44 anos com olhos azuis foram encontradas na maçaneta interna do Cofre do Cassino."
       * Lógica: `Cofre(Detetive)` | `Local 1(Pessoa 2)`
    2. *Pista 2*: "O manobrista confirmou que a mulher de 37 anos com enigmáticos olhos verdes desceu com a chave para o Estacionamento Subterrâneo."
       * Lógica: `Estacionamento(Madame)` | `Local 3(Pessoa 3)`
    3. *Pista 3*: "Se o homem com uma cicatriz linear na bochecha direita estava na Sala de Pôquer VIP, então ele estava com a Navalha de Barbeiro."
       * Lógica: `Sala(Frankie) → Navalha(Frankie)` | `Local 2(Pessoa 1) → Arma 2(Pessoa 1)`
    4. *Pista 4*: "Se o policial de 44 anos não carregava o Cianeto, então a mulher de 37 anos com olhos verdes portava a Navalha de Barbeiro."
       * Lógica: `¬ Veneno(Detetive) → Navalha(Madame)` | `¬ Arma 3(Pessoa 2) → Arma 2(Pessoa 3)`
    5. *Pista 5*: "O policial com olhos azuis estava com o Cianeto se e somente se a mulher de 37 anos carregava a Barra de Ferro."
       * Lógica: `Veneno(Detetive) ↔ Barra(Madame)` | `Arma 3(Pessoa 2) ↔ Arma 1(Pessoa 3)`

### Caso 7: Chantagem na Alta Sociedade
*   **Mapeamento de Lore**:
    *   Pessoa 1 = Jornalista Kent
    *   Pessoa 2 = Duquesa Beatrice
    *   Pessoa 3 = Vito Genovese
    *   Local 1 = A Adega de Vinhos
    *   Local 2 = O Jardim Francês
    *   Local 3 = O Salão de Bilhar
    *   Arma 1 = Pistola com Silenciador
    *   Arma 2 = Faca de Trincheira
    *   Arma 3 = Arsênico no Licor
*   **Pistas Elaboradas**:
    1. *Pista 1*: "O jardineiro viu a mulher de 42 anos com uma pequena cicatriz sob o olho esquerdo perto da fonte do Jardim Francês."
       * Lógica: `Jardim(Duquesa)` | `Local 2(Pessoa 2)`
    2. *Pista 2*: "Se o jornalista de 30 anos com olhos castanhos estava na Adega de Vinhos, então ele portava a Pistola com Silenciador."
       * Lógica: `Adega(Jornalista) → Pistola(Jornalista)` | `Local 1(Pessoa 1) → Arma 1(Pessoa 1)`
    3. *Pista 3*: "O sicário de 45 anos com olhos pretos estava no Salão de Bilhar se e somente se o jornalista de 30 anos estava na Adega de Vinhos."
       * Lógica: `Salão(Vito) ↔ Adega(Jornalista)` | `Local 3(Pessoa 3) ↔ Local 1(Pessoa 1)`
    4. *Pista 4*: "O homem de 1,80 m com olhos pretos estava com o Arsênico no Licor ou a mulher de 42 anos portava a Pistola com Silenciador."
       * Lógica: `Arsênico(Vito) ∨ Pistola(Duquesa)` | `Arma 3(Pessoa 3) ∨ Arma 1(Pessoa 2)`
    5. *Pista 5*: "O sicário de 45 anos com olhos pretos não estava na Adega de Vinhos."
       * Lógica: `¬ Adega(Vito)` | `¬ Local 1(Pessoa 3)`

### Caso 8: Conspiração Industrial
*   **Mapeamento de Lore**:
    *   Pessoa 1 = Químico Sterling
    *   Pessoa 2 = Diretor Blackwell
    *   Pessoa 3 = Magnata DuPont
    *   Local 1 = A Sala de Arquivos
    *   Local 2 = A Recepção Central
    *   Local 3 = O Laboratório Químico
    *   Arma 1 = Seringa com Sedativo
    *   Arma 2 = Pasta com Documento Explosivo
    *   Arma 3 = Gás Monóxido no Duto
*   **Pistas Elaboradas**:
    1. *Pista 1*: "O vigia relatou que o homem de 60 anos com olhos pretos e austeros entrou no Laboratório Químico."
       * Lógica: `Laboratório(Magnata)` | `Local 3(Pessoa 3)`
    2. *Pista 2*: "Se o diretor de 43 anos com olhos castanhos estava com o Gás Monóxido no Duto, então ele esteve fisicamente na Sala de Arquivos."
       * Lógica: `Gás(Diretor) → Sala(Diretor)` | `Arma 3(Pessoa 2) → Local 1(Pessoa 2)`
    3. *Pista 3*: "O jovem pesquisador de 27 anos com olhos azuis estava com a Pasta com Documento Explosivo se e somente se o homem de 60 anos não estava com o Gás Monóxido no Duto."
       * Lógica: `Pasta(Químico) ↔ ¬ Gás(Magnata)` | `Arma 2(Pessoa 1) ↔ ¬ Arma 3(Pessoa 3)`
    4. *Pista 4*: "O chaveiro eletrônico registrou que o diretor de 43 anos acessou a Sala de Arquivos ou esteve no Laboratório Químico."
       * Lógica: `Sala(Diretor) ∨ Laboratório(Diretor)` | `Local 1(Pessoa 2) ∨ Local 3(Pessoa 2)`
    5. *Pista 5*: "O exame médico no jovem pesquisador de 27 anos atestou que ele não manuseou a Seringa com Sedativo."
       * Lógica: `¬ Seringa(Químico)` | `¬ Arma 1(Pessoa 1)`

## 🔴 Casos Difíceis (4 Suspeitos + 4 Locais + 4 Itens)

### Caso 9: Contrabando no Porto
*   **Mapeamento de Lore**:
    *   Pessoa 1 = Marinheiro Jack
    *   Pessoa 2 = Capitão Blackwood
    *   Pessoa 3 = Senhorita Carmine
    *   Pessoa 4 = Estivador Boris
    *   Local 1 = O Portão de Carga
    *   Local 2 = O Armazém Central
    *   Local 3 = A Loja de Penhores
    *   Local 4 = A Doca Seca
    *   Arma 1 = Rifle Mosquetão
    *   Arma 2 = Gancho de Carga
    *   Arma 3 = Corda de Cânhamo
    *   Arma 4 = Barra de Direção
*   **Pistas Elaboradas**:
    1. *Pista 1*: "O guarda anotou que o marujo de 29 anos com cicatriz de arpão na panturrilha se apresentou no local de grade de ferro alta com cadeado pesado."
       * Lógica: `Portão(Marinheiro)` | `Local 1(Pessoa 1)`
    2. *Pista 2*: "O encarregado confirmou que o gigante de 1,92 m com uma cicatriz no peito estava no fosso de concreto profundo e úmido."
       * Lógica: `Doca(Estivador)` | `Local 4(Pessoa 4)`
    3. *Pista 3*: "Se o comandante de 1,83 m portava o gancho de ferro curvo e pontiagudo, então ele estava no armazém de estrutura metálica com telhado de zinco."
       * Lógica: `Gancho(Capitão) → Armazém(Capitão)` | `Arma 2(Pessoa 2) → Local 2(Pessoa 2)`
    4. *Pista 4*: "Estar no local de grade de ferro alta com cadeado pesado equivale a portar o rifle de cano longo de ferro oxidado."
       * Lógica: `Portão ↔ Rifle` | `Local 1 ↔ Arma 1`
    5. *Pista 5*: "Estar no estabelecimento com prateleiras cheias de objetos antigos equivale a portar a corda de fibra grossa com nós de marinheiro se e somente se o gigante de 1,92 m não estava no local de grade de ferro com cadeado."
       * Lógica: `(Loja ↔ Corda) ↔ ¬ Portão(Estivador)` | `(Local 3 ↔ Arma 3) ↔ ¬ Local 1(Pessoa 4)`
    6. *Pista 6*: "Se o gigante com uma cicatriz no peito estava com a peça de aço maciço manchada de graxa, então o comandante de 1,83 m portava o gancho de ferro curvo."
       * Lógica: `Barra(Estivador) → Gancho(Capitão)` | `Arma 4(Pessoa 4) → Arma 2(Pessoa 2)`
    7. *Pista 7*: "A revista provou ser falso que o gigante de 1,92 m estivesse portando a corda de fibra grossa ou o gancho de ferro curvo."
       * Lógica: `¬ (Corda(Estivador) ∨ Gancho(Estivador))` | `¬ (Arma 3(Pessoa 4) ∨ Arma 2(Pessoa 4))`
    8. *Pista 8*: "O armeiro declarou que o comandante de olhos cinzentos não retirou o rifle de cano longo de ferro oxidado do estoque."
       * Lógica: `¬ Rifle(Capitão)` | `¬ Arma 1(Pessoa 2)`

### Caso 10: Traição sob os Holofotes
*   **Mapeamento de Lore**:
    *   Pessoa 1 = Ilusionista Raven
    *   Pessoa 2 = Diretor Sinclair
    *   Pessoa 3 = Atriz Evelyn
    *   Pessoa 4 = Crítico Malone
    *   Local 1 = Os Camarins
    *   Local 2 = A Galeria de Iluminação
    *   Local 3 = O Palco Principal
    *   Local 4 = A Bilheteria
    *   Arma 1 = Punhal de Aço Damasceno
    *   Arma 2 = Fio de Garrote Oculto
    *   Arma 3 = Dose de Clorofórmio
    *   Arma 4 = Veneno no Cálice de Adereço
*   **Pistas Elaboradas**:
    1. *Pista 1*: "O eletricista declarou que o produtor de 55 anos com olhos azuis subiu até a passarela de metal suspensa com refletores."
       * Lógica: `Galeria(Diretor)` | `Local 2(Pessoa 2)`
    2. *Pista 2*: "Um repórter fotografou a diva de olhos verdes com uma cicatriz no joelho enquanto ela passava pela cabine de madeira com janela de vidro circular."
       * Lógica: `Bilheteria(Atriz)` | `Local 4(Pessoa 3)`
    3. *Pista 3*: "Se o jornalista de 32 anos com uma cicatriz na clavícula estava com o lenço de linho com odor anestésico, ele estava no palco de piso de tábuas de madeira escura."
       * Lógica: `Dose(Crítico) → Palco(Crítico)` | `Arma 3(Pessoa 4) → Local 3(Pessoa 4)`
    4. *Pista 4*: "Estar no camarim com espelhos iluminados por lâmpadas incandescentes equivale a carregar a taça de latão ornamentada com falsas gemas contendo um pó fino."
       * Lógica: `Camarins ↔ Veneno` | `Local 1 ↔ Arma 4`
    5. *Pista 5*: "Estar na passarela de metal suspensa equivale a portar o fio ultra-fino de aço trançado com anéis nas pontas se e somente se o mágico de 1,80 m não estava na cabine de madeira de janela circular."
       * Lógica: `(Galeria ↔ Fio) ↔ ¬ Bilheteria(Ilusionista)` | `(Local 2 ↔ Arma 2) ↔ ¬ Local 4(Pessoa 1)`
    6. *Pista 6*: "Se o jornalista de 32 anos estava com o lenço de linho com odor anestésico, então a diva de olhos verdes com uma cicatriz no joelho portava o punhal com padrões ondulados na lâmina."
       * Lógica: `Dose(Crítico) → Punhal(Atriz)` | `Arma 3(Pessoa 4) → Arma 1(Pessoa 3)`
    7. *Pista 7*: "Provou-se ser falso que a diva de olhos verdes portasse o fio ultra-fino de aço trançado ou a taça de latão ornamentada."
       * Lógica: `¬ (Fio(Atriz) ∨ Veneno(Atriz))` | `¬ (Arma 2(Pessoa 3) ∨ Arma 4(Pessoa 3))`
    8. *Pista 8*: "O laudo provou que o jornalista com uma cicatriz na clavícula não teve contato com o punhal de padrões ondulados e não esteve no camarim com espelhos iluminados."
       * Lógica: `¬ Punhal(Crítico) ∧ ¬ Camarins(Crítico)` | `¬ Arma 1(Pessoa 4) ∧ ¬ Local 1(Pessoa 4)`

### Caso 11: Emboscada nas Sombras
*   **Mapeamento de Lore**:
    *   Pessoa 1 = Informante Slate
    *   Pessoa 2 = Don Barrows
    *   Pessoa 3 = Juíza Helena
    *   Pessoa 4 = Matador Umbra
    *   Local 1 = O Beco das Ratazanas
    *   Local 2 = O Canteiro de Obras
    *   Local 3 = O Esgoto Subterrâneo
    *   Local 4 = A Fábrica de Tecidos
    *   Arma 1 = Cano de Ferro Cortado
    *   Arma 2 = Maçarico a Gás
    *   Arma 3 = Martelo Pesado
    *   Arma 4 = Revólver Silenciado
*   **Pistas Elaboradas**:
    1. *Pista 1*: "O gerente confirmou que o líder da gangue de 57 anos com cicatriz no supercílio estava na fábrica com teares mecânicos barulhentos e fiapos de algodão."
       * Lógica: `Fábrica(Don)` | `Local 4(Pessoa 2)`
    2. *Pista 2*: "Um patrulheiro viu o arquivista de 31 anos com olhos azuis oculto no beco de tijolos vermelhos com limo nas paredes."
       * Lógica: `Beco(Informante)` | `Local 1(Pessoa 1)`
    3. *Pista 3*: "Se o atirador de 38 anos com cicatriz de queimadura na mão portava o revólver de aço escuro com silenciador artesanal, ele estava escondido na galeria subterrânea com escoamento de água escura."
       * Lógica: `Revólver(Matador) → Esgoto(Matador)` | `Arma 4(Pessoa 4) → Local 3(Pessoa 4)`
    4. *Pista 4*: "Estar no beco de tijolos vermelhos com limo nas paredes equivale a portar o tubo de encanamento de ferro com bordas serradas."
       * Lógica: `Beco ↔ Cano` | `Local 1 ↔ Arma 1`
    5. *Pista 5*: "Estar no terreno de terra batida enlameada e andaimes inacabados equivale a portar o bico queimador de latão com mangueira vermelha se e somente se o arquivista de 31 anos não estava na fábrica com teares mecânicos."
       * Lógica: `(Canteiro ↔ Maçarico) ↔ ¬ Fábrica(Informante)` | `(Local 2 ↔ Arma 2) ↔ ¬ Local 4(Pessoa 1)`
    6. *Pista 6*: "Se o líder de 57 anos com cicatriz no supercílio estava com o Martelo Pesado, então a magistrada de 44 anos portava o bico queimador de latão com mangueira vermelha."
       * Lógica: `Martelo(Don) → Maçarico(Juíza)` | `Arma 3(Pessoa 2) → Arma 2(Pessoa 3)`
    7. *Pista 7*: "A busca na maleta provou ser falso que o atirador com cicatriz de queimadura portasse o tubo de encanamento de ferro ou a ferramenta de cabeça de ferro de 5kg."
       * Lógica: `¬ (Cano(Matador) ∨ Martelo(Matador))` | `¬ (Arma 1(Pessoa 4) ∨ Arma 3(Pessoa 4))`
    8. *Pista 8*: "O escrivão atestou que a magistrada com olhos castanhos não carregava a ferramenta de cabeça de ferro de 5kg em suas mãos."
       * Lógica: `¬ Martelo(Juíza)` | `¬ Arma 3(Pessoa 3)`

### Caso 12: Execução sob a Névoa
*   **Mapeamento de Lore**:
    *   Pessoa 1 = Secretária Sterling
    *   Pessoa 2 = Don Salieri
    *   Pessoa 3 = Detetive Kelly
    *   Pessoa 4 = Mafioso Genovese
    *   Local 1 = O Pátio de Carga
    *   Local 2 = O Cais Abandonado
    *   Local 3 = O Armazém do Porto
    *   Local 4 = A Falésia do Farol
    *   Arma 1 = Armadilha de Aço
    *   Arma 2 = Faca de Açougueiro
    *   Arma 3 = Arpão Enferrujado
    *   Arma 4 = Corrente de Carga
*   **Pistas Elaboradas**:
    1. *Pista 1*: "Um velho pescador viu a assistente de 26 anos com sinal de nascença no pescoço parada no cais de tábuas podres e pilares com cracas."
       * Lógica: `Cais(Secretária)` | `Local 2(Pessoa 1)`
    2. *Pista 2*: "O vigia registrou que o braço direito de 45 anos com uma cicatriz na testa entrou no armazém de portas de metal enferrujado na penumbra."
       * Lógica: `Armazém(Mafioso)` | `Local 3(Pessoa 4)`
    3. *Pista 3*: "Se o chefe de 61 anos com olhos pretos portava a lâmina larga de 10 polegadas com rebites no cabo, ele subiu até o penhasco rochoso com ventania constante."
       * Lógica: `Faca(Don) → Falésia(Don)` | `Arma 2(Pessoa 2) → Local 4(Pessoa 2)`
    4. *Pista 4*: "Estar no armazém de portas de metal enferrujado na penumbra equivale a portar a corrente de elos espessos e manchada de fuligem."
       * Lógica: `Armazém ↔ Corrente` | `Local 3 ↔ Arma 4`
    5. *Pista 5*: "Estar no pátio de cascalho com vagões de trem estacionados equivale a portar o arpão de ponta de metal oxidada se e somente se a assistente de 26 anos não estava no armazém de portas de metal enferrujado."
       * Lógica: `(Pátio ↔ Arpão) ↔ ¬ Armazém(Secretária)` | `(Local 1 ↔ Arma 3) ↔ ¬ Local 3(Pessoa 1)`
    6. *Pista 6*: "Se a assistente de 26 anos com sinal de nascença no pescoço estava com a Armadilha de Aço, então o investigador de 42 anos com cicatriz no queixo estava com o arpão de ponta de metal oxidada."
       * Lógica: `Armadilha(Secretária) → Arpão(Detetive)` | `Arma 1(Pessoa 1) → Arma 3(Pessoa 3)`
    7. *Pista 7*: "A busca na alfaiataria provou ser falso que o chefe de 61 anos portasse o dispositivo de mandíbulas denteadas ou a corrente de elos espessos e manchada de fuligem."
       * Lógica: `¬ (Armadilha(Don) ∨ Corrente(Don))` | `¬ (Arma 1(Pessoa 2) ∨ Arma 4(Pessoa 2))`
    8. *Pista 8*: "O inventário atesta que o investigador com cicatriz no queixo não carregava o dispositivo de mandíbulas denteadas de ferro da corporação."
       * Lógica: `¬ Armadilha(Detetive)` | `¬ Arma 1(Pessoa 3)`

