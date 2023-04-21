export const listNameOptions = [
  { label: 'Blind 75', value: 'blind75' },
  { label: 'NeetCode 150', value: 'neetcode150' },
  { label: 'NeetCode All', value: 'neetcodeall' }
];

export const categorySelection = [
  'Array',
  'Hash Table',
  'Linked List',
  'Stack',
  'Heap & Priority Queue',
  'Binary Search',
  'Merge Sort',
  'Quick Sort',
  'Recursion',
  'Depth-First Search',
  'Breath-First Search',
  'Backtracking',
  'Shortest Path',
  'Greedy',
  'Intervals',
  'Tree',
  'Graph',
  'Trie',
  'Two Pointers',
  'Sliding window',
  'Prefix & Suffix',
  'Advanced Graph',
  '1D Dynamic Programming',
  '2D Dynamic Programming',
  'Math & Geometry',
  'Bit Manipulation'
];

export const tagSelection = [
  'Array',
  'Hash Table',
  'Linked List',
  'Stack',
  'Heap & Priority Queue',
  'Binary Search',
  'Merge Sort',
  'Quick Sort',
  'Recursion',
  'Depth-First Search',
  'Breath-First Search',
  'Backtracking',
  'Shortest Path',
  'Greedy',
  'Intervals',
  'Tree',
  'Graph',
  'Trie',
  'Two Pointers',
  'Sliding window',
  'Prefix Sum',
  'Memoization',
  'Union Find',
  'Monotonic Stack',
  'Advanced Graph',
  '1D Dynamic Programming',
  '2D Dynamic Programming',
  'Math & Geometry',
  'Bit Manipulation',
  'Topological Sort',
  'Segment Tree',
  'Palindromes',
  'Combination',
  'Permutations'
].sort();

export const companies = [
  'Adobe',
  'AirBnB',
  'Amazon',
  'Apple',
  'Bloomberg',
  'Coinbase',
  'Cisco',
  'Facebook (Meta)',
  'Google',
  'Intel',
  'Lyft',
  'Netflix',
  'Microsoft',
  'Oracle',
  'Paypal',
  'Twitter',
  'Twitch',
  'Saleforces',
  'Spotify',
  'Uber',
  'Yahoo'
];

export type GeneralFormData = {
  listName: string;
  title: string;
  difficulty: string;
  category: string;
  tags: string[];
  companies: string[];
  leetcodeLink: string;
  videoLink: string;
};
