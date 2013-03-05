/*
Trigger Timing : After Create | After Update
Integration Name : 
Field to Change :Index
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
var result = String("{!name#text}").split('_part');
result = result[1];
result = result.replace('_part','');
return parseInt( result );
