import { instance } from "./instance";
import { nanoid } from 'nanoid';

const playerId = nanoid();

const getRoom = async (n) => {
    try {
        const req = n? `?id=${n}`:'';
        const response = await instance(`/rooms/${req}`);
        return response.data;
    } catch(err) {
        return err;
    }
}
const getMap = async(roomID) => {
    try {
        const response = await instance(`/map/?id=${roomID}`);
        return response.data;
    } catch(err) {
        return err;
    }
}

const getMapsList = async() => {
    try {
        const response = await instance('/map/list');
        return response.data;
    } catch (err) {
        return []
    }
}

export {
    getMap,
    playerId,
    getMapsList,
    getRoom
}