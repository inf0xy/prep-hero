export const countData = 133;

export const problemsData = [
  {
    title: 'Two Sum',
    difficulty: 'Easy',
    category: 'Array & Hashing',
    tags: ['Array', 'Hashing'],
    companies: [
      'Apple',
      'Adobe',
      'Google',
      'Uber',
      'Microsoft',
      'Cisco',
      'Facebook (Meta)',
      'Oracle',
      'Bloomberg',
      'Yahoo',
      'Spotify',
      'Amazon',
      'Expedia',
      'Accenture',
      'eBay'
    ],
    leetcode_link: 'https://leetcode.com/problems/two-sum/',
    description:
      '"Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to *`target`*.\\n\\nYou may assume that each input would have exactly one solution, and you may not use the same element twice.\\n\\nYou can return the answer in any order.\\n\\n**Example 1:**\\n\\n```\\nInput: nums = [2,7,11,15], target = 9\\nOutput: [0,1]\\nExplanation: Because nums[0] + nums[1] == 9, we return [0, 1].\\n```\\n\\n**Example 2:**\\n\\n```\\nInput: nums = [3,2,4], target = 6\\nOutput: [1,2]\\n```\\n\\n**Example 3:**\\n\\n```\\nInput: nums = [3,3], target = 6\\nOutput: [0,1]\\n```\\n\\n**Constraints:**\\n\\n•&emsp;`2 <= nums.length <= 10^4`\\n\\n•&emsp;`10^9 <= nums[i] <= 10^9`\\n\\n•&emsp;`10^9 <= target <= 10^9`\\n\\n<br/>\\n\\n**Follow up:**\\n\\n•&emsp; A straightforward solution using `O(mn)` space is probably a bad idea.\\n\\n•&emsp; A simple improvement uses `O(m + n)` space, but still not the best solution.\\n\\n•&emsp; Could you devise a constant space solution?"',
    solution_link: 'https://www.youtube.com/watch?v=KLlXCFG5TnA',
    list_names: ['Blind 75', 'NeetCode 150', 'NeetCode All'],
    prompts: {
      python:
        '"class Solution:\\n    def twoSum(self, nums: List[int], target: int) -> List[int]:"',
      javascript:
        '"/**\\n * @param {number[]} nums\\n * @param {number} target\\n * @return {number[]}\\n */\\nvar twoSum = function(nums, target) {\\n    \\n};"'
    },
    solution_codes: {
      python:
        '"class Solution:\\n    def twoSum(self, nums: List[int], target: int) -> List[int]:\\n        prevMap = {}  # val -> index\\n\\n        for i, n in enumerate(nums):\\n            diff = target - n\\n            if diff in prevMap:\\n                return [prevMap[diff], i]\\n            prevMap[n] = i"',
      javascript:
        '"/**\\n * Brute Force - Linear Search\\n * Time O(N^2) | Space O(1)\\n * https://leetcode.com/problems/two-sum/\\n * @param {number[]} nums\\n * @param {number} target\\n * @return {number[]}\\n */\\nvar twoSum = (nums, target) => {\\n    for (let curr = 0; curr < nums.length; curr++) {/* Time O(N) */\\n        const complement = target - nums[curr];\\n\\n        for (let next = (curr + 1); next < nums.length; next++) {/* Time O(N) */\\n            const num = nums[next];\\n\\n            const isTarget = num === complement\\n            if (isTarget) return [ curr, next ];\\n        }\\n    }\\n\\n    return [ -1, -1 ];\\n}\\n\\n/**\\n * Hash Map - 2 Pass\\n * Time O(N) | Space O(N)\\n * https://leetcode.com/problems/two-sum/\\n * @param {number[]} nums\\n * @param {number} target\\n * @return {number[]}\\n */\\nvar twoSum = (nums, target) => {\\n    const map = getMap(nums);       /* Time O(N) | Space O(N) */\\n\\n    return getSum(nums, target, map)/* Time O(N) */\\n}\\n\\nconst getMap = (nums, map = new Map()) => {\\n    for (let index = 0; index < nums.length; index++) {/* Time O(N) */\\n        map.set(nums[index], index);                        /* Space O(N) */\\n    }\\n\\n    return map\\n}\\n\\nconst getSum = (nums, target, map) => {\\n    for (let index = 0; index < nums.length; index++) {/* Time O(N) */\\n        const complement = target - nums[index];\\n        const sumIndex = map.get(complement);\\n\\n        const isTarget = map.has(complement) && (map.get(complement) !== index)\\n        if (isTarget) return [ index, sumIndex ]\\n    }\\n\\n    return [ -1, -1 ];\\n}\\n\\n/**\\n * Hash Map - 1 Pass\\n * Time O(N) | Space O(N)\\n * https://leetcode.com/problems/two-sum/\\n * @param {number[]} nums\\n * @param {number} target\\n * @return {number[]}\\n */\\nvar twoSum = (nums, target, map = new Map()) => {\\n    for (let index = 0; index < nums.length; index++) {/* Time O(N) */\\n        const num = nums[index];\\n        const complement = (target - num);\\n        const sumIndex = map.get(complement);\\n\\n        const isTarget = map.has(complement)\\n        if (isTarget) return [ index, sumIndex ];\\n\\n        map.set(num, index);                                /* Space O(N) */\\n    }\\n\\n    return [ -1, -1 ];\\n}"'
    }
  },
  {
    title: 'Find the Duplicate Number',
    difficulty: 'Medium',
    category: 'Two Pointers',
    tags: ['Array', 'Two Pointers', 'Binary Search'],
    companies: ['Amazon', 'Apple', 'Microsoft', 'Adobe', 'Yahoo', 'Google'],
    leetcode_link: 'https://leetcode.com/problems/find-the-duplicate-number/',
    description:
      '"Given an array of integers `nums` containing `n + 1` integers where each integer is in the range `[1, n]` inclusive.\\n\\nThere is only one repeated number in `nums`, return this repeated number.\\n\\nYou must solve the problem without modifying the array `nums` and uses only constant extra space.\\n\\n**Example 1:**\\n\\n```\\nInput: nums = [1,3,4,2,2]\\nOutput: 2\\n```\\n\\n**Example 2:**\\n\\n```\\nInput: nums = [3,1,3,4,2]\\nOutput: 3\\n```\\n\\n**Constraints:**\\n\\n•&emsp;`1 <= n <= 10^5`\\n\\n•&emsp;`nums.length == n + 1`\\n\\n•&emsp;`1 <= nums[i] <= n`\\n\\nAll the integers in `nums` appear only once except for precisely one integer which appears two or more times.\\n\\n**Follow up:**\\n\\n•&emsp; How can we prove that at least one duplicate number must exist in `nums`?\\n\\n•&emsp; Can you solve the problem in linear runtime complexity?"',
    solution_link: 'https://www.youtube.com/watch?v=wjYnzkAhcNk',
    list_names: ['NeetCode 150', 'NeetCode All'],
    prompts: {
      python:
        '"class Solution:\\n    def findDuplicate(self, nums: List[int]) -> int:"',
      javascript:
        '"/**\\n * @param {number[]} nums\\n * @return {number}\\n */\\nvar findDuplicate = function(nums) {\\n    \\n};"'
    },
    solution_codes: {
      python:
        '"class Solution:\\n    def findDuplicate(self, nums: List[int]) -> int:\\n        slow, fast = 0, 0\\n        while True:\\n            slow = nums[slow]\\n            fast = nums[nums[fast]]\\n            if slow == fast:\\n                break\\n\\n        slow2 = 0\\n        while True:\\n            slow = nums[slow]\\n            slow2 = nums[slow2]\\n            if slow == slow2:\\n                return slow"',
      javascript:
        '"/**\\n * https://leetcode.com/problems/find-the-duplicate-number/\\n * Time O(N * log(N)) | Space O(1)\\n * @param {number[]} nums\\n * @return {number}\\n */\\nvar findDuplicate = function(nums) {\\n    nums.sort((a, b) => a - b);/* Time O(N * log(N)) | HeapSort Space O(1) | QuickSort Space O(log(N)) */\\n\\n    for (let i = 1; i < nums.length; i++) {/* Time O(N) */\\n        const isPrevDuplicate = nums[i - 1] === nums[i]\\n        if (isPrevDuplicate) return nums[i];\\n    }\\n\\n    return -1;\\n}\\n\\n/**\\n * https://leetcode.com/problems/find-the-duplicate-number/\\n * Time O(N * log(N)) | Space O(1)\\n * @param {number[]} nums\\n * @return {number}\\n */\\nvar findDuplicate = function(nums) {\\n    let [ left, right, duplicate ] = [ 1, (nums.length - 1), -1 ];\\n\\n    while (left <= right) {/* Time O(log(N)) */\\n        const mid = (left + right) >> 1;\\n        const count = getCount(mid, nums);/* Time O(N) */\\n    \\n        const isMidGreater = count <= mid\\n        if (isMidGreater) left = mid + 1;\\n\\n        const isMidLess = mid < count\\n        if (isMidLess) {\\n            duplicate = mid;\\n            right = mid - 1;\\n        }\\n    }\\n\\n    return duplicate;\\n}\\n\\nconst getCount = (mid, nums, count = 0) => {\\n    for (const num of nums) {/* Time O(N) */\\n        const isMidGreater = num <= mid\\n        if (isMidGreater) count++;\\n    }\\n\\n    return count;\\n}\\n\\n/**\\n * https://leetcode.com/problems/find-the-duplicate-number/\\n * Time O(N * log(N)) | Space O(1)\\n * @param {number[]} nums\\n * @return {number}\\n */\\nvar findDuplicate = function(nums, duplicate = 0) {\\n    const mostSignificantBit = calcMaxBit(nums);        /* Time O(N) */\\n\\n    for (let bit = 0; bit < mostSignificantBit; bit++) {/* Time O(log(N)) */\\n        const [ baseCount, numsCount, mask ] = count(nums, bit);/* Time O(N) */\\n\\n        const isMoreFrequentlySet = baseCount < numsCount\\n        if (isMoreFrequentlySet) duplicate |= mask;\\n    }\\n\\n    return duplicate;\\n}\\n\\nconst calcMaxBit = (nums, bits = 0) => {\\n    let max = Math.max(0, ...nums);/* Time O(N) */\\n\\n    while (max) {/* Time O(log(MAX)) */\\n        max >>= 1;\\n        bits++;\\n    }\\n\\n    return bits;\\n}\\n\\nconst count = (nums, bit) => {\\n    let [ baseCount, numsCount, mask ] = [ 0, 0, (1 << bit) ];\\n\\n    for (let i = 0; i < nums.length; i++) {/* Time O(N) */\\n        const isBaseBitSet = 0 < (i & mask);\\n        if (isBaseBitSet) baseCount++;\\n\\n        const isNumBitSet = 0 < (nums[i] & mask);\\n        if (isNumBitSet) numsCount++;\\n    }\\n\\n    return [ baseCount, numsCount, mask ];\\n}\\n\\n/**\\n * https://leetcode.com/problems/find-the-duplicate-number/\\n * Time O(N) | Space O(N)\\n * @param {number[]} nums\\n * @return {number}\\n */\\nvar findDuplicate = function(nums, curr = 0) {\\n    const isBaseCase = curr === nums[curr]\\n    if (isBaseCase) return curr;\\n\\n    const next = nums[curr];\\n\\n    nums[curr] = curr;\\n\\n    return findDuplicate(nums, next);/* Time O(N) | Space O(N) */\\n}\\n\\n/**\\n * https://leetcode.com/problems/find-the-duplicate-number/\\n * Time O(N) | Space O(N)\\n * @param {number[]} nums\\n * @return {number}\\n */\\n var findDuplicate = function(nums, seen = new Set()) {\\n    for (const num of nums) {/* Time O(N) */\\n        if (seen.has(num)) return num;\\n\\n        seen.add(num);              /* Space O(N) */\\n    }\\n\\n    return -1;\\n}\\n\\n/**\\n * https://leetcode.com/problems/find-the-duplicate-number/\\n * Time O(N) | Space O(1)\\n * @param {number[]} nums\\n * @return {number}\\n */\\nvar findDuplicate = function(nums) {\\n    cyclicSort(nums);                                 /* Time O(N) */\\n\\n    return search(nums);                              /* Time O(N) */\\n}\\n\\nconst cyclicSort = (nums, index = 0) => {\\n    const swap = (arr, a, b) => [arr[a], arr[b]] = [arr[b], arr[a]];\\n\\n    while (index < nums.length) {                     /* Time O(N) */\\n        const [ num, arrayIndex, arrayNum ] = [ nums[index], (nums[index] - 1), nums[(nums[index] - 1)] ];\\n\\n        const canSwap = !isSame(num, arrayNum);\\n        if (canSwap) {\\n            swap(nums, index, arrayIndex);\\n\\n            continue;\\n        }\\n\\n        index++;\\n    }\\n}\\nconst isSame = (a, b) => a === b;\\n\\nconst search = (nums) => {\\n    for (let index = 0; index < nums.length; index++) {/* Time O(N) */\\n        const [ num, arrayIndex ] = [ nums[index], (index + 1) ];\\n\\n        if (!isSame(num, arrayIndex)) return num;\\n    }\\n\\n    return nums.length;\\n}\\n\\n/**\\n * https://leetcode.com/problems/find-the-duplicate-number/\\n * Time O(N) | Space O(1)\\n * @param {number[]} nums\\n * @return {number}\\n */\\nvar findDuplicate = function(nums) {\\n    const duplicate = negativeMarking(nums);/* Time O(N) */\\n\\n    restoreToPositiveNumbers(nums);         /* Time O(N) */\\n\\n    return duplicate;\\n}\\n\\nconst negativeMarking = (nums) => {\\n    for (let i = 0; i < nums.length; i++) {/* Time O(N) */\\n        const curr = Math.abs(nums[i]);\\n\\n        const isNegative = nums[curr] < 0;\\n        if (isNegative) return curr;\\n\\n        nums[curr] *= -1;\\n    }\\n\\n    return -1\\n}\\n\\nconst restoreToPositiveNumbers = (nums) => {\\n    for (let i = 0; i < nums.length; i++) {/* Time O(N) */\\n        nums[i] = Math.abs(nums[i]);\\n    }\\n}\\n\\n/**\\n * https://leetcode.com/problems/find-the-duplicate-number/\\n * Time O(N) | Space O(1)\\n * @param {number[]} nums\\n * @return {number}\\n */\\n var findDuplicate = function(nums, start = 0) {\\n    const swap = (arr, a, b) => [arr[a], arr[b]] = [arr[b], arr[a]];\\n\\n    const isSame = () => nums[start] === nums[nums[start]];\\n    while (!isSame()) {/* Time O(N) */\\n        swap(nums, start, nums[start]);\\n    }\\n\\n    return nums[start];\\n}\\n\\n/**\\n * https://leetcode.com/problems/find-the-duplicate-number/\\n * Time O(N) | Space O(1)\\n * @param {number[]} nums\\n * @return {number}\\n */\\n var findDuplicate = function(nums) {\\n    if (!nums.length) return -1\\n\\n    let [ slow, fast ] = moveFast(nums);  /* Time O(N) */\\n    [ slow, fast ] = moveSlow(nums, slow, fast);/* Time O(N) */\\n\\n    return slow;\\n};\\n\\nconst moveFast = (nums, start = 0) => {\\n    let [ slow, fast ] = [ nums[start], nums[nums[start]] ];\\n\\n    const isSame = () => slow === fast;\\n    while (!isSame()) {                   /* Time O(N) */\\n        slow = nums[slow];\\n        fast = nums[nums[fast]];\\n    }\\n\\n    fast = start;\\n\\n    return [ slow, fast ];\\n}\\n\\nconst moveSlow = (nums, slow, fast) => {\\n    const isSame = () => slow === fast;\\n    while (!isSame()) {                 /* Time O(N) */\\n        slow = nums[slow];\\n        fast = nums[fast];\\n    }\\n\\n    return [ slow, fast ];\\n}"'
    }
  },
  {
    title: 'N-Queens',
    difficulty: 'Hard',
    category: 'Backtracking',
    tags: ['Depth-First Search', 'Backtracking'],
    companies: ['Adobe', 'TikTok', 'Amazon'],
    leetcode_link: 'https://leetcode.com/problems/n-queens/',
    description:
      '"The n-queens puzzle is the problem of placing `n` queens on an `n x n` chessboard such that no two queens attack each other.\\n\\nGiven an integer `n`, return all distinct solutions to the n-queens puzzle. You may return the answer in any order.\\n\\nEach solution contains a distinct board configuration of the n-queens\' placement, where `\'Q\'` and `\'.\'` both indicate a queen and an empty space, respectively.\\n\\n**Example 1:**\\n\\n![image](https://assets.leetcode.com/uploads/2020/11/13/queens.jpg)\\n\\n```\\nInput: n = 4\\nOutput: [[\\".Q..\\",\\"...Q\\",\\"Q...\\",\\"..Q.\\"],\\n[\\"..Q.\\",\\"Q...\\",\\"...Q\\",\\".Q..\\"]]\\nExplanation: There exist two distinct solutions to the 4-queens puzzle as shown above\\n```\\n\\n**Example 2:**\\n\\n```\\nInput: n = 1\\nOutput: [[\\"Q\\"]]\\n```\\n\\n**Constraints:**\\n\\n•&emsp;`1 <= n <= 9`"',
    solution_link: 'https://www.youtube.com/watch?v=Ph95IHmRp5M',
    list_names: ['NeetCode 150', 'NeetCode All'],
    prompts: {
      python:
        '"class Solution:\\n    def solveNQueens(self, n: int) -> List[List[str]]:"',
      javascript:
        '"/**\\n * @param {number} n\\n * @return {string[][]}\\n */\\nvar solveNQueens = function(n) {\\n    \\n};"'
    },
    solution_codes: {
      python:
        '"class Solution:\\n    def solveNQueens(self, n: int) -> List[List[str]]:\\n        col = set()\\n        posDiag = set()  # (r + c)\\n        negDiag = set()  # (r - c)\\n\\n        res = []\\n        board = [[\\".\\"] * n for i in range(n)]\\n\\n        def backtrack(r):\\n            if r == n:\\n                copy = [\\"\\".join(row) for row in board]\\n                res.append(copy)\\n                return\\n\\n            for c in range(n):\\n                if c in col or (r + c) in posDiag or (r - c) in negDiag:\\n                    continue\\n\\n                col.add(c)\\n                posDiag.add(r + c)\\n                negDiag.add(r - c)\\n                board[r][c] = \\"Q\\"\\n\\n                backtrack(r + 1)\\n\\n                col.remove(c)\\n                posDiag.remove(r + c)\\n                negDiag.remove(r - c)\\n                board[r][c] = \\".\\"\\n\\n        backtrack(0)\\n        return res"',
      javascript:
        '"/**\\n * https://leetcode.com/problems/n-queens/\\n * Time O(N!) | Space O(N^2)\\n * @param {number} n\\n * @return {string[][]}\\n */\\nfunction solveNQueens(n, colSet = new Set(), posDiagSet = new Set(), negDiagSet = new Set()) {\\n    const board = new Array(n).fill().map(() => new Array(n).fill(\'.\'));\\n\\n    return dfs(board, n, colSet, posDiagSet, negDiagSet);\\n}\\n\\nconst dfs = (board, n, colSet, posDiagSet, negDiagSet, row = 0, moves = []) => {\\n    const isBaseCase = row === n;\\n    if (isBaseCase) {\\n        const rows = board.map((_row) => _row.join(\'\'))\\n\\n        moves.push(rows);\\n\\n        return moves;\\n    }\\n\\n    for (let col = 0; col < n; col++) {\\n        const hasQueen = colSet.has(col) || posDiagSet.has(row + col) || negDiagSet.has(row - col)\\n        if (hasQueen) continue;\\n\\n        backTrack(board, n, row, col, colSet, posDiagSet, negDiagSet, moves);\\n    }\\n\\n    return moves\\n}\\n\\nconst backTrack = (board, n, row, col, colSet, posDiagSet, negDiagSet, moves) => {\\n    colSet.add(col);\\n    posDiagSet.add(row + col);\\n    negDiagSet.add(row - col);\\n    board[row][col] = \\"Q\\";\\n\\n        dfs(board, n, colSet, posDiagSet, negDiagSet, (row + 1), moves);\\n\\n    colSet.delete(col);\\n    posDiagSet.delete(row + col);\\n    negDiagSet.delete(row - col);\\n    board[row][col] = \\".\\";\\n}"'
    }
  },
  {
    title: 'Best Time to Buy and Sell Stock',
    difficulty: 'Easy',
    category: 'Greedy',
    tags: ['Graph', 'Sliding window'],
    companies: ['Amazon', 'Facebook (Meta)', 'Apple', 'Adobe', 'Walmart'],
    leetcode_link:
      'https://leetcode.com/problems/best-time-to-buy-and-sell-stock/',
    description:
      '"You are given an array `prices` where `prices[i]` is the price of a given stock on the `iᵗʰ` day.\\n\\nYou want to maximize your profit by choosing a **single day** to buy one stock and choosing a **different day in the future** to sell that stock.\\n\\nReturn *the maximum profit you can achieve from this transaction*. If you cannot achieve any profit, return `0`.\\n\\n<br/>\\n\\n**Example 1:**\\n\\n```\\nInput: prices = [7,1,5,3,6,4]\\nOutput: 5\\nExplanation: Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6-1 = 5.\\nNote that buying on day 2 and selling on day 1 is not allowed because you must buy before you sell.\\n```\\n\\n**Example 2:**\\n\\n```\\nInput: prices = [7,6,4,3,1]\\nOutput: 0\\nExplanation: In this case, no transactions are done and the max profit = 0.\\n```\\n\\n<br/>\\n\\n**Constraints:**\\n\\n•&emsp; `1 <= prices.length <= 10^5`\\n\\n•&emsp; `0 <= prices[i] <= 10^4`"',
    solution_link: 'https://www.youtube.com/watch?v=1pkOgXD63yU',
    list_names: ['Blind 75', 'NeetCode 150', 'NeetCode All'],
    prompts: {
      python:
        '"class Solution:\\n    def maxProfit(self, prices: List[int]) -> int:"',
      javascript:
        '"/**\\n * @param {number[]} prices\\n * @return {number}\\n */\\nvar maxProfit = function(prices) {\\n    \\n};"'
    },
    solution_codes: {
      python:
        '"class Solution:\\n    def maxProfit(self, prices: List[int]) -> int:\\n        res = 0\\n        \\n        lowest = prices[0]\\n        for price in prices:\\n            if price < lowest:\\n                lowest = price\\n            res = max(res, price - lowest)\\n        return res"',
      javascript:
        '"/**\\n * https://leetcode.com/problems/best-time-to-buy-and-sell-stock/\\n * Time O(N) | Space O(1)\\n * @param {number} prices\\n * @return {number}\\n */\\nvar maxProfit = function (prices) {\\n    let [left, right, max] = [0, 1, 0];\\n\\n    while (right < prices.length) {\\n        const canSlide = prices[right] <= prices[left];\\n        if (canSlide) left = right;\\n\\n        const window = prices[right] - prices[left];\\n\\n        max = Math.max(max, window);\\n        right++;\\n    }\\n\\n    return max;\\n};\\n\\n/**\\n * Another approach without using sliding window\\n * https://leetcode.com/problems/best-time-to-buy-and-sell-stock/\\n * Time O(N) | Space O(1)\\n * @param {number} prices\\n * @return {number}\\n */\\n\\nvar maxProfit = function (prices) {\\n    let min = prices[0];\\n    let max = min;\\n    let value = 0;\\n    for (let i = 0; i < prices.length; i++) {\\n        if (i != prices.length - 1 && prices[i] <= min) {\\n            max = min = prices[i];\\n        } else if (prices[i] > max) {\\n            max = prices[i];\\n        }\\n        value = max - min > value ? max - min : value;\\n    }\\n    return value;\\n};"'
    }
  },
  {
    title: 'Contains Duplicate',
    difficulty: 'Easy',
    category: 'Array & Hashing',
    tags: ['Array', 'Hashing'],
    companies: [
      'Adobe',
      'Bloomberg',
      'Google',
      'Amazon',
      'Facebook (Meta)',
      'Yahoo',
      'Microsoft',
      'Uber'
    ],
    leetcode_link: 'https://leetcode.com/problems/contains-duplicate/',
    description:
      '"Given an integer array `nums`, return `true` if any value appears at least twice in the array, and return `false` if every element is distinct.\\n\\n<br />\\n\\n**Example 1:**\\n\\n```\\nInput: nums = [1,2,3,1]\\nOutput: true\\n```\\n\\n**Example 2:**\\n\\n```\\nInput: nums = [1,2,3,4]\\nOutput: false\\n```\\n\\n**Example 3:**\\n\\n```\\nInput: nums = [1,1,1,3,3,4,3,2,4,2]\\nOutput: true\\n```\\n\\n<br />\\n\\n**Constraints:**\\n\\n• `1 &lt;= nums.length &lt;= 105`\\n\\n• `-109 &lt;= nums[i] &lt;= 109`"',
    solution_link: 'https://www.youtube.com/watch?v=3OamzN90kPg',
    list_names: ['Blind 75', 'NeetCode 150', 'NeetCode All'],
    prompts: {
      python:
        '"class Solution:\\n    def containsDuplicate(self, nums: List[int]) -> bool:"',
      javascript:
        '"/**\\n * @param {number[]} nums\\n * @return {boolean}\\n */\\nvar containsDuplicate = function(nums) {\\n    \\n};"'
    },
    solution_codes: {
      python:
        '"class Solution:\\n    def containsDuplicate(self, nums: List[int]) -> bool:\\n        hashset = set()\\n\\n        for n in nums:\\n            if n in hashset:\\n                return True\\n            hashset.add(n)\\n        return False"',
      javascript:
        '"/**\\n * Brute Force - Linear Search\\n * Time O(N^2) | Space O(1)\\n * https://leetcode.com/problems/contains-duplicate/\\n * @param {number[]} nums\\n * @return {boolean}\\n */\\nvar containsDuplicate = (nums) => {\\n    for (let right = 0; right < nums.length; right++) {/* Time O(N) */\\n        for (let left = 0; left < right; left++) {         /* Time O(N) */\\n            const isDuplicate = nums[left] === nums[right];\\n            if (isDuplicate) return true;\\n        }\\n    }\\n\\n    return false;\\n}\\n\\n/**\\n * Sort - HeapSort Space O(1) | QuickSort Space O(log(N))\\n * Time O(N * log(N)) | Space O(1)\\n * https://leetcode.com/problems/contains-duplicate/\\n * @param {number[]} nums\\n * @return {boolean}\\n */\\nvar containsDuplicate = (nums) => {\\n    nums.sort((a, b) => a - b);/* Time O(N * log(N)) | Space O(1 || log(N)) */\\n\\n    return hasDuplicate(nums);\\n}\\n\\nconst hasDuplicate = (nums) => {\\n    for (let curr = 0; curr < (nums.length - 1); curr++) {/* Time O(N) */\\n        const next = (curr + 1);\\n\\n        const isNextDuplicate = nums[curr] === nums[next];\\n        if (isNextDuplicate) return true;\\n    }\\n\\n    return false;\\n}\\n\\n/**\\n * Hash Set\\n * Time O(N) | Space O(N)\\n * https://leetcode.com/problems/contains-duplicate/\\n * @param {number[]} nums\\n * @return {boolean}\\n */\\nvar containsDuplicate = (nums) => {\\n    const numsSet = new Set(nums);/* Time O(N) | Space O(N) */\\n    const isEqual = numsSet.size === nums.length;\\n\\n    return !isEqual;\\n};\\n\\n/**\\n * Hash Set - Early Exit\\n * Time O(N) | Space O(N)\\n * https://leetcode.com/problems/contains-duplicate/\\n * @param {number[]} nums\\n * @return {boolean}\\n */\\nvar containsDuplicate = (nums, numsSet = new Set()) => {\\n    for (const num of nums) {/* Time O(N) */\\n        if (numsSet.has(num)) return true;\\n\\n        numsSet.add(num);       /* Space O(N) */\\n    }\\n\\n    return false;\\n};"'
    }
  },
  {
    title: 'Product of Array Except Self',
    difficulty: 'Medium',
    category: 'Array & Hashing',
    tags: ['Prefix Sum', 'Array'],
    companies: [
      'Apple',
      'Facebook (Meta)',
      'Amazon',
      'Uber',
      'Yahoo',
      'Google',
      'Microsoft',
      'Bloomberg',
      'American Express'
    ],
    leetcode_link:
      'https://leetcode.com/problems/product-of-array-except-self/',
    description:
      '"Given an integer array `nums`, return an array `answer` such that `answer[i]` is equal to the product of all the elements of `nums` except `nums[i]`.\\n\\nThe product of any prefix or suffix of `nums` is guaranteed to fit in a 32-bit integer.\\n\\nYou must write an algorithm that runs in `O(n)` time and without using the division operation.\\n\\n<br/>\\n\\n**Example 1:**\\n\\n```\\nInput: nums = [1,2,3,4]\\nOutput: [24,12,8,6]\\n```\\n\\n**Example 2:**\\n\\n```\\nInput: nums = [-1,1,0,-3,3]\\nOutput: [0,0,9,0,0]\\n```\\n\\n<br/>\\n\\n**Constraints:**\\n\\n•&emsp;`2 <= nums.length <= 10^5`\\n\\n•&emsp;`-30 <= nums[i] <= 30`\\n\\n•&emsp;The product of any prefix or suffix of `nums` is guaranteed to fit in a **32-bit** integer.\\n\\n<br/>\\n\\n**Follow up:** Can you solve the problem in `O(1)` extra space complexity? (The output array does not count as extra space for space complexity analysis.)"',
    solution_link: 'https://www.youtube.com/watch?v=bNvIQI2wAjk',
    list_names: ['Blind 75', 'NeetCode 150', 'NeetCode All'],
    prompts: {
      python:
        '"class Solution:\\n    def productExceptSelf(self, nums: List[int]) -> List[int]:"',
      javascript:
        '"/**\\n * @param {number[]} nums\\n * @return {number[]}\\n */\\nvar productExceptSelf = function(nums) {\\n    \\n};"'
    },
    solution_codes: {
      python:
        '"class Solution:\\n    def productExceptSelf(self, nums: List[int]) -> List[int]:\\n        res = [1] * (len(nums))\\n\\n        prefix = 1\\n        for i in range(len(nums)):\\n            res[i] = prefix\\n            prefix *= nums[i]\\n        postfix = 1\\n        for i in range(len(nums) - 1, -1, -1):\\n            res[i] *= postfix\\n            postfix *= nums[i]\\n        return res"',
      javascript:
        '"/**\\n * Array\\n * Time O(N) | Space O(N)\\n * https://leetcode.com/problems/product-of-array-except-self/\\n * @param {number[]} nums\\n * @return {number[]}\\n */\\n function productExceptSelf(nums) {\\n    const result = [];\\n    let prefix = 1;\\n    let postfix = 1;\\n    \\n    for (let i = 0; i < nums.length; i++) {\\n        result[i] = prefix;\\n        prefix *= nums[i];\\n    }\\n    for (let i = nums.length - 2; i >= 0; i--) {\\n        postfix *= nums[i + 1];\\n        result[i] *= postfix;\\n    }\\n    \\n    return result;\\n};"'
    }
  },
  {
    title: 'Maximum Subarray',
    difficulty: 'Medium',
    category: 'Dynamic Programming',
    tags: ['Dynamic Programming', 'Array'],
    companies: ['Adobe', 'Amazon', 'Apple', 'Bloomberg', 'Cisco', 'LinkedIn'],
    leetcode_link: 'https://leetcode.com/problems/maximum-subarray/',
    description:
      '"Given an integer array `nums`, find the ***subarray*** with the largest sum, and return its sum.\\n\\n<br/>\\n\\n**Example 1:**\\n\\n```\\nInput: nums = [-2,1,-3,4,-1,2,1,-5,4]\\nOutput: 6\\nExplanation: The subarray [4,-1,2,1] has the largest sum 6.\\n```\\n\\n**Example 2:**\\n\\n```\\nInput: nums = [1]\\nOutput: 1\\nExplanation: The subarray [1] has the largest sum 1.\\n```\\n\\n**Example 3:**\\n\\n```\\nInput: nums = [5,4,-1,7,8]\\nOutput: 23\\nExplanation: The subarray [5,4,-1,7,8] has the largest sum 23.\\n```\\n\\n<br/>\\n\\n**Constraints:**\\n\\n•&emsp;`1 <= nums.length <= 10^5`\\n\\n•&emsp;`-104 <= nums[i] <= 10^4`\\n\\n<br/>\\n\\n**Follow up:** If you have figured out the `O(n)` solution, try coding another solution using the ***divide and conquer*** approach, which is more subtle."',
    solution_link: 'https://www.youtube.com/watch?v=5WZl3MMT0Eg',
    list_names: ['Blind 75', 'NeetCode 150', 'NeetCode All'],
    prompts: {
      python:
        '"class Solution:\\n    def maxSubArray(self, nums: List[int]) -> int:"',
      javascript:
        '"/**\\n * @param {number[]} nums\\n * @return {number}\\n */\\nvar maxSubArray = function(nums) {\\n    \\n};"'
    },
    solution_codes: {
      python:
        '"class Solution:\\n    def maxSubArray(self, nums: List[int]) -> int:\\n        res = nums[0]\\n\\n        total = 0\\n        for n in nums:\\n            total += n\\n            res = max(res, total)\\n            if total < 0:\\n                total = 0\\n        return res"',
      javascript:
        '"/**\\n * https://leetcode.com/problems/maximum-subarray/\\n * Time O(N^2) | Space O(1)\\n * @param {number[]} nums\\n * @return {number}\\n */\\n var maxSubArray = function(nums, maxSum = -Infinity) {\\n    for (let i = 0, sum = 0; i < nums.length; i++) {\\n        for (let j = i; j < nums.length; j++) {\\n            sum += nums[j];\\n            maxSum = Math.max(maxSum, sum);\\n        }\\n    }\\n\\n    return maxSum;\\n}\\n\\n/**\\n * https://leetcode.com/problems/maximum-subarray/\\n * Time O(N * log(N)) | Space O(log(N))\\n * @param {number[]} nums\\n * @return {number}\\n */\\nvar maxSubArray = function(nums, left = 0, right = nums.length - 1) {\\n    const isBaseCase = (right < left)\\n    if (isBaseCase) return -Infinity;\\n\\n    const mid = (left + right) >> 1;\\n    const guess = nums[mid];\\n    const leftSum = getLeftSumFromMid(nums, mid, left)\\n    const rightSum = getRightSumFromMid(nums, mid, right)\\n    const sum = guess + leftSum + rightSum;\\n    \\n    const leftHalf = maxSubArray(nums, left, (mid - 1));\\n    const rightHalf = maxSubArray(nums, (mid + 1), right);\\n\\n    return Math.max(sum, leftHalf, rightHalf);\\n}\\n\\nconst getLeftSumFromMid = (nums, mid, left, sum = 0, maxSum = 0) => {\\n    for (let i = (mid - 1); left <= i; i--) {\\n        sum += nums[i];\\n        maxSum = Math.max(maxSum, sum);\\n    }\\n    \\n    return maxSum;\\n}\\n\\nconst getRightSumFromMid = (nums, mid, right, sum = 0, maxSum = 0) => {\\n    for (let i = (mid + 1); i <= right; i++) {\\n        sum += nums[i];\\n        maxSum = Math.max(maxSum, sum);\\n    }\\n    \\n    return maxSum;\\n}\\n\\n/**\\n * https://leetcode.com/problems/maximum-subarray/\\n * Time O(N) | Space O(1)\\n * @param {number[]} nums\\n * @return {number}\\n */\\nvar maxSubArray = function(nums) {\\n    let [ runningSum, maxSum ] = [ nums[0], nums[0] ]\\n    \\n    for (let i = 1; i < nums.length; i++) {\\n        const num = nums[i]\\n        const sum = runningSum + num\\n        \\n        runningSum = Math.max(num, sum)\\n        maxSum = Math.max(maxSum, runningSum)\\n    }\\n    \\n    return maxSum\\n};"'
    }
  },
  {
    title: 'Maximum Product Subarray',
    difficulty: 'Medium',
    category: 'Dynamic Programming',
    tags: ['Array', 'Dynamic Programming'],
    companies: [
      'Amazon',
      'LinkedIn',
      'Microsoft',
      'Adobe',
      'Google',
      'Expedia',
      'Apple',
      'Yahoo',
      'Uber'
    ],
    leetcode_link: 'https://leetcode.com/problems/maximum-product-subarray/',
    description:
      '"Given an integer array `nums`, find a ***subarray*** that has the largest product, and return the product.\\n\\n\\nThe test cases are generated so that the answer will fit in a **32-bit** integer.\\n\\nA **subarray** is a contiguous non-empty sequence of elements within an array.\\n\\n<br/>\\n\\n**Example 1:**\\n\\n```\\nInput: nums = [2,3,-2,4]\\nOutput: 6\\nExplanation: [2,3] has the largest product 6.\\n```\\n\\n**Example 2:**\\n\\n```\\nInput: nums = [-2,0,-1]\\nOutput: 0\\nExplanation: The result cannot be 2, because [-2,-1] is not a subarray.\\n```\\n<br/>\\n\\n**Constraints:**\\n\\n•&emsp;`1 <= nums.length <= 2 * 10^4`\\n\\n\\n•&emsp;`-10 <= nums[i] <= 10`\\n\\n\\n•&emsp;The product of any prefix or suffix of nums is guaranteed to fit in a 32-bit integer."',
    solution_link: 'https://www.youtube.com/watch?v=lXVy6YWFcRM',
    list_names: ['Blind 75', 'NeetCode 150', 'NeetCode All'],
    prompts: {
      python:
        '"class Solution:\\n    def maxProduct(self, nums: List[int]) -> int:"',
      javascript:
        '"/**\\n * @param {number[]} nums\\n * @return {number}\\n */\\nvar maxProduct = function(nums) {\\n    \\n};"'
    },
    solution_codes: {
      python:
        '"class Solution:\\n    def maxProduct(self, nums: List[int]) -> int:\\n        # O(n)/O(1) : Time/Memory\\n        res = nums[0]\\n        curMin, curMax = 1, 1\\n\\n        for n in nums:\\n\\n            tmp = curMax * n\\n            curMax = max(n * curMax, n * curMin, n)\\n            curMin = min(tmp, n * curMin, n)\\n            res = max(res, curMax)\\n        return res"',
      javascript:
        '"/**\\n * Brute Force - Linear Search\\n * Time O(N^2) | Space O(1)\\n * https://leetcode.com/problems/maximum-product-subarray/\\n * @param {number[]} nums\\n * @return {number}\\n */\\n var maxProduct = (nums) => {\\n    const isEmpty = nums.length === 0;\\n    if (isEmpty) return 0;\\n\\n    return linearSearch(nums);/* Time O(N * N) */\\n}\\n\\nconst linearSearch = (nums, max = nums[0]) => {\\n    for (let index = 0; index < nums.length; index++) {/* Time O(N) */\\n        max = getMax(nums, index, max);                    /* Time O(N) */\\n    }\\n\\n    return max;\\n}\\n\\nconst getMax = (nums, index, max, product = 1) => {\\n    for (let num = index; num < nums.length; num++) {/* Time O(N) */\\n        product *= nums[num];\\n        max = Math.max(max, product);\\n    }\\n\\n    return max;\\n}\\n\\n/**\\n * Greedy - product\\n * Time O(N) | Space O(1)\\n * https://leetcode.com/problems/maximum-product-subarray/\\n * @param {number[]} nums\\n * @return {number}\\n */\\nvar maxProduct = (nums) => {\\n    const isEmpty = nums.length === 0;\\n    if (isEmpty) return 0;\\n\\n    return greedySearch(nums);/* Time O(N) */\\n};\\n\\nconst greedySearch = (nums) => {\\n    let min = max = product = nums[0];\\n\\n    for (let num = 1; num < nums.length; num++) {/* Time O(N) */\\n        const [ minProduct, maxProduct ] = [ (min * nums[num]), (max * nums[num]) ];\\n\\n        min = Math.min(maxProduct, minProduct, nums[num]);\\n        max = Math.max(maxProduct, minProduct, nums[num]);\\n\\n        product = Math.max(product, max);\\n    }\\n\\n    return product;\\n};"'
    }
  },
  {
    title: 'Find Minimum in Rotated Sorted Array',
    difficulty: 'Medium',
    category: 'Binary Search',
    tags: ['Binary Search'],
    companies: [
      'Amazon',
      'Facebook (Meta)',
      'Bloomberg',
      'Apple',
      'Uber',
      'Yahoo',
      'Microsoft',
      'Atlassian'
    ],
    leetcode_link:
      'https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/',
    description:
      '"Suppose an array of length `n` sorted in ascending order is **rotated** between `1` and `n` times. For example, the array<br /> `nums = [0,1,2,4,5,6,7]` might become:\\n\\n• `[4,5,6,7,0,1,2]` if it was rotated `4` times.\\n\\n• `[0,1,2,4,5,6,7]` if it was rotated `7` times.\\n\\nNotice that rotating an array `[a[0], a[1], a[2], ..., a[n-1]]` 1 time results in the array `[a[n-1], a[0], a[1], a[2], ..., a[n-2]]`.\\n\\nGiven the sorted rotated array `nums` of **unique** elements, return *the minimum element of this array*.\\n\\nYou must write an algorithm that runs in `O(log n) time`.\\n\\n<br />\\n\\n**Example 1:**\\n\\n```\\nInput: nums = [3,4,5,1,2]\\nOutput: 1\\nExplanation: The original array was [1,2,3,4,5] rotated 3 times.\\n```\\n\\n**Example 2:**\\n\\n```\\nInput: nums = [4,5,6,7,0,1,2]\\nOutput: 0\\nExplanation: The original array was [0,1,2,4,5,6,7] and it was rotated 4 times.\\n```\\n\\n**Example 3:**\\n\\n```\\nInput: nums = [11,13,15,17]\\nOutput: 11\\nExplanation: The original array was [11,13,15,17] and it was rotated 4 times.\\n```\\n\\n<br />\\n\\n**Constraints:**\\n\\n• `n == nums.length`\\n\\n• `1 <= n <= 5000`\\n\\n• `-5000 <= nums[i] <= 5000`\\n\\n• All the integers of `nums` are unique.\\n\\n• `nums` is sorted and rotated between `1` and `n` times."',
    solution_link: 'https://www.youtube.com/watch?v=nIVW4P8b1VA',
    list_names: ['Blind 75', 'NeetCode 150', 'NeetCode All'],
    prompts: {
      python:
        '"class Solution:\\n    def findMin(self, nums: List[int]) -> int:"',
      javascript:
        '"/**\\n * @param {number[]} nums\\n * @return {number}\\n */\\nvar findMin = function(nums) {\\n    \\n};"'
    },
    solution_codes: {
      python:
        '"class Solution:\\n    def findMin(self, nums: List[int]) -> int:\\n        start , end = 0 ,len(nums) - 1 \\n        curr_min = float(\\"inf\\")\\n        \\n        while start  <  end :\\n            mid = (start + end ) // 2\\n            curr_min = min(curr_min,nums[mid])\\n            \\n            # right has the min \\n            if nums[mid] > nums[end]:\\n                start = mid + 1\\n                \\n            # left has the  min \\n            else:\\n                end = mid - 1 \\n                \\n        return min(curr_min,nums[start])"',
      javascript:
        '"/**\\n * @param {number[]} nums\\n * Time O(log(N)) | Space O(1)\\n * @return {number}\\n */\\nvar findMin = function (nums) {\\n    let [left, right] = [0, nums.length - 1];\\n\\n    while (left < right) {\\n        const mid = (left + right) >> 1;\\n        const guess = nums[mid];\\n        const [leftNum, rightNum] = [nums[left], nums[right]];\\n\\n        const isTarget = leftNum < rightNum;\\n        if (isTarget) return leftNum;\\n\\n        const isTargetGreater = leftNum <= guess;\\n        if (isTargetGreater) left = mid + 1;\\n\\n        const isTargetLess = guess < leftNum;\\n        if (isTargetLess) right = mid;\\n    }\\n\\n    return nums[left];\\n};"'
    }
  },
  {
    title: 'Climbing Stairs',
    difficulty: 'Easy',
    category: 'Dynamic Programming',
    tags: ['Backtracking', 'Dynamic Programming'],
    companies: ['Adobe', 'Amazon', 'Apple'],
    leetcode_link: 'https://leetcode.com/problems/climbing-stairs/',
    description:
      '"You are climbing a staircase. It takes `n` steps to reach the top.\\n\\nEach time you can either climb `1` or `2` steps. In how many distinct ways can you climb to the top?\\n\\n<br/>\\n\\n**Example 1:**\\n\\n```\\nInput: n = 2\\nOutput: 2\\nExplanation: There are two ways to climb to the top.\\n1. 1 step + 1 step\\n2. 2 steps\\n```\\n\\n**Example 2:**\\n\\n```\\nInput: n = 3\\nOutput: 3\\nExplanation: There are three ways to climb to the top.\\n1. 1 step + 1 step + 1 step\\n2. 1 step + 2 steps\\n3. 2 steps + 1 step\\n```\\n\\n<br/>\\n\\n**Constraints:**\\n\\n•&emsp;`1 <= n <= 45`"',
    solution_link: 'https://www.youtube.com/watch?v=Y0lT9Fck7qI',
    list_names: ['Blind 75', 'NeetCode 150', 'NeetCode All'],
    prompts: {
      python: '"class Solution:\\n    def climbStairs(self, n: int) -> int:"',
      javascript:
        '"/**\\n * @param {number} n\\n * @return {number}\\n */\\nvar climbStairs = function(n) {\\n    \\n};"'
    },
    solution_codes: {
      python:
        '"class Solution:\\n    def climbStairs(self, n: int) -> int:\\n        if n <= 3:\\n            return n\\n        n1, n2 = 2, 3\\n\\n        for i in range(4, n + 1):\\n            temp = n1 + n2\\n            n1 = n2\\n            n2 = temp\\n        return n2"',
      javascript:
        '"/**\\n * Brute Force - DFS\\n * Time O(2^N) | Space O(N)\\n * https://leetcode.com/problems/climbing-stairs/\\n * @param {number} n\\n * @return {number}\\n */\\n var climbStairs = (n, index = 0) => {\\n    const isBaseCase1 = (n < index);\\n    if (isBaseCase1) return 0;\\n\\n    const isBaseCase2 = (index === n);\\n    if (isBaseCase2) return 1;\\n\\n    const [ next, nextNext ] = [ (index + 1), (index + 2) ];\\n    const left = climbStairs(n, next);     /* Time O(2^N) | Space O(N) */\\n    const right = climbStairs(n, nextNext);/* Time O(2^N) | Space O(N) */\\n\\n    return (left + right);\\n}\\n\\n/**\\n * DP - Top Down\\n * Array - Memoization\\n * Time O(N) | Space O(N)\\n * https://leetcode.com/problems/climbing-stairs/\\n * @param {number} n\\n * @return {number}\\n */\\nvar climbStairs = (n, index = 0, memo = Array(n + 1).fill(0)) => {\\n    const isBaseCase1 = (n < index);\\n    if (isBaseCase1) return 0;\\n\\n    const isBaseCase2 = (index === n);\\n    if (isBaseCase2) return 1;\\n\\n    const hasSeen = (memo[index] !== 0);\\n    if (hasSeen) return memo[index];\\n\\n    const [ next, nextNext ] = [ (index + 1), (index + 2) ];\\n    const left = climbStairs(n, next, memo);     /* Time O(N) | Space O(N) */\\n    const right = climbStairs(n, nextNext, memo);/* Time O(N) | Space O(N) */\\n\\n    memo[index] = (left + right);                /*           | Space O(N) */\\n    return memo[index];\\n};\\n\\n/**\\n * DP - Bottom Up\\n * Array - Tabulation\\n * Time O(N) | Space O(N)\\n * https://leetcode.com/problems/climbing-stairs/\\n * @param {number} n\\n * @return {number}\\n */\\nvar climbStairs = (n) => {\\n    const isBaseCase = (n === 1);\\n    if (isBaseCase) return 1;\\n\\n    const tabu = initTabu(n);/* Space O(N) */\\n\\n    search(n, tabu);\\n\\n    return tabu[n];\\n};\\n\\nvar initTabu = (n) => {\\n    const tabu = new Array(n + 1).fill(0);\\n\\n    tabu[1] = 1;\\n    tabu[2] = 2;\\n\\n    return tabu;\\n}\\n\\nvar search = (n, tabu) => {\\n    for (let index = 3; (index <= n); index++) {/* Time O(N) */\\n        const [ prev, prevPrev ] = [ (index - 1), (index - 2) ];\\n\\n        tabu[index] = (tabu[prev] + tabu[prevPrev]);/* Space O(N) */\\n    }\\n}\\n\\n/**\\n * DP - Fibonacci Number\\n * Time O(N) | Space O(1)\\n * https://leetcode.com/problems/climbing-stairs/\\n * @param {number} n\\n * @return {number}\\n */\\nvar climbStairs = (n) => {\\n    const isBaseCase = (n === 1);\\n    if (isBaseCase) return 1;\\n\\n    let [ next, nextNext ] = [ 1, 2 ];\\n\\n    for (let index = 3; (index <= n); index++) {/* Time O(N) */\\n        const temp = (next + nextNext);\\n        \\n        next = nextNext;\\n        nextNext = temp;\\n    }\\n\\n    return nextNext;\\n};\\n\\n/**\\n * Matrix - Bitnets Method\\n * Time O(log(N)) | Space O(1)\\n * https://leetcode.com/problems/climbing-stairs/\\n * @param {number} n\\n * @return {number}\\n */\\n var climbStairs = (n) => {\\n    const prev = [ [1, 1], [1, 0] ];\\n    const next = power(n, prev);/* Time O(log(N)) */\\n\\n    return next[0][0];\\n}\\n\\nconst power = (n, prev)  => {\\n    let next = [ [1, 0], [0, 1] ];\\n\\n    const isEmpty = () => n === 0;\\n    while (!isEmpty()) {/* Time O(log(N)) */\\n        const isBit = (n & 1) === 1;\\n        if (isBit) next = multiply(next, prev);/* Time O(1) | Space O(1) */\\n\\n        n >>= 1;\\n        prev = multiply(prev, prev);           /* Time O(1) | Space O(1) */\\n    }\\n\\n    return next;\\n}\\n\\nconst multiply = (prev, next) => {\\n    const [ rows, cols ] = [ 2, 2 ];\\n    const matrix = new Array(rows).fill()\\n        .map(() => new Array(cols).fill(0));\\n\\n    for (let row = 0; (row < rows); row++) {\\n        for (let col = 0; (col < cols); col++) {\\n            const left = (prev[row][0] * next[0][col]);\\n            const right = (prev[row][1] * next[1][col]);\\n\\n            matrix[row][col] = (left + right);\\n        }\\n    }\\n\\n    return matrix;\\n}\\n\\n/**\\n * Math - Fibonacci Formula\\n * Time O(log(N)) | Space O(1)\\n * https://leetcode.com/problems/climbing-stairs/\\n * @param {number} n\\n * @return {number}\\n */\\nvar climbStairs = (n, sqrt5 = Math.sqrt(5)) => {\\n    const phi = ((sqrt5 + 1) / 2);\\n    const psi = ((sqrt5 - 1) / 2);\\n\\n    const phiPow = Math.pow(phi, (n + 1));\\n    const psiPow = Math.pow(psi, (n + 1));\\n\\n    return ((phiPow - psiPow) / sqrt5);\\n};"'
    }
  },
  {
    title: 'Search in Rotated Sorted Array',
    difficulty: 'Medium',
    category: 'Binary Search',
    tags: ['Binary Search', 'Array'],
    companies: ['Google', 'Bloomberg', 'LinkedIn', 'Walmart', 'Uber'],
    leetcode_link:
      'https://leetcode.com/problems/search-in-rotated-sorted-array/',
    description:
      '"There is an integer array `nums` sorted in ascending order (with distinct values).\\n\\nPrior to being passed to your function, `nums` is possibly rotated at an unknown pivot index `k` (`1 <= k < nums.length`) such that the resulting array is `[nums[k], nums[k+1], ..., nums[n-1], nums[0], nums[1], ..., nums[k-1]]` (**0-indexed**).\\n\\nFor example, `[0,1,2,4,5,6,7]` might be rotated at pivot index `3` and become `[4,5,6,7,0,1,2]`.\\n\\nGiven the array `nums` **after** the possible rotation and an integer `target`, return the index of `target` *if it is in* `nums`, or `-1` if it is not in `nums`.\\n\\nYou must write an algorithm with `O(log n)` runtime complexity.\\n\\n<br />\\n\\n**Example 1:**\\n\\n```\\nInput: nums = [4,5,6,7,0,1,2], target = 0\\nOutput: 4\\n```\\n\\n**Example 2:**\\n\\n```\\nInput: nums = [4,5,6,7,0,1,2], target = 3\\nOutput: -1\\n```\\n\\n**Example 3:**\\n\\n```\\nInput: nums = [1], target = 0\\nOutput: -1\\n```\\n\\n<br />\\n\\n**Constraints:**\\n\\n•&emsp;`1 <= nums.length <= 5000`\\n\\n•&emsp;`-10^4 <= nums[i] <= 104`\\n\\n•&emsp;All values of `nums` are **unique**.\\n\\n•&emsp;`nums` is an ascending array that is possibly rotated.\\n\\n•&emsp;`-10^4 <= target <= 10^4`"',
    solution_link: 'https://www.youtube.com/watch?v=U8XENwh8Oy8',
    list_names: ['Blind 75', 'NeetCode 150', 'NeetCode All'],
    prompts: {
      python:
        '"class Solution:\\n    def search(self, nums: List[int], target: int) -> int:"',
      javascript:
        '"/**\\n * @param {number[]} nums\\n * @param {number} target\\n * @return {number}\\n */\\nvar search = function(nums, target) {\\n    \\n};"'
    },
    solution_codes: {
      python:
        '"class Solution:\\n    def search(self, nums: List[int], target: int) -> int:\\n        l, r = 0, len(nums) - 1\\n\\n        while l <= r:\\n            mid = (l + r) // 2\\n            if target == nums[mid]:\\n                return mid\\n\\n            # left sorted portion\\n            if nums[l] <= nums[mid]:\\n                if target > nums[mid] or target < nums[l]:\\n                    l = mid + 1\\n                else:\\n                    r = mid - 1\\n            # right sorted portion\\n            else:\\n                if target < nums[mid] or target > nums[r]:\\n                    r = mid - 1\\n                else:\\n                    l = mid + 1\\n        return -1"',
      javascript:
        '"/**\\n * @param {number[]} nums\\n * @param {number} target\\n * Time O(log(N)) | Space O(1)\\n * @return {number}\\n */\\nvar search = (nums, target) => {\\n    let [left, right] = [0, nums.length - 1];\\n\\n    while (left <= right) {\\n        const mid = (left + right) >> 1;\\n        const guess = nums[mid];\\n        const [leftNum, rightNum] = [nums[left], nums[right]];\\n\\n        const isTarget = guess === target;\\n        if (isTarget) return mid;\\n\\n        const isAscending = leftNum <= guess;\\n        if (isAscending) {\\n            const isInRange = leftNum <= target;\\n            const isLess = target < guess;\\n\\n            const isTargetGreater = !(isInRange && isLess);\\n            if (isTargetGreater) left = mid + 1;\\n\\n            const isTargetLess = isInRange && isLess;\\n            if (isTargetLess) right = mid - 1;\\n        }\\n\\n        const isDescending = guess < leftNum;\\n        if (isDescending) {\\n            const isGreater = guess < target;\\n            const isInRange = target <= rightNum;\\n\\n            const isTargetGreater = isGreater && isInRange;\\n            if (isTargetGreater) left = mid + 1;\\n\\n            const isTargetLess = !(isGreater && isInRange);\\n            if (isTargetLess) right = mid - 1;\\n        }\\n    }\\n\\n    return -1;\\n};"'
    }
  },
  {
    title: '3Sum',
    difficulty: 'Medium',
    category: 'Two Pointers',
    tags: ['Two Pointers'],
    companies: [
      'Adobe',
      'Amazon',
      'Bloomberg',
      'Microsoft',
      'LinkedIn',
      'VM',
      'Walmart',
      'Infosys'
    ],
    leetcode_link: 'https://leetcode.com/problems/3sum/',
    description:
      '"Given an integer array nums, return all the triplets `[nums[i], nums[j], nums[k]]` such that `i != j`, `i != k`, and `j != k`, and `nums[i] + nums[j] + nums[k] == 0`.\\n\\nNotice that the solution set must not contain duplicate triplets.\\n\\n<br/>\\n\\n**Example 1:**\\n\\n```\\nInput: nums = [-1,0,1,2,-1,-4]\\nOutput: [[-1,-1,2],[-1,0,1]]\\nExplanation:\\nnums[0] + nums[1] + nums[2] = (-1) + 0 + 1 = 0.\\nnums[1] + nums[2] + nums[4] = 0 + 1 + (-1) = 0.\\nnums[0] + nums[3] + nums[4] = (-1) + 2 + (-1) = 0.\\nThe distinct triplets are [-1,0,1] and [-1,-1,2].\\nNotice that the order of the output and the order of the triplets does not matter.\\n```\\n\\n**Example 2:**\\n\\n```\\nInput: nums = [0,1,1]\\nOutput: []\\nExplanation: The only possible triplet does not sum up to 0.\\n```\\n\\n**Example 3:**\\n\\n```\\nInput: nums = [0,0,0]\\nOutput: [[0,0,0]]\\nExplanation: The only possible triplet sums up to 0.\\n```\\n\\n<br/>\\n\\n**Constraints:**\\n\\n•&emsp;`3 <= nums.length <= 3000`\\n\\n•&emsp;`-10^5 <= nums[i] <= 10^5`"',
    solution_link: 'https://www.youtube.com/watch?v=jzZsG8n2R9A',
    list_names: ['Blind 75', 'NeetCode 150', 'NeetCode All'],
    prompts: {
      python:
        '"class Solution:\\n    def threeSum(self, nums: List[int]) -> List[List[int]]:"',
      javascript:
        '"/**\\n * @param {number[]} nums\\n * @return {number[][]}\\n */\\nvar threeSum = function(nums) {\\n    \\n};"'
    },
    solution_codes: {
      python:
        '"class Solution:\\n    def ThreeSum(self, integers):\\n        \\"\\"\\"\\n        :type integers: List[int]\\n        :rtype: List[List[int]]\\n        \\"\\"\\"\\n        integers.sort()\\n        result = []\\n        for index in range(len(integers)):\\n            if integers[index] > 0:\\n                break\\n            if index > 0 and integers[index] == integers[index - 1]:\\n                continue\\n            left, right = index + 1, len(integers) - 1\\n            while left < right:\\n                if integers[left] + integers[right] < 0 - integers[index]:\\n                    left += 1\\n                elif integers[left] + integers[right] > 0 - integers[index]:\\n                    right -= 1\\n                else:\\n                    result.append([integers[index], integers[left], integers[right]]) # After a triplet is appended, we try our best to incease the numeric value of its first element or that of its second.\\n                    left += 1 # The other pairs and the one we were just looking at are either duplicates or smaller than the target.\\n                    right -= 1 # The other pairs are either duplicates or greater than the target.\\n                    # We must move on if there is less than or equal to one integer in between the two integers.\\n                    while integers[left] == integers[left - 1] and left < right:\\n                        left += 1 # The pairs are either duplicates or smaller than the target.\\n        return result"',
      javascript:
        '"/**\\n * @param {number[]} nums\\n * @return {number[][]}\\n */\\nvar threeSum = function(nums) {\\n    const res = [];\\n    nums.sort((a,b) => a-b)\\n\\n    for (let i = 0; i < nums.length; i++) {\\n        const a = nums[i];\\n        if (a > 0) break;\\n        if (i > 0 && a === nums[i - 1]) continue;\\n\\n        let l = i + 1;\\n        let r = nums.length - 1;\\n        while (l < r) {\\n            const threeSum = a + nums[l] + nums[r];\\n            if (threeSum > 0) {\\n                r--;\\n            } else if (threeSum < 0) {\\n                l++;\\n            } else {\\n                res.push([a, nums[l], nums[r]]);\\n                l++;\\n                r--;\\n                while (nums[l] === nums[l - 1] && l < r) {\\n                    l++;\\n                }\\n            }\\n        }\\n    }\\n    return res;\\n};"'
    }
  },
  {
    title: 'Container With Most Water',
    difficulty: 'Medium',
    category: 'Two Pointers',
    tags: ['Two Pointers'],
    companies: ['Adobe', 'Amazon', 'Bloomberg', 'Microsoft', 'Walmart', 'VM'],
    leetcode_link: 'https://leetcode.com/problems/container-with-most-water/',
    description:
      '"You are given an integer array `height` of length ``n``. There are `n` vertical lines drawn such that the two endpoints of the `ith` line are `(i, 0)` and `(i, height[i])`.\\n\\nFind two lines that together with the x-axis form a container, such that the container contains the most water.\\n\\nReturn the *maximum amount of water a container can store*.\\n\\n**Notice** that you may not slant the container.\\n\\n<br/>\\n\\n**Example 1:**\\n\\n![image](https://s3-lc-upload.s3.amazonaws.com/uploads/2018/07/17/question_11.jpg)\\n\\n```\\nInput: height = [1,8,6,2,5,4,8,3,7]\\nOutput: 49\\nExplanation: The above vertical lines are represented by array [1,8,6,2,5,4,8,3,7]. In this case, the max area of water (blue section) the container can contain is 49.\\n```\\n\\n**Example 2:**\\n\\n```\\nInput: height = [1,1]\\nOutput: 1\\n```\\n\\n<br/>\\n\\n**Constraints:**\\n\\n•&emsp;`n == height.length`\\n\\n•&emsp;`2 <= n <= 10^5`\\n\\n•&emsp;`0 <= height[i] <= 10^4`"',
    solution_link: 'https://www.youtube.com/watch?v=UuiTKBwPgAo',
    list_names: ['Blind 75', 'NeetCode 150', 'NeetCode All'],
    prompts: {
      python:
        '"class Solution:\\n    def maxArea(self, height: List[int]) -> int:"',
      javascript:
        '"/**\\n * @param {number[]} height\\n * @return {number}\\n */\\nvar maxArea = function(height) {\\n    \\n};"'
    },
    solution_codes: {
      python:
        '"class Solution:\\n    def maxArea(self, height: List[int]) -> int:\\n        l, r = 0, len(height) - 1\\n        res = 0\\n        h = max(height)\\n\\n        while l < r:\\n            res = max(res, min(height[l], height[r]) * (r - l))\\n            if height[l] < height[r]:\\n                l += 1\\n            elif height[r] <= height[l]:\\n                r -= 1\\n            \\n            if (r-l) * h <= res:\\n                break \\n        return res"',
      javascript:
        '"/**\\n * https://leetcode.com/problems/container-with-most-water/\\n * Time O(N) | Space(1)\\n * @param {number[]} height\\n * @return {number}\\n */\\nvar maxArea = function (height) {\\n    let [left, right, max] = [0, height.length - 1, 0];\\n\\n    while (left < right) {\\n        const [leftHeight, rightHeight] = getHeights(height, left, right);\\n        const area = getArea(height, left, right);\\n\\n        max = Math.max(max, area);\\n\\n        const isRightGreater = leftHeight <= rightHeight;\\n        if (isRightGreater) left++;\\n\\n        const isRightLess = rightHeight < leftHeight;\\n        if (isRightLess) right--;\\n    }\\n\\n    return max;\\n};\\n\\nconst getHeights = (height, left, right) => [height[left], height[right]];\\n\\nconst getArea = (height, left, right) => {\\n    const [leftHeight, rightHeight] = getHeights(height, left, right);\\n    const _height = Math.min(leftHeight, rightHeight);\\n    const width = right - left;\\n\\n    return _height * width;\\n};"'
    }
  },
  {
    title: 'Coin Change',
    difficulty: 'Medium',
    category: 'Dynamic Programming',
    tags: ['Dynamic Programming', 'Backtracking'],
    companies: ['Amazon', 'Samsung', 'Walmart', 'Apple', 'TikTok'],
    leetcode_link: 'https://leetcode.com/problems/coin-change/',
    description:
      '"You are given an integer array `coins` representing coins of different denominations and an integer `amount` representing a total amount of money.\\n\\nReturn *the fewest number of coins that you need to make up that amount*. If that amount of money cannot be made up by any combination of the coins, return `-1`.\\n\\nYou may assume that you have an infinite number of each kind of coin.\\n\\n<br />\\n\\n**Example 1:**\\n\\n```\\nInput: coins = [1,2,5], amount = 11\\nOutput: 3\\nExplanation: 11 = 5 + 5 + 1\\n```\\n\\n**Example 2:**\\n\\n```\\nInput: coins = [2], amount = 3\\nOutput: -1\\n```\\n\\n**Example 3:**\\n\\n```\\nInput: coins = [1], amount = 0\\nOutput: 0\\n```\\n\\n<br />\\n\\n**Constraints:**\\n\\n• `1 <= coins.length <= 12`\\n\\n\\n• `1 <= coins[i] <= 2^31 - 1`\\n\\n\\n• `0 <= amount <= 10^4`"',
    solution_link: 'https://www.youtube.com/watch?v=H9bfqozjoqs',
    list_names: ['Blind 75', 'NeetCode 150', 'NeetCode All'],
    prompts: {
      python:
        '"class Solution:\\n    def coinChange(self, coins: List[int], amount: int) -> int:"',
      javascript:
        '"/**\\n * @param {number[]} coins\\n * @param {number} amount\\n * @return {number}\\n */\\nvar coinChange = function(coins, amount) {\\n    \\n};"'
    },
    solution_codes: {
      python:
        '"class Solution:\\n    def coinChange(self, coins: List[int], amount: int) -> int:\\n        dp = [amount + 1] * (amount + 1)\\n        dp[0] = 0\\n\\n        for a in range(1, amount + 1):\\n            for c in coins:\\n                if a - c >= 0:\\n                    dp[a] = min(dp[a], 1 + dp[a - c])\\n        return dp[amount] if dp[amount] != amount + 1 else -1"',
      javascript:
        '"/**\\n * Brute Force - DFS\\n * Time O(S^N) | Space O(N)\\n * https://leetcode.com/problems/coin-change/\\n * @param {number[]} coins\\n * @param {number} amount\\n * @return {number}\\n */\\n var coinChange = (coins, amount, coin = 0) => {\\n    const isBaseCase1 = amount === 0;\\n    if (isBaseCase1) return 0;\\n\\n    const isBaseCase2 = !((coin < coins.length) && (0 < amount));\\n    if (isBaseCase2) return -1;\\n\\n    return dfs(coins, amount, coin);/* Time O(S^N) | Space O(N) */\\n}\\n\\nvar dfs = (coins, amount, coin) => {\\n    let [ max, minCost ] = [ (amount / coins[coin]), Infinity ];\\n\\n    for (let num = 0; num <= max; num++) {/* Time O(N) */\\n        const caUpdate = ((num * coins[coin]) <= amount);\\n        if (!caUpdate) continue;\\n\\n        const product = (num * coins[coin]);\\n        const difference = amount - product;\\n        const min = coinChange(coins, difference, (coin + 1));/* Time O(S^N) | Space O(N) */\\n        const cost = (min + num);\\n\\n        const isSentinel = (min === -1);\\n        if (isSentinel) continue;\\n\\n        minCost = Math.min(minCost, cost);\\n    }\\n\\n    return (minCost !== Infinity)\\n        ? minCost\\n        : -1;\\n}\\n\\n/**\\n * DP - Top Down\\n * Array - Memoization\\n * Time O(N) | Space O(N)\\n * https://leetcode.com/problems/coin-change/\\n * @param {number[]} coins\\n * @param {number} amount\\n * @return {number}\\n */\\n var coinChange = (coins, amount, memo = initMemo(amount)) => {\\n    const isBaseCase1 = (amount < 0);\\n    if (isBaseCase1) return -1;\\n\\n    const isBaseCase2 = (amount < 1);\\n    if (isBaseCase2) return 0;\\n\\n    const isBaseCase3 = (memo[amount - 1] !== 0);\\n    if (isBaseCase3) return memo[amount - 1];\\n\\n    return dfs(coins, amount, memo);/* Time O(N) | Space O(N) */\\n}\\n\\nconst initMemo = (amount) => Array(amount).fill(0);\\n\\nvar dfs = (coins, amount, memo, min = Infinity) => {\\n    for (const coin of coins) {                               /* Time O(N) */\\n        const cost = coinChange(coins, (amount - coin), memo);/* Time O(N) | Space O(N) */\\n\\n        const canUpdate = ((0 <= cost) && (cost < min));\\n        if (!canUpdate) continue;\\n\\n        min = (cost + 1);\\n    }\\n\\n    memo[amount - 1] = (min !== Infinity)\\n        ? min\\n        : -1;\\n\\n    return memo[amount - 1];\\n}\\n\\n/**\\n * DP - Bottom Up\\n * Array - Tabulation\\n * Time O(N) | Space O(N)\\n * https://leetcode.com/problems/coin-change/\\n * @param {number[]} coins\\n * @param {number} amount\\n * @return {number}\\n */\\nvar coinChange = (coins, amount) => {\\n    const tabu = initTabu(amount);\\n\\n    for (let _amount = 1; _amount <= amount; _amount++) {/* Time O(N) */\\n        for (let coin = 0; coin < coins.length; coin++) {    /* Time O(N) */\\n            const canUpdate = (coins[coin] <= _amount);\\n            if (!canUpdate) continue;\\n\\n            const difference = (_amount - coins[coin]);\\n            const min = (tabu[difference] + 1);\\n\\n            tabu[_amount] = Math.min(tabu[_amount], min);    /* Space O(N) */\\n        }\\n    }\\n\\n    return (tabu[amount] <= amount)\\n        ? tabu[amount]\\n        : -1;\\n}\\n\\nconst initTabu = (amount) => {\\n    const tabu = Array((amount + 1)).fill((amount + 1));\\n\\n    tabu[0] = 0;\\n\\n    return tabu;\\n};"'
    }
  },
  {
    title: 'Longest Increasing Subsequence',
    difficulty: 'Medium',
    category: 'Dynamic Programming',
    tags: ['Backtracking', 'Dynamic Programming'],
    companies: ['Google', 'Infosys', 'Expedia', 'TikTok'],
    leetcode_link:
      'https://leetcode.com/problems/longest-increasing-subsequence/',
    description:
      '"Given an integer array `nums`, return the *length of the longest **strictly increasing\\nsubsequence***.\\n\\nA **subsequence** is an array that can be derived from another array by deleting some or no elements without changing the order of the remaining elements.\\n\\n<br/>\\n\\n**Example 1:**\\n\\n```\\nInput: nums = [10,9,2,5,3,7,101,18]\\nOutput: 4\\nExplanation: The longest increasing subsequence is [2,3,7,101], therefore the length is 4.\\n```\\n\\n**Example 2:**\\n\\n```\\nInput: nums = [0,1,0,3,2,3]\\nOutput: 4\\n```\\n\\n**Example 3:**\\n\\n```\\nInput: nums = [7,7,7,7,7,7,7]\\nOutput: 1\\n```\\n\\n<br/>\\n\\n**Constraints:**\\n\\n•&emsp;`1 <= nums.length <= 2500`\\n\\n\\n•&emsp;`-10^4 <= nums[i] <= 10^4`\\n\\n<br/>\\n\\n**Follow up:** Can you come up with an algorithm that runs in `O(n log(n))` time complexity?"',
    solution_link: 'https://www.youtube.com/watch?v=cjWnW0hdF1Y',
    list_names: ['Blind 75', 'NeetCode 150', 'NeetCode All'],
    prompts: {
      python:
        '"class Solution:\\n    def lengthOfLIS(self, nums: List[int]) -> int:"',
      javascript:
        '"/**\\n * @param {number[]} nums\\n * @return {number}\\n */\\nvar lengthOfLIS = function(nums) {\\n    \\n};"'
    },
    solution_codes: {
      python:
        '"# Solution with time complexity O(n^2)\\nclass Solution:\\n    def lengthOfLIS(self, nums: List[int]) -> int:\\n        LIS = [1] * len(nums)\\n\\n        for i in range(len(nums) - 1, -1, -1):\\n            for j in range(i + 1, len(nums)):\\n                if nums[i] < nums[j]:\\n                    LIS[i] = max(LIS[i], 1 + LIS[j])\\n        return max(LIS)\\n\\n# Solution with time complexity O(nlog(n)) using Binary Search.\\ndef lengthOfLIS(self, nums: List[int]) -> int:\\n    tails = [0] * len(nums)\\n    result = 0\\n\\n    for num in nums:\\n        left_index, right_index = 0, result\\n        while left_index != right_index:\\n            middle_index = left_index + (right_index - left_index) // 2\\n            if tails[middle_index] < num:\\n                left_index = middle_index + 1\\n            else:\\n                right_index = middle_index\\n        result = max(result, left_index + 1)\\n        tails[left_index] = num\\n\\n    return result"',
      javascript:
        '"/**\\n * DP - Bottom Up\\n * Array - Tabulation\\n * Time O(N^2) | Space O(N)\\n * https://leetcode.com/problems/longest-increasing-subsequence/\\n * @param {number[]} nums\\n * @return {number}\\n */\\nvar lengthOfLIS = (nums) => {\\n    const tabu = initTabu(nums);/*               | Space O(N) */\\n\\n    linearSearch(nums, tabu);   /* Time O(N * N) | Space O(N)*/\\n\\n    return Math.max(...tabu);   /* Time O(N) */\\n};\\n\\nconst initTabu = (nums) => new Array(nums.length).fill(1);\\n\\nvar linearSearch = (nums, tabu) => {\\n    for (let right = 1; (right < nums.length); right++) {/* Time O(N) */\\n        for (let left = 0; (left < right); left++) {         /* Time O(N) */\\n            const canUpdate = nums[left] < nums[right];\\n            if (!canUpdate) continue;\\n\\n            const [ _left, _right ] = [ (tabu[left] + 1), tabu[right] ];\\n            tabu[right] = Math.max(_right, _left);           /* Space O(N) */\\n        }\\n    }\\n}\\n\\n/**\\n * Array - Subsequence\\n * Time O(N^2) | Space O(N)\\n * https://leetcode.com/problems/longest-increasing-subsequence/\\n * @param {number[]} nums\\n * @return {number}\\n */\\nvar lengthOfLIS = (nums) => {\\n    const subsequence = linearSort(nums);/* Time O(N * N) | Space O(N) */\\n\\n    return subsequence.length;\\n}\\n\\nvar linearSort = (nums, subsequence = []) => {\\n    for (const num of nums) {/* Time O(N) */\\n        const max = subsequence[subsequence.length - 1];\\n\\n        const canAdd = max < num;\\n        if (canAdd) { subsequence.push(num); continue; }/* Space O(N) */\\n\\n        const index = getMax(subsequence, num);         /* Time O(N) */\\n\\n        subsequence[index] = num;\\n    }\\n\\n    return subsequence;\\n}\\n\\n\\nconst getMax = (subsequence, num, index = 0) => {\\n    const isLess = () => subsequence[index] < num;\\n    while (isLess()) index++;/* Time O(N) */\\n\\n    return index;\\n}\\n\\n/**\\n * Array - Subsequence\\n * Time O(N * log(N)) | Space O(N)\\n * https://leetcode.com/problems/longest-increasing-subsequence/\\n * @param {number[]} nums\\n * @return {number}\\n */\\nvar lengthOfLIS = (nums) => {\\n    const subsequence = logarithmicSort(nums);/* Time O(N * log(N) */\\n\\n    return subsequence.length;\\n}\\n\\nvar logarithmicSort = (nums, subsequence = []) => {\\n    for (const num of nums) {/* Time O(N) */\\n        const max = subsequence[(subsequence.length - 1)];\\n\\n        const canAdd = (max < num);\\n        if (canAdd) { subsequence.push(num); continue; }/* Space O(N) */\\n\\n        const index = binarySearch(num, subsequence);   /* Time O(log(N)) */\\n\\n        subsequence[index] = num;\\n    }\\n\\n    return subsequence;\\n}\\n\\nconst binarySearch = (num, subsequence) => {\\n    let [ left, right ] = [ 0, (subsequence.length - 1) ];\\n\\n    while (left < right) {/* Time O(log(N)) */\\n        const mid = ((left + right) >> 1);\\n        const guess = subsequence[mid];\\n\\n        const isNumTarget = (num === guess);\\n        if (isNumTarget) return mid;\\n\\n        const isNumGreater = (guess < num);\\n        if (isNumGreater) left = (mid + 1);\\n\\n        const isNumLess = (num < guess);\\n        if (isNumLess) right = mid;\\n    }\\n\\n    return left;\\n};"'
    }
  },
  {
    title: 'Combination Sum',
    difficulty: 'Medium',
    category: 'Backtracking',
    tags: ['Backtracking'],
    companies: ['Adobe', 'AirBnB', 'eBay', 'Reddit', 'Walmart', 'LinkedIn'],
    leetcode_link: 'https://leetcode.com/problems/combination-sum/',
    description:
      '"Given an array of **distinct** integers `candidates` and a `target` integer target, return a list of all ***unique combinations*** of `candidates` *where the chosen numbers sum to* `target`. You may return the combinations in **any order**.\\n\\nThe **same** number may be chosen from `candidates` **an unlimited number of times**. Two combinations are unique if the\\n***frequency*** of at least one of the chosen numbers is different.\\n\\nThe test cases are generated such that the number of unique combinations that sum up to `target` is less than `150` combinations for the given input.\\n\\n<br/>\\n\\n**Example 1:**\\n\\n```\\nInput: candidates = [2,3,6,7], target = 7\\nOutput: [[2,2,3],[7]]\\nExplanation:\\n2 and 3 are candidates, and 2 + 2 + 3 = 7. Note that 2 can be used multiple times.\\n7 is a candidate, and 7 = 7.\\nThese are the only two combinations.\\n```\\n\\n**Example 2:**\\n\\n```\\nInput: candidates = [2,3,5], target = 8\\nOutput: [[2,2,2,2],[2,3,3],[3,5]]\\n```\\n\\n**Example 3:**\\n\\n```\\nInput: candidates = [2], target = 1\\nOutput: []\\n```\\n\\n<br/>\\n\\n**Constraints:**\\n\\n•&emsp;`1 <= candidates.length <= 30`\\n\\n•&emsp;`2 <= candidates[i] <= 40`\\n\\n•&emsp;All elements of `candidates` are distinct.\\n\\n•&emsp;`1 <= target <= 40`"',
    solution_link: 'https://www.youtube.com/watch?v=GBKI9VSKdGg',
    list_names: ['Blind 75', 'NeetCode 150', 'NeetCode All'],
    prompts: {
      python:
        '"class Solution:\\n    def combinationSum(self, candidates: List[int], target: int) -> List[List[int]]:"',
      javascript:
        '"/**\\n * @param {number[]} candidates\\n * @param {number} target\\n * @return {number[][]}\\n */\\nvar combinationSum = function(candidates, target) {\\n    \\n};"'
    },
    solution_codes: {
      python:
        '"class Solution:\\n    def combinationSum(self, candidates: List[int], target: int) -> List[List[int]]:\\n        res = []\\n\\n        def dfs(i, cur, total):\\n            if total == target:\\n                res.append(cur.copy())\\n                return\\n            if i >= len(candidates) or total > target:\\n                return\\n\\n            cur.append(candidates[i])\\n            dfs(i, cur, total + candidates[i])\\n            cur.pop()\\n            dfs(i + 1, cur, total)\\n\\n        dfs(0, [], 0)\\n        return res"',
      javascript:
        '"/**\\n * https://leetcode.com/problems/combination-sum/\\n * Time O(N * ((Target/MIN) + 1)) | Space O(N * (Target/Min))\\n * @param {number[]} candidates\\n * @param {number} target\\n * @return {number[][]}\\n */\\n var combinationSum = function (candidates, target, index = 0, combination = [], combinations = []) {\\n    const isBaseCase = target < 0;\\n    if (isBaseCase) return combinations;\\n\\n    const isTarget = target === 0;\\n    if (isTarget) return combinations.push(combination.slice());\\n\\n    for (let i = index; i < candidates.length; i++) {\\n        backTrack(candidates, target, i, combination, combinations);\\n    }\\n\\n    return combinations;\\n}\\n\\nconst backTrack = (candidates, target, i, combination, combinations) => {\\n    combination.push(candidates[i]);\\n        combinationSum(candidates, (target - candidates[i]), i, combination, combinations);\\n    combination.pop();\\n};"'
    }
  },
  {
    title: 'House Robber',
    difficulty: 'Medium',
    category: 'Dynamic Programming',
    tags: ['Dynamic Programming', 'Backtracking'],
    companies: ['Amazon', 'Bloomberg', 'Cisco', 'Walmart'],
    leetcode_link: 'https://leetcode.com/problems/house-robber/',
    description:
      '"You are a professional robber planning to rob houses along a street. Each house has a certain amount of money stashed, the only constraint stopping you from robbing each of them is that adjacent houses have security systems connected and **it will automatically contact the police if two adjacent houses were broken into on the same night**.\\n\\nGiven an integer array `nums` representing the amount of money of each house, return the *maximum amount of money you can rob tonight* ***without alerting the police***.\\n\\n<br/>\\n\\n**Example 1:**\\n\\n```\\nInput: nums = [1,2,3,1]\\nOutput: 4\\nExplanation: Rob house 1 (money = 1) and then rob house 3 (money = 3).\\nTotal amount you can rob = 1 + 3 = 4.\\n```\\n\\n**Example 2:**\\n\\n```\\nInput: nums = [2,7,9,3,1]\\nOutput: 12\\nExplanation: Rob house 1 (money = 2), rob house 3 (money = 9) and rob house 5 (money = 1).\\nTotal amount you can rob = 2 + 9 + 1 = 12.\\n```\\n\\n<br/>\\n\\n**Constraints:**\\n\\n•&emsp;`1 <= nums.length <= 100`\\n\\n•&emsp;`0 <= nums[i] <= 400`"',
    solution_link: 'https://www.youtube.com/watch?v=73r3KWiEvyk',
    list_names: ['Blind 75', 'NeetCode 150', 'NeetCode All'],
    prompts: {
      python: '"class Solution:\\n    def rob(self, nums: List[int]) -> int:"',
      javascript:
        '"/**\\n * @param {number[]} nums\\n * @return {number}\\n */\\nvar rob = function(nums) {\\n    \\n};"'
    },
    solution_codes: {
      python:
        '"class Solution:\\n    def rob(self, nums: List[int]) -> int:\\n        rob1, rob2 = 0, 0\\n\\n        for n in nums:\\n            temp = max(n + rob1, rob2)\\n            rob1 = rob2\\n            rob2 = temp\\n        return rob2"',
      javascript:
        '"/**\\n * Brute Force - DFS\\n * Time O(2^N) | Space O(N)\\n * https://leetcode.com/problems/house-robber/\\n * @param {number[]} nums\\n * @return {number}\\n */\\nvar rob = (nums, i = 0) => {\\n    const isBaseCase = nums <= i;\\n    if (isBaseCase) return 0;\\n\\n    const [ next, nextNext ] = [ (i + 1), (i + 2) ];\\n    const right = nums[i];\\n    const mid = rob(nums, next);     /* Time O(2^N) | Space O(N) */\\n    const left = rob(nums, nextNext);/* Time O(2^N) | Space O(N) */\\n    const house = left + right;\\n\\n    return Math.max(house, mid);\\n};\\n\\n/**\\n * DP - Top Down\\n * Array - Memoization\\n * Time O(N) | Space O(N)\\n * https://leetcode.com/problems/house-robber/\\n * @param {number[]} nums\\n * @return {number}\\n */\\nvar rob = (nums, i = 0, memo = initMemo(nums)) => {\\n    const isBaseCase = nums.length <= i;\\n    if (isBaseCase) return 0;\\n\\n    const hasSeen = 0 <= memo[i];\\n    if (hasSeen) return memo[i];\\n\\n    const [ next, nextNext ] = [ (i + 1), (i + 2) ];\\n    const right = nums[i];\\n    const mid = rob(nums, next, memo);     /* Time O(N) | Space O(N) */\\n    const left = rob(nums, nextNext, memo);/* Time O(N) | Space O(N) */\\n    const house = left + right;\\n\\n    memo[i] = Math.max(mid, house);        /*           | Space O(N) */\\n\\n    return memo[i];\\n};\\n\\nconst initMemo = (nums) => Array(nums.length + 1).fill(-1);\\n\\n/**\\n * DP - Bottom Up\\n * Array - Tabulation\\n * Time O(N) | Space O(N)\\n * https://leetcode.com/problems/house-robber/\\n * @param {number[]} nums\\n * @return {number}\\n */\\nvar rob = (nums) => {\\n    if (!nums.length) return 0;\\n\\n    const tabu = initTabu(nums);\\n\\n    for (let i = 1; i < nums.length; i++) {/* Time O(N) */\\n        const right = nums[i];\\n        const mid = tabu[i];\\n        const left = tabu[i - 1];\\n        const house = left + right;\\n\\n        tabu[i + 1] = Math.max(mid, house);       /* Space O(N) */\\n    }\\n\\n    return tabu[nums.length]\\n};\\n\\nconst initTabu = (nums) => {\\n    const tabu = Array(nums.length + 1).fill(0);\\n\\n    tabu[1] = nums[0];\\n\\n    return tabu;\\n}\\n\\n/**\\n * DP - Bottom Up\\n * Time O(N) | Space O(1)\\n * https://leetcode.com/problems/house-robber/\\n * @param {number[]} nums\\n * @return {number}\\n */\\nvar rob = (nums) => {\\n    if (!nums.length) return 0;\\n\\n    let [ left, mid ] = [ 0, 0 ];\\n\\n    for (const right of nums) {/* Time O(N) */\\n        const temp = mid;\\n        const house = left + right;\\n\\n        mid = Math.max(mid, house);\\n        left = temp;\\n    }\\n\\n    return mid;\\n};"'
    }
  },
  {
    title: 'House Robber II',
    difficulty: 'Medium',
    category: 'Dynamic Programming',
    tags: ['Dynamic Programming'],
    companies: [
      'Bloomberg',
      'Adobe',
      'Amazon',
      'Microsoft',
      'Google',
      'TikTok'
    ],
    leetcode_link: 'https://leetcode.com/problems/house-robber-ii/',
    description:
      '"You are a professional robber planning to rob houses along a street. Each house has a certain amount of money stashed. All houses at this place are **arranged in a circle**. That means the first house is the neighbor of the last one. Meanwhile, adjacent houses have a security system connected, and **it will automatically contact the police if two adjacent houses were broken into on the same night**.\\n\\nGiven an integer array `nums` representing the amount of money of each house, return *the maximum amount of money you can rob tonight* ***without alerting the police***.\\n\\n<br />\\n\\n**Example 1:**\\n\\n```\\nInput: nums = [2,3,2]\\nOutput: 3\\nExplanation: You cannot rob house 1 (money = 2) and then rob house 3 (money = 2), because they are adjacent houses.\\n```\\n\\n**Example 2:**\\n\\n```\\nInput: nums = [1,2,3,1]\\nOutput: 4\\nExplanation: Rob house 1 (money = 1) and then rob house 3 (money = 3).\\nTotal amount you can rob = 1 + 3 = 4.\\n```\\n\\n**Example 3:**\\n\\n```\\nInput: nums = [1,2,3]\\nOutput: 3\\n```\\n\\n<br />\\n\\n**Constraints:**\\n\\n• `1 <= nums.length <= 100`\\n\\n• `0 <= nums[i] <= 1000`\\n"',
    solution_link: 'https://www.youtube.com/watch?v=rWAJCfYYOvM',
    list_names: ['Blind 75', 'NeetCode 150', 'NeetCode All'],
    prompts: {
      python: '"class Solution:\\n    def rob(self, nums: List[int]) -> int:"',
      javascript:
        '"/**\\n * @param {number[]} nums\\n * @return {number}\\n */\\nvar rob = function(nums) {\\n    \\n};"'
    },
    solution_codes: {
      python:
        '"class Solution:\\n    def rob(self, nums: List[int]) -> int:\\n        return max(nums[0], self.helper(nums[1:]), self.helper(nums[:-1]))\\n\\n    def helper(self, nums):\\n        rob1, rob2 = 0, 0\\n\\n        for n in nums:\\n            newRob = max(rob1 + n, rob2)\\n            rob1 = rob2\\n            rob2 = newRob\\n        return rob2"',
      javascript:
        '"/**\\n * Greedy - Max\\n * Time O(N) | Space O(1)\\n * https://leetcode.com/problems/house-robber-ii/\\n * @param {number[]} nums\\n * @return {number}\\n */\\nvar rob = (nums) => {\\n    const isBaseCase1 = (nums.length === 0);\\n    if (isBaseCase1) return 0;\\n\\n    const isBaseCase2 = (nums.length === 1);\\n    if (isBaseCase2) return nums[0]\\n\\n    const left = search(nums, 0, (nums.length - 2)); /* Time O(N) */\\n    const right = search(nums, 1, (nums.length - 1));/* Time O(N) */\\n\\n    return Math.max(left, right);\\n};\\n\\nconst search = (nums, start, end) => {\\n    let [ left, mid ] = [ 0, 0 ];\\n\\n    for (let i = start; i <= end; i++) {/* Time O(N) */\\n        const temp = mid;\\n        const right = nums[i];\\n        const house = left + right;\\n\\n        mid = Math.max(mid, house);\\n        left = temp;\\n    }\\n\\n    return mid;\\n};"'
    }
  },
  {
    title: 'Unique Paths',
    difficulty: 'Medium',
    category: 'Dynamic Programming',
    tags: ['Dynamic Programming', 'Backtracking'],
    companies: ['Amazon', 'Google', 'Infosys', 'Apple'],
    leetcode_link: 'https://leetcode.com/problems/unique-paths/',
    description:
      '"There is a robot on an `m x n` grid. The robot is initially located at the **top-left corner** (i.e., `grid[0][0]`). The robot tries to move to the **bottom-right corner** (i.e., `grid[m - 1][n - 1]`). The robot can only move either down or right at any point in time.\\n\\nGiven the two integers m and n, return *the number of possible unique paths that the robot can take to reach the bottom-right corner*.\\n\\nThe test cases are generated so that the answer will be less than or equal to `2 * 10^9`.\\n\\n<br/>\\n\\n**Example 1:**\\n\\n![image](https://assets.leetcode.com/uploads/2018/10/22/robot_maze.png)\\n\\n```\\nInput: m = 3, n = 7\\nOutput: 28\\n```\\n\\n**Example 2:**\\n\\n```\\nInput: m = 3, n = 2\\nOutput: 3\\nExplanation: From the top-left corner, there are a total of 3 ways to reach the bottom-right corner:\\n1. Right -> Down -> Down\\n2. Down -> Down -> Right\\n3. Down -> Right -> Down\\n```\\n\\n<br/>\\n\\n**Constraints:**\\n\\n•&emsp;`1 <= m, n <= 100`"',
    solution_link: 'https://www.youtube.com/watch?v=IlEsdxuD4lY',
    list_names: ['Blind 75', 'NeetCode 150', 'NeetCode All'],
    prompts: {
      python:
        '"class Solution:\\n    def uniquePaths(self, m: int, n: int) -> int:"',
      javascript:
        '"/**\\n * @param {number} m\\n * @param {number} n\\n * @return {number}\\n */\\nvar uniquePaths = function(m, n) {\\n    \\n};"'
    },
    solution_codes: {
      python:
        '"class Solution:\\n    def uniquePaths(self, m: int, n: int) -> int:\\n        row = [1] * n\\n\\n        for i in range(m - 1):\\n            newRow = [1] * n\\n            for j in range(n - 2, -1, -1):\\n                newRow[j] = newRow[j + 1] + row[j]\\n            row = newRow\\n        return row[0]\\n\\n        # O(n * m) O(n)"',
      javascript:
        '"/**\\n * Brute Force - DFS\\n * Time O(2^N) | Space O(HEIGHT)\\n * https://leetcode.com/problems/unique-paths/\\n * @param {number} m\\n * @param {number} n\\n * @return {number}\\n */\\n var uniquePaths = (row, col) => {\\n    const isBaseCase = ((row == 1) || (col == 1));\\n    if (isBaseCase) return 1;\\n\\n    return dfs(row, col);/* Time O(2^N) | Space O(HEIGHT) */\\n}\\n\\nvar dfs = (row, col) => {\\n    const left = uniquePaths((row - 1), col); /* Time O(2^N) | Space O(HEIGHT) */\\n    const right = uniquePaths(row, (col - 1));/* Time O(2^N) | Space O(HEIGHT) */\\n\\n    return (left + right);\\n}\\n\\n/**\\n * DP - Top Down\\n * Matrix - Memoization\\n * Time O(ROWS * COLS) | Space O(ROWS * COLS)\\n * https://leetcode.com/problems/unique-paths/\\n * @param {number} m\\n * @param {number} n\\n * @return {number}\\n */\\nvar uniquePaths = (row, col, memo = getMemo(row, col)) => {\\n    const isBaseCase = ((row === 1) || (col === 1));\\n    if (isBaseCase) return 1;\\n\\n    const hasSeen = (memo[row][col] !== 0);\\n    if (hasSeen) return memo[row][col];\\n\\n    return dfs(row, col, memo);/* Time O(ROWS * COLS) | Space O((ROWS * COLS) + HEIGHT) */\\n};\\n\\nvar getMemo = (row, col) => new Array((row + 1)).fill()/* Time O(ROWS)| Space O(ROWS) */\\n    .map(() => new Array((col + 1)).fill(0));                /* Time O(COLS)| Space O(COLS) */\\n\\nvar dfs = (row, col, memo) => {\\n    const left = uniquePaths((row - 1), col, memo); /* Time O(ROWS * COLS) | Space O(HEIGHT) */\\n    const right = uniquePaths(row, (col - 1), memo);/* Time O(ROWS * COLS) | Space O(HEIGHT) */\\n\\n    memo[row][col] = (left + right);                /*                     | Space O(ROWS * COLS) */\\n    return memo[row][col];\\n}\\n\\n/**\\n * DP - Bottom Up\\n * Matrix - Tabulation\\n * Time O(ROWS * COLS) | Space O(ROWS * COLS)\\n * https://leetcode.com/problems/unique-paths/\\n * @param {number} row\\n * @param {number} col\\n * @return {number}\\n */\\nvar uniquePaths = (row, col) => {\\n    const tabu = initTabu(row, col);/* Time O(ROWS * COLS) | Space O(ROWS * COLS) */\\n\\n    search(row, col, tabu);         /* Time O(ROWS * COLS) | Space O(ROWS * COLS) */\\n\\n    return tabu[row - 1][col - 1];\\n};\\n\\nvar search = (row, col, tabu) => {\\n    for (let _row = 1; (_row < row); _row++) {/* Time O(ROWS)*/\\n        for (let _col = 1; (_col < col); _col++) {/* Time O(COLS)*/\\n            const left = (tabu[(_row - 1)][_col])\\n            const right = (tabu[_row][(_col - 1)]);\\n\\n            tabu[_row][_col] = (left + right);        /* Space O(ROWS * COLS) */\\n        }\\n    }\\n}\\n\\nvar initTabu = (row, col) => {\\n    const tabu = new Array(row).fill()        /* Time O(ROWS)     | Space O(ROWS) */ \\n        .map(() => new Array(col).fill(0));       /* Time O(COLS) | Space O(COLS) */ \\n    \\n    for (let _row = 0; (_row < row); _row++) {/* Time O(ROWS) */ \\n        tabu[_row][0] = 1;                        /*              | Space O(ROWS * COLS) */ \\n    }\\n\\n    for (let _col = 0; (_col < col); _col++) {/* Time O(COLS) */ \\n        tabu[0][_col] = 1;                        /*              | Space O(ROWS * COLS) */ \\n    }\\n\\n    return tabu;\\n}\\n\\n/**\\n * DP - Bottom Up\\n * Array - Tabulation\\n * Time O(ROWS * COLS) | Space O(COLS)\\n * https://leetcode.com/problems/unique-paths/\\n * @param {number} m\\n * @param {number} n\\n * @return {number}\\n */\\nvar uniquePaths = (row, col) => {\\n    const tabu = initTabu(col);/* Time O(COLS)        | Space O(COLS) */ \\n\\n    search(row, col, tabu);    /* Time O(ROWS * COLS) | Space O(COLS) */ \\n\\n    return tabu[(col - 1)];\\n};\\n\\nvar initTabu = (col) => new Array(col).fill(1); /* Time O(COLS) | Space O(COLS) */ \\n\\nvar search = (row, col, tabu) => {\\n    for (let _row = 1; (_row < row); _row++) {/* Time O(ROWS) */ \\n        for (let _col = 1; (_col < col); _col++) {/* Time O(COLS) */ \\n            const prev = tabu[(_col - 1)];\\n\\n            tabu[_col] += prev;                     /* Space O(COLS) */ \\n        }\\n    }\\n};"'
    }
  },
  {
    title: 'Jump Game',
    difficulty: 'Medium',
    category: 'Greedy',
    tags: ['Greedy', 'Backtracking', 'Dynamic Programming'],
    companies: ['Amazon', 'Microsoft', 'Walmart', 'Apple'],
    leetcode_link: 'https://leetcode.com/problems/jump-game/',
    description:
      '"You are given an integer array `nums`. You are initially positioned at the array\'s **first index**, and each element in the array represents your maximum jump length at that position.\\n\\nReturn `true` *if you can reach the last index, or* `false` *otherwise*.\\n\\n<br/>\\n\\n**Example 1:**\\n\\n```\\nInput: nums = [2,3,1,1,4]\\nOutput: true\\nExplanation: Jump 1 step from index 0 to 1, then 3 steps to the last index.\\n```\\n\\n**Example 2:**\\n\\n```\\nInput: nums = [3,2,1,0,4]\\nOutput: false\\nExplanation: You will always arrive at index 3 no matter what. Its maximum jump length is 0, which makes it impossible to reach the last index.\\n```\\n\\n<br/>\\n\\n**Constraints:**\\n\\n•&emsp;`1 <= nums.length <= 10^4`\\n\\n•&emsp;`0 <= nums[i] <= 10^5`"',
    solution_link: 'https://www.youtube.com/watch?v=Yan0cv2cLy8',
    list_names: ['Blind 75', 'NeetCode 150', 'NeetCode All'],
    prompts: {
      python:
        '"class Solution:\\n    def canJump(self, nums: List[int]) -> bool:"',
      javascript:
        '"/**\\n * @param {number[]} nums\\n * @return {boolean}\\n */\\nvar canJump = function(nums) {\\n    \\n};"'
    },
    solution_codes: {
      python:
        '"class Solution:\\n    def canJump(self, nums: List[int]) -> bool:\\n        goal = len(nums) - 1\\n\\n        for i in range(len(nums) - 2, -1, -1):\\n            if i + nums[i] >= goal:\\n                goal = i\\n        return goal == 0"',
      javascript:
        '"/**\\n * Time O(2^N) | Space O(N)\\n * @param {number[]} nums\\n * @return {boolean}\\n */\\n var canJump = (nums, index = 0) => {\\n    const isBaseCase = index === nums.length - 1;\\n    if (isBaseCase) return true;\\n\\n    const furthestJump = Math.min(index + nums[index], (nums.length - 1));\\n    for (let nextIndex = (index + 1); nextIndex <= furthestJump; nextIndex++) {\\n        if (canJump(nums, nextIndex)) return true;\\n    }\\n\\n    return false;\\n}\\n\\n/**\\n * Time O(N^2) | Space O(N)\\n * @param {number[]} nums\\n * @return {boolean}\\n */\\nvar canJump = (nums) => {\\n    const memo = new Array(nums.length).fill(0);\\n    memo[memo.length - 1] = 1;\\n    \\n    return canJumpFromIndex(nums, memo);\\n}\\n\\nconst canJumpFromIndex = (nums, memo, index = 0) => {\\n    if (memo[index] !== 0) return memo[index] === 1;\\n\\n    const furthestJump = Math.min(index + nums[index], nums.length - 1);\\n    for (let nextIndex = (index + 1); nextIndex <= furthestJump; nextIndex++) {\\n        if (!canJumpFromIndex(nums, memo, nextIndex)) continue\\n\\n        memo[index] = 1;\\n        return true;\\n    }\\n\\n    memo[index] = -1;\\n    return false;\\n}\\n\\n/**\\n * Time O(N^2) | Space O(N)\\n * @param {number[]} nums\\n * @return {boolean}\\n */\\nvar canJump = (nums) => {\\n    const memo = new Array(nums.length).fill(0)\\n    memo[memo.length - 1] = 1;\\n\\n    for (let i = (nums.length - 2); 0 <= i; i--) {\\n        const furthestJump = Math.min(i + nums[i], nums.length - 1);\\n        for (let j = (i + 1); j <= furthestJump; j++) {\\n            const isGood = memo[j] === 1\\n            if (isGood) { memo[i] = 1; break; }\\n        }\\n    }\\n\\n    return memo[0] === 1;\\n}\\n\\n/**\\n * Time O(N) | Space O(1)\\n * @param {number[]} nums\\n * @return {boolean}\\n */\\nvar canJump = (nums, max = 0, index = 0) => {\\n    while (index < nums.length) {\\n        const num = nums[index]\\n        const jumps = num + index\\n        \\n        const canNotReachEnd = max < index\\n        if (canNotReachEnd) return false\\n        \\n        max = Math.max(max, jumps)\\n        index++\\n    }\\n\\n    return true\\n}\\n\\n/**\\n * Time O(N) | Space O(1)\\n * @param {number[]} nums\\n * @return {boolean}\\n */\\nvar canJump = (nums, right = nums.length - 1) => {\\n    for (let i = right; 0 <= i; i--) {\\n        const isJumpable = right <= (i + nums[i])\\n        if (isJumpable) right = i;\\n    }\\n\\n    return right === 0;\\n};"'
    }
  },
  {
    title: 'Clone Graph',
    difficulty: 'Medium',
    category: 'Depth-First Search',
    tags: ['Graph', 'Depth-First Search', 'Breath-First Search'],
    companies: ['Facebook (Meta)', 'Amazon', 'Apple', 'Bloomberg'],
    leetcode_link: 'https://leetcode.com/problems/clone-graph/',
    description:
      "\"Given a reference of a node in a **connected** undirected graph.\\n\\nReturn a **deep copy** (clone) of the graph.\\n\\nEach node in the graph contains a value (`int`) and a list (`List[Node]`) of its neighbors.\\n\\n```\\nclass Node {\\n    public int val;\\n    public List<Node> neighbors;\\n}\\n```\\n\\n<br/>\\n\\n**Test case format:**\\n\\nFor simplicity, each node's value is the same as the node's index (1-indexed). For example, the first node with `val == 1`, the second node with `val == 2`, and so on. The graph is represented in the test case using an adjacency list.\\n\\nAn **adjacency list** is a collection of unordered **lists** used to represent a finite graph. Each list describes the set of neighbors of a node in the graph.\\n\\nThe given node will always be the first node with `val = 1`. You must return the **copy of the given node** as a reference to the cloned graph.\\n\\n<br/>\\n\\n**Example 1:**\\n\\n![image](https://assets.leetcode.com/uploads/2019/11/04/133_clone_graph_question.png)\\n\\n```\\nInput: adjList = [[2,4],[1,3],[2,4],[1,3]]\\nOutput: [[2,4],[1,3],[2,4],[1,3]]\\nExplanation: There are 4 nodes in the graph.\\n1st node (val = 1)'s neighbors are 2nd node (val = 2) and 4th node (val = 4).\\n2nd node (val = 2)'s neighbors are 1st node (val = 1) and 3rd node (val = 3).\\n3rd node (val = 3)'s neighbors are 2nd node (val = 2) and 4th node (val = 4).\\n4th node (val = 4)'s neighbors are 1st node (val = 1) and 3rd node (val = 3).\\n```\\n\\n**Example 2:**\\n\\n![image](https://assets.leetcode.com/uploads/2020/01/07/graph.png)\\n\\n```\\nInput: adjList = [[]]\\nOutput: [[]]\\nExplanation: Note that the input contains one empty list. The graph consists of only one node with val = 1 and it does not have any neighbors.\\n```\\n\\n**Example 3:**\\n\\n```\\nInput: adjList = []\\nOutput: []\\nExplanation: This an empty graph, it does not have any nodes.\\n```\\n\\n<br/>\\n\\n**Constraints:**\\n\\n•&emsp;The number of nodes in the graph is in the range<br/>&ensp;&emsp;`[0, 100]`.\\n\\n•&emsp;`1 <= Node.val <= 100`\\n\\n•&emsp;`Node.val` is unique for each node.\\n\\n•&emsp;There are no repeated edges and no self-loops in the <br/> &ensp;&emsp;graph.\\n\\n•&emsp;The Graph is connected and all nodes can be visited<br/>\\n&ensp;&emsp;starting from the given node.\"",
    solution_link: 'https://www.youtube.com/watch?v=mQeF6bN8hMk',
    list_names: ['Blind 75', 'NeetCode 150', 'NeetCode All'],
    prompts: {
      python:
        '"\\"\\"\\"\\n# Definition for a Node.\\nclass Node:\\n    def __init__(self, val = 0, neighbors = None):\\n        self.val = val\\n        self.neighbors = neighbors if neighbors is not None else []\\n\\"\\"\\"\\n\\nclass Solution:\\n    def cloneGraph(self, node: \'Node\') -> \'Node\':"',
      javascript:
        '"/**\\n * // Definition for a Node.\\n * function Node(val, neighbors) {\\n *    this.val = val === undefined ? 0 : val;\\n *    this.neighbors = neighbors === undefined ? [] : neighbors;\\n * };\\n */\\n\\n/**\\n * @param {Node} node\\n * @return {Node}\\n */\\nvar cloneGraph = function(node) {\\n    \\n};"'
    },
    solution_codes: {
      python:
        '"class Solution:\\n    def cloneGraph(self, node: \\"Node\\") -> \\"Node\\":\\n        oldToNew = {}\\n\\n        def dfs(node):\\n            if node in oldToNew:\\n                return oldToNew[node]\\n\\n            copy = Node(node.val)\\n            oldToNew[node] = copy\\n            for nei in node.neighbors:\\n                copy.neighbors.append(dfs(nei))\\n            return copy\\n\\n        return dfs(node) if node else None"',
      javascript:
        '"/**\\n * https://leetcode.com/problems/clone-graph/\\n * Time O(V + E) | Space O(N)\\n * @param {Node} node\\n * @return {Node}\\n */\\nvar cloneGraph = function(node, seen = new Map()) {\\n    const isBaseCase = node === null;\\n    if (isBaseCase) return null;\\n\\n    if (seen.has(node)) return seen.get(node);\\n\\n    return dfs(node, seen);                              /* Time O(V + E) | Space O(N) */\\n}\\n\\nconst dfs = (node, seen) => {\\n    const clone = new Node(node.val);\\n\\n    seen.set(node, clone);                               /*               | Space O(N) */\\n\\n    for (const neighbor of node.neighbors) {\\n        const cloneNeighbor = cloneGraph(neighbor, seen);/* Time O(V + E) | Space O(H) */\\n\\n        clone.neighbors.push(cloneNeighbor);             /*               | Space O(V + E) */\\n    }\\n\\n    return clone;\\n}\\n\\n/**\\n * https://leetcode.com/problems/clone-graph/\\n * Time O(V + E) | Space O(N)\\n * @param {Node} node\\n * @return {Node}\\n */\\n var cloneGraph = function(node, seen = new Map()) {\\n    const isBaseCase = node === null;\\n    if (isBaseCase) return null;\\n\\n    seen.set(node, new Node(node.val));                /*               | Space O(N) */\\n\\n    bfs(new Queue([ node ]), seen);                    /* Time O(V + E) | Space O(N) */\\n\\n    return seen.get(node);\\n};\\n\\nconst bfs = (queue, seen) => {\\n    while (!queue.isEmpty()) {                         /* Time O(V + E) */\\n        for (let i = (queue.size() - 1); 0 <= i; i--) {/* Time O(W) */\\n            const node = queue.dequeue();\\n\\n            cloneNeighbors(node, seen, queue);         /* Space O(N) */ \\n        }\\n    }\\n}\\n\\nconst cloneNeighbors = (node, seen, queue) => {\\n    for (const neighbor of node.neighbors) {\\n        if (!seen.has(neighbor)) {\\n            seen.set(neighbor, new Node(neighbor.val));/* Space O(N) */\\n            queue.enqueue(neighbor);                   /* Space O(W) */\\n        }\\n\\n        const [ parentClone, neighborClone ] = [ seen.get(node), seen.get(neighbor) ];\\n\\n        parentClone.neighbors.push(neighborClone);     /* Space O(V + E) */\\n    }\\n};"'
    }
  },
  {
    title: 'Course Schedule',
    difficulty: 'Medium',
    category: 'Graph',
    tags: [
      'Graph',
      'Depth-First Search',
      'Breath-First Search',
      'Topological Sort'
    ],
    companies: ['Amazon', 'Google', 'TikTok'],
    leetcode_link: 'https://leetcode.com/problems/course-schedule',
    description:
      '"There are a total of `numCourses` courses you have to take, labeled from `0` to `numCourses - 1`. You are given an array `prerequisites` where `prerequisites[i] = [ai, bi]` indicates that you must take course bi first if you want to take course `ai`.\\n\\n• For example, the pair `[0, 1]`, indicates that to take <br />  course `0` you have to first take course `1`.\\n\\nReturn `true` if you can finish all courses. Otherwise, return `false`.\\n\\n<br />\\n\\n**Example 1:**\\n\\n```\\nInput: numCourses = 2, prerequisites = [[1,0]]\\nOutput: true\\nExplanation: There are a total of 2 courses to take.\\nTo take course 1 you should have finished course 0. So it is possible.\\n```\\n\\n**Example 2:**\\n\\n```\\nInput: numCourses = 2, prerequisites = [[1,0],[0,1]]\\nOutput: false\\nExplanation: There are a total of 2 courses to take.\\nTo take course 1 you should have finished course 0, and to take course 0 you should also have finished course 1. So it is impossible.\\n```\\n\\n<br />\\n\\n**Constraints:**\\n\\n• `1 <= numCourses <= 2000`\\n\\n• `0 <= prerequisites.length <= 5000`\\n\\n• `prerequisites[i].length == 2`\\n\\n• `0 <= ai, bi < numCourses`\\n\\n• All the pairs prerequisites[i] are **unique**."',
    solution_link: 'https://www.youtube.com/watch?v=EgI5nU9etnU',
    list_names: ['Blind 75', 'NeetCode 150', 'NeetCode All'],
    prompts: {
      python:
        '"class Solution:\\n    def canFinish(self, numCourses: int, prerequisites: List[List[int]]) -> bool:"',
      javascript:
        '"/**\\n * @param {number} numCourses\\n * @param {number[][]} prerequisites\\n * @return {boolean}\\n */\\nvar canFinish = function(numCourses, prerequisites) {\\n    \\n};"'
    },
    solution_codes: {
      python:
        '"class Solution:\\n    def canFinish(self, numCourses: int, prerequisites: List[List[int]]) -> bool:\\n        # dfs\\n        preMap = {i: [] for i in range(numCourses)}\\n\\n        # map each course to : prereq list\\n        for crs, pre in prerequisites:\\n            preMap[crs].append(pre)\\n\\n        visiting = set()\\n\\n        def dfs(crs):\\n            if crs in visiting:\\n                return False\\n            if preMap[crs] == []:\\n                return True\\n\\n            visiting.add(crs)\\n            for pre in preMap[crs]:\\n                if not dfs(pre):\\n                    return False\\n            visiting.remove(crs)\\n            preMap[crs] = []\\n            return True\\n\\n        for c in range(numCourses):\\n            if not dfs(c):\\n                return False\\n        return True"',
      javascript:
        '"/**\\n * https://leetcode.com/problems/course-schedule/\\n * Time O((V)^2 + E) | Space O(V + E)\\n * @param {number} numCourses\\n * @param {number[][]} prerequisites\\n * @return {boolean}\\n */\\nvar canFinish = function(numCourses, prerequisites) {\\n    const { graph, path } = buildGraph(numCourses, prerequisites);\\n\\n    return hasPath(numCourses, graph, path);\\n}\\n\\nvar initGraph = (numCourses) => ({\\n    graph: new Array(numCourses).fill().map(() => []),\\n    path: new Array(numCourses).fill(false)\\n})\\n\\nvar buildGraph = (numCourses, prerequisites) => {\\n    const { graph, path } = initGraph(numCourses);\\n\\n    for (const [ src, dst ] of prerequisites) {\\n        const neighbors = (graph[dst] || []);\\n\\n        neighbors.push(src);\\n\\n        graph[dst] = neighbors;\\n    }\\n\\n    return { graph, path };\\n}\\n\\nvar hasPath = (numCourses, graph, path) => {\\n    for (let course = 0; course < numCourses; course++) {\\n        if (isCyclic(course, graph, path)) return false;\\n    }\\n\\n    return true;\\n}\\n\\nvar isCyclic = (currCourse, graph, path) => {\\n    const hasSeen = path[currCourse]\\n    if (hasSeen) return true\\n\\n    const isMissingNext = !(currCourse in graph)\\n    if (isMissingNext) return false;\\n\\n    return backTrack(currCourse, graph, path);\\n}\\n\\nvar backTrack = (currCourse, graph, path) => {\\n    path[currCourse] = true;\\n        const _hasCycle = hasCycle(currCourse, graph, path)\\n    path[currCourse] = false;\\n\\n    return _hasCycle\\n}\\n\\nvar hasCycle = (currCourse, graph, path) => {\\n    for (const neighbor of graph[currCourse]) {\\n        if (isCyclic(neighbor, graph, path)) return true;\\n    }\\n\\n    return false\\n}\\n\\n/**\\n * https://leetcode.com/problems/course-schedule/\\n * Time O(V + E) | Space O(V + E)\\n * @param {number} numCourses\\n * @param {number[][]} prerequisites\\n * @return {boolean}\\n */\\nvar canFinish = function(numCourses, prerequisites) {\\n    const { graph, visited, path }  = buildGraph(numCourses, prerequisites);\\n\\n    for (let currCourse = 0; currCourse < numCourses; currCourse++) {\\n        if (isCyclic(currCourse, graph, visited, path)) return false;\\n    }\\n\\n    return true;\\n}\\n\\nvar initGraph = (numCourses) => ({\\n    graph: new Array(numCourses).fill().map(() => []),\\n    visited: new Array(numCourses).fill(false),\\n    path: new Array(numCourses).fill(false)\\n})\\n\\nvar buildGraph = (numCourses, prerequisites) => {\\n    const { graph, visited, path } = initGraph(numCourses);\\n\\n    for (const [ src, dst ] of prerequisites) {\\n        const neighbors = (graph[dst] || []);\\n\\n        neighbors.push(src);\\n\\n        graph[dst] = neighbors;\\n    }\\n\\n    return { graph, visited, path };\\n}\\n\\nvar isCyclic = (currCourse, graph, visited, path) => {\\n    const isVisited = visited[currCourse]\\n    if (isVisited) return false;\\n\\n    const hasSeen = path[currCourse]\\n    if (hasSeen) return true;\\n\\n    const isMissingNext = !(currCourse in graph)\\n    if (isMissingNext) return false;\\n\\n    const _isCyclic = backTrack(currCourse, graph, visited, path);\\n\\n    visited[currCourse] = true;\\n\\n    return _isCyclic\\n}\\n\\nvar backTrack = (currCourse, graph, visited, path) => {\\n    path[currCourse] = true;\\n        const _hasCycle = hasCycle(currCourse, graph, visited, path)\\n    path[currCourse] = false;\\n\\n    return _hasCycle\\n}\\n\\nvar hasCycle = (currCourse, graph, visited, path) => {\\n    for (const neighbor of graph[currCourse]) {\\n        if (isCyclic(neighbor, graph, visited, path)) return true;\\n    }\\n\\n    return false\\n}\\n\\n/**\\n * https://leetcode.com/problems/course-schedule/\\n * Time O(V + E) | Space O(V + E)\\n * @param {number} numCourses\\n * @param {number[][]} prerequisites\\n * @return {boolean}\\n */\\nvar canFinish = function(numCourses, prerequisites) {\\n    const { graph, indegree } = buildGraph(numCourses, prerequisites);\\n    const topologicalOrder = topologicalSort(graph, indegree);\\n    const isDirectedAcyclicGraph = topologicalOrder.length === numCourses;\\n\\n    return isDirectedAcyclicGraph;\\n};\\n\\nvar initGraph = (numCourses) => ({\\n    graph: new Array(numCourses).fill().map(() => []),\\n    indegree: new Array(numCourses).fill(0)\\n})\\n\\nvar buildGraph = (numCourses, prerequisites) => {\\n    const { graph, indegree } = initGraph(numCourses);\\n\\n    for (const [ src, dst ] of prerequisites){\\n        graph[src].push(dst);\\n        indegree[dst]++;\\n    }\\n\\n    return { graph, indegree };\\n}\\n\\nvar topologicalSort = (graph, indegree, order = []) => {\\n    const queue = searchGraph(graph, indegree);\\n\\n    bfs(graph, indegree, queue, order);\\n\\n    return order;\\n}\\n\\nvar searchGraph = (graph, indegree, queue = new Queue([])) => {\\n    for (const node in graph) {\\n        const isSource = indegree[node] === 0;\\n        if (isSource) queue.enqueue(node);\\n    }\\n\\n    return queue;\\n}\\n\\nvar bfs = (graph, indegree, queue, order) => {\\n    while (!queue.isEmpty()) {\\n        for (let i = (queue.size() - 1); 0 <= i; i--) {\\n            checkNeighbors(graph, indegree, queue, order);\\n        }\\n    }\\n}\\n\\nvar checkNeighbors = (graph, indegree, queue, order) => {\\n    const node = queue.dequeue();\\n\\n    order.push(node);\\n\\n    for (const neighbor of graph[node]) {\\n        indegree[neighbor]--;\\n\\n        const isSource = indegree[neighbor] === 0;\\n        if (isSource) queue.enqueue(neighbor);\\n    }\\n};"'
    }
  },
  {
    title: 'Pacific Atlantic Water Flow',
    difficulty: 'Medium',
    category: 'Depth-First Search',
    tags: ['Breath-First Search', 'Depth-First Search'],
    companies: ['Google', 'Amazon', 'Microsoft'],
    leetcode_link: 'https://leetcode.com/problems/pacific-atlantic-water-flow/',
    description:
      "\"There is an `m x n` rectangular island that borders both the **Pacific Ocean** and **Atlantic Ocean**. The **Pacific Ocean** touches the island's left and top edges, and the **Atlantic Ocean** touches the island's right and bottom edges.\\n\\nThe island is partitioned into a grid of square cells. You are given an `m x n` integer matrix `heights` where `heights[r][c]` represents the **height above sea level** of the cell at coordinate `(r, c)`.\\n\\nThe island receives a lot of rain, and the rain water can flow to neighboring cells directly north, south, east, and west if the neighboring cell's height is **less than or equal** to the current cell's height. Water can flow from any cell adjacent to an ocean into the ocean.\\n\\nReturn a ***2D list*** *of grid coordinates* `result` *where* `result[i] = [ri, ci]` *denotes that rain water can flow from cell* `(ri, ci)` ***to both*** *the Pacific and Atlantic oceans*.\\n\\n<br/>\\n\\n**Example 1:**\\n\\n![image](https://assets.leetcode.com/uploads/2021/06/08/waterflow-grid.jpg)\\n\\n```\\nInput: heights = [[1,2,2,3,5],[3,2,3,4,4],[2,4,5,3,1],[6,7,1,4,5],[5,1,1,2,4]]\\nOutput: [[0,4],[1,3],[1,4],[2,2],[3,0],[3,1],[4,0]]\\nExplanation: The following cells can flow to the Pacific and Atlantic oceans, as shown below:\\n[0,4]: [0,4] -> Pacific Ocean\\n       [0,4] -> Atlantic Ocean\\n[1,3]: [1,3] -> [0,3] -> Pacific Ocean\\n       [1,3] -> [1,4] -> Atlantic Ocean\\n[1,4]: [1,4] -> [1,3] -> [0,3] -> Pacific Ocean\\n       [1,4] -> Atlantic Ocean\\n[2,2]: [2,2] -> [1,2] -> [0,2] -> Pacific Ocean\\n       [2,2] -> [2,3] -> [2,4] -> Atlantic Ocean\\n[3,0]: [3,0] -> Pacific Ocean\\n       [3,0] -> [4,0] -> Atlantic Ocean\\n[3,1]: [3,1] -> [3,0] -> Pacific Ocean\\n       [3,1] -> [4,1] -> Atlantic Ocean\\n[4,0]: [4,0] -> Pacific Ocean\\n       [4,0] -> Atlantic Ocean\\nNote that there are other possible paths for these cells to flow to the Pacific and Atlantic oceans.\\n```\\n\\n**Example 2:**\\n\\n```\\nInput: heights = [[1]]\\nOutput: [[0,0]]\\nExplanation: The water can flow from the only cell to the Pacific and Atlantic oceans.\\n```\\n<br/>\\n\\n**Constraints:**\\n\\n•&emsp;`m == heights.length`\\n\\n•&emsp;`n == heights[r].length`\\n\\n•&emsp;`1 <= m, n <= 200`\\n\\n•&emsp;`0 <= heights[r][c] <= 10^5`\"",
    solution_link: 'https://www.youtube.com/watch?v=s-VkcjHqkGI',
    list_names: ['Blind 75', 'NeetCode 150', 'NeetCode All'],
    prompts: {
      python:
        '"class Solution:\\n    def pacificAtlantic(self, heights: List[List[int]]) -> List[List[int]]:"',
      javascript:
        '"/**\\n * @param {number[][]} heights\\n * @return {number[][]}\\n */\\nvar pacificAtlantic = function(heights) {\\n    \\n};"'
    },
    solution_codes: {
      python:
        '"class Solution:\\n    def pacificAtlantic(self, heights: List[List[int]]) -> List[List[int]]:\\n        ROWS, COLS = len(heights), len(heights[0])\\n        pac, atl = set(), set()\\n\\n        def dfs(r, c, visit, prevHeight):\\n            if (\\n                (r, c) in visit\\n                or r < 0\\n                or c < 0\\n                or r == ROWS\\n                or c == COLS\\n                or heights[r][c] < prevHeight\\n            ):\\n                return\\n            visit.add((r, c))\\n            dfs(r + 1, c, visit, heights[r][c])\\n            dfs(r - 1, c, visit, heights[r][c])\\n            dfs(r, c + 1, visit, heights[r][c])\\n            dfs(r, c - 1, visit, heights[r][c])\\n\\n        for c in range(COLS):\\n            dfs(0, c, pac, heights[0][c])\\n            dfs(ROWS - 1, c, atl, heights[ROWS - 1][c])\\n\\n        for r in range(ROWS):\\n            dfs(r, 0, pac, heights[r][0])\\n            dfs(r, COLS - 1, atl, heights[r][COLS - 1])\\n\\n        res = []\\n        for r in range(ROWS):\\n            for c in range(COLS):\\n                if (r, c) in pac and (r, c) in atl:\\n                    res.append([r, c])\\n        return res"',
      javascript:
        '"/**\\n * https://leetcode.com/problems/pacific-atlantic-water-flow/\\n * Time O(ROWS * COLS) | Space O(ROWS * COLS)\\n * @param {number[][]} heights\\n * @return {number[][]}\\n */\\nvar pacificAtlantic = function(heights) {\\n    const [ pacificReachable, atlanticReachable ] = search(heights);   /* Time O(ROWS * COLS) | Space O(ROWS * COLS) */\\n\\n    return searchGrid(heights, pacificReachable, atlanticReachable);/* Time O(ROWS * COLS) | Space O(ROWS * COLS) */\\n};\\n\\nvar search = (heights) => {\\n    const [ rows, cols ] = [ heights.length, heights[0].length ];\\n    const [ pacificReachable, atlanticReachable ] = [ getMatrix(rows, cols), getMatrix(rows, cols) ];/* Time O(ROWS * COLS) | Space O(ROWS * COLS) */\\n\\n    searchRows(heights, rows, cols, pacificReachable, atlanticReachable);\\n    searchCols(heights, rows, cols, pacificReachable, atlanticReachable);\\n\\n    return [ pacificReachable, atlanticReachable ];\\n}\\n\\nvar getMatrix = (rows, cols) => new Array(rows).fill()/* Time O(ROWS * COLS) | Space O(ROWS * COLS) */\\n    .map(() => new Array(cols).fill(false));\\n\\nvar searchRows = (heights, rows, cols, pacificReachable, atlanticReachable) => {\\n   for (let row = 0; row < rows; row++) {/* Time O(ROWS) */\\n        const [ pacificStart, atlanticStart ] = [ 0, (cols - 1) ];\\n\\n        dfs(row, pacificStart, rows, cols, pacificReachable, heights);   /* Space O(ROWS * COLS) */\\n        dfs(row, atlanticStart, rows, cols, atlanticReachable, heights); /* Space O(ROWS * COLS) */\\n    }\\n}\\n\\nvar searchCols = (heights, rows, cols, pacificReachable, atlanticReachable) => {\\n    for (let col = 0; col < cols; col++) {/* Time O(COLS) */\\n        const [ pacificStart, atlanticStart ] = [ 0, (rows - 1) ];\\n\\n        dfs(pacificStart, col, rows, cols, pacificReachable, heights);   /* Space O(ROWS * COLS) */\\n        dfs(atlanticStart, col, rows, cols, atlanticReachable, heights); /* Space O(ROWS * COLS) */\\n    }\\n}\\n\\nconst dfs = (row, col, rows, cols, isReachable, heights) => {\\n    isReachable[row][col] = true;\\n\\n    for (const [ _row, _col ] of getNeighbors(row, rows, col, cols)) {\\n        if (isReachable[_row][_col]) continue;\\n\\n        const isLower = heights[_row][_col] < heights[row][col];\\n        if (isLower) continue;\\n\\n\\n        dfs(_row, _col, rows, cols, isReachable, heights);              /* Space O(ROWS * COLS) */\\n    }\\n}\\n\\nvar searchGrid = (heights, pacificReachable, atlanticReachable, intersection = []) => {\\n    const [ rows, cols ] = [ heights.length, heights[0].length ];\\n\\n    for (let row = 0; row < rows; row++) {/* Time O(ROWS) */\\n        for (let col = 0; col < cols; col++) {/* Time O(COLS) */\\n            const isReachable = pacificReachable[row][col] && atlanticReachable[row][col]\\n            if (!isReachable) continue\\n\\n            intersection.push([ row, col ]);                             /* Space O(ROWS * COLS) */\\n        }\\n    }\\n\\n    return intersection;\\n}\\n\\nvar getNeighbors = (row, rows, col, cols) => [ [ 0, 1 ], [ 0, -1 ], [ 1, 0 ], [ -1, 0 ] ]\\n    .map(([ _row, _col ]) => [ (row + _row), (col + _col)])\\n    .filter(([ _row, _col ]) => (0 <= _row) && (_row < rows) && (0 <= _col) && (_col < cols))\\n\\n/**\\n * https://leetcode.com/problems/pacific-atlantic-water-flow/\\n * Time O(ROWS * COLS) | Space O(ROWS * COLS)\\n * @param {number[][]} heights\\n * @return {number[][]}\\n */\\n var pacificAtlantic = function(heights) {\\n    const [ pacificQueue, atlanticQueue ] = search(heights);                                                    /* Time O(ROWS + COLS) | Space O(ROWS + COLS) */\\n    const [ pacificReachable, atlanticReachable ] = [ bfs(heights, pacificQueue), bfs(heights, atlanticQueue) ];/* Time O(ROWS * COLS) | Space O(ROWS * COLS) */\\n\\n    return getIntersection(heights, pacificReachable, atlanticReachable);                                       /* Time O(ROWS * COLS) | Space O(ROWS * COLS) */\\n}\\n\\nvar search = (heights, pacificQueue = new Queue([]), atlanticQueue = new Queue([])) => {\\n    searchRows(heights, pacificQueue, atlanticQueue);\\n    searchCols(heights, pacificQueue, atlanticQueue);\\n\\n    return [ pacificQueue, atlanticQueue ]\\n}\\n\\nvar searchRows = (heights, pacificQueue, atlanticQueue) => {\\n    const [ rows, cols ] = [ heights.length, heights[0].length ];\\n\\n    for (let row = 0; row < rows; row++) {/* Time O(ROWS) */\\n        pacificQueue.enqueue([ row, 0 ]);          /* Space O(ROWS) */\\n        atlanticQueue.enqueue([ row, (cols - 1) ]);/* Space O(ROWS) */\\n    }\\n}\\n\\nvar searchCols = (heights, pacificQueue, atlanticQueue) => {\\n    const [ rows, cols ] = [ heights.length, heights[0].length ];\\n\\n    for (let col = 0; col < cols; col++) {/* Time O(COLS) */\\n        pacificQueue.enqueue([ 0, col ]);          /* Space O(COLS) */\\n        atlanticQueue.enqueue([ (rows - 1), col ]);/* Space O(COLS) */\\n    }\\n}\\n\\nconst bfs = (heights, queue) => {\\n    const [ rows, cols ] = [ heights.length, heights[0].length ];\\n    const isReachable = getMatrix(rows, cols);         /* Time O(ROWS * COLS) | Space O(ROWS * COLS) */\\n\\n    while (!queue.isEmpty()) {\\n        for (let i = (queue.size() - 1); 0 <= i; i--) {/*                     | Space O(WIDTH) */\\n            const [ row, col ] = queue.dequeue();\\n\\n            checkNeighbor(heights, row, rows, col, cols, isReachable, queue);\\n        }\\n    }\\n\\n    return isReachable;\\n}\\n\\nvar getMatrix = (rows, cols) => new Array(rows).fill()/* Time O(ROWS * COLS) | Space O(ROWS * COLS) */\\n    .map(() => new Array(cols).fill(false));\\n\\nvar checkNeighbor = (heights, row, rows, col, cols, isReachable, queue) => {\\n    isReachable[row][col] = true;\\n\\n    for (const [ _row, _col ] of getNeighbors(row, rows, col, cols)) {\\n        if (isReachable[_row][_col]) continue;\\n\\n        const isLower = heights[_row][_col] < heights[row][col];\\n        if (isLower) continue;\\n\\n        queue.enqueue([ _row, _col ]);\\n    }\\n}\\n\\nvar getNeighbors = (row, rows, col, cols) => [ [ 0, 1 ], [ 0, -1 ], [ 1, 0 ], [ -1, 0 ] ]\\n    .map(([ _row, _col ]) => [ (row + _row), (col + _col)])\\n    .filter(([ _row, _col ]) => (0 <= _row) && (_row < rows) && (0 <= _col) && (_col < cols))\\n\\nconst getIntersection = (heights, pacificReachable, atlanticReachable, intersection = []) => {\\n    const [ rows, cols ] = [ heights.length, heights[0].length ];\\n\\n    for (let row = 0; row < rows; row++) {/* Time O(ROWS) */\\n        for (let col = 0; col < cols; col++) {/* Time O(COLS) */\\n            const isReachable = pacificReachable[row][col] && atlanticReachable[row][col];\\n            if (!isReachable) continue;\\n\\n            intersection.push([ row, col ]);  /* Space O(ROWS * COLS) */\\n        }\\n    }\\n\\n    return intersection;\\n};"'
    }
  },
  {
    title: 'Number of Islands',
    difficulty: 'Medium',
    category: 'Depth-First Search',
    tags: [
      'Union Find',
      'Backtracking',
      'Depth-First Search',
      'Breath-First Search'
    ],
    companies: [
      'Amazon',
      'Apple',
      'Bloomberg',
      'Uber',
      'Microsoft',
      'DoorDash',
      'Walmart',
      'Tesla',
      'LinkedIn',
      'eBay',
      'VM',
      'TikTok'
    ],
    leetcode_link: 'https://leetcode.com/problems/number-of-islands/',
    description:
      '"Given an `m x n` 2D binary `grid` which represents a map of `\'1\'`s (land) and `\'0\'`s (water), return *the number of islands*.\\n\\nAn **island** is surrounded by water and is formed by connecting adjacent lands horizontally or vertically. You may assume all four edges of the grid are all surrounded by water.\\n\\n**Example 1:**\\n\\n```\\nInput: grid = [\\n  [\\"1\\",\\"1\\",\\"1\\",\\"1\\",\\"0\\"],\\n  [\\"1\\",\\"1\\",\\"0\\",\\"1\\",\\"0\\"],\\n  [\\"1\\",\\"1\\",\\"0\\",\\"0\\",\\"0\\"],\\n  [\\"0\\",\\"0\\",\\"0\\",\\"0\\",\\"0\\"]\\n]\\nOutput: 1\\n```\\n\\n**Example 2:**\\n\\n```\\nInput: grid = [\\n  [\\"1\\",\\"1\\",\\"0\\",\\"0\\",\\"0\\"],\\n  [\\"1\\",\\"1\\",\\"0\\",\\"0\\",\\"0\\"],\\n  [\\"0\\",\\"0\\",\\"1\\",\\"0\\",\\"0\\"],\\n  [\\"0\\",\\"0\\",\\"0\\",\\"1\\",\\"1\\"]\\n]\\nOutput: 3\\n```\\n\\n**Constraints:**\\n\\n•&emsp;`m == grid.length`\\n\\n•&emsp;`n == grid[i].length`\\n\\n•&emsp;`1 <= m, n <= 300`\\n\\n•&emsp;`grid[i][j]` is `\'0\'` or `\'1\'`."',
    solution_link: 'https://www.youtube.com/watch?v=pV2kpPD66nE',
    list_names: ['Blind 75', 'NeetCode 150', 'NeetCode All'],
    prompts: {
      python:
        '"class Solution:\\n    def numIslands(self, grid: List[List[str]]) -> int:"',
      javascript:
        '"/**\\n * @param {character[][]} grid\\n * @return {number}\\n */\\nvar numIslands = function(grid) {\\n    \\n};"'
    },
    solution_codes: {
      python:
        '"class Solution:\\n    def numIslands(self, grid: List[List[str]]) -> int:\\n        if not grid or not grid[0]:\\n            return 0\\n\\n        islands = 0\\n        visit = set()\\n        rows, cols = len(grid), len(grid[0])\\n\\n        def dfs(r, c):\\n            if (\\n                r not in range(rows)\\n                or c not in range(cols)\\n                or grid[r][c] == \\"0\\"\\n                or (r, c) in visit\\n            ):\\n                return\\n\\n            visit.add((r, c))\\n            directions = [[0, 1], [0, -1], [1, 0], [-1, 0]]\\n            for dr, dc in directions:\\n                dfs(r + dr, c + dc)\\n\\n        for r in range(rows):\\n            for c in range(cols):\\n                if grid[r][c] == \\"1\\" and (r, c) not in visit:\\n                    islands += 1\\n                    dfs(r, c)\\n        return islands\\n\\n\\n# BFS Version From Video\\nclass SolutionBFS:\\n    def numIslands(self, grid: List[List[str]]) -> int:\\n        if not grid:\\n            return 0\\n\\n        rows, cols = len(grid), len(grid[0])\\n        visited=set()\\n        islands=0\\n\\n         def bfs(r,c):\\n             q = deque()\\n             visited.add((r,c))\\n             q.append((r,c))\\n           \\n             while q:\\n                 row,col = q.popleft()\\n                 directions= [[1,0],[-1,0],[0,1],[0,-1]]\\n               \\n                 for dr,dc in directions:\\n                     r,c = row + dr, col + dc\\n                     if (r) in range(rows) and (c) in range(cols) and grid[r][c] == \'1\' and (r ,c) not in visited:\\n                       \\n                         q.append((r , c ))\\n                         visited.add((r, c ))\\n\\n         for r in range(rows):\\n             for c in range(cols):\\n               \\n                 if grid[r][c] == \\"1\\" and (r,c) not in visited:\\n                     bfs(r,c)\\n                     islands +=1 \\n\\n         return islands"',
      javascript:
        "\"/**\\n * https://leetcode.com/problems/number-of-islands/\\n * Time O(ROWS * COLS) | Space O(ROWS * COLS)\\n * @param {character[][]} grid\\n * @return {number}\\n */\\nvar numIslands = function(grid, connectedComponents = 0) {\\n    const [ rows, cols ] = [ grid.length, grid[0].length ]\\n\\n    for (let row = 0; row < rows; row++) {/* Time O(ROWS) */\\n        for (let col = 0; col < cols; col++) {/* Time O(COLS) */\\n            const isIsland = grid[row][col] === '1'\\n            if (isIsland) connectedComponents++\\n\\n            dfs(grid, row, rows, col, cols);    /* Space O(ROWS * COLS) */\\n        }\\n    }\\n\\n    return connectedComponents\\n};\\n\\nconst dfs = (grid, row, rows, col, cols) => {\\n    const isBaseCase = grid[row][col] === '0';\\n    if (isBaseCase) return;\\n\\n    grid[row][col] = '0';\\n\\n    for (const [ _row, _col ] of getNeighbors(row, rows, col, cols)) {\\n        dfs(grid, _row, rows, _col, cols);      /* Space O(ROWS * COLS) */\\n    }\\n}\\n\\nvar getNeighbors = (row, rows, col, cols) => [ [ 0, 1 ], [ 0, -1 ], [ 1, 0 ], [ -1, 0 ] ]\\n    .map(([ _row, _col ]) => [ (row + _row), (col + _col) ])\\n    .filter(([ _row, _col ]) => (0 <= _row) && (_row < rows) && (0 <= _col) && (_col < cols))\\n\\n/**\\n * https://leetcode.com/problems/number-of-islands/\\n * Time O(ROWS * COLS) | Space O(MIN(ROWS,COLS))\\n * @param {character[][]} grid\\n * @return {number}\\n */\\n var numIslands = function(grid, connectedComponents = 0) {\\n    const [ rows, cols ] = [ grid.length, grid[0].length ]\\n\\n    for (let row = 0; row < rows; row++) {/* Time O(ROWS) */\\n        for (let col = 0; col < cols; col++) {/* Time O(COLS) */\\n            const isIsland = grid[row][col] === '1';\\n            if (isIsland) connectedComponents++;\\n\\n            bfs(grid, rows, cols, new Queue([ [ row, col ] ]));/* Space O(MIN(ROWS,COLS)) */\\n        }\\n    }\\n\\n    return connectedComponents\\n }\\n\\n const bfs = (grid, rows, cols, queue) => {\\n    while (!queue.isEmpty()) {\\n        for (let i = (queue.size() - 1); 0 <= i; i--) {/* Time O(WIDTH) */\\n            const [ row, col ] = queue.dequeue();\\n\\n            const isWater = grid[row][col] === '0';\\n            if (isWater) continue;\\n\\n            grid[row][col] = '0';\\n\\n            for (const [ _row, _col ] of getNeighbors(row, rows, col, cols)) {\\n                queue.enqueue([ _row, _col ]);             /* Space O(MIN(ROWS,COLS)) */\\n            }\\n        }\\n    }\\n }\\n\\nvar getNeighbors = (row, rows, col, cols) => [ [ 0, 1 ], [ 0, -1 ], [ 1, 0 ], [ -1, 0 ] ]\\n    .map(([ _row, _col]) => [ (row + _row), (col + _col) ])\\n    .filter(([ _row, _col ]) => (0 <= _row) && (_row < rows) && (0 <= _col) && (_col < cols));\\n\\n/**\\n * https://leetcode.com/problems/number-of-islands/\\n * Time O(ROWS * COLS) | Space O(ROWS * COLS)\\n * @param {character[][]} grid\\n * @return {number}\\n */\\nvar numIslands = function (grid) {\\n    const unionFind = new UnionFind(grid);/* Time O(ROWS * COLS) | Space O(ROWS * COLS) */\\n\\n    searchGrid(grid, unionFind);          /* Time O(ROWS * COLS) */\\n\\n    return unionFind.connectedComponents;\\n}\\n\\nvar searchGrid = (grid, unionFind) => {\\n    const [ rows, cols ] = [ grid.length, grid[0].length ];\\n\\n    for (let row = 0; row < rows; row++) {/* Time O(ROWS) */\\n        for (let col = 0; col < cols; col++) {/* Time O(COLS) */\\n            const isWater = grid[row][col] === '0';\\n            if (isWater) continue;\\n\\n            grid[row][col] = '0';\\n\\n            searchRows(unionFind, grid, row, rows, col, cols);\\n            searchCols(unionFind, grid, row, rows, col, cols);\\n        }\\n    }\\n}\\n\\nconst searchRows = (unionFind, grid, row, rows, col, cols) => [ 1, -1 ]\\n    .map((_row) => row + _row)\\n    .filter((_row) => isInBound(_row, rows) && isIsland(grid[_row][col]))\\n    .map((_row) => [ index(row, cols, col), index(_row, cols, col) ])\\n    .forEach(([ x, y ]) => unionFind.union(x, y));\\n\\nconst isInBound = (val, vals) => (0 <= val) && (val < vals)\\nconst isIsland = (cell) => cell === '1'\\nconst index = (row, cols, col) => ((row * cols) + col)\\n\\nconst searchCols = (unionFind, grid, row, rows, col, cols) => [ 1, -1 ]\\n    .map((_col) => col + _col)\\n    .filter((_col) => isInBound(_col, cols) && isIsland(grid[row][_col]))\\n    .map((_col) => [ index(row, cols, col), index(row, cols, _col) ])\\n    .forEach(([ x, y ]) => unionFind.union(x, y));\\n\\nclass UnionFind {\\n    constructor (grid) {\\n        const [ rows, cols ] = [ grid.length, grid[0].length ];\\n\\n        this.connectedComponents = 0;\\n        this.grid = grid;\\n        this.rows = rows;\\n        this.cols = cols;\\n        this.parent = new Array(rows * cols).fill(0);\\n        this.rank = new Array(rows * cols).fill(0);\\n\\n        this.findIslands();\\n    }\\n\\n    findIslands ({ grid, rows, cols, parent } = this) {\\n        for (let row = 0; row < rows; row++) {/* Time O(ROWS) */\\n            for (let col = 0; col < cols; col++) {/* Time O(COLS) */\\n                const isWater = grid[row][col] === '0';\\n                if (isWater) continue;\\n\\n                const index = (row * cols) + col;\\n\\n                parent[index] = index;/* Space O(ROWS * COLS) */\\n                this.connectedComponents++;\\n            }\\n        }\\n    }\\n\\n    find (index, { parent } = this) {\\n        const isEqual = () => parent[index] === index;\\n        while (!isEqual()) {\\n            index = parent[index];\\n        }\\n\\n        return parent[index];\\n    }\\n\\n    union (x, y, { parent, rank } = this) {\\n        const [ rootX, rootY ] = [ this.find(x), this.find(y) ];\\n\\n        const hasCycle = rootX === rootY;\\n        if (hasCycle) return;\\n\\n        this.connectedComponents--;\\n\\n        const isXGreater = rank[rootY] < rank[rootX];\\n        if (isXGreater) return parent[rootY] = rootX;\\n\\n        const isYGreater = rank[rootX] < rank[rootY];\\n        if (isYGreater) return parent[rootX] = rootY;\\n\\n        parent[rootY] = rootX;      /* Space O(ROWS * COLS) */\\n        rank[rootX]++;              /* Space O(ROWS * COLS) */\\n    }\\n};\""
    }
  },
  {
    title: 'Insert Interval',
    difficulty: 'Medium',
    category: 'Intervals',
    tags: ['Intervals'],
    companies: [
      'Amazon',
      'Google',
      'Microsoft',
      'Walmart',
      'Facebook (Meta)',
      'Apple',
      'LinkedIn'
    ],
    leetcode_link: 'https://leetcode.com/problems/insert-interval/',
    description:
      '"You are given an array of non-overlapping intervals `intervals` where `intervals[i] = [startᵢ, endᵢ]` represent the start and the end of the `iᵗʰ` interval and `intervals` is sorted in ascending order by `startᵢ`. You are also given an interval `newInterval = [start, end]` that represents the start and end of another interval.\\n\\nInsert `newInterval` into `intervals` such that `intervals` is still sorted in ascending order by `startᵢ` and `intervals` still does not have any overlapping intervals (merge overlapping intervals if necessary).\\n\\nReturn `intervals` ***after*** *the insertion*.\\n\\n<br/>\\n\\n**Example 1:**\\n\\n```\\nInput: intervals = [[1,3],[6,9]], newInterval = [2,5]\\nOutput: [[1,5],[6,9]]\\n```\\n\\n**Example 2:**\\n\\n```\\nInput: intervals = [[1,2],[3,5],[6,7],[8,10],[12,16]], newInterval = [4,8]\\nOutput: [[1,2],[3,10],[12,16]]\\nExplanation: Because the new interval [4,8] overlaps with [3,5],[6,7],[8,10].\\n```\\n\\n<br/>\\n\\n**Constraints:**\\n\\n•&emsp;`0 <= intervals.length <= 10^4`\\n\\n•&emsp;`intervals[i].length == 2`\\n\\n•&emsp;`0 <= startᵢ <= endᵢ <= 10^5`\\n\\n•&emsp;`intervals` is sorted by `starti` in **ascending order**.\\n\\n•&emsp;`newInterval.length == 2`\\n\\n•&emsp;`0 <= start <= end <= 10^5`"',
    solution_link: 'https://www.youtube.com/watch?v=A8NUOmlwOlM',
    list_names: ['Blind 75', 'NeetCode 150', 'NeetCode All'],
    prompts: {
      python:
        '"class Solution:\\n    def insert(self, intervals: List[List[int]], newInterval: List[int]) -> List[List[int]]:"',
      javascript:
        '"/**\\n * @param {number[][]} intervals\\n * @param {number[]} newInterval\\n * @return {number[][]}\\n */\\nvar insert = function(intervals, newInterval) {\\n    \\n};"'
    },
    solution_codes: {
      python:
        '"class Solution:\\n    def insert(\\n        self, intervals: List[List[int]], newInterval: List[int]\\n    ) -> List[List[int]]:\\n        res = []\\n\\n        for i in range(len(intervals)):\\n            if newInterval[1] < intervals[i][0]:\\n                res.append(newInterval)\\n                return res + intervals[i:]\\n            elif newInterval[0] > intervals[i][1]:\\n                res.append(intervals[i])\\n            else:\\n                newInterval = [\\n                    min(newInterval[0], intervals[i][0]),\\n                    max(newInterval[1], intervals[i][1]),\\n                ]\\n        res.append(newInterval)\\n        return res"',
      javascript:
        '"/**\\n * https://leetcode.com/problems/insert-interval/\\n * Time O(N) | Space O(N)\\n * @param {number[][]} intervals\\n * @param {number[]} newInterval\\n * @return {number[][]}\\n */\\nvar insert = function (intervals, newInterval) {\\n    const { beforeIndex, before } = getBefore(intervals, newInterval);\\n    const afterIndex = mergeIntervals(intervals, newInterval, beforeIndex);\\n    const after = intervals.slice(afterIndex);\\n\\n    return [...before, newInterval, ...after];\\n};\\n\\nconst getBefore = (intervals, newInterval, index = 0, before = []) => {\\n    const hasGap = ([prevStart, prevEnd], [currStart, currEnd]) =>\\n        prevEnd < currStart;\\n\\n    while (index < intervals.length && hasGap(intervals[index], newInterval)) {\\n        const current = intervals[index];\\n\\n        before.push(current);\\n        index++;\\n    }\\n\\n    return { beforeIndex: index, before };\\n};\\n\\nconst mergeIntervals = (intervals, newInterval, index) => {\\n    const hasOverlap = ([prevStart, prevEnd], [currStart, currEnd]) =>\\n        currStart <= prevEnd;\\n\\n    while (\\n        index < intervals.length &&\\n        hasOverlap(newInterval, intervals[index])\\n    ) {\\n        const current = intervals[index];\\n\\n        newInterval[0] = Math.min(newInterval[0], current[0]);\\n        newInterval[1] = Math.max(newInterval[1], current[1]);\\n        index++;\\n    }\\n\\n    return index;\\n};"'
    }
  }
];
