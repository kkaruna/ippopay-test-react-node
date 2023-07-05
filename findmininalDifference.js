function minAbsoluteDifference(nums) {
  const n = nums.length / 2;
  const totalSum = nums.reduce((acc, num) => acc + num, 0);

  const dp = [];
  for (let i = 0; i <= n; i++) {
    dp[i] = [];
    for (let j = 0; j <= totalSum; j++) {
      dp[i][j] = false;
    }
  }

  dp[0][0] = true;

  for (let num of nums) {
    for (let i = n; i >= 1; i--) {
      for (let j = totalSum; j >= num; j--) {
        dp[i][j] = dp[i][j] || dp[i - 1][j - num];
      }
    }
  }

  let minDiff = 0;

  for (let j = totalSum / 2; j >= 0; j--) {
    if (dp[n][j]) {
      minDiff = totalSum - 2 * j;
      break;
    }
  }

  return minDiff;
}

const input = [3,9,7,3];

console.log("Minimum absolute difference:", minAbsoluteDifference(input));

