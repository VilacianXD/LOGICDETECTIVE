# Caso 9: A Morte Grave no Cemitério (Lógica Proposicional)

**Dificuldade:** Difícil (4 Suspeitos, 4 Locais, 4 Armas)

---

## 👥 Suspeitos
| Nome | Símbolo | Descrição |
| --- | --- | --- |
| Astrólogo Azure | **Azure** | Um observador de estrelas cheio de mistério e segredos. |
| Conde Grey | **Grey** | Um nobre do chá que considerava o funeral perturbador. |
| Mx. Tangerine | **Tangerine** | Pessoa não-binária fascinada por astronomia antiga. |
| Criptozoólogo Cloud | **Cloud** | O cientista que sabe classificar qualquer criatura folclórica. |

## 📍 Locais
| Local | Símbolo | Tipo |
| --- | --- | --- |
| O Portão de Entrada | **Portao** | Externo |
| O Mausoléu Enorme | **Mausoleu** | Interno |
| A Loja de Presentes | **Presentes** | Interno |
| O Cabaco Estranho | **Cabaco** | Interno |

## 🗡️ Armas
| Arma | Símbolo | Peso |
| --- | --- | --- |
| Detector de Fantasmas | **Detector** | Médio |
| Um Caldeirão | **Caldeirao** | Médio |
| Uma Vassoura de Palha | **Vassoura** | Médio |
| Um Braço de Esqueleto | **Esqueleto** | Médio |

---

## 🔍 Pistas Proposicionais
1. **$Portao(Azure)$**  
   *O Astrólogo Azure estava no Portão de Entrada.*
2. **$Cabaco(Cloud)$**  
   *O Criptozoólogo Cloud estava no Cabaco Estranho.*
3. **$Caldeirao(Grey) \rightarrow Mausoleu(Grey)$**  
   *Se o Conde Grey estava com o Caldeirão, então ele estava no Mausoléu Enorme.*
4. **$Portao \leftrightarrow Detector$**  
   *Estar no Portão de Entrada é logicamente equivalente a portar o Detector de Fantasmas.*
5. **$(Presentes \leftrightarrow Vassoura) \leftrightarrow \neg Portao(Cloud)$**  
   *Estar na Loja de Presentes equivale a ter a Vassoura de Palha se e somente se o Criptozoólogo Cloud não estava no Portão de Entrada.*
6. **$Esqueleto(Cloud) \rightarrow Caldeirao(Grey)$**  
   *Se o Criptozoólogo Cloud estava com o Braço de Esqueleto, então o Conde Grey estava com o Caldeirão.*
7. **$\neg (Vassoura(Cloud) \lor Caldeirao(Cloud))$**  
   *É falso que o Criptozoólogo Cloud estava com a Vassoura de Palha ou com o Caldeirão.*
8. **$\neg Detector(Grey)$**  
   *O Conde Grey não estava com o Detector de Fantasmas.*
9. **$Culpado \in Mausoleu$**  
   *O assassino estava no Mausoléu Enorme.*

---

## 💡 Dica do Inspetor Irratino
> [!TIP]
> **Dica do Inspetor:**  
> Use as Pistas 1, 2 e 4 para descobrir o local e a arma de Azure. Analise a Pista 5 sabendo a posição de Cloud. Use a exclusão de armas e a Pista 7 para determinar a arma de Cloud e aplique o **Modus Ponens** nas Pistas 6 e 3 consecutivamente para localizar e armar o Conde Grey.

---

## 🔓 Solução
<details>
<summary>Clique para revelar o veredito e a dedução lógica</summary>

### ⚖️ O Veredito
**Culpado:** Conde Grey com o Caldeirão no Mausoléu Enorme!

---

### 📝 Demonstração da Dedução Passo a Passo

1. **Deduções Iniciais de Locais e Armas:**  
   - Pela Pista 1: $Portao(Azure)$ (Azure está no Portão de Entrada).
   - Pela Pista 4: $Portao \leftrightarrow Detector$. Como Azure está no Portão, deduzimos que ele tem o Detector de Fantasmas:
     $$\text{Conclusão: } Detector(Azure)$$
   - Pela Pista 2: $Cabaco(Cloud)$ (Cloud está no Cabaco Estranho).
   - Analisando a Pista 5: Como Cloud está no Cabaco, ele não está no Portão ($\neg Portao(Cloud)$ é VERDADE). Assim, o lado direito da bicondicional da Pista 5 é verdadeiro. Para que a bicondicional seja verdadeira, o lado esquerdo também deve ser verdadeiro:
     $$\text{Conclusão: } Presentes \leftrightarrow Vassoura$$

2. **Dedução da Arma de Cloud:**  
   - Pela Pista 7, Cloud não tem a Vassoura nem o Caldeirão: $\neg Vassoura(Cloud) \land \neg Caldeirao(Cloud)$.
   - Como Azure tem o Detector, Cloud também não tem o Detector.
   - Restando apenas a quarta arma para o Criptozoólogo Cloud, que é o **Braço de Esqueleto**:
     $$\text{Conclusão: } Esqueleto(Cloud)$$

3. **Dedução do Local e Arma do Conde Grey:**  
   - Pela Pista 6, temos $Esqueleto(Cloud) \rightarrow Caldeirao(Grey)$. Como provamos que Cloud tem o Braço de Esqueleto, por **Modus Ponens**:
     $$Esqueleto(Cloud) \land (Esqueleto(Cloud) \rightarrow Caldeirao(Grey)) \vdash Caldeirao(Grey)$$
     Logo, o Conde Grey estava com o **Caldeirão**.
   - Pela Pista 3, temos $Caldeirao(Grey) \rightarrow Mausoleu(Grey)$. Como provamos que ele tem o Caldeirão, por **Modus Ponens**:
     $$Caldeirao(Grey) \land (Caldeirao(Grey) \rightarrow Mausoleu(Grey)) \vdash Mausoleu(Grey)$$
     Portanto, o Conde Grey estava no **Mausoléu Enorme**.

4. **Fechamento por Exclusão (Mx. Tangerine):**  
   - Já localizamos Azure (Portão), Cloud (Cabaco) e Grey (Mausoléu). O local restante para Mx. Tangerine é a **Loja de Presentes**:
     $$\text{Conclusão: } Presentes(Tangerine)$$
   - Como demonstramos na etapa 1 que $Presentes \leftrightarrow Vassoura$ é VERDADE, e como Tangerine está na Loja de Presentes, concluímos que Mx. Tangerine estava com a **Vassoura de Palha**:
     $$Presentes(Tangerine) \land (Presentes \leftrightarrow Vassoura) \vdash Vassoura(Tangerine)$$

5. **Identificação do Culpado:**  
   A Pista 9 afirma que o culpado estava no Mausoléu Enorme. Como demonstramos que o Conde Grey estava no Mausoléu Enorme ($Mausoleu(Grey)$) portando o Caldeirão ($Caldeirao(Grey)$), ele é o culpado!

| Suspeito | Local | Arma | Status |
| --- | --- | --- | --- |
| **Conde Grey** | O Mausoléu Enorme | Um Caldeirão | **Assassino** |
| **Astrólogo Azure** | O Portão de Entrada | Detector de Fantasmas | Inocente |
| **Mx. Tangerine** | A Loja de Presentes | Uma Vassoura de Palha | Inocente |
| **Criptozoólogo Cloud** | O Cabaco Estranho | Um Braço de Esqueleto | Inocente |

</details>
