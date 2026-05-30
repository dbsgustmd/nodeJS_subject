/**
 * Calculates the difference in days between today and a given target date.
 * @param {string|Date} targetDate 
 * @returns {Object} { text: string, variant: string }
 */
export const calculateDDay = (targetDate) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const target = new Date(targetDate);
  target.setHours(0, 0, 0, 0);
  
  const diffTime = target.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) {
    return { text: 'Today', variant: 'today' };
  } else if (diffDays > 0) {
    return { text: `D-${diffDays}`, variant: 'upcoming' };
  } else {
    return { text: 'Expired', variant: 'expired' };
  }
};
