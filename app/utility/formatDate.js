import format from 'date-fns/format'
import ruLocale from 'date-fns/locale/ru';

export default date => format(
	date,
	'D MMMM YYYY',
	{locale: ruLocale}
);