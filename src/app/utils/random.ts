/**
 * 获取[0, up)内的随机整数
 * @param up 整数
 */
export function getIntRandomWithUpper(up: number): number {
  const result = Math.floor(Math.random() * up);
  return result;
}
