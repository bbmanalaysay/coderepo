/*
Trigger Timing : Before Update
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

if("{!R99589695#id}" != "{!#CURR_USER.id}") return "{!R99589695#value} is the only one who can edit this Form Permission";