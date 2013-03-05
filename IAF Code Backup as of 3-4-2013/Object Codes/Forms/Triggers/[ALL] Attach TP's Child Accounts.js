/*
Trigger Timing :
Integration Name : ^attach_tp_children
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

var resultArr = "{!R95411340.CUSER2}".split(",");
for(var i = 0; i < resultArr.length; i++){
	resultArr[i] = parseInt(resultArr[i]);
}
return resultArr;