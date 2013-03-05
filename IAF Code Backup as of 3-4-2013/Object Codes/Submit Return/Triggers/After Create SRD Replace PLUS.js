/*
Trigger Timing : After Create | After Update
Integration Name : afterCreateSRDReplacePLUS
Field to Change :Content
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
String(rbv_api.getFieldValue("submit_return_data", {!id}, "content")).replace(/_PLUS_/, "+");
