# Caso 12: E Então Houve Outro Novamente (Lógica Proposicional)

**Dificuldade:** Difícil (4 Suspeitos, 4 Locais, 4 Armas)

---

## 👥 Suspeitos
| Nome | Símbolo | Descrição |
| --- | --- | --- |
| Vice-Presidente Mauve | **Mauve** | Executiva de tecnologia da TekCo Futures. |
| Almirante Navy | **Navy** | Herdeiro da linhagem naval interessado em causar impacto. |
| Agente Ink | **Ink** | Uma agente com olhar apurado para riquezas e oportunidades. |
| Grão-Mestre Rose | **Rose** | Enxadrista perspicaz que enxerga a ilha como um tabuleiro. |

## 📍 Locais
| Local | Símbolo | Tipo |
| --- | --- | --- |
| As Docas | **Docas** | Externo |
| As Ruínas Antigas | **Ruinas** | Externo |
| O Bosque Assombrado | **Bosque** | Externo |
| Os Penhascos | **Penhascos** | Externo |

## 🗡️ Armas
| Arma | Símbolo | Peso |
| --- | --- | --- |
| Uma Armadilha de Urso | **Armadilha** | Pesado |
| Um Machado | **Machado** | Médio |
| Um Remo | **Remo** | Médio |
| Um Tijolo Comum | **Tijolo** | Pesado |

---

## 🔍 Pistas Proposicionais
1. **$Ruinas(Mauve)$**  
   *A Vice-Presidente Mauve estava nas Ruínas Antigas.*
2. **$Bosque(Rose)$**  
   *O Grão-Mestre Rose estava no Bosque Assombrado.*
3. **$Machado(Navy) \rightarrow Penhascos(Navy)$**  
   *Se o Almirante Navy estava com o Machado, então ele estava nos Penhascos.*
4. **$Bosque \leftrightarrow Tijolo$**  
   *Estar no Bosque Assombrado equivale a portar o Tijolo Comum.*
5. **$(Docas \leftrightarrow Remo) \leftrightarrow \neg Bosque(Mauve)$**  
   *Estar nas Docas equivale a ter o Remo se e somente se a Vice-Presidente Mauve não estava no Bosque Assombrado.*
6. **$Armadilha(Navy) \rightarrow Remo(Ink)$**  
   *Se o Almirante Navy estava com a Armadilha de Urso, então a Agente Ink estava com o Remo.*
7. **$\neg (Armadilha(Navy) \lor Tijolo(Navy))$**  
   *É falso que o Almirante Navy estava com a Armadilha de Urso ou com o Tijolo Comum.*
8. **$\neg Armadilha(Ink)$**  
   *A Agente Ink não estava com a Armadilha de Urso.*
9. **$Culpado \in Penhascos$**  
   *O assassino estava nos Penhascos.*

---

## 💡 Dica do Inspetor Irratino
> [!TIP]
> **Dica do Inspetor:**  
> Use a Pista 1 e a Pista 2 para situar Mauve e Rose nos locais correspondentes. Com a Pista 4, arme Rose. Use a Pista 5 para estabelecer a equivalência das Docas e use a Pista 7 e 8 para deduzir onde está a Armadilha de Urso. A partir disso, cruze os dados restantes para localizar o Almirante Navy e concluir a arma do crime.

---

## 🔓 Solução
<details>
<summary>Clique para revelar o veredito e a dedução lógica</summary>

### ⚖️ O Veredito
**Culpado:** Almirante Navy com o Machado nos Penhascos!

---

### 📝 Demonstração da Dedução Passo a Passo

1. **Localizações e Equivalências Iniciais:**  
   - Pela Pista 1: $Ruinas(Mauve)$ (Mauve está nas Ruínas Antigas).
   - Pela Pista 2: $Bosque(Rose)$ (Rose está no Bosque Assombrado).
   - Pela Pista 4: $Bosque \leftrightarrow Tijolo$. Como Rose está no Bosque, concluímos que ele tem o Tijolo:
     $$\text{Conclusão: } Tijolo(Rose)$$
   - Analisando a Pista 5: Como Mauve está nas Ruínas Antigas, ela não está no Bosque ($\neg Bosque(Mauve)$ é VERDADE). Assim, a bicondicional exige que o lado esquerdo seja verdadeiro:
     $$\text{Conclusão: } Docas \leftrightarrow Remo$$

2. **Dedução de Quem Está com a Armadilha de Urso:**  
   - Quem tem a Armadilha de Urso? Mauve, Navy, Ink ou Rose.
     - Rose tem o Tijolo Comum.
     - Pela Pista 7: $\neg Armadilha(Navy)$ (Navy não tem a Armadilha).
     - Pela Pista 8: $\neg Armadilha(Ink)$ (Ink não tem a Armadilha).
     - Logo, por exclusão de suspeitos, a Vice-Presidente Mauve só pode estar com a **Armadilha de Urso**:
       $$\text{Conclusão: } Armadilha(Mauve)$$
     *(Nota: Isso torna a condicional da Pista 6 vacuamente verdadeira, pois o antecedente é falso).*

3. **Associação dos Locais e Armas Restantes:**  
   - Já temos: Mauve (Ruínas com a Armadilha) e Rose (Bosque com o Tijolo).
   - Restam os locais Docas e Penhascos, e as armas Machado e Remo para serem distribuídas entre Navy e Ink.
   - Pela equivalência $Docas \leftrightarrow Remo$, quem estiver nas Docas deve estar com o Remo.
     - Se o Almirante Navy estivesse nas Docas, ele teria de portar o Remo.
     - Se ele estiver nos Penhascos, a Agente Ink estaria nas Docas (portando o Remo).
     - Nesse cenário, o Almirante Navy ficaria nos Penhascos portando o **Machado**:
       $$\text{Conclusão: } Machado(Navy)$$
     - Pela Pista 3, temos $Machado(Navy) \rightarrow Penhascos(Navy)$. Como Navy tem o Machado, por **Modus Ponens**:
       $$Machado(Navy) \land (Machado(Navy) \rightarrow Penhascos(Navy)) \vdash Penhascos(Navy)$$
       Esta inferência é consistente com a distribuição dos locais.
     - Consequentemente, por exclusão:
       $$\text{Conclusão: } Docas(Ink) \text{ e } Remo(Ink)$$

4. **Identificação do Culpado:**  
   A Pista 9 afirma que o culpado estava nos Penhascos. Provamos que o Almirante Navy estava nos Penhascos ($Penhascos(Navy)$) portando o Machado ($Machado(Navy)$). Portanto, ele é o assassino!

| Suspeito | Local | Arma | Status |
| --- | --- | --- | --- |
| **Almirante Navy** | Os Penhascos | Um Machado | **Assassino** |
| **Vice-Presidente Mauve** | As Ruínas Antigas | Uma Armadilha de Urso | Inocente |
| **Agente Ink** | As Docas | Um Remo | Inocente |
| **Grão-Mestre Rose** | O Bosque Assombrado | Um Tijolo Comum | Inocente |

</details>
