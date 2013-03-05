/*
Trigger Timing : After Create
Field to Change : Status
Integration Name :
*/
var expirationDate = new Date("{!expiration_date}");
	expirationDate = new Date(expirationDate.setHours(0,0,0,0));
	
var dateToday = new Date(rbv_api.getCurrentDate())
	dateToday = new Date(dateToday.setHours(0,0,0,0));
	
if(expirationDate.getTime() <= dateToday.getTime()) return "$expired";