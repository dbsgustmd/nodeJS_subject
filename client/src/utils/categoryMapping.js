export const CATEGORY_MAP = {
  'Entertainment': '엔터테인먼트',
  'Utilities': '공과금',
  'Software': '소프트웨어',
  'Education': '교육',
  'Health': '건강',
  'Food': '음식',
  'Finance': '금융',
  'Other': '기타'
};

export const REVERSE_CATEGORY_MAP = Object.entries(CATEGORY_MAP).reduce((acc, [key, value]) => {
  acc[value] = key;
  return acc;
}, {});

export const getKoreanCategory = (englishCategory) => {
  return CATEGORY_MAP[englishCategory] || englishCategory;
};

export const getEnglishCategory = (koreanCategory) => {
  return REVERSE_CATEGORY_MAP[koreanCategory] || koreanCategory;
};
