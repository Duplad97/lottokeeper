export const isParsable = (data:any) => {
    try {
        return JSON.parse(data);
    } catch (error) {
        return null;
    }
}