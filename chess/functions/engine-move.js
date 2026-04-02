const engineMove = (moveString) => {
  /**
   * Engine reply format: bestmove e6f5 ponder a1b2,
   * where e6 is sqare_from, f5 is square_to
   * Promotions include piece char: bestmove e7e8q
   * */
  const moveInfo = moveString.split(' ')[1]; //e6f5 or e7e8q
  const from = moveInfo.substr(0, 2); //e6
  const to = moveInfo.substr(2, 2); //f5
  const promotion = moveInfo.length > 4 ? moveInfo[4] : undefined;
  return {
    from,
    to,
    promotion,
  };
};

export default engineMove;
