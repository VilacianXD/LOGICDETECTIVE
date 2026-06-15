# Caso 10: Retorno ao Instituto (Lógica Proposicional)

**Dificuldade:** Difícil (4 Suspeitos, 4 Locais, 4 Armas)

---

## 👥 Suspeitos
| Nome | Símbolo | Descrição |
| --- | --- | --- |
| Numerólogo Night | **Night** | O prodígio dos números, agora nos terrenos do Instituto. |
| Alto Alquimista Raven | **Raven** | O orgulhoso alquimista, sempre rondando as instalações. |
| Herborista Ônix | **Onix** | Especialista em toxinas vegetais e ervas raras. |
| Filólogo Flint | **Flint** | O filólogo interessado nas origens antigas. |

## 📍 Locais
| Local | Símbolo | Tipo |
| --- | --- | --- |
| Campo de Minigolfe | **Minigolfe** | Externo |
| A Grande Torre | **GrandeTorre** | Externo |
| Labirinto de Cercas Vivas | **Labirinto** | Externo |
| O Chateau | **Chateau** | Interno |

## 🗡️ Armas
| Arma | Símbolo | Peso |
| --- | --- | --- |
| Vara de Radiestesia | **Vara** | Pesado |
| Máquina de Movimento Quase Perpétuo | **Maquina** | Pesado |
| Relógio de Bolso Hipnótico | **Relogio** | Pesado |
| Bola de Cristal | **Cristal** | Pesado |

---

## 🔍 Pistas Proposicionais
1. **$GrandeTorre(Raven)$**  
   *O Alto Alquimista Raven estava na Grande Torre.*
2. **$Chateau(Onix)$**  
   *A Herborista Ônix estava no Chateau.*
3. **$Relogio(Flint) \rightarrow Labirinto(Flint)$**  
   *Se o Filólogo Flint estava com o Relógio de Bolso Hipnótico, então ele estava no Labirinto de Cercas Vivas.*
4. **$Minigolfe \leftrightarrow Cristal$**  
   *Uma pessoa estava no Campo de Minigolfe se e somente se portava a Bola de Cristal.*
5. **$(GrandeTorre \leftrightarrow Maquina) \leftrightarrow \neg Chateau(Night)$**  
   *A pessoa na Grande Torre estava com a Máquina de Movimento Quase Perpétuo se e somente se o Numerólogo Night não estava no Chateau.*
6. **$Vara(Flint) \rightarrow Relogio(Onix)$**  
   *Se o Filólogo Flint estava com a Vara de Radiestesia, então a Herborista Ônix estava com o Relógio de Bolso Hipnótico.*
7. **$\neg (Maquina(Onix) \lor Cristal(Onix))$**  
   *É falso que a Herborista Ônix estava com a Máquina de Movimento Quase Perpétuo ou com a Bola de Cristal.*
8. **$\neg Vara(Flint)$**  
   *O Filólogo Flint não estava com a Vara de Radiestesia.*
9. **$Culpado \in Labirinto$**  
   *O assassino estava no Labirinto de Cercas Vivas.*

---

## 💡 Dica do Inspetor Irratino
> [!TIP]
> **Dica do Inspetor:**  
> Com a Pista 2, deduza se o lado direito da bicondicional da Pista 5 é verdadeiro. Sabendo que Raven está na Grande Torre (Pista 1), descubra a arma de Raven e use-a para simplificar a disjunção da Pista 7. Use a Pista 8 para associar as armas restantes por exclusão, e conclua com o **Modus Ponens** na Pista 3.

---

## 🔓 Solução
<details>
<summary>Clique para revelar o veredito e a dedução lógica</summary>

### ⚖️ O Veredito
**Culpado:** Filólogo Flint com o Relógio de Bolso Hipnótico no Labirinto de Cercas Vivas!

---

### 📝 Demonstração da Dedução Passo a Passo

