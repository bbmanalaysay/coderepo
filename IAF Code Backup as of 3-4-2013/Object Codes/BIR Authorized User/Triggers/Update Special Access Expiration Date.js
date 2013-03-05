/*
Trigger Timing : After Create
Integration Name : 
Field to Change :Special Access Expiration Date
Relationship : 

-----Conversion------
 
Conversion Map : 

-----Email Triggers-----
Send To:
Email Template:
-----Trail------
Trail Object :  
----Trigger Properties---- 

Integration Link : Upload ZIP url
timeout(ms) : 5000
*/

var no_of_days = parseInt("{!no_of_days}");
if(no_of_days > 0){
	var dateToday = new Date("{!createdAt}");
			dateToday = dateToday.setHours(0,0,0,0);
			dateToday = new Date(dateToday);
	var expDate = dateToday;
		expDate.setDate(dateToday.getDate() + no_of_days);
		expDate = new Date(expDate);
		return expDate;
}