/*
Trigger Timing : After Create
Integration Name : afterCreateReplace_AND_
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

String(rbv_api.getFieldValue("submit_return_data", {!id}, "content")).replace(/_AND_/g, "&");