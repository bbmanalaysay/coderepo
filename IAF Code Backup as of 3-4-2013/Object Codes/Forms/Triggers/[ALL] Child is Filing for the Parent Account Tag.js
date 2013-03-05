/*
Trigger Timing : After Create
Integration Name : 
Field to Change :Child is Filing for Parent
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

/* Child is Filing for the Parent Account */
var childForParent = false;
if("{!R105188.is_enrolled#value}" == "true" && parseInt("{!R95411340.id}") > 0){ //R105188=Parent Account | R95411340=Taxpayer
	childForParent = ("{!R105188.PUSER2#id}" == "{!R95411340.id}"); //Child's Parent == Taxpayer	
}
rbv_api.println("Child is filing for the parent account = " +childForParent);
return childForParent;