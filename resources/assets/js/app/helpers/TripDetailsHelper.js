export const isTripDetailsPath = (path, id) => {
    return path.indexOf('/trip/') === 0 && id !== undefined;
};
