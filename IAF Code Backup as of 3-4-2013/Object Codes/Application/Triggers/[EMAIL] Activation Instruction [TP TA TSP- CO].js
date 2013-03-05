/*
Trigger Timing : After Update
Field to Change : 
Integration Name :
-----Email Triggers-----
Send To:{!email}
Email Template:Account Activation Instruction [TP TA TSP- CO]
*/
var appType = "{!applicant_type#code}",
	userRole = "{!user_classification#code}";

return ("{!status#code}" == "$FA" && appType == "CO" && userRole == "TA_TSP");