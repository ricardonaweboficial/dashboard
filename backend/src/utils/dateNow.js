const { format } = require('date-fns');

module.exports = function dateNow() {
	return format(new Date(), 'dd/MM/yy H:mm:ss');
}