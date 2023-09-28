import { format } from 'date-fns';
import { BadgeState } from './components/badge/Badge';

export function assignBadgeStyle(caseText) {
  caseText = caseText.toLowerCase();

  if (caseText === 'success') return BadgeState.success;
  if (caseText === 'active') return BadgeState.active;

  return BadgeState.primary;
}

export const nullCheckKeys = {
  txt: 'txt',
  amount: 'amount',
  date: 'date',
  num: 'num',
};

export function nullCheck(data, key) {
  if (!data && key === nullCheckKeys.amount) {
    return '0.00';
  } else if (data && key === nullCheckKeys.amount) {
    return Number(data).toLocaleString(undefined, {
      minimumFractionDigits: 2,
    });
  } else if (!data && key === nullCheckKeys.num) {
    return '0';
  } else if (data && key === nullCheckKeys.num) {
    return data.toLocaleString();
  } else if (!data && key === nullCheckKeys.txt) {
    return 'Not available';
  } else if (data && key === nullCheckKeys.txt) {
    return data;
  } else if (!data && key === nullCheckKeys.date) {
    return 'Invalid date';
  } else if (data && key === nullCheckKeys.date) {
    return format(new Date(data), 'dd/MMM/yyyy');
  }
}
