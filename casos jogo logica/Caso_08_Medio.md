# Caso 8: O Caso do Presidente Morto (Lógica Proposicional)

**Dificuldade:** Médio (3 Suspeitos, 3 Locais, 3 Armas)

---

## 👥 Suspeitos
| Nome | Símbolo | Descrição |
| --- | --- | --- |
| Numerólogo Night | **Night** | O prodígio matemático que entende o significado oculto de Z. |
| Herborista Ônix | **Onix** | A botânica e alquimista com profundos saberes em plantas. |
| Alto Alquimista Raven | **Raven** | O orgulhoso alquimista que detesta brincadeiras sobre sua profissão. |

## 📍 Locais
| Local | Símbolo | Tipo |
| --- | --- | --- |
| A Escada de Livros | **Escada** | Interno |
| O Sofá | **Sofao** | Interno |
| A Escrivaninha | **Escrivaninha** | Interno |

## 🗡️ Armas
| Arma | Símbolo | Peso |
| --- | --- | --- |
| Relógio de Bolso Hipnótico | **Relogio** | Leve |
| Baralho de Cartas Marot | **Baralho** | Leve |
| Aparelho Pseudo-Científico | **Aparelho** | Pesado |

---

## 🔍 Pistas Proposicionais
1. **$Escrivaninha(Raven)$**  
   *O Alto Alquimista Raven estava na Escrivaninha.*
2. **$Aparelho(Onix) \rightarrow Escada(Onix)$**  
   *Se a Herborista Ônix estava com o Aparelho Pseudo-Científico, então ela estava na Escada de Livros.*
3. **$Baralho(Night) \leftrightarrow \neg Aparelho(Raven)$**  
   *O Numerólogo Night estava com o Baralho de Cartas Marot se e somente se o Alto Alquimista Raven não estava com o Aparelho Pseudo-Científico.*
4. **$Escada(Onix) \lor Escrivaninha(Onix)$**  
   *A Herborista Ônix estava na Escada de Livros ou na Escrivaninha.*
5. **$\neg Aparelho(Night)$**  
   *O Numerólogo Night não estava com o Aparelho Pseudo-Científico.*
6. **$Culpado \in Escada$**  
   *O assassino estava na Escada de Livros.*

---

## 💡 Dica do Inspetor Irratino
> [!TIP]
> **Dica do Inspetor:**  
> Com a Pista 1, deduza que Ônix não estava na Escrivaninha e use a Pista 4 com o **Silogismo Disjuntivo** para encontrar seu local. Em seguida, por exclusão de locais, descubra onde Night estava. A partir disso, analise quem poderia estar com o Aparelho e resolva a bicondicional da Pista 3.

---

## 🔓 Solução
<details>
<summary>Clique para revelar o veredito e a dedução lógica</summary>

### ⚖️ O Veredito
**Culpada:** Herborista Ônix com o Aparelho Pseudo-Científico na Escada de Livros!

---

### 📝 Demonstração da Dedução Passo a Passo

1. **Localização dos Suspeitos:**  
   - Pela Pista 1: Sabemos que Raven estava na Escrivaninha ($Escrivaninha(Raven)$). Como os locais são únicos, deduzimos que a Herborista Ônix não estava na Escrivaninha:
     $$\text{Conclusão: } \neg Escrivaninha(Onix)$$
   - Pela Pista 4, temos a disjunção $Escada(Onix) \lor Escrivaninha(Onix)$. Como $\neg Escrivaninha(Onix)$ é VERDADE, aplicamos o **Silogismo Disjuntivo**:
     $$\neg Escrivaninha(Onix) \land (Escada(Onix) \lor Escrivaninha(Onix)) \vdash Escada(Onix)$$
     Portanto, a Herborista Ônix estava na **Escada de Livros**.
   - Por exclusão dos três locais disponíveis, o Numerólogo Night estava no **Sofá**:
     $$\text{Conclusão: } Sofao(Night)$$

2. **Dedução das Armas dos Suspeitos:**  
   - Pela Pista 5: $\neg Aparelho(Night)$ (Night não tem o Aparelho).
   - Quem tem o Aparelho? Onix ou Raven.
     - Suponha que Raven tem o Aparelho. Então $Aparelho(Raven)$ seria VERDADE e $\neg Aparelho(Raven)$ seria FALSO.
     - Pela Pista 3: $Baralho(Night) \leftrightarrow \neg Aparelho(Raven)$. Com o lado direito FALSO, a bicondicional exige que o lado esquerdo também seja FALSO. Logo, $\neg Baralho(Night)$ (Night não tem o Baralho).
     - Se Night não tem o Baralho e também não tem o Aparelho (Pista 5), ele deveria ter o Relógio.
     - Isso deixaria o Baralho e o Aparelho para Onix e Raven. Como assumimos que Raven tem o Aparelho, Onix teria o Baralho.
     - Mas se Onix tem o Baralho, ela não tem o Aparelho. Nesse caso, a Pista 2 ($Aparelho(Onix) \rightarrow Escada(Onix)$) tem seu antecedente FALSO, sendo verdadeira.
     - No entanto, se o culpado está na Escada de Livros (Pista 6), e Onix está lá, Onix seria a culpada. Mas ela estaria com o Baralho. Contudo, a lógica do crime requer que a arma associada ao culpado seja a arma do crime (Aparelho).
     - Vamos analisar a alternativa: Raven **não** tem o Aparelho ($\neg Aparelho(Raven)$ é VERDADE).
     - Pela Pista 3: Com o lado direito VERDADE, a bicondicional exige que o lado esquerdo seja VERDADE:
       $$\text{Conclusão: } Baralho(Night)$$
     - Com o Baralho atribuído a Night, e sabendo que Night não tem o Aparelho (Pista 5), a única arma restante para a Herborista Ônix é o **Aparelho Pseudo-Científico**:
       $$\text{Conclusão: } Aparelho(Onix)$$
     - Por exclusão de armas, Raven fica com o **Relógio de Bolso Hipnótico**:
       $$\text{Conclusão: } Relogio(Raven)$$
     - Esta configuração satisfaz a Pista 2 ($Aparelho(Onix) \rightarrow Escada(Onix)$), pois $Aparelho(Onix)$ é VERDADE e $Escada(Onix)$ é VERDADE.

3. **Identificação do Culpado:**  
   A Pista 6 afirma que o culpado estava na Escada de Livros. Como provamos que a Herborista Ônix estava na Escada de Livros ($Escada(Onix)$) portando o Aparelho Pseudo-Científico ($Aparelho(Onix)$), ela é a assassina!

| Suspeito | Local | Arma | Status |
| --- | --- | --- | --- |
| **Herborista Ônix** | A Escada de Livros | Aparelho Pseudo-Científico | **Assassina** |
| **Numerólogo Night** | O Sofá | Baralho de Cartas Marot | Inocente |
| **Alto Alquimista Raven** | A Escrivaninha | Relógio de Bolso Hipnótico | Inocente |

</details>
