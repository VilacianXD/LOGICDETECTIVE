# Caso 5: Assassinato na Biblioteca de Obras Raras (Lógica Proposicional)

**Dificuldade:** Médio (3 Suspeitos, 3 Locais, 3 Armas)

---

## 👥 Suspeitos
| Nome | Símbolo | Descrição |
| --- | --- | --- |
| Sociólogo Umbra | **Umbra** | Um sociólogo fascinado por crimes individuais e de massa. |
| Filólogo Flint | **Flint** | Um filólogo focado na etimologia das palavras. |
| Numerólogo Night | **Night** | Um matemático esotérico especialista em calcular o significado de X. |

## 📍 Locais
| Local | Símbolo | Tipo |
| --- | --- | --- |
| As Estátuas de Animais | **Estatuas** | Externo |
| O Sótão Arcano | **Sotao** | Interno |
| O Salão de Baile | **Salao** | Interno |

## 🗡️ Armas
| Arma | Símbolo | Peso |
| --- | --- | --- |
| Adaga Amaldiçoada | **Adaga** | Leve |
| Varinha de Selenita | **Varinha** | Médio |
| Pin Exclusivo | **Pin** | Leve |

---

## 🔍 Pistas Proposicionais
1. **$Adaga(Umbra)$**  
   *O Sociólogo Umbra estava com a Adaga Amaldiçoada.*
2. **$Salao \leftrightarrow Varinha$**  
   *Uma pessoa estava no Salão de Baile se e somente se estava com a Varinha de Selenita.*
3. **$Pin(Night) \rightarrow Sotao(Night)$**  
   *Se o Numerólogo Night estava com o Pin Exclusivo, então ele estava no Sótão Arcano.*
4. **$Sotao(Night) \lor Estatuas(Night)$**  
   *O Numerólogo Night estava no Sótão Arcano ou nas Estátuas de Animais.*
5. **$\neg Varinha(Night)$**  
   *É falso que o Numerólogo Night estava com a Varinha de Selenita.*
6. **$Culpado \in Salao$**  
   *O assassino estava no Salão de Baile.*

---

## 💡 Dica do Inspetor Irratino
> [!TIP]
> **Dica do Inspetor:**  
> Use a Pista 1 e a Pista 5 para descobrir qual arma estava com o Numerólogo Night por exclusão. Depois, aplique o **Modus Ponens** na Pista 3 para descobrir o local de Night e, finalmente, utilize a equivalência da Pista 2 para desvendar a arma e o local de Flint.

---

## 🔓 Solução
<details>
<summary>Clique para revelar o veredito e a dedução lógica</summary>

### ⚖️ O Veredito
**Culpado:** Filólogo Flint com a Varinha de Selenita no Salão de Baile!

---

### 📝 Demonstração da Dedução Passo a Passo

1. **Associação de Armas aos Suspeitos:**  
   - Pela Pista 1: $Adaga(Umbra)$ (Umbra tem a Adaga).
   - Pela Pista 5: $\neg Varinha(Night)$ (Night não tem a Varinha).
   - Como a Adaga está com Umbra e a Varinha não está com Night, a única arma restante para o Numerólogo Night é o **Pin Exclusivo**:
     $$\text{Conclusão: } Pin(Night)$$
   - Consequentemente, por exclusão das armas, a **Varinha de Selenita** só pode estar com o Filólogo Flint:
     $$\text{Conclusão: } Varinha(Flint)$$

2. **Localização do Numerólogo Night:**  
   Pela Pista 3, temos $Pin(Night) \rightarrow Sotao(Night)$. Como provamos $Pin(Night)$ na etapa anterior, aplicamos o **Modus Ponens**:
   $$Pin(Night) \land (Pin(Night) \rightarrow Sotao(Night)) \vdash Sotao(Night)$$
   Logo, o Numerólogo Night estava no **Sótão Arcano**.

3. **Localização e Armas dos outros Suspeitos:**  
   - Como Night está no Sótão Arcano, os outros locais (Estátuas de Animais e Salão de Baile) devem ser de Umbra e Flint.
   - Pela Pista 2: $Salao \leftrightarrow Varinha$ (estar no Salão de Baile é logicamente equivalente a portar a Varinha).
   - Como provamos que Flint tem a Varinha ($Varinha(Flint)$), concluímos que ele estava no **Salão de Baile**:
     $$\text{Conclusão: } Salao(Flint)$$
   - Por exclusão de locais, o Sociólogo Umbra estava nas **Estátuas de Animais**:
     $$\text{Conclusão: } Estatuas(Umbra)$$

4. **Identificação do Culpado:**  
   A Pista 6 afirma que o culpado estava no Salão de Baile. Como provamos que o Filólogo Flint estava no Salão de Baile ($Salao(Flint)$) portando a Varinha de Selenita ($Varinha(Flint)$), Flint é o assassino!

| Suspeito | Local | Arma | Status |
| --- | --- | --- | --- |
| **Filólogo Flint** | O Salão de Baile | Varinha de Selenita | **Assassino** |
| **Sociólogo Umbra** | As Estátuas de Animais | Adaga Amaldiçoada | Inocente |
| **Numerólogo Night** | O Sótão Arcano | Pin Exclusivo | Inocente |

</details>
