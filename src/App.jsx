import { useState } from "react";
import "./App.css"; // Ensure you pasted the previous CSS here

function App() {
  const [team, setTeam] = useState([]);
  const [searchPlayer, setSearchPlayer] = useState("");

  const players = [
    { id: 1, name: "Virat Kohli", role: "BAT", price: 12.5, team: "IND" },
    { id: 2, name: "Jasprit Bumrah", role: "BWL", price: 11.0, team: "IND" },
    { id: 3, name: "Rishabh Pant", role: "WK", price: 10.0, team: "IND" },
    { id: 4, name: "Rashid Khan", role: "BWL", price: 10.5, team: "AFG" },
    { id: 5, name: "Hardik Pandya", role: "AR", price: 9.5, team: "IND" },
    { id: 6, name: "Joe Root", role: "BAT", price: 10.5, team: "ENG" },
    { id: 7, name: "Pat Cummins", role: "BWL", price: 1.0, team: "AUS" },
    { id: 8, name: "Glenn Maxwell", role: "AR", price: 9.0, team: "AUS" },
    { id: 9, name: "Jos Buttler", role: "WK", price: 11.5, team: "ENG" },
    { id: 10, name: "Trent Boult", role: "BWL", price: 9.5, team: "NZ" },
    { id: 11, name: "Kane Williamson", role: "BAT", price: 10.0, team: "NZ" },
    { id: 12, name: "Kagiso Rabada", role: "BWL", price: 9.0, team: "SA" },
    { id: 13, name: "Ben Stokes", role: "AR", price: 11.0, team: "ENG" },
    { id: 14, name: "Quinton de Kock", role: "WK", price: 10.5, team: "SA" },
    { id: 15, name: "Steve Smith", role: "BAT", price: 0.5, team: "AUS" },
    { id: 16, name: "HP", role: "AR", price: 0.5, team: "IND" }
  ];

  function handleAssign(player) {
    if (team.some((p) => p.id === player.id)) return;
    if (team.length >= 11) return;

    const totalCredits = team.reduce((acc, curr) => acc + curr.price, 0) + player.price;
    const bowlers = team.filter((p) => p.role === "BWL").length;
    const batters = team.filter((p) => p.role === "BAT").length;
    const allRounders = team.filter((p) => p.role === "AR").length;
    const hasWK = team.some((p) => p.role === "WK");

    if (player.role === "BWL" && bowlers >= 5) {
      alert("🎯 Maximum 5 Bowlers!"); return;
    }
    if (player.role === "BAT" && batters >= 5) {
      alert("🏏 Maximum 5 Batters!"); return;
    }
    if (player.role === "AR" && allRounders >= 3) {
      alert("⚡ Maximum 3 All-Rounders!"); return;
    }
    if (player.role === "WK" && hasWK) {
      alert("🧤 Only 1 Wicketkeeper!"); return;
    }
    if (totalCredits > 100) {
      alert("💰 Credit Limit Exceeded!"); return;
    }

    setTeam([...team, player]);
    setSearchPlayer(""); // Clears search after adding
  }

  function handleRemove(player) {
    setTeam(team.filter((p) => p.id !== player.id));
  }

  const battersCount = team.filter((p) => p.role === "BAT").length;
  const bowlersCount = team.filter((p) => p.role === "BWL").length;
  const allRoundersCount = team.filter((p) => p.role === "AR").length;
  const WKCount = team.filter((p) => p.role === "WK").length;
  const totalSpent = team.reduce((sum, p) => sum + p.price, 0);

  function isTeamValid() {
    return (
      team.length === 11 &&
      battersCount >= 3 &&
      bowlersCount >= 3 &&
      allRoundersCount >= 1 &&
      WKCount === 1
    );
  }

  const filteredPlayers = players.filter((player) =>
    player.name.toLowerCase().includes(searchPlayer.toLowerCase())
  );

  return (
    <div className="container">
      <h1>ELITE XI SELECTOR</h1>

      <input
        type="text"
        className="search-input"
        placeholder="Search superstars (e.g. Kohli)..."
        value={searchPlayer}
        onChange={(e) => setSearchPlayer(e.target.value)}
      />

      <div className="main-layout">
        {/* Left Section: Player Pool */}
        <section>
          <ul className="player-list">
            {filteredPlayers.map((player) => (
              <li className="player-card" key={player.id}>
                <div>
                  <span className="role-badge">{player.role}</span>
                  <h3>{player.name}</h3>
                  <p>{player.team} • {player.price} Credits</p>
                </div>
                <button
                  className="btn-add"
                  onClick={() => handleAssign(player)}
                  disabled={team.some((p) => p.id === player.id) || team.length >= 11}
                >
                  {team.some((p) => p.id === player.id) ? "SELECTED" : "ADD PLAYER"}
                </button>
              </li>
            ))}
          </ul>
        </section>

        {/* Right Section: Squad Intel & Finalization */}
        <aside className="sidebar">
          <h2>Squad Stats</h2>
          <div className="stat-item"><span>Batters</span> <span>{battersCount}/5</span></div>
          <div className="stat-item"><span>Bowlers</span> <span>{bowlersCount}/5</span></div>
          <div className="stat-item"><span>All-Rounders</span> <span>{allRoundersCount}/3</span></div>
          <div className="stat-item"><span>Wicketkeeper</span> <span>{WKCount}/1</span></div>

          <h3 style={{ marginTop: '25px' }}>Your Team ({team.length}/11)</h3>
          <div className="selected-list-container">
            {team.length === 0 ? (
              <p style={{ color: "#64748b", textAlign: 'center' }}>No players selected</p>
            ) : (
              team.map((player) => (
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"5px"}} key={player.id} className="selected-player-item">
                  <span>{player.name} ({player.role})</span>
                  <button className="btn-remove" onClick={() => handleRemove(player)}>Remove</button>
                </div>
              ))
            )}
          </div>

          <div className="stat-item" style={{ background: 'transparent', border: 'none', padding: '0' }}>
            <h3>Total Credits:</h3>
            <h3 style={{ color: totalSpent > 100 ? "#ef4444" : "#10b981" }}>
              {totalSpent.toFixed(1)}/100
            </h3>
          </div>

          <button
            className="btn-confirm"
            disabled={!isTeamValid()}
            onClick={() => alert("🏆 Team Finalized Successfully!")}
          >
            Confirm Squad
          </button>
        </aside>
      </div>
    </div>
  );
}

export default App;