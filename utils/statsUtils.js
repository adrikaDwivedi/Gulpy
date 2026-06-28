export const getStats = (waterLogs = {}) => {
    const logs = Object.values(waterLogs);

    const totalDays = logs.length;

    const daysHit = logs.filter(
        log => Number(log.intake) >= Number(log.goal)
    ).length;

    const missed = totalDays - daysHit;

    const successRate = 
    totalDays === 0
    ? 0
    : Math.round((daysHit/totalDays) * 100);

    return {
        daysHit,
        missed,
        successRate,
    };
};