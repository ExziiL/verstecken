import React, { FC } from 'react';

interface ISeekingPlayer {
	players: Array<any>;
}

const SeekingPlayer: FC<ISeekingPlayer> = ({ players }) => {
	return <div>SeekingPlayer</div>;
};

export default SeekingPlayer;
