/*
Trigger Timing : After Create
Field to Change : 
Integration Name :
*/
var year = new Date("{!accreditation_date}").getFullYear() + 3;
var accredate = new Date("{!accreditation_date}");
var month = new Date("{!accreditation_date}").getMonth();
var day = new Date("{!accreditation_date}").getDate();
expdate = accredate.setFullYear(year,month,day);
expdate = new Date(expdate);
if("{!accreditation_date}"  != "")
	rbv_api.setFieldValue("accredited_agent", "{!id}", "expiration_date", expdate);