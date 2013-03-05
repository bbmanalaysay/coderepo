/*
Trigger Timing : After Create | After Update
Integration Name : 
Field to Change :Object
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

var admin = ("{!R185728.role#code}" == "$admin") ? 'Admin' : '';
return ( parseInt('{!object#id}') <= 0) ? admin : '';