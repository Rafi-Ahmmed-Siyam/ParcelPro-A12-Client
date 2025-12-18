import { format } from 'date-fns';

export const formateDate = (date) => {
   if (!date) return 'N/A';

   const d =
      typeof date === 'number'
         ? new Date(date)
         : new Date(Number(date) || date);

   if (isNaN(d)) return 'Invalid Date';

   return format(d, 'PP');
};
