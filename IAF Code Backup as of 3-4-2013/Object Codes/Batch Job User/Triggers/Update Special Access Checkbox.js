/*
Trigger Timing : After Create 
Integration Name : 
Field to Change :Is Special
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

var userRole = "{!R153390.role#code}";
return ("{!special_access_expiration_date}".length > 0 && userRole != "$TP" && userRole != "$TA" && userRole != "$TSP" && userRole != "$TA_TSP");