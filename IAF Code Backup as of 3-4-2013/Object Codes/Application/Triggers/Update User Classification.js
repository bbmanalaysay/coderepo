/*
Trigger Timing : After Create | After Update
Field to Change : User Classification
Integration Name :
*/

/* Update the User Classification Picklist depending on the Applicant's desired classification */
if("{!status#code}" == "$FA"){		//'For Approval' Registrations only
	var isTA = {!is_tax_agent},
		isTSP = {!tax_software_provide},
		isTA_TSP = (isTA && isTSP),
		userClass = "TP";			//TP ONLY

	if(isTA_TSP){
		userClass = "TA_TSP";		//TA && TSP (w/TP)
	}else if(isTA && !isTSP){
		userClass = "TA";			//TA (w/ TP)
	}else if(isTSP && !isTA){
		userClass = "TSP";			//TSP (w/ TP)
	}
	return userClass;
}