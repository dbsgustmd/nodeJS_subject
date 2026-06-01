const CATEGORIES_EN = ['Entertainment', 'Utilities', 'Software', 'Education', 'Health', 'Food', 'Finance', 'Other'];
const CATEGORIES_KO = ['엔터테인먼트', '공과금', '소프트웨어', '교육', '건강', '음식', '금융', '기타'];

export const getKoreanCategory = (englishCategory) => {
  const index = CATEGORIES_EN.indexOf(englishCategory);
  return index !== -1 ? CATEGORIES_KO[index] : englishCategory;
};

export const getEnglishCategory = (koreanCategory) => {
  const index = CATEGORIES_KO.indexOf(koreanCategory);
  return index !== -1 ? CATEGORIES_EN[index] : 'Other';
};
