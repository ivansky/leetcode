/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
var rotate = function(matrix) {
  const n = matrix.length;

  const floored = Math.floor(n / 2); // y observe
  const ceiled = Math.ceil(n / 2); // x observe

  for (let r = 0; r < ceiled; r++) {
    for (let c = 0; c < floored; c++) {
      let mem = null;
      const curr = matrix[r][c];
      let [x, y] = getAxis(n, r, c);

      for (let s = 0; s < 4; s++) {
        const [x2, y2] = getAxisRotate([x, y]);
        const [r2, c2] = getRowColumn(n, [x2, y2]);
        y = y2
        x = x2
        const next = matrix[r2][c2];
        matrix[r2][c2] = mem !== null ? mem : curr;
        mem = next;
      }
    }
  }

  return; // void, mutate matrix
};

describe('rotate image', () => {
  it('3x3', () => {
    const m = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9]
    ];
    rotate(m);
    expect(m).toEqual([
      [7, 4, 1],
      [8, 5, 2],
      [9, 6, 3]
    ])
  });

  it('4x4', () => {
    const m = [
      [ 1,  2,  3,  4],
      [ 5,  6,  7,  8],
      [ 9, 10, 11, 12],
      [13, 14, 15, 16],
    ];
    rotate(m);
    expect(m).toEqual([
      [13,  9,  5,  1],
      [14, 10,  6,  2],
      [15, 11,  7,  3],
      [16, 12,  8,  4],
    ])
  });
});

/*
x, y
(-1, 1)  (0, 1)  (1, 1)
(-1, 0)  (0, 0)  (1, 0)
(-1,-1)  (0,-1)  (1,-1)

rotate: (x, y) => (y, -x)
*/

function getAxisRotate([x, y]) {
  // (x, y) -> (y, -x)
  return [y, 0 - x]; // rotate 90 deg
}

// ex: 4x4, [3,0] => (-2,-2)
function getAxis(n, r, c) {
  const h2 = Math.floor(n / 2);
  let y = -r + h2;
  let x = c - h2;

  // no zero axis cells
  if (n % 2 === 0) {
    if (r + 1 > h2) y--;
    if (c + 1 > h2) x++;
  }

  return [x, y];
}

// ex: 4x4, (-2,-2) => [3,0]
function getRowColumn(n, [x, y]) {
  const h2 = Math.floor(n / 2); // 2
  let r = 0 - (y - h2); // -(-2 - 2) = 4
  let c = x + h2; // -2 + 2 = 0

  // skip zero axis
  if (n % 2 === 0) {
    if (y < 0) r--;
    if (x > 0) c--;
  }

  return [r, c];
}

describe('getAxis', () => {
  it('3x3, [0,0] => (-1,1)', () => {
    expect(getAxis(3, 0, 0)).toEqual([-1, 1]);
  })

  it('3x3, [1,1] => (0,0)', () => {
    expect(getAxis(3, 1, 1)).toEqual([0, 0]);
  })

  it('3x3, [2,2] => (1,-1)', () => {
    expect(getAxis(3, 2, 2)).toEqual([1, -1]);
  })

  it('4x4, [3,0] => (-2,-2)', () => {
    expect(getAxis(4, 3, 0)).toEqual([-2, -2]);
  })

  it('4x4, [0,0] => (-2,2)', () => {
    expect(getAxis(4, 0, 0)).toEqual([-2, 2]);
  })
});

describe('getAxisRotate', () => {
  // (x, y) -> (y, -x)
  it('(-1,2) => (2,1)', () => {
    expect(getAxisRotate([-1, 2])).toEqual([2, 1]);
  })

  it('(1,1) => (1,-1)', () => {
    expect(getAxisRotate([1, 1])).toEqual([1, -1]);
  })

  it('(0,0) => (0,0)', () => {
    expect(getAxisRotate([0, 0])).toEqual([0, 0]);
  })
});

describe('getRowColumn', () => {
  it('3x3, (0,0) => [1,1]', () => {
    expect(getRowColumn(3, [0, 0])).toEqual([1, 1]);
  })

  it('3x3, (1,-1) => [1,1]', () => {
    expect(getRowColumn(3, [1, -1])).toEqual([2, 2]);
  })

  it('4x4, (-2,-2) => [3,0]', () => {
    expect(getRowColumn(4, [-2, -2])).toEqual([3, 0]);
  })

  it('4x4, (2,-2) => [3,3]', () => {
    expect(getRowColumn(4, [2, -2])).toEqual([3, 3]);
  })
});
