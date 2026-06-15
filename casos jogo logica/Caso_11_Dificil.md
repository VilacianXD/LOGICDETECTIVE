# Caso 11: A Caminhada na Floresta (Lógica Proposicional)

**Dificuldade:** Difícil (4 Suspeitos, 4 Locais, 4 Armas)

---

## 👥 Suspeitos
| Nome | Símbolo | Descrição |
| --- | --- | --- |
| Criptozoólogo Cloud | **Cloud** | O cientista do Instituto em busca de espécimes lendários. |
| Barão Maroon | **Maroon** | Nobre arrogante que costuma guardar rancores profundos. |
| Juíza Pine | **Pine** | Uma severa magistrada focada em sua própria noção de ordem. |
| Sociólogo Umbra | **Umbra** | O intelectual voltado ao estudo dos conflitos sociais. |

## 📍 Locais
| Local | Símbolo | Tipo |
| --- | --- | --- |
| A Árvore Retorcida | **Arvore** | Externo |
| As Ruínas Antigas | **Ruinas** | Externo |
| A Caverna Móvel | **Caverna** | Externo |
| A Pequena Colina | **PequenaColina** | Externo |

## 🗡️ Armas
| Arma | Símbolo | Peso |
| --- | --- | --- |
| Um Machado | **Machado** | Médio |
| Um Tronco | **Tronco** | Pesado |
| Uma Vela Pesada | **Vela** | Pesado |
| Uma Espada Velha | **Espada** | Médio |

---

## 🔍 Pistas Proposicionais
1. **$PequenaColina(Maroon)$**  
   *O Barão Maroon estava na Pequena Colina.*
2. **$Arvore(Cloud)$**  
   *O Criptozoólogo Cloud estava na Árvore Retorcida.*
3. **$Espada(Umbra) \rightarrow Caverna(Umbra)$**  
   *Se o Sociólogo Umbra estava com a Espada Velha, então ele estava na Caverna Móvel.*
4. **$Arvore \leftrightarrow Machado$**  
   *Estar na Árvore Retorcida equivale a portar o Machado.*
5. **$(Ruinas \leftrightarrow Vela) \leftrightarrow \neg PequenaColina(Cloud)$**  
   *Estar nas Ruínas Antigas equivale a ter a Vela Pesada se e somente se o Criptozoólogo Cloud não estava na Pequena Colina.*
6. **$Tronco(Umbra) \rightarrow Vela(Pine)$**  
   *Se o Sociólogo Umbra estava com o Tronco, então a Juíza Pine estava com a Vela Pesada.*
7. **$\neg (Machado(Umbra) \lor Tronco(Umbra))$**  
   *É falso que o Sociólogo Umbra estava com o Machado ou com o Tronco.*
8. **$\neg Tronco(Pine)$**  
   *A Juíza Pine não estava com o Tronco.*
9. **$Culpado \in Caverna$**  
   *O assassino estava na Caverna Móvel.*

---

## 💡 Dica do Inspetor Irratino
> [!TIP]
> **Dica do Inspetor:**  
> Use a Pista 2 e a Pista 4 para armar Cloud. Deduza quem está com o Tronco combinando as Pistas 7 e 8. A partir da Pista 5, estabeleça a equivalência para a Vela Pesada e conclua a localização de Umbra e a sua arma por eliminação.

---

## 🔓 Solução
<details>
<summary>Clique para revelar o veredito e a dedução lógica</summary>

### ⚖️ O Veredito
**Culpado:** Sociólogo Umbra com a Espada Velha na Caverna Móvel!

---

### 📝 Demonstração da Dedução Passo a Passo

1. **Localização e Armas Iniciais:**  
   - Pela Pista 1: $PequenaColina(Maroon)$ (Maroon está na Pequena Colina).
   - Pela Pista 2: $Arvore(Cloud)$ (Cloud está na Árvore Retorcida).
   - Pela Pista 4: $Arvore \leftrightarrow Machado$. Como Cloud está na Árvore, ele tem o Machado:
     $$\text{Conclusão: } Machado(Cloud)$$
   - Analisando a Pista 5: Como Cloud está na Árvore Retorcida, ele não está na Pequena Colina ($\neg PequenaColina(Cloud)$ é VERDADE). Para que a bicondicional seja verdadeira:
     $$\text{Conclusão: } Ruinas \leftrightarrow Vela$$

2. **Dedução do Portador do Tronco:**  
   - Quem tem o Tronco? Maroon, Cloud, Pine ou Umbra.
     - Pista 7: $\neg Tronco(Umbra)$ (Umbra não tem o Tronco).
     - Pista 8: $\neg Tronco(Pine)$ (Pine não tem o Tronco).
     - Como Cloud tem o Machado, ele também não tem o Tronco.
     - Logo, por exclusão, o Barão Maroon só pode estar com o **Tronco**:
       $$\text{Conclusão: } Tronco(Maroon)$$
     *(Nota: Isso torna a condicional da Pista 6 vacuamente verdadeira, pois o antecedente é falso).*

3. **Dedução das Localizações Restantes:**  
   - Já temos: Maroon (Pequena Colina com o Tronco) e Cloud (Árvore Retorcida com o Machado).
   - Restam os locais Ruínas Antigas e Caverna Móvel para a Juíza Pine e o Sociólogo Umbra.
   - Pela Pista 7: Umbra não tem o Machado nem o Tronco.
   - Pela equivalência provada $Ruinas \leftrightarrow Vela$, quem está nas Ruínas tem a Vela Pesada.
   - Se o Sociólogo Umbra estivesse nas Ruínas Antigas, ele teria de portar a Vela.
   - Se ele estivesse na Caverna Móvel, a Juíza Pine estaria nas Ruínas Antigas (e ela teria a Vela Pesada).
   - Se a Juíza Pine tem a Vela, o Sociólogo Umbra ficaria com a **Espada Velha**:
     $$\text{Conclusão: } Espada(Umbra)$$
   - Pela Pista 3, temos $Espada(Umbra) \rightarrow Caverna(Umbra)$. Como Umbra tem a Espada Velha, por **Modus Ponens**:
     $$Espada(Umbra) \land (Espada(Umbra) \rightarrow Caverna(Umbra)) \vdash Caverna(Umbra)$$
     Portanto, o Sociólogo Umbra estava de fato na **Caverna Móvel**.
   - Por exclusão, a Juíza Pine estava nas **Ruínas Antigas** portando a **Vela Pesada**:
     $$\text{Conclusão: } Ruinas(Pine) \text{ e } Vela(Pine)$$

4. **Identificação do Culpado:**  
   A Pista 9 afirma que o culpado estava na Caverna Móvel. Provamos que o Sociólogo Umbra estava na Caverna Móvel ($Caverna(Umbra)$) portando a Espada Velha ($Espada(Umbra)$), logo ele é o assassino!

| Suspeito | Local | Arma | Status |
| --- | --- | --- | --- |
| **Sociólogo Umbra** | A Caverna Móvel | Uma Espada Velha | **Assassino** |
| **Criptozoólogo Cloud** | A Árvore Retorcida | Um Machado | Inocente |
| **Barão Maroon** | A Pequena Colina | Um Tronco | Inocente |
| **Juíza Pine** | As Ruínas Antigas | Uma Vela Pesada | Inocente |

</details>
