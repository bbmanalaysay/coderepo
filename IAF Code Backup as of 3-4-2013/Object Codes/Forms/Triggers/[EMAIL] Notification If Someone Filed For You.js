/*
Trigger Timing : After Create | After Update
Integration Name : ^notif_email2
Field to Change :
Relationship : 

-----Conversion------
Conversion Map : 

-----Email Triggers-----
Send To:{!R95411340.email}
Email Template:[Email] Filed for You

-----Trail------
Trail Object :  

----Trigger Properties---- 
Integration Link : 
timeout(ms) :

*/

("{!R95411340#id}" != "{!R105188#id}") //Taxpayer != Filed By