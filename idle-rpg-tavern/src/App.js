import { useEffect, useState } from "react";

export default function App() {
  const [gold, setGold] = useState(0);
  const [heroLevel, setHeroLevel] = useState(1);
  const [heroDamage, setHeroDamage] = useState(1);
  const [enemyHP, setEnemyHP] = useState(10);
  const [enemyMaxHP, setEnemyMaxHP] = useState(10);
  const [kills, setKills] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setGold(g => g + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setEnemyHP(hp => {
        const newHP = hp - heroDamage;
        if (newHP <= 0) {
          setGold(g => g + 5);
          setKills(k => k + 1);
          const newMaxHP = Math.floor(enemyMaxHP * 1.2);
          setEnemyMaxHP(newMaxHP);
          return newMaxHP;
        }
        return newHP;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, [heroDamage, enemyMaxHP]);

  const upgradeHero = () => {
    const cost = heroLevel * 10;
    if (gold >= cost) {
      setGold(gold - cost);
      setHeroLevel(lvl => lvl + 1);
      setHeroDamage(dmg => dmg + 1);
    }
  };

  return (
    <main style={{ padding: '1rem', maxWidth: '600px', margin: 'auto' }}>
      <h1>🛡️ Tavern of Time</h1>
      <div style={{ padding: '1rem', border: '1px solid #ccc', marginBottom: '1rem' }}>
        <p>Gold: {gold}</p>
        <p>Hero Level: {heroLevel}</p>
        <p>Hero Damage: {heroDamage}</p>
        <p>Enemy HP: {enemyHP} / {enemyMaxHP}</p>
        <p>Total Kills: {kills}</p>
      </div>
      <button onClick={upgradeHero} style={{ width: '100%', marginBottom: '1rem' }}>
        Upgrade Hero ({heroLevel * 10} gold)
      </button>
      <p style={{ fontSize: '0.875rem', color: '#555' }}>
        Your hero battles enemies every 3 seconds and earns gold passively.
      </p>
    </main>
  );
}
