# Caso 7: Investigação no Instituto (Lógica Proposicional)

**Dificuldade:** Médio (3 Suspeitos, 3 Locais, 3 Armas)

---

## 👥 Suspeitos
| Nome | Símbolo | Descrição |
| --- | --- | --- |
| Criptozoólogo Cloud | **Cloud** | Um especialista em avistamentos de criaturas criptídeas. |
| Ervanária Onyx | **Onyx** | Uma botânica experiente no cultivo de plantas tóxicas. |
| Chef Aubergine | **Aubergine** | Uma chef que possui uma reputação intimidadora. |

## 📍 Locais
| Local | Símbolo | Tipo |
| --- | --- | --- |
| O Labirinto de Cerca Viva | **Labirinto** | Externo |
| O Observatório | **Observatorio** | Interno |
| O Campo de Minigolfe | **Minigolfe** | Externo |

## 🗡️ Armas
| Arma | Símbolo | Peso |
| --- | --- | --- |
| Máquina de Movimento Quase Perpétuo | **Maquina** | Pesado |
| Vara de Radiestesia | **Vara** | Leve |
| Óleo Altamente Alergênico | **Oleo** | Leve |

---

## 🔍 Pistas Proposicionais
1. **$Observatorio(Onyx)$**  
   *A Ervanária Onyx estava no Observatório.*
2. **$Labirinto(Cloud) \rightarrow Maquina(Cloud)$**  
   *Se o Criptozoólogo Cloud estava no Labirinto de Cerca Viva, então ele estava com a Máquina de Movimento Quase Perpétuo.*
3. **$Minigolfe(Aubergine) \leftrightarrow Labirinto(Cloud)$**  
   *A Chef Aubergine estava no Campo de Minigolfe se e somente se o Criptozoólogo Cloud estava no Labirinto de Cerca Viva.*
4. **$Oleo(Aubergine) \lor Maquina(Onyx)$**  
   *A Chef Aubergine estava com o Óleo Altamente Alergênico ou a Ervanária Onyx estava com a Máquina de Movimento Quase Perpétuo.*
5. **$\neg Oleo(Cloud)$**  
   *O Criptozoólogo Cloud não estava com o Óleo Altamente Alergênico.*
6. **$Culpado \in Minigolfe$**  
   *O assassino estava no Campo de Minigolfe.*

---

## 💡 Dica do Inspetor Irratino
> [!TIP]
> **Dica do Inspetor:**  
> Use a Pista 1 para saber que Onyx ocupa o Observatório. Como restam dois locais (Labirinto e Minigolfe) para Cloud e Aubergine, analise a bicondicional da Pista 3 para concluir que Aubergine deve estar no Minigolfe e Cloud no Labirinto. Depois, aplique o **Modus Ponens** na Pista 2 e conclua com o **Silogismo Disjuntivo** na Pista 4.

---

## 🔓 Solução
<details>
<summary>Clique para revelar o veredito e a dedução lógica</summary>

### ⚖️ O Veredito
**Culpada:** Chef Aubergine com Óleo Altamente Alergênico no Campo de Minigolfe!

---

### 📝 Demonstração da Dedução Passo a Passo

1. **Localização dos Suspeitos:**  
   - Pela Pista 1: Sabemos que Onyx estava no Observatório ($Observatorio(Onyx)$).
   - Como os locais são únicos, restam apenas o Labirinto de Cerca Viva e o Campo de Minigolfe para serem distribuídos entre Cloud e Aubergine.
   - Pela Pista 3: $Minigolfe(Aubergine) \leftrightarrow Labirinto(Cloud)$ (Aubergine está no Minigolfe se e somente se Cloud está no Labirinto).
     - Se Aubergine estivesse no Labirinto, Cloud estaria no Minigolfe. A proposição bicondicional seria $FALSO \leftrightarrow FALSO$, que é logicamente verdadeira, mas entraria em contradição caso eles ocupassem o mesmo local. Para que os locais sejam distintos, a única atribuição logicamente consistente que satisfaz a relação bicondicional e mantém os locais separados é:
     $$\text{Conclusão: } Minigolfe(Aubergine) \text{ e } Labirinto(Cloud)$$

2. **Dedução da Arma de Cloud:**  
   - Pela Pista 2, temos $Labirinto(Cloud) \rightarrow Maquina(Cloud)$. Como provamos que ele está no Labirinto, aplicamos **Modus Ponens**:
     $$Labirinto(Cloud) \land (Labirinto(Cloud) \rightarrow Maquina(Cloud)) \vdash Maquina(Cloud)$$
     Logo, o Criptozoólogo Cloud estava com a **Máquina de Movimento Quase Perpétuo**.

3. **Dedução das Armas dos outros Suspeitos:**  
   - Como Cloud tem a Máquina de Movimento ($Maquina(Cloud)$), a Ervanária Onyx não pode ter a Máquina:
     $$\text{Conclusão: } \neg Maquina(Onyx)$$
   - Pela Pista 4, temos a disjunção $Oleo(Aubergine) \lor Maquina(Onyx)$. Como $\neg Maquina(Onyx)$ é VERDADE, aplicamos o **Silogismo Disjuntivo**:
     $$\neg Maquina(Onyx) \land (Oleo(Aubergine) \lor Maquina(Onyx)) \vdash Oleo(Aubergine)$$
     Logo, a Chef Aubergine estava com o **Óleo Altamente Alergênico**.
   - Por exclusão de armas, a Ervanária Onyx estava com a **Vara de Radiestesia**:
     $$\text{Conclusão: } Vara(Onyx)$$

4. **Identificação do Culpado:**  
   A Pista 6 afirma que o culpado estava no Campo de Minigolfe. Como provamos que a Chef Aubergine estava no Campo de Minigolfe ($Minigolfe(Aubergine)$) portando o Óleo Altamente Alergênico ($Oleo(Aubergine)$), ela é a culpada!

| Suspeito | Local | Arma | Status |
| --- | --- | --- | --- |
| **Chef Aubergine** | O Campo de Minigolfe | Óleo Altamente Alergênico | **Assassina** |
| **Criptozoólogo Cloud** | O Labirinto de Cerca Viva | Máquina de Movimento Quase Perpétuo | Inocente |
| **Ervanária Onyx** | O Observatório | Vara de Radiestesia | Inocente |

</details>
