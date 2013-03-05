/*
Trigger Timing :
Integration Name : ^ITS_synched
Field to Change :Data In Synch With ITS
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

/* Function for checking if the data submitted is in synch with the TP's data in the ITS_REG 
	> Data to check
		1. RDO
		2. Date of Birth OR Incorporation
		
	Note: TIN & Branch code checking is no longer needed since it was handled prior to this one. */

checkSynch();
function checkSynch(){
	var ITS_RDO = "{!tp_rdo_code}",
		FRM_RDO = "{!orig_tp_rdo_code}",
		ITS_DATE = "{!tp_date_of_birth_incorporation}",
		FRM_DATE = "{!orig_date_of_birth_incorporation}";
	
	var isSynched = (ITS_RDO == FRM_RDO);	//Always compare RDOs
	var with_ITS_DATE = (ITS_DATE != "null" && ITS_DATE != "" && ITS_DATE != "undefined");	// DoB|DoI in ITS_REG is not empty
	
	if(FRM_DATE != "" && with_ITS_DATE){
		FRM_DATE = new Date(FRM_DATE);
		FRM_DATE = new Date(FRM_DATE.setHours(0,0,0,0));
		FRM_DATE = FRM_DATE.getTime();
		
		ITS_DATE = new Date(ITS_DATE);
		ITS_DATE = new Date(ITS_DATE.setHours(0,0,0,0));
		ITS_DATE = ITS_DATE.getTime();
		
		isSynched = isSynched && (FRM_DATE == ITS_DATE);
	}
	
	/* Debug */
	rbv_api.println("ITS_REG Data:");
	rbv_api.println("RDO = " +ITS_RDO);
	rbv_api.println("Date = " +ITS_DATE);
	rbv_api.println("================================");
	rbv_api.println("Submitted Form Data:");
	rbv_api.println("RDO = " +FRM_RDO);
	rbv_api.println("Date = " +FRM_DATE);
	rbv_api.println("================================");
	rbv_api.println("Data is In Synch with ITS = " +isSynched);	
	
	return isSynched;
}