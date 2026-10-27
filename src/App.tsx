
import { useEffect, useState } from "react";
import "./App.css";

import CityMap from "./CityMap";
import { residents, upgrades } from "./gameData";
import {
  createInitialState,
  purchaseUpgrade,
  getFixedBarriers,
  getResidentProgress,
  getCityScore,
} from "./gameLogic";

function App() {
  const [gameState, setGameState] = useState(createInitialState);
  const [residentIndex, setResidentIndex] = useState(0);
  const [playerX, setPlayerX] = useState(80);
  const [playerY, setPlayerY] = useState(80);
  const [showUpgrades, setShowUpgrades] = useState(false);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [message, setMessage] = useState(
    "Welcome! Explore the city and make it accessible for everyone."
  );

  const currentResident = residents[residentIndex];
  const fixedBarriers = getFixedBarriers(gameState);

  const progress = currentResident
    ? getResidentProgress(gameState, currentResident.id)
    : null;

  const cityScore = getCityScore(gameState);

  // Player movement using WASD or arrow keys.
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      const key = event.key.toLowerCase();

      if (
        ["arrowup", "arrowdown", "arrowleft", "arrowright", " "].includes(key)
      ) {
        event.preventDefault();
      }

      if (key === "m" && !gameCompleted) {
        setShowUpgrades((previous) => !previous);
        return;
      }

      if (showUpgrades || gameCompleted) {
        return;
      }

      const step = 12;

      switch (key) {
        case "arrowup":
        case "w":
          setPlayerY((y) => Math.max(10, y - step));
          break;

        case "arrowdown":
        case "s":
          setPlayerY((y) => Math.min(390, y + step));
          break;

        case "arrowleft":
        case "a":
          setPlayerX((x) => Math.max(10, x - step));
          break;

        case "arrowright":
        case "d":
          setPlayerX((x) => Math.min(590, x + step));
          break;

        default:
          break;
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [showUpgrades, gameCompleted]);

  function handlePurchase(upgradeId: string) {
    const nextState = purchaseUpgrade(gameState, upgradeId);

    // purchaseUpgrade returns the same state if purchase fails.
    if (nextState === gameState) {
      setMessage(
        "Purchase failed. Check your coins or whether you already own this upgrade."
      );
      return;
    }

    setGameState(nextState);
    setMessage(
      "Upgrade purchased! Your city is becoming more accessible."
    );
  }

  function completeMission() {
    if (gameCompleted || !currentResident || !progress) {
      return;
    }

    if (!progress.accessible) {
      setMessage(
        `Not yet! Fix the remaining barriers for ${currentResident.name}.`
      );
      return;
    }

    if (residentIndex < residents.length - 1) {
      const nextResident = residents[residentIndex + 1];

      setGameState((previousState) => ({
        ...previousState,
        budget: previousState.budget + 3,
      }));

      setResidentIndex((index) => index + 1);
      setMessage(
        `Mission complete! You earned 3 coins. Now help ${nextResident.name}!`
      );
    } else {
      setGameCompleted(true);
      setMessage(
        "Amazing! You helped every resident. Your city is more inclusive!"
      );
    }
  }

  function resetGame() {
    setGameState(createInitialState());
    setResidentIndex(0);
    setPlayerX(80);
    setPlayerY(80);
    setShowUpgrades(false);
    setGameCompleted(false);
    setMessage(
      "Welcome! Explore the city and make it accessible for everyone."
    );
  }

  return (
    <main className="app">
      <header className="game-header">
        <div>
          <p className="eyebrow">ACCESSIBILITY CITY BUILDER</p>
          <h1>City for Everyone 🏙️</h1>
          <p className="subtitle">
            Build a city where everyone can move freely and safely.
          </p>
        </div>

        <button className="reset-button" onClick={resetGame}>
          ↻ Reset game
        </button>
      </header>

      <section className="stats-grid">
        <article className="stat-card">
          <span className="stat-icon">🪙</span>
          <div>
            <p>Available coins</p>
            <h2>{gameState.budget}</h2>
          </div>
        </article>

        <article className="stat-card">
          <span className="stat-icon">🌟</span>
          <div>
            <p>City accessibility</p>
            <h2>{cityScore}%</h2>
          </div>
        </article>

        <article className="stat-card">
          <span className="stat-icon">👥</span>
          <div>
            <p>Missions completed</p>
            <h2>
              {gameCompleted ? residents.length : residentIndex}
              <span className="stat-total"> / {residents.length}</span>
            </h2>
          </div>
        </article>
      </section>

      {gameCompleted && (
        <section className="victory-banner" role="status">
          <div className="victory-icon">🏆</div>
          <h2>You did it!</h2>
          <p>
            You helped everyone in your city.
            Your city is becoming more inclusive!
          </p>
          <button className="primary-button" onClick={resetGame}>
            Play again ↻
          </button>
        </section>
      )}

      <section className="game-layout">
        <div className="map-panel">
          <div className="panel-heading">
            <div>
              <p className="eyebrow">YOUR CITY</p>
              <h2>Explore the map</h2>
            </div>
            <span className="map-status">● City active</span>
          </div>

          <div className="map-container">
            <CityMap playerX={playerX} playerY={playerY} />
          </div>

          <div className="movement-help">
            <span className="keyboard-key">W</span>
            <span className="keyboard-key">A</span>
            <span className="keyboard-key">S</span>
            <span className="keyboard-key">D</span>
            <span>or arrow keys to move</span>
          </div>

          <div className="map-actions">
            <button
              className="primary-button"
              onClick={() => setShowUpgrades(true)}
              disabled={gameCompleted}
            >
              🛠️ Open upgrade shop (M)
            </button>
          </div>

          <div className="message-box" role="status">
            <span>💬</span>
            <p>{message}</p>
          </div>
        </div>

        <aside className="mission-panel">
          <div className="panel-heading">
            <div>
              <p className="eyebrow">CURRENT OBJECTIVE</p>
              <h2>Resident mission</h2>
            </div>
            <span className="mission-number">
              {gameCompleted ? residents.length : residentIndex + 1}
              /{residents.length}
            </span>
          </div>

          {!gameCompleted && currentResident && progress ? (
            <>
              <div className="resident-card">
                <div className="resident-avatar">
                  {currentResident.name === "Alex"
                    ? "📚"
                    : currentResident.name === "Sam"
                      ? "🚌"
                      : "🏫"}
                </div>

                <div>
                  <h3>{currentResident.name}</h3>
                  <p>{currentResident.destination}</p>
                </div>
              </div>

              <p className="mission-description">
                Help {currentResident.name} reach their destination
                by fixing the accessibility barriers.
              </p>

              <div className="barrier-section">
                <h3>Accessibility barriers</h3>

                {currentResident.barriers.map((barrier) => {
                  const fixed = fixedBarriers.has(barrier);

                  return (
                    <div className="barrier-item" key={barrier}>
                      <span>{fixed ? "✅" : "⚠️"}</span>

                      <span className={fixed ? "barrier-fixed" : ""}>
                        {String(barrier).replaceAll("-", " ")}
                      </span>

                      <span className="barrier-status">
                        {fixed ? "Fixed" : "Needs work"}
                      </span>
                    </div>
                  );
                })}
              </div>

              <div className="mission-progress">
                <div className="progress-label">
                  <span>Mission progress</span>
                  <strong>
                    {progress.fixed}/{progress.total} fixed
                  </strong>
                </div>

                <div className="progress-track">
                  <div
                    className="progress-fill"
                    style={{
                      width:
                        progress.total === 0
                          ? "0%"
                          : `${(progress.fixed / progress.total) * 100}%`,
                    }}
                  />
                </div>
              </div>

              <button
                className="primary-button"
                onClick={completeMission}
              >
                {progress.accessible
                  ? "Complete mission ✓"
                  : "Check mission"}
              </button>
            </>
          ) : (
            <div className="all-done">
              <div className="victory-icon">🎉</div>
              <h3>All missions complete!</h3>
              <p>You have helped make the city more accessible.</p>
              <button className="primary-button" onClick={resetGame}>
                Play again ↻
              </button>
            </div>
          )}
        </aside>
      </section>

      <section className="upgrade-summary">
        <div className="panel-heading">
          <div>
            <p className="eyebrow">CITY IMPROVEMENTS</p>
            <h2>Purchased upgrades</h2>
          </div>

          <button
            className="secondary-button"
            onClick={() => setShowUpgrades(true)}
            disabled={gameCompleted}
          >
            View upgrades
          </button>
        </div>

        {gameState.purchasedUpgradeIds.length > 0 ? (
          <div className="purchased-list">
            {gameState.purchasedUpgradeIds.map((upgradeId) => {
              const upgrade = upgrades.find(
                (item) => item.id === upgradeId
              );

              if (!upgrade) {
                return null;
              }

              return (
                <div className="purchased-chip" key={upgrade.id}>
                  ✅ {upgrade.name}
                </div>
              );
            })}
          </div>
        ) : (
          <p className="empty-state">
            No upgrades yet. Open the shop to start improving your city.
          </p>
        )}
      </section>

      {showUpgrades && (
        <div
          className="modal-backdrop"
          onClick={() => setShowUpgrades(false)}
          role="presentation"
        >
          <section
            className="upgrade-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="upgrade-title"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="panel-heading">
              <div>
                <p className="eyebrow">SPEND YOUR COINS</p>
                <h2 id="upgrade-title">Upgrade shop 🛠️</h2>
              </div>

              <button
                className="close-button"
                onClick={() => setShowUpgrades(false)}
                aria-label="Close upgrade shop"
              >
                ✕
              </button>
            </div>

            <p className="shop-description">
              Choose improvements that remove barriers for residents.
            </p>

            <div className="upgrade-list">
              {upgrades.map((upgrade) => {
                const purchased =
                  gameState.purchasedUpgradeIds.includes(upgrade.id);

                const affordable = gameState.budget >= upgrade.cost;

                return (
                  <article className="upgrade-card" key={upgrade.id}>
                    <div className="upgrade-info">
                      <h3>{upgrade.name}</h3>
                      <p>{upgrade.description}</p>
                      <span className="upgrade-cost">
                        🪙 {upgrade.cost} coins
                      </span>
                    </div>

                    <button
                      className={
                        purchased
                          ? "purchased-button"
                          : "buy-button"
                      }
                      onClick={() => handlePurchase(upgrade.id)}
                      disabled={
                        purchased || !affordable || gameCompleted
                      }
                    >
                      {purchased
                        ? "Purchased ✓"
                        : !affordable
                          ? "Not enough coins"
                          : "Buy upgrade"}
                    </button>
                  </article>
                );
              })}
            </div>

            <div className="shop-footer">
              <span>Your balance: 🪙 {gameState.budget} coins</span>

              <button
                className="secondary-button"
                onClick={() => setShowUpgrades(false)}
              >
                Done
              </button>
            </div>
          </section>
        </div>
      )}

      <footer className="game-footer">
        <p>City for Everyone · Build with empathy 💚</p>
      </footer>
    </main>
  );
}

export default App;
