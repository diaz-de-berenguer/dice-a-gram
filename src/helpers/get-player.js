export default (players = [], rollCount) => {
  // returns a color
  const _rollCount = Number(rollCount);
  if (players.length > 0) {
    const index = (_rollCount - 1) % players.length;
    return players[index];
  }
};
