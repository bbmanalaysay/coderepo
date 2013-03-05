/*
Trigger Timing : 
Integration Name : 
Field to Change :Group
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

var qry = "SELECT id FROM $GROUP WHERE is_region=1";
var groups = rbv_api.selectQuery(qry, 1000);
rbv_api.printArr(groups);
var result = new Array();
for(var i = 0; i < groups.length; i++){
	result.push(parseInt(groups[i][0]));
}
result = "";
return result;