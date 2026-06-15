# Caso 2: O Mistério do Velho na Ilha (Lógica Proposicional)

**Dificuldade:** Fácil (3 Suspeitos, 3 Locais - Sem Armas)

---

## 👥 Suspeitos
| Nome | Símbolo | Descrição |
| --- | --- | --- |
| Padre Manga | **M** | Um padre com uma queda por esportes aquáticos e confissões dramáticas. |
| Senhorita Açafrão | **A** | Uma herdeira rica que viaja com uma bolsa suspeitosamente grande. |
| Senhor Esmeralda | **E** | Um joalheiro de renome cujas pedras preciosas caem de seus bolsos. |

## 📍 Locais
| Local | Símbolo | Tipo |
| --- | --- | --- |
| Os Penhascos | **P** | Externo |
| As Ruínas Antigas | **R** | Externo |
| As Docas | **D** | Externo |

---

## 🔍 Pistas Proposicionais
1. **$P(E)$**  
   *O Senhor Esmeralda estava nos Penhascos.*
2. **$R(M) \rightarrow \neg P(E)$**  
   *Se o Padre Manga estava nas Ruínas Antigas, então o Senhor Esmeralda não estava nos Penhascos.*
3. **$D(A) \lor R(A)$**  
   *A Senhorita Açafrão estava nas Docas ou nas Ruínas Antigas.*
4. **$Culpado \in D$**  
   *O assassino estava nas Docas.*

---

## 💡 Dica do Inspetor Irratino
> [!TIP]
> **Dica do Inspetor:**  
> Com a Pista 1 e a Pista 2, use a regra **Modus Tollens** para descobrir onde o Padre Manga não estava. Depois, determine a posição do Padre Manga por exclusão e use o **Silogismo Disjuntivo** na Pista 3 para situar a Senhorita Açafrão.

---

## 🔓 Solução
<details>
<summary>Clique para revelar o veredito e a dedução lógica</summary>

### ⚖️ O Veredito
**Culpado:** Padre Manga nas Docas!

---

### 📝 Demonstração da Dedução Passo a Passo

1. **Localização do Senhor Esmeralda:**  
   Pela Pista 1, sabemos que o Senhor Esmeralda estava nos Penhascos:  
   $$\text{Premissa: } P(E)$$

2. **Localização do Padre Manga:**  
   Pela Pista 2, temos $R(M) \rightarrow \neg P(E)$. Como $P(E)$ é VERDADE, o consequente $\neg P(E)$ é FALSO.  
   Aplicando a regra do **Modus Tollens**:  
   $$P(E) \land (R(M) \rightarrow \neg P(E)) \vdash \neg R(M)$$  
   Portanto, o Padre Manga **não** estava nas Ruínas Antigas.  
   Como o Senhor Esmeralda já ocupava os Penhascos ($P(E)$), o Padre Manga também não podia estar nos Penhascos ($\neg P(M)$).  
   Por exclusão dos três locais possíveis, o Padre Manga só poderia estar nas **Docas**:  
   $$\text{Conclusão: } D(M)$$

3. **Localização da Senhorita Açafrão:**  
   Como o Padre Manga estava nas Docas ($D(M)$), a Senhorita Açafrão **não** podia estar nas Docas:  
   $$\text{Conclusão: } \neg D(A)$$  
   Pela Pista 3, temos a disjunção $D(A) \lor R(A)$. Aplicando o **Silogismo Disjuntivo** com $\neg D(A)$:  
   $$\neg D(A) \land (D(A) \lor R(A)) \vdash R(A)$$  
   Logo, a Senhorita Açafrão estava nas **Ruínas Antigas**.

4. **Identificação do Culpado:**  
   A Pista 4 diz que o culpado estava nas Docas ($Culpado \in D$). Como demonstramos que o Padre Manga estava nas Docas ($D(M)$), ele é o culpado!

| Suspeito | Local | Status |
| --- | --- | --- |
| **Padre Manga** | As Docas | **Assassino** |
| **Senhorita Açafrão** | As Ruínas Antigas | Inocente |
| **Senhor Esmeralda** | Os Penhascos | Inocente |

</details>
