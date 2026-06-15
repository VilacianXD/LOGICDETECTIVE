# Caso 4: O Último Trem para o Assassinato (Lógica Proposicional)

**Dificuldade:** Fácil (3 Suspeitos, 3 Locais - Sem Armas)

---

## 👥 Suspeitos
| Nome | Símbolo | Descrição |
| --- | --- | --- |
| Vice-Presidente Mauve | **M** | Uma vice-presidente da TekCo Futures envolvida com tecnologia. |
| Chef Berinjela | **Be** | Uma chef talentosa envolvida em boatos sobre sua culinária. |
| Filósofo Bone | **B** | Um filósofo que crê não ser responsável por suas ações. |

## 📍 Locais
| Local | Símbolo | Tipo |
| --- | --- | --- |
| A Locomotiva | **L** | Interno |
| O Vagão de Cauda | **V** | Interno |
| O Teto | **Te** | Externo |

---

## 🔍 Pistas Proposicionais
1. **$Te(B)$**  
   *O Filósofo Bone estava no Teto.*
2. **$V(M) \rightarrow \neg Te(B)$**  
   *Se a Vice-Presidente Mauve estava no Vagão de Cauda, então o Filósofo Bone não estava no Teto.*
3. **$L(Be) \lor V(Be)$**  
   *A Chef Berinjela estava na Locomotiva ou no Vagão de Cauda.*
4. **$Culpado \in V$**  
   *O assassino estava no Vagão de Cauda.*

---

## 💡 Dica do Inspetor Irratino
> [!TIP]
> **Dica do Inspetor:**  
> Use a Pista 1 e a Pista 2 com a regra **Modus Tollens** para excluir o Vagão de Cauda do local da Vice-Presidente Mauve. Determine seu local por exclusão e use o **Silogismo Disjuntivo** na Pista 3 para posicionar a Chef Berinjela.

---

## 🔓 Solução
<details>
<summary>Clique para revelar o veredito e a dedução lógica</summary>

### ⚖️ O Veredito
**Culpada:** Chef Berinjela no Vagão de Cauda!

---

### 📝 Demonstração da Dedução Passo a Passo

1. **Localização do Filósofo Bone:**  
   Pela Pista 1, sabemos que o Filósofo Bone estava no Teto:  
   $$\text{Premissa: } Te(B)$$

2. **Localização da Vice-Presidente Mauve:**  
   Pela Pista 2, temos $V(M) \rightarrow \neg Te(B)$. Como $Te(B)$ é VERDADE, o consequente $\neg Te(B)$ é FALSO.  
   Aplicando a regra de contraposição (**Modus Tollens**):  
   $$Te(B) \land (V(M) \rightarrow \neg Te(B)) \vdash \neg V(M)$$  
   Portanto, a Vice-Presidente Mauve **não** estava no Vagão de Cauda.  
   Como o Filósofo Bone já ocupava o Teto ($Te(B)$), a Vice-Presidente Mauve também não podia estar no Teto ($\neg Te(M)$).  
   Por exclusão dos três locais possíveis, a Vice-Presidente Mauve só poderia estar na **Locomotiva**:  
   $$\text{Conclusão: } L(M)$$

3. **Localização da Chef Berinjela:**  
   Como a Vice-Presidente Mauve estava na Locomotiva ($L(M)$), a Chef Berinjela **não** podia estar na Locomotiva:  
   $$\text{Conclusão: } \neg L(Be)$$  
   Pela Pista 3, temos a disjunção $L(Be) \lor V(Be)$. Aplicando o **Silogismo Disjuntivo** com $\neg L(Be)$:  
   $$\neg L(Be) \land (L(Be) \lor V(Be)) \vdash V(Be)$$  
   Logo, a Chef Berinjela estava no **Vagão de Cauda**.

4. **Identificação do Culpado:**  
   A Pista 4 diz que o culpado estava no Vagão de Cauda ($Culpado \in V$). Como deduzimos que a Chef Berinjela estava no Vagão de Cauda ($V(Be)$), ela é a assassina!

| Suspeito | Local | Status |
| --- | --- | --- |
| **Chef Berinjela** | O Vagão de Cauda | **Assassina** |
| **Vice-Presidente Mauve** | A Locomotiva | Inocente |
| **Filósofo Bone** | O Teto | Inocente |

</details>
