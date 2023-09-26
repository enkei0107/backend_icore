export const isEpochTimestamp = (value) => {
    const timestamp = parseInt(value, 10); // Parse the value as an integer
    const minTimestamp = 0; // Minimum Unix timestamp (adjust as needed)
    const maxTimestamp = Math.floor(Date.now() / 1000); // Maximum Unix timestamp (current time)

    return !isNaN(timestamp) && timestamp >= minTimestamp && timestamp <= maxTimestamp;
};
