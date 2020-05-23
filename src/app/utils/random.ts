/**
 * 获取[0, up)内的随机整数
 * @param up 整数
 */
export function getIntRandomWithUpper(up: number): number {
  const result = Math.floor(Math.random() * up);
  return result;
}

export function getRandomRotate(maxDeg: number = 60): number {
  const deg = Math.random() * maxDeg;
  return Math.random() > 0.5 ? deg : deg * -1;
}
