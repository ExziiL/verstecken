import React, { FC } from 'react';

interface IHidingPlayers {
	players: Array<any>;
}

const HidingPlayers: FC<IHidingPlayers> = ({ players }) => {
	return <div>SeekingPlayer</div>;
};

export default HidingPlayers;
