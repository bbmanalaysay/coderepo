/*
Trigger Timing : Before Create
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

Integration Link : Upload ZIP url
timeout(ms) : 5000
*/

if("{!R139397.no_permissions#value}" == "true") return "The selected user role currently has no permissions assigned to any of the system's modules.";