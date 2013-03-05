/*
Trigger Timing : After Create | After Update
Integration Name : 
Field to Change :
Relationship : 

-----Conversion------
Conversion Map : 

-----Email Triggers-----
Send To:
Email Template:

-----Trail------
Trail Object :  

----Trigger Properties---- 
Integration Link : 
timeout(ms) :

*/

/* Computes for the Total Days of the entered Holiday */
getTotalDays();
function getTotalDays(){
	var totalDays = getDaysInBetween("{!start_date}","{!end_date}");
	if(!isNaN(totalDays))rbv_api.setFieldValue("holiday5", {!id}, "no_of_days", totalDays+1);
}

/* Computes for the days in between two Dates */
function getDaysInBetween(start, end){	
	start = new Date(start);
	end = new Date(end);
	
	var one_day = parseInt(1000*60*60*24);
	var result = parseInt(end - start);
		result = result/one_day;
	return result;
}