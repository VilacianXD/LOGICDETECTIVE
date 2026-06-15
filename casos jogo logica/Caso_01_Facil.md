# Caso 1: Assassinato em Hollywood (Lógica Proposicional)

**Dificuldade:** Fácil (3 Suspeitos, 3 Locais - Sem Armas)

---

## 👥 Suspeitos
| Nome | Símbolo | Descrição |
| --- | --- | --- |
| O Incrível Amarelinho | **A** | Uma mágica que aperfeiçoou a rotina de serrar seu marido ao meio. |
| Meia-Noite III | **M** | O neto do fundador da Midnight Movies. |
| Dama Obsidiana | **D** | Uma escritora de mistério cujos livros são recordistas de vendas. |

## 📍 Locais
| Local | Símbolo | Tipo |
| --- | --- | --- |
| O Banheiro Enorme | **B** | Interno |
| O Quarto | **Q** | Interno |
| A Sala de Projeção | **P** | Interno |

---

## 🔍 Pistas Proposicionais
1. **$Q(M)$**  
   *Meia-Noite III estava no Quarto.*
2. **$B(D) \rightarrow \neg Q(M)$**  
   *Se a Dama Obsidiana estava no Banheiro Enorme, então Meia-Noite III não estava no Quarto.*
3. **$P(A) \lor B(A)$**  
   *O Incrível Amarelinho estava na Sala de Projeção ou no Banheiro Enorme.*
4. **$Culpado \in B$**  
   *O assassino estava no Banheiro Enorme.*

---

## 💡 Dica do Inspetor Irratino
> [!TIP]
> **Dica do Inspetor:**  
> Use a regra de inferência **Modus Tollens** na Pista 2 usando a Pista 1 para deduzir onde a Dama Obsidiana *não* estava. Em seguida, utilize o **Silogismo Disjuntivo** para encontrar a posição do Incrível Amarelinho.

---

## 🔓 Solução
<details>
<summary>Clique para revelar a veredito e a dedução lógica</summary>

### ⚖️ O Veredito
**Culpado:** O Incrível Amarelinho no Banheiro Enorme!

---

### 📝 Demonstração da Dedução Passo a Passo

1. **Localização de Meia-Noite III:**  
   Pela Pista 1, sabemos que Meia-Noite III estava no Quarto:  
   $$\text{Premissa: } Q(M)$$

2. **Localização da Dama Obsidiana:**  
   Pela Pista 2, temos $B(D) \rightarrow \neg Q(M)$. Como sabemos que $Q(M)$ é VERDADE, o consequente $\neg Q(M)$ é FALSO.  
   Aplicando a regra de contraposição (**Modus Tollens**):  
   $$Q(M) \land (B(D) \rightarrow \neg Q(M)) \vdash \neg B(D)$$  
   Portanto, a Dama Obsidiana **não** estava no Banheiro Enorme.  
   Como Meia-Noite III já ocupava o Quarto ($Q(M)$), a Dama Obsidiana não podia estar no Quarto ($\neg Q(D)$).  
   Por exclusão dos três locais possíveis (Banheiro, Quarto e Sala de Projeção), a Dama Obsidiana só poderia estar na **Sala de Projeção**:  
   $$\text{Conclusão: } P(D)$$

3. **Localização do Incrível Amarelinho:**  
   Como a Dama Obsidiana estava na Sala de Projeção ($P(D)$), o Incrível Amarelinho **não** podia estar na Sala de Projeção:  
   $$\text{Conclusão: } \neg P(A)$$  
   Pela Pista 3, temos a disjunção $P(A) \lor B(A)$. Aplicando o **Silogismo Disjuntivo** com $\neg P(A)$:  
   $$\neg P(A) \land (P(A) \lor B(A)) \vdash B(A)$$  
   Logo, o Incrível Amarelinho estava no **Banheiro Enorme**.

4. **Identificação do Culpado:**  
   A Pista 4 afirma que o culpado estava no Banheiro Enorme ($Culpado \in B$). Como demonstramos que o Incrível Amarelinho estava no Banheiro Enorme ($B(A)$), ele é o assassino!

| Suspeito | Local | Status |
| --- | --- | --- |
| **O Incrível Amarelinho** | O Banheiro Enorme | **Assassino** |
| **Meia-Noite III** | O Quarto | Inocente |
| **Dama Obsidiana** | A Sala de Projeção | Inocente |

</details>
