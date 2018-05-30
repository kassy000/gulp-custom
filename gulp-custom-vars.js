var plugins = global.plugins;
var date = new Date();
//年・月・日・曜日を取得する
var year = date.getFullYear();
var month = date.getMonth()+1;
var day = date.getDate();
var hour = date.getHours();
var minutes = date.getMinutes();
var second = date.getSeconds();
if(month < 10) month =  '0' + month.toString();
if(day < 10) day =  '0' + day.toString();
if(hour < 10) hour =  '0' + hour.toString();
if(minutes < 10) minutes =  '0' + minutes.toString();
if(second < 10) second =  '0' + second.toString();

var errorMessege = {errorHandler: plugins.notify.onError('<%= error.message %>')};

module.exports = {
	year : year,
	month : month,
	day : day,
	hour : hour,
	minutes : minutes,
	second : second
}
