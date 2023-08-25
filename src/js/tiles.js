const getTiles = async (tile) => {
    return new Promise((resolve, reject) => {
        const img = new Image();

        img.onload = () => {
            resolve(img);
        }

        img.onerror = (error) => {
            reject(error);
        };

        img.src = tile;
    })
}

export {getTiles}