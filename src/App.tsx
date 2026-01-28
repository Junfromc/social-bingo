import { useBingoGame } from './hooks/useBingoGame';
import { StartScreen } from './components/StartScreen';
import { GameScreen } from './components/GameScreen';
import { HuntScreen } from './components/HuntScreen';
import { BingoModal } from './components/BingoModal';

function App() {
  const {
    gameState,
    board,
    winningSquareIds,
    showBingoModal,
    huntItems,
    startGame,
    handleSquareClick,
    handleHuntItemToggle,
    resetGame,
    dismissModal,
  } = useBingoGame();

  if (gameState === 'start') {
    return <StartScreen onStart={startGame} />;
  }

  if (gameState === 'hunt-playing' || gameState === 'hunt-complete') {
    return (
      <>
        <HuntScreen
          huntItems={huntItems}
          onItemToggle={handleHuntItemToggle}
          onBack={resetGame}
        />
        {showBingoModal && (
          <BingoModal onDismiss={dismissModal} />
        )}
      </>
    );
  }

  return (
    <>
      <GameScreen
        board={board}
        winningSquareIds={winningSquareIds}
        hasBingo={gameState === 'bingo'}
        onSquareClick={handleSquareClick}
        onReset={resetGame}
      />
      {showBingoModal && (
        <BingoModal onDismiss={dismissModal} />
      )}
    </>
  );
}

export default App;
