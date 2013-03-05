/*
Trigger Timing : After Create | After Update
Integration Name : 
Field to Change :Holiday Year
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

return String(new Date("{!end_date}").getFullYear());