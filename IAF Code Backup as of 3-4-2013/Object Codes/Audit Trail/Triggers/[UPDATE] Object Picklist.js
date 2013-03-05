/*
Trigger Timing : After Create | After Update
Integration Name : 
Field to Change : Object
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

var obj = "{!record_text}".split('(');
obj = String(obj[1]).split(')');
obj = obj[0];
return obj;