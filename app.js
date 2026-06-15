// ==========================================
// REGISTRO DO SERVICE WORKER (PWA)
// ==========================================
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('sw.js')
      .then((registration) => {
        console.log('Service Worker registrado com sucesso:', registration.scope);
      })
      .catch((error) => {
        console.error('Falha ao registrar o Service Worker:', error);
      });
  });
}

// ==========================================
// VARIÁVEIS DO SISTEMA DE INSTALAÇÃO DO PWA
// ==========================================
let deferredPrompt;
const btnInstall = document.getElementById('btn-install');

window.addEventListener('beforeinstallprompt', (e) => {
  // Previne que o mini-infobar padrão apareça no mobile
  e.preventDefault();
  // Guarda o evento para ser disparado depois
  deferredPrompt = e;
  // Exibe o botão de instalação customizado na tela
  btnInstall.classList.remove('hidden');
});

btnInstall.addEventListener('click', async () => {
  if (!deferredPrompt) return;
  // Mostra o prompt de instalação nativo do navegador
  deferredPrompt.prompt();
  // Aguarda a resposta do usuário
  const { outcome } = await deferredPrompt.userChoice;
  console.log(`Escolha do usuário na instalação: ${outcome}`);
  // Limpa o prompt diferido (só pode ser usado uma vez)
  deferredPrompt = null;
  // Esconde o botão novamente
  btnInstall.classList.add('hidden');
});

// Evento disparado quando o app é instalado com sucesso
window.addEventListener('appinstalled', (event) => {
  console.log('App instalado com sucesso no dispositivo!', event);
  btnInstall.classList.add('hidden');
});

// ==========================================
// GERENCIADOR DE ESTADO DO JOGO (LOCALSTORAGE)
// ==========================================
const DEFAULT_SAVE = {
  currentLevel: 1,
  crystals: 0,
  highscore: 0,
  completedLevels: { 1: false, 2: false, 3: false }
};

// Carrega os dados salvos localmente de forma segura
function loadGameData() {
  try {
    const rawData = localStorage.getItem('space_adventure_save');
    if (rawData) {
      return JSON.parse(rawData);
    }
  } catch (e) {
    console.error("Erro ao carregar do localStorage. Pode estar desativado nas configs do navegador.", e);
  }
  return { ...DEFAULT_SAVE };
}

// Salva os dados de jogo localmente
function saveGameData(data) {
  try {
    localStorage.setItem('space_adventure_save', JSON.stringify(data));
  } catch (e) {
    console.error("Erro ao salvar no localStorage.", e);
  }
}

// ==========================================
// CONTROLE DE INTERFACE (UI)
// ==========================================
let gameState = loadGameData();

// Elementos da UI
const currentLevelDisplay = document.getElementById('current-level-display');
const crystalsDisplay = document.getElementById('crystals-display');
const highscoreDisplay = document.getElementById('highscore-display');
const btnCompleteLevel = document.getElementById('btn-complete-level');
const btnNextLevel = document.getElementById('btn-next-level');
const simInstructions = document.getElementById('sim-instructions');
const simVictory = document.getElementById('sim-victory');

// Atualiza a tela com o progresso atual
function updateUI() {
  crystalsDisplay.textContent = gameState.crystals.toLocaleString();
  highscoreDisplay.textContent = gameState.highscore.toLocaleString().padStart(4, '0');
  currentLevelDisplay.textContent = `Fase ${gameState.currentLevel}`;
  
  // Atualiza botões de vitória
  btnCompleteLevel.textContent = `Simular Vitória (Fase ${gameState.currentLevel})`;

  // Atualiza as cartas das fases no grid
  for (let lvl = 1; lvl <= 3; lvl++) {
    const card = document.querySelector(`.level-card[data-level="${lvl}"]`);
    if (!card) continue;

    // Remove classes antigas
    card.classList.remove('active', 'completed', 'locked');
    card.removeAttribute('disabled');

    if (gameState.completedLevels[lvl]) {
      card.classList.add('completed');
      const statusText = card.querySelector('.level-status');
      if (statusText) statusText.textContent = 'Completa!';
    } else if (lvl === gameState.currentLevel) {
      card.classList.add('active');
      const statusText = card.querySelector('.level-status');
      if (statusText) statusText.textContent = 'Jogando agora';
    } else {
      // Bloqueia se for fase futura não desbloqueada
      card.classList.add('locked');
      card.setAttribute('disabled', 'true');
      const statusText = card.querySelector('.level-status');
      if (statusText) statusText.textContent = 'Bloqueado';
    }
  }

  // Se o jogo estiver na fase máxima finalizada
  if (gameState.currentLevel > 3) {
    currentLevelDisplay.textContent = 'Completo!';
    btnCompleteLevel.textContent = 'Jogo Finalizado!';
    btnCompleteLevel.setAttribute('disabled', 'true');
  }
}

// Ação de Simular Vitória
btnCompleteLevel.addEventListener('click', () => {
  const currentLvl = gameState.currentLevel;
  
  if (currentLvl <= 3) {
    // 1. Marca fase como completa
    gameState.completedLevels[currentLvl] = true;
    
    // 2. Incrementa dados
    gameState.crystals += 150;
    gameState.highscore += 2500;
    
    // 3. Avança para a próxima fase
    gameState.currentLevel = currentLvl + 1;
    
    // Salva no LocalStorage
    saveGameData(gameState);
    
    // Animação de transição para tela de vitória
    simInstructions.classList.add('hidden');
    simVictory.classList.remove('hidden');
    
    updateUI();
  }
});

// Ação de Ir para Próxima Fase (tela de vitória)
btnNextLevel.addEventListener('click', () => {
  simVictory.classList.add('hidden');
  simInstructions.classList.remove('hidden');
  
  // Se terminou o jogo todo, oculta os controles de simulação
  if (gameState.currentLevel > 3) {
    simInstructions.innerHTML = `
      <h3>🎉 Parabéns!</h3>
      <p>Você concluiu todas as fases disponíveis do Space Adventure!</p>
      <button id="btn-reset-game" class="btn btn-primary">Reiniciar Progresso</button>
    `;
    document.getElementById('btn-reset-game').addEventListener('click', () => {
      gameState = { ...DEFAULT_SAVE, completedLevels: { 1: false, 2: false, 3: false } };
      saveGameData(gameState);
      window.location.reload();
    });
  }
});

// Adiciona evento de clique nas cartas de fase para alternar simulação (apenas se já desbloqueada)
document.querySelectorAll('.level-card').forEach((card) => {
  card.addEventListener('click', () => {
    const lvl = parseInt(card.getAttribute('data-level'), 10);
    // Só permite voltar a jogar fases ativas ou completadas
    if (lvl <= gameState.currentLevel) {
      gameState.currentLevel = lvl;
      saveGameData(gameState);
      
      // Reseta painel de simulação caso estivesse em tela de vitória
      simVictory.classList.add('hidden');
      simInstructions.classList.remove('hidden');
      
      updateUI();
    }
  });
});

// Inicialização
updateUI();