1. **Deduções de Locais e Pista da Bicondicional:**  
   - Pela Pista 1: $GrandeTorre(Raven)$ (Raven está na Grande Torre).
   - Pela Pista 2: $Chateau(Onix)$ (Ônix está no Chateau).
   - Como Ônix está no Chateau, deduzimos que o Numerólogo Night não está no Chateau ($\neg Chateau(Night)$ é VERDADE).
   - Analisando a Pista 5: Como $\neg Chateau(Night)$ é VERDADE, o lado esquerdo da bicondicional também deve ser verdadeiro:
     $$\text{Conclusão: } GrandeTorre \leftrightarrow Maquina$$
   - Como Raven está na Grande Torre, concluímos que ele tem a Máquina:
     $$GrandeTorre(Raven) \land (GrandeTorre \leftrightarrow Maquina) \vdash Maquina(Raven)$$

2. **Deduções das Armas de Ônix:**  
   - Pela Pista 7, Ônix não tem a Máquina nem a Bola de Cristal. Como ela está no Chateau, e a Bola de Cristal está associada ao Minigolfe ($Minigolfe \leftrightarrow Cristal$), ela de fato não tem a Bola de Cristal nem a Máquina (que está com Raven).
   - Portanto, as armas possíveis para Ônix no Chateau são a Vara ou o Relógio.
   - Pela Pista 8: $\neg Vara(Flint)$ (Flint não tem a Vara).
   - Como a Máquina é de Raven, e a Bola de Cristal é do Minigolfe, quem tem a Vara? Apenas Flint, Ônix ou Night. Como Flint não tem, e a Bola está no Minigolfe, resta a **Vara de Radiestesia** para a Herborista Ônix:
     $$\text{Conclusão: } Vara(Onix)$$
     *(Nota: Isso torna a condicional da Pista 6 vacuamente verdadeira, já que $\neg Vara(Flint)$ é verdade).*

3. **Associação das Armas Restantes:**  
   - Como Ônix tem a Vara, Raven tem a Máquina e a Bola de Cristal está no Minigolfe, a única arma restante para o Filólogo Flint é o **Relógio de Bolso Hipnótico**:
     $$\text{Conclusão: } Relogio(Flint)$$

4. **Localização do Filólogo Flint e Numerólogo Night:**  
   - Pela Pista 3, temos $Relogio(Flint) \rightarrow Labirinto(Flint)$. Como provamos que Flint tem o Relógio ($Relogio(Flint)$), por **Modus Ponens**:
     $$Relogio(Flint) \land (Relogio(Flint) \rightarrow Labirinto(Flint)) \vdash Labirinto(Flint)$$
     Portanto, o Filólogo Flint estava no **Labirinto de Cercas Vivas**.
   - Por exclusão, o local restante (Campo de Minigolfe) pertence ao Numerólogo Night:
     $$\text{Conclusão: } Minigolfe(Night)$$
   - Pela equivalência $Minigolfe \leftrightarrow Cristal$ (Pista 4), o Numerólogo Night estava com a **Bola de Cristal**:
     $$Minigolfe(Night) \land (Minigolfe \leftrightarrow Cristal) \vdash Cristal(Night)$$

5. **Identificação do Culpado:**  
   A Pista 9 afirma que o culpado estava no Labirinto de Cercas Vivas. Provamos que o Filólogo Flint estava no Labirinto de Cercas Vivas ($Labirinto(Flint)$) portando o Relógio de Bolso Hipnótico ($Relogio(Flint)$). Portanto, ele é o assassino!

| Suspeito | Local | Arma | Status |
| --- | --- | --- | --- |
| **Filólogo Flint** | Labirinto de Cercas Vivas | Relógio de Bolso Hipnótico | **Assassino** |
| **Numerólogo Night** | Campo de Minigolfe | Bola de Cristal | Inocente |
| **Alto Alquimista Raven** | A Grande Torre | Máquina de Movimento | Inocente |
| **Herborista Ônix** | O Chateau | Vara de Radiestesia | Inocente |

</details>
