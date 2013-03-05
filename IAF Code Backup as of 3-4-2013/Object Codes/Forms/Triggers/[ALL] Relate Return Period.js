/*
Trigger Timing : After Create | After Update
Integration Name : 
Field to Change :Return Period[R98464744]
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

if ("{!return_period}".length > 0 ) return rbv_api.selectNumber("SELECT id FROM return_period WHERE name=?","{!return_period}");