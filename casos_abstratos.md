# 🕵️‍♂️ Casos Abstratos - Logic Detective

Este arquivo contém a estrutura de pistas original de todos os 12 casos do jogo, mas com suspeitos, locais e armas convertidos em placeholders genéricos (**Pessoa X**, **Local Y**, **Arma Z**) para fins de reestruturação lógica e teste.

---

## 🟢 Casos Fáceis (3 Suspeitos + 3 Locais)

### Caso 1: Assassinato em Hollywood
*   **Suspeitos**: Pessoa 1, Pessoa 2, Pessoa 3
*   **Locais**: Local 1, Local 2, Local 3
*   **Pistas**:
    1. Pessoa 2 estava no Local 2.
    2. A Pessoa 1 estava no Local 3 ou no Local 1.
    3. Se a Pessoa 3 estava no Local 1, então a Pessoa 2 não estava no Local 2.
    4. O culpado estava no Local 1.
*   **Solução**:
    *   **Culpado**: Pessoa 1
    *   **Local**: Local 1

### Caso 2: O Mistério do Velho na Ilha
*   **Suspeitos**: Pessoa 1, Pessoa 2, Pessoa 3
*   **Locais**: Local 1, Local 2, Local 3
*   **Pistas**:
    1. A Pessoa 3 estava no Local 1.
    2. A Pessoa 2 estava no Local 3 ou no Local 2.
    3. Se a Pessoa 1 estava no Local 2, então a Pessoa 3 não estava no Local 1.
    4. O culpado estava no Local 3.
*   **Solução**:
    *   **Culpado**: Pessoa 1
    *   **Local**: Local 3

### Caso 3: A Arte de Matar
*   **Suspeitos**: Pessoa 1, Pessoa 2, Pessoa 3
*   **Locais**: Local 1, Local 2, Local 3
*   **Pistas**:
    1. A Pessoa 1 estava no Local 3.
    2. A Pessoa 2 estava no Local 2 ou no Local 1.
    3. Se a Pessoa 3 estava no Local 1, então a Pessoa 1 não estava no Local 3.
    4. O culpado estava no Local 2.
*   **Solução**:
    *   **Culpado**: Pessoa 3
    *   **Local**: Local 2

### Caso 4: O Último Trem para o Assassinato
*   **Suspeitos**: Pessoa 1, Pessoa 2, Pessoa 3
*   **Locais**: Local 1, Local 2, Local 3
*   **Pistas**:
    1. A Pessoa 3 estava no Local 3.
    2. A Pessoa 2 estava no Local 1 ou no Local 2.
    3. Se a Pessoa 1 estava no Local 2, então a Pessoa 3 não estava no Local 3.
    4. O culpado estava no Local 2.
*   **Solução**:
    *   **Culpado**: Pessoa 2
    *   **Local**: Local 2

---

## 🟡 Casos Médios (3 Suspeitos + 3 Locais + 3 Armas)

### Caso 5: Assassinato na Biblioteca de Obras Raras
*   **Suspeitos**: Pessoa 1, Pessoa 2, Pessoa 3
*   **Locais**: Local 1, Local 2, Local 3
*   **Armas**: Arma 1, Arma 2, Arma 3
*   **Pistas**:
    1. A Pessoa 1 estava com a Arma 1.
    2. Uma pessoa estava no Local 3 se e somente se estava com a Arma 2.
    3. Se a Pessoa 3 estava com a Arma 3, então ela estava no Local 2.
    4. A Pessoa 3 estava no Local 2 ou no Local 1.
    5. É falso que a Pessoa 3 estava com a Arma 2.
*   **Solução**:
    *   **Culpado**: Pessoa 2
    *   **Local**: Local 3
    *   **Arma**: Arma 2

### Caso 6: Um Assassinato Misterioso na Floresta
*   **Suspeitos**: Pessoa 1, Pessoa 2, Pessoa 3
*   **Locais**: Local 1, Local 2, Local 3
*   **Armas**: Arma 1, Arma 2, Arma 3
*   **Pistas**:
    1. A Pessoa 2 estava no Local 1.
    2. A Pessoa 3 estava no Local 3.
    3. Se a Pessoa 1 estava no Local 2, então ela estava com a Arma 2.
    4. Se a Pessoa 2 não estava com a Arma 3, então a Pessoa 3 estava com a Arma 2.
    5. A Pessoa 2 estava com a Arma 3 se e somente se a Pessoa 3 estava com a Arma 1.
*   **Solução**:
    *   **Culpado**: Pessoa 1
    *   **Local**: Local 2
    *   **Arma**: Arma 2

### Caso 7: Investigação no Instituto
*   **Suspeitos**: Pessoa 1, Pessoa 2, Pessoa 3
*   **Locais**: Local 1, Local 2, Local 3
*   **Armas**: Arma 1, Arma 2, Arma 3
*   **Pistas**:
    1. A Pessoa 2 estava no Local 2.
    2. Se a Pessoa 1 estava no Local 1, então ela estava com a Arma 1.
    3. A Pessoa 3 estava no Local 3 se e somente se a Pessoa 1 estava no Local 1.
    4. A Pessoa 3 estava com a Arma 3 ou a Pessoa 2 estava com a Arma 1.
    5. A Pessoa 1 não estava com a Arma 3.
*   **Solução**:
    *   **Culpado**: Pessoa 3
    *   **Local**: Local 3
    *   **Arma**: Arma 3

