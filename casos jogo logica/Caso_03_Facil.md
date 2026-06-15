# Caso 3: A Arte de Matar (Lógica Proposicional)

**Dificuldade:** Fácil (3 Suspeitos, 3 Locais - Sem Armas)

---

## 👥 Suspeitos
| Nome | Símbolo | Descrição |
| --- | --- | --- |
| Blackstone, Esq. | **B** | Um advogado de defesa de prestígio que conhece todas as brechas da lei. |
| Bispo Azure | **Az** | Uma bispa local conhecida por suas orações... peculiares. |
| Capitã Slate | **S** | Uma astronauta veterana que diz que a gravidade zero altera comportamentos. |

## 📍 Locais
| Local | Símbolo | Tipo |
| --- | --- | --- |
| O Jardim do Terraço | **J** | Externo |
| O Hall de Entrada | **H** | Interno |
| O Atelier de Arte | **A** | Interno |

---

## 🔍 Pistas Proposicionais
1. **$A(B)$**  
   *Blackstone, Esq. estava no Atelier de Arte.*
2. **$J(S) \rightarrow \neg A(B)$**  
   *Se a Capitã Slate estava no Jardim do Terraço, então Blackstone, Esq. não estava no Atelier de Arte.*
3. **$H(Az) \lor J(Az)$**  
   *O Bispo Azure estava no Hall de Entrada ou no Jardim do Terraço.*
4. **$Culpado \in H$**  
   *O assassino estava no Hall de Entrada.*

---

## 💡 Dica do Inspetor Irratino
> [!TIP]
> **Dica do Inspetor:**  
> Com a Pista 1 e a Pista 2, aplique o **Modus Tollens** para descobrir onde a Capitã Slate *não* estava. Em seguida, descubra sua localização real por exclusão e use o **Silogismo Disjuntivo** na Pista 3 para posicionar o Bispo Azure.

---

## 🔓 Solução
<details>
<summary>Clique para revelar o veredito e a dedução lógica</summary>

### ⚖️ O Veredito
**Culpada:** Capitã Slate no Hall de Entrada!

---

### 📝 Demonstração da Dedução Passo a Passo

1. **Localização de Blackstone, Esq.:**  
   Pela Pista 1, sabemos que Blackstone, Esq. estava no Atelier de Arte:  
   $$\text{Premissa: } A(B)$$

2. **Localização da Capitã Slate:**  
   Pela Pista 2, temos $J(S) \rightarrow \neg A(B)$. Como $A(B)$ é VERDADE, o consequente $\neg A(B)$ é FALSO.  
   Aplicando a regra de contraposição (**Modus Tollens**):  
   $$A(B) \land (J(S) \rightarrow \neg A(B)) \vdash \neg J(S)$$  
   Portanto, a Capitã Slate **não** estava no Jardim do Terraço.  
   Como Blackstone, Esq. já ocupava o Atelier de Arte ($A(B)$), a Capitã Slate também não podia estar no Atelier ($\neg A(S)$).  
   Por exclusão dos três locais possíveis, a Capitã Slate só poderia estar no **Hall de Entrada**:  
   $$\text{Conclusão: } H(S)$$

3. **Localização do Bispo Azure:**  
   Como a Capitã Slate estava no Hall de Entrada ($H(S)$), o Bispo Azure **não** podia estar no Hall de Entrada:  
   $$\text{Conclusão: } \neg H(Az)$$  
   Pela Pista 3, temos a disjunção $H(Az) \lor J(Az)$. Aplicando o **Silogismo Disjuntivo** com $\neg H(Az)$ nos dá:  
   $$\neg H(Az) \land (H(Az) \lor J(Az)) \vdash J(Az)$$  
   Logo, o Bispo Azure estava no **Jardim do Terraço**.

4. **Identificação do Culpado:**  
   A Pista 4 diz que o culpado estava no Hall de Entrada ($Culpado \in H$). Como deduzimos que a Capitã Slate estava no Hall de Entrada ($H(S)$), ela é a assassina!

| Suspeito | Local | Status |
| --- | --- | --- |
| **Capitã Slate** | O Hall de Entrada | **Assassina** |
| **Bispo Azure** | O Jardim do Terraço | Inocente |
| **Blackstone, Esq.** | O Atelier de Arte | Inocente |

</details>
