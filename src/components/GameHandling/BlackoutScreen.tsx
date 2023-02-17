import React, { useContext, useEffect } from 'react';

import { GameContext } from '../../contexts/GameContext';

// -------- Der Blackoutscreen wird angezeigt, wenn der Spieler der Suchende ist. --------
const BlackoutScreen = () => {
	// const {seconds} = useContext(GameContext) holt sich die Sekunden aus dem GameContext, Der GameContext holt sie wiederum aus der Datenbank
	const { seconds } = useContext(GameContext);

	return (
		<div className="bg-black z-50 w-full h-80 text-white text-center flex flex-col justify-center">
			<div className="text-3xl">Du bist der suchende Spieler.</div>
			<br />
			<div>Deine Mitspieler haben nun 60 Sekunden Zeit sich zu verstecken.</div>
			<br />
			<div>Das Spiel beginnt in: {60 - seconds} Sekunden</div>
			<br />
			<div>Wenn die Zeit abgelaufen ist, musst du deine Mitspieler suchen!</div>
		</div>
	);
};

export default BlackoutScreen;
