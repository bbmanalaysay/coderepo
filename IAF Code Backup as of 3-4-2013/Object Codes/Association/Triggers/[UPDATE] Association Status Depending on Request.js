/*
Trigger Timing : After Create
Integration Name : 
Field to Change :Status
Relationship : 

-----Conversion------
 
Conversion Map : 

-----Email Triggers-----
Send To:
Email Template:
-----Trail------
Trail Object :  
*/
var requestStatus = "{!R98336149.status#code}";
if(requestStatus == "$disaccredited_ta" || requestStatus == "$expired_ta") return requestStatus;
