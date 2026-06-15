# Caso 6: Um Assassinato Misterioso na Floresta (Lógica Proposicional)

**Dificuldade:** Médio (3 Suspeitos, 3 Locais, 3 Armas)

---

## 👥 Suspeitos
| Nome | Símbolo | Descrição |
| --- | --- | --- |
| Treinador Raspberry | **Raspberry** | Um renomado treinador esportivo. |
| Policial Cobre | **Cobre** | Uma policial atenta, que talvez saiba demais sobre o crime. |
| Grão-Mestre Rose | **Rose** | Um enxadrista calculista que analisa todos os passos como jogadas. |

## 📍 Locais
| Local | Símbolo | Tipo |
| --- | --- | --- |
| A Pedra da Caveira | **Pedra** | Externo |
| As Ruínas Antigas | **Ruinas** | Externo |
| A Única Estrada | **Estrada** | Externo |

## 🗡️ Armas
| Arma | Símbolo | Peso |
| --- | --- | --- |
| Uma Pá | **Pa** | Médio |
| Uma Adaga Ritual | **Adaga** | Médio |
| Uma Aranha Venenosa | **Aranha** | Leve |

---

## 🔍 Pistas Proposicionais
1. **$Pedra(Cobre)$**  
   *A Policial Cobre estava na Pedra da Caveira.*
2. **$Estrada(Rose)$**  
   *O Grão-Mestre Rose estava na Única Estrada.*
3. **$Ruinas(Raspberry) \rightarrow Adaga(Raspberry)$**  
   *Se o Treinador Raspberry estava nas Ruínas Antigas, então ele estava com a Adaga Ritual.*
4. **$\neg Aranha(Cobre) \rightarrow Adaga(Rose)$**  
   *Se a Policial Cobre não estava com a Aranha Venenosa, então o Grão-Mestre Rose estava com a Adaga Ritual.*
5. **$Aranha(Cobre) \leftrightarrow Pa(Rose)$**  
   *A Policial Cobre estava com a Aranha Venenosa se e somente se o Grão-Mestre Rose estava com a Pá.*
6. **$Culpado \in Ruinas$**  
   *O assassino estava nas Ruínas Antigas.*

---

## 💡 Dica do Inspetor Irratino
> [!TIP]
> **Dica do Inspetor:**  
> Determine o local de Raspberry por exclusão a partir das Pistas 1 e 2. Use a Pista 3 com o **Modus Ponens** para descobrir a arma de Raspberry, o que significa que Rose não pode ter essa arma. Aplique o **Modus Tollens** na Pista 4 para descobrir a arma de Cobre, e a equivalência da Pista 5 para situar a Pá de Rose.

---

## 🔓 Solução
<details>
<summary>Clique para revelar o veredito e a dedução lógica</summary>

### ⚖️ O Veredito
**Culpado:** Treinador Raspberry com a Adaga Ritual nas Ruínas Antigas!

---

### 📝 Demonstração da Dedução Passo a Passo

1. **Localização dos Suspeitos:**  
   - Pela Pista 1: $Pedra(Cobre)$ (Cobre está na Pedra da Caveira).
   - Pela Pista 2: $Estrada(Rose)$ (Rose está na Única Estrada).
   - Por exclusão dos três locais possíveis, o Treinador Raspberry só pode estar nas **Ruínas Antigas**:
     $$\text{Conclusão: } Ruinas(Raspberry)$$

2. **Dedução da Arma de Raspberry:**  
   Pela Pista 3, temos $Ruinas(Raspberry) \rightarrow Adaga(Raspberry)$. Como provamos que ele está nas Ruínas, por **Modus Ponens**:
   $$Ruinas(Raspberry) \land (Ruinas(Raspberry) \rightarrow Adaga(Raspberry)) \vdash Adaga(Raspberry)$$
   Logo, o Treinador Raspberry estava com a **Adaga Ritual**.

3. **Dedução das Armas dos outros Suspeitos:**  
   - Sabendo que Raspberry está com a Adaga Ritual ($Adaga(Raspberry)$), nenhum outro suspeito pode estar com ela. Logo, o Grão-Mestre Rose **não** está com a Adaga:
     $$\text{Conclusão: } \neg Adaga(Rose)$$
   - Pela Pista 4, temos $\neg Aranha(Cobre) \rightarrow Adaga(Rose)$. Como $\neg Adaga(Rose)$ é VERDADE, o consequente é FALSO.  
     Aplicando **Modus Tollens**:
     $$\neg Adaga(Rose) \land (\neg Aranha(Cobre) \rightarrow Adaga(Rose)) \vdash \neg(\neg Aranha(Cobre)) \equiv Aranha(Cobre)$$
     Logo, a Policial Cobre estava com a **Aranha Venenosa**.
   - Pela Pista 5, temos a bicondicional $Aranha(Cobre) \leftrightarrow Pa(Rose)$. Como $Aranha(Cobre)$ é VERDADE:
     $$Aranha(Cobre) \land (Aranha(Cobre) \leftrightarrow Pa(Rose)) \vdash Pa(Rose)$$
     Portanto, o Grão-Mestre Rose estava com a **Pá**.

4. **Identificação do Culpado:**  
   A Pista 6 afirma que o culpado estava nas Ruínas Antigas. Provamos que o Treinador Raspberry estava nas Ruínas Antigas ($Ruinas(Raspberry)$) portando a Adaga Ritual ($Adaga(Raspberry)$). Portanto, ele é o assassino!

| Suspeito | Local | Arma | Status |
| --- | --- | --- | --- |
| **Treinador Raspberry** | As Ruínas Antigas | Adaga Ritual | **Assassino** |
| **Policial Cobre** | A Pedra da Caveira | Aranha Venenosa | Inocente |
| **Grão-Mestre Rose** | A Única Estrada | Uma Pá | Inocente |

</details>
