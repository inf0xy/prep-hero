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
  categories: string;
  tags: string[];
  companies: string[];
  addedCompanies: string;
  leetcodeLink: string;
  videoLink: string;
};