### Caso 8: O Caso do Presidente Morto
*   **Suspeitos**: Pessoa 1, Pessoa 2, Pessoa 3
*   **Locais**: Local 1, Local 2, Local 3
*   **Armas**: Arma 1, Arma 2, Arma 3
*   **Pistas**:
    1. A Pessoa 3 estava no Local 3.
    2. Se a Pessoa 2 estava com a Arma 3, então ela estava no Local 1.
    3. A Pessoa 1 estava com a Arma 2 se e somente se a Pessoa 3 não estava com a Arma 3.
    4. A Pessoa 2 estava no Local 1 ou no Local 3.
    5. A Pessoa 1 não estava com a Arma 3.
*   **Solução**:
    *   **Culpado**: Pessoa 2
    *   **Local**: Local 1
    *   **Arma**: Arma 3

---

## 🔴 Casos Difíceis (4 Suspeitos + 4 Locais + 4 Armas)

### Caso 9: A Morte Grave no Cemitério
*   **Suspeitos**: Pessoa 1, Pessoa 2, Pessoa 3, Pessoa 4
*   **Locais**: Local 1, Local 2, Local 3, Local 4
*   **Armas**: Arma 1, Arma 2, Arma 3, Arma 4
*   **Pistas**:
    1. A Pessoa 1 estava no Local 1.
    2. A Pessoa 4 estava no Local 4.
    3. Se a Pessoa 2 estava com a Arma 2, então ela estava no Local 2.
    4. Estar no Local 1 é logicamente equivalente a portar a Arma 1.
    5. Estar no Local 3 equivale a ter a Arma 3 se e somente se a Pessoa 4 não estava no Local 1.
    6. Se a Pessoa 4 estava com a Arma 4, então a Pessoa 2 estava com a Arma 2.
    7. É falso que a Pessoa 4 estava com a Arma 3 ou com a Arma 2.
    8. A Pessoa 2 não estava com a Arma 1.
*   **Solução**:
    *   **Culpado**: Pessoa 2
    *   **Local**: Local 2
    *   **Arma**: Arma 2

### Caso 10: Retorno ao Instituto
*   **Suspeitos**: Pessoa 1, Pessoa 2, Pessoa 3, Pessoa 4
*   **Locais**: Local 1, Local 2, Local 3, Local 4
*   **Armas**: Arma 1, Arma 2, Arma 3, Arma 4
*   **Pistas**:
    1. A Pessoa 2 estava no Local 2.
    2. A Pessoa 3 estava no Local 4.
    3. Se a Pessoa 4 estava com a Arma 3, então ela estava no Local 3.
    4. Uma pessoa estava no Local 1 se e somente se portava a Arma 4.
    5. A pessoa no Local 2 estava com a Arma 2 se e somente se a Pessoa 1 não estava no Local 4.
    6. Se a Pessoa 4 estava com a Arma 1, então a Pessoa 3 estava com a Arma 3.
    7. É falso que a Pessoa 3 estava com a Arma 2 ou com a Arma 4.
    8. A Pessoa 4 não estava com a Vara de Radiestesia (Arma 1).
*   **Solução**:
    *   **Culpado**: Pessoa 4
    *   **Local**: Local 3
    *   **Arma**: Arma 3

### Caso 11: A Caminhada na Floresta
*   **Suspeitos**: Pessoa 1, Pessoa 2, Pessoa 3, Pessoa 4
*   **Locais**: Local 1, Local 2, Local 3, Local 4
*   **Armas**: Arma 1, Arma 2, Arma 3, Arma 4
*   **Pistas**:
    1. A Pessoa 2 estava no Local 4.
    2. A Pessoa 1 estava no Local 1.
    3. Se a Pessoa 4 estava com a Arma 4, então ela estava no Local 3.
    4. Estar no Local 1 equivale a portar a Arma 1.
    5. Estar no Local 2 equivale a ter a Arma 2 se e somente se a Pessoa 1 não estava no Local 4.
    6. Se a Pessoa 4 estava com a Arma 3, então a Pessoa 3 estava com a Arma 2.
    7. É falso que a Pessoa 4 estava com a Arma 1 ou com a Arma 3.
    8. A Pessoa 3 não estava com a Arma 3.
*   **Solução**:
    *   **Culpado**: Pessoa 4
    *   **Local**: Local 3
    *   **Arma**: Arma 4

### Caso 12: E Então Houve Outro Novamente
*   **Suspeitos**: Pessoa 1, Pessoa 2, Pessoa 3, Pessoa 4
*   **Locais**: Local 1, Local 2, Local 3, Local 4
*   **Armas**: Arma 1, Arma 2, Arma 3, Arma 4
*   **Pistas**:
    1. A Pessoa 1 estava no Local 2.
    2. A Pessoa 4 estava no Local 3.
    3. Se a Pessoa 2 estava com a Arma 2, então ela estava no Local 4.
    4. Estar no Local 3 equivale a portar a Arma 4.
    5. Estar no Local 1 equivale a ter a Arma 3 se e somente se a Pessoa 1 não estava no Local 3.
    6. Se a Pessoa 2 estava com a Arma 1, então a Pessoa 3 estava com a Arma 3.
    7. É falso que a Pessoa 2 estava com a Arma 1 ou com a Arma 4.
    8. A Pessoa 3 não estava com a Arma 1.
*   **Solução**:
    *   **Culpado**: Pessoa 2
    *   **Local**: Local 4
    *   **Arma**: Arma 2
