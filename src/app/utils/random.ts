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

export interface LayoutContainer {
  width: number;
  height: number;
}

export type LayoutUnit = LayoutContainer;

export interface LayoutResult {
  x: number;
  y: number;
  rotate: number;
  isCenter?: boolean;
}
/**
 * 计算随机布局
 *
 * 随机选取一个unit为中心, 其他unit随机排布在抠去中心后剩下的区域内
 *
 * todo: 尽量让图片不重叠
 * @param container -
 * @param units -
 */
export function getRandomLayout(
  container: LayoutContainer,
  units: LayoutUnit[],
  centerIndex: number = 0
): LayoutResult[] {
  const centerUnit = units[centerIndex];
  const surroundingUnits = units.slice();
  surroundingUnits.splice(centerIndex, 1);
  const containerCenterX = container.width / 2;
  const containerCenterY = container.height / 2;
  const centerArea = {
    xMin: containerCenterX - centerUnit.width / 2,
    xMax: containerCenterX + centerUnit.width / 2,
    yMin: containerCenterY - centerUnit.height / 2,
    yMax: containerCenterY + centerUnit.height / 2,
  };
  const surroundingUnitLayouts: LayoutResult[] = [];
  surroundingUnits.forEach((o) => {
    const randomX = getIntRandomWithUpper(container.width);
    let randomY = 0;
    if (randomX < centerArea.xMin || randomX > centerArea.xMax) {
      randomY = getIntRandomWithUpper(container.height);
    } else {
      randomY =
        Math.random() > 0.5
          ? getIntRandomWithUpper(centerArea.yMin)
          : getIntRandomWithUpper(centerArea.yMin) +
            centerUnit.height +
            centerArea.yMin;
    }
    if (randomY > container.height) {
      console.error({
        randomX,
        randomY,
        'container.height': container.height,
      });
    }
    surroundingUnitLayouts.push({
      x: randomX,
      y: randomY,
      rotate: getRandomRotate(),
    });
  });
  surroundingUnitLayouts.splice(centerIndex, 0, {
    x: containerCenterX,
    y: containerCenterY,
    rotate: 0,
    isCenter: true,
  });
  return surroundingUnitLayouts;
}
