/*
Trigger Timing : After Create
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

var filingDate = rbv_api.formatDate(new Date("{!createdAt}"), "MM/dd/yyyy");
var filingMonth = new Date(filingDate).getMonth();
rbv_api.println("filing month = " +filingMonth);
var qry = "SELECT id FROM month WHERE month_id = ?";
var monthID = rbv_api.selectNumber(qry, filingMonth);
if(monthID > 0) return monthID;