import { instance } from "./instance";
import { nanoid } from 'nanoid';

const playerId = nanoid();

const getMap = async(mapID) => {
    try {
        const req = mapID? `mapID=${mapID}`:'';
        const response = await instance(`/map/?playerID=${playerId}&${req}`);
        return response.data;
    } catch(err) {
        return err;
    }
    
}

export {
    getMap,
    playerId
}