import { useContext, useEffect, useState } from 'react';

import { getDatabase, off, onValue, ref, set, update } from 'firebase/database';
import { PlayerContext } from '../../contexts/PlayerContext';

const Players = () => {
	return <div>Player!</div>;
};

export default Players;
