/**
 * @param {number} target
 * @param {number[]} position
 * @param {number[]} speed
 * @return {number}
 */
var carFleet = function(target, position, speed) {
    let fleets = position.length
    
    const ids = Array.from(position.keys())
    
    // O(log n) sort
    ids.sort((a, b) => position[a] - position[b])
    
    let prev = ids.length - 1;

    // O(n)
    for(let index = ids.length - 2; index >= 0; index--) {
        const i = ids[prev];
        const j = ids[index];
        
        const t1 = (target - position[i]) / speed[i];
        const t2 = (target - position[j]) / speed[j];

        if (t2 <= t1) {
            fleets--
        } else {
            prev = index
        }
    }
    
    return fleets
};

const testCases = [
  [
    12,
    [10,8,0,5,3],
    [2,4,1,1,3]
  ],
  [
    10,
    [3],
    [3]
  ],
  [
    100,
    [0,2,4],
    [4,2,1]
  ]
];


