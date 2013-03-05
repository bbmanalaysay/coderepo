<textarea id='debug1' style="display:none;"></textarea>
<div id="debug2" style="display:none;"></div>
<script>
"Admin - Submit Returns".c_sectionHide(false);
if ("{!#CURR_USER.role#code}" == "$admin") {
	$('#debug1').show().insertAfter( $('#debug') );
	$('#debug2').show().insertAfter( $('#debug1') );
	"Admin - Submit Returns".c_sectionHide(true);
}else{
	/* Sections below form preview */
	"Additional Information".c_sectionHide(false);
	"Taxpayer Original Filed Details".c_sectionHide(false);
	"Taxpayer's Tax Computations".c_sectionHide(false);
	"Spouse Info".c_sectionHide(false);
	"Taxpayer Spouse' Original Filed Details".c_sectionHide(false);
	"Taxpayer's Spouse' Tax Computations".c_sectionHide(false);
	"Admin - Submit Returns".c_sectionHide(false);
}
"Validation Errors".c_sectionHide(false);
"Upload Details".c_sectionHide(false);
"Return Form Information".c_sectionHide(false);
"Preview".c_sectionHide(false);
"Error Message(div)".c_sectionHide(false);
"Duplicate Entry".c_sectionHide(false);
"Audit Locked".c_sectionHide(false);	
"Connection Error".c_sectionHide(false);
"Late Filing".c_sectionHide(false);
"attLinks".c_sectionHide(false);
"Attachments".c_sectionHide(false);
"hidden".c_sectionHide(false);
"Additional Note".c_sectionHide(false);

var isGutchiAccount = ("{!#CURR_USER.id}" == "9287"), isJenAccount = ("{!#CURR_USER.id}" == "338616"), isBenjieAccount = ("{!#CURR_USER.id}" == "303327"); /*FOR TESTING ONLY*/
var returnPeriod, oldTaxDue, oldAmtPayable, taxDue, taxDueX, rdoVal, objId = parseInt("{!id}"), objName = "upload1", isReloaded = false, finished = false, fileData = '';
var saveform = new XMLHttpRequest(), xml = new XMLHttpRequest();
function passed() {
	rbf_setField("upload1", parseInt("{!id}") , 'form_error', 'false', true);
}
function failed() {
	"Successfully Filed".c_sectionHide(false);
	rbf_setField("upload1", parseInt("{!id}") , 'form_error', 'true', true);
	if ( String( $("#rbi_F_errors").html() ).length > 0 ) {
		rbf_setField("upload1", parseInt("{!id}") , 'errors', $('#msg').html(), true);
		rbf_runTrigger('upload1', '{!id}', 'generateError');		
	}	
}
function loader() {
	//Attachment sections
	if ( '{!showattach}' == 'inline !important' || '{!showattachedit}' == 'inline !important' ) {
		//"attLinks".c_sectionHide(true);
		$("div[name*='attLinks']").find('input').appendTo( $("div[name*='Attachments']").find('.bold').first() );
		"Attachments".c_sectionHide(true);
	}
	
	var formType = parseInt("{!R95404485.id}"), formTypeCode = "{!R95404485.form_type_code}";
	if(formTypeCode != "23" && formTypeCode != "24") "print_form_sched".c_showHide(false); //Show to forms 2200M and 2200P only(Schedule Printing-landscape)
	if(!(formType > 0)){ //No Form Type was attached (XML issue - JTrac#636)
		attachValidationMsg("XML Error: Submitted XML file is invalid. Please check the file or re-upload again.");	
		"Return Form Information".c_sectionHide(true);
		"Validation Errors".c_sectionHide(true);
		"Upload Details".c_sectionHide(true);
		"Successfully Filed".c_sectionHide(false);
		"Preview".c_sectionHide(false);
		"Error Message(div)".c_sectionHide(false);
		$("#tsp_msg").css("display","none");
		"print_form".c_showHide(false);
		"print_form_sched".c_showHide(false);
		"filing_ref_num".c_showHide(false);
		$(":submit[value*='Continue']").hide();
		
		"Loading Image".c_sectionHide(false);		
		$('#loading_image, #load').hide();
	} else if ("{!upload_error#value}" == "false") {//Attachment sections
		if ("{!tsp_file#url}".length > 0) {
			saveform.open('POST',"{!tsp_file#url}&rand={!random}",false);
			saveform.send();
			saveForm();
		} else if ( parseInt("{!submit_returns_count}") > 0) {
			saveform.open('POST',"{!browse___#url}&rand={!random}",false);
			saveform.send();
			saveForm();
		} else setReturnPeriod(); //error handling
		$('#tsp_msg').hide();
		$('.rbs_recordActionCol input[onclick*="rbf_action"]').show();
	} else {
		"Loading Image".c_sectionHide(false);
		"Return Form Information".c_sectionHide(true);
		if ("{!tsp_file#url}".length > 0) {
			var err = String( $("#rbi_F_upload_error_s_form").html() );
			err = err.split('XML Format Validation failed!');
			
			if( String(err) != "null"){
				var error='';
				$(err).each(function(index) {
					error += err[index].replace('XML Format Validation failed!','')+"<br/>";			
				});
				$('#tsp_msg').html( 'XML Format Validation failed!' + error );
			}

			"Successfully Filed".c_sectionHide(false);
			"Upload Details".c_sectionHide(true);			
		} else {
			"Preview".c_sectionHide(true);
			"Formscript Validations".c_sectionHide(true);
		}		
		$('#loading_image, #load').hide();
	}
	
	/* Collapse Admin Sections onload */
	rbf_setSectionCollapse(rbf_getSectionIdByTitle("Additional Information"), true);
	rbf_setSectionCollapse(rbf_getSectionIdByTitle("Taxpayer Original Filed Details"), true);
	rbf_setSectionCollapse(rbf_getSectionIdByTitle("Taxpayer's Tax Computations"), true);	
	rbf_setSectionCollapse(rbf_getSectionIdByTitle("Spouse Info"), true);	
	rbf_setSectionCollapse(rbf_getSectionIdByTitle("Taxpayer Spouse' Original Filed Details"), true);
	rbf_setSectionCollapse(rbf_getSectionIdByTitle("Taxpayer's Spouse' Tax Computations"), true);	
	rbf_setSectionCollapse(rbf_getSectionIdByTitle("Admin - Submit Returns"), true);
	
	/* Attach Child Accounts (JTrac #872) */
	if(parseInt("{!R95411340#id}") > 0){	//R95411340==Taxpayer
		rbf_runTrigger(objName, objId, "^attach_tp_children");			//Taxpayer's Children
		rbf_runTrigger(objName, objId, "^show_tp_forms");				//User's Who Can View the Form (TP)
	}
	if(parseInt("{!R105188#id}") > 0){		//R105188==FiledBy
		rbf_runTrigger(objName, objId, "^attach_filer_children");		//Filer's Children
		rbf_runTrigger(objName, objId, "^show_filer_forms");			//User's Who Can View the Form (Filer)
	}
}
function saveForm() {
	//if ( saveform.readyState == 4 && saveform.status == 200 ) {
		var parsed = String( saveform.responseText ).replace(/__/gi,':');
		$('#fileArea').val( parsed ); $('#response').html( parsed );
		/* TSP */
		if ("{!tsp_file#url}".length > 0) {
			convertToOrigXMLForm();
			var err = String( $("#rbi_F_upload_error_s_form").html() );
			err = err.split('XML Format Validation failed!');
			
			if( String(err) != "null"){
				var error='';
				$(err).each(function(index) {
					error += err[index].replace('XML Format Validation failed!','')+"<br/>";			
				});
				$('#tsp_msg').html( 'XML Format Validation failed!' + error );
				//$('#tsp_msg').show();
			}	
			"Upload Details".c_sectionHide(true);
		}
		//$("#debug1").html( $('#response').html() );
		/* TSP */
		xml.open('POST',"{!R95404485.form_script_file#url}&rand={!random}",false);
		xml.send();
		formScriptLoad();
	//}
}
function formScriptLoad() {
	$('#form_type_script').html( xml.responseText );
	loadimg();
	$('#msg').appendTo( $('#errormsg') );
	$('#msg').css("display","block");
	"Return Form Information".c_sectionHide(true);
	"Preview".c_sectionHide(true);
	"Formscript Validations".c_sectionHide(true);
}

/* Set the value for theReturn Period (server-side via the form_script_file) */
function setReturnPeriod() {
	//Moved Audit related show/hide to next function so that tax returns are always ran through - MP	
	fileData = $('#response').html(); fileData = fileData.toString(); //get savefile data
	$('#debug1').html(fileData);
	if (fileData.indexOf('All Rights Reserved BIR') != -1) { //check if End-Of-File
		rbf_setField("upload1", objId, "connection_error", 'false');
		if(rpReturnPeriodEnd != "") {	
			/* Store the values in the computation (for loader handling) */
			oldTaxDue = parseFloat((String("{!tax_due}")).replace(/,/g,""));
			oldAmtPayable = parseFloat((String("{!total_amount_payable}")).replace(/,/g,""));	
			
			try {
				/* Return Period */		
				returnPeriod = new Date(rpReturnPeriodEnd);		
				returnPeriod = rbf_formatDate(returnPeriod, "MM/dd/yyyy");
				rbf_setField("upload1", objId, "return_period_end", returnPeriod);
				rbf_setField("upload1", objId, "return_period_end_old", returnPeriod);	//Old return period (for checking of duplicates)
				
				/* Quarter End Date (special handling) */
				if(rpReturnPeriodEndDispOnly != ""){
					var quarterDate = new Date(rpReturnPeriodEndDispOnly);
						quarterDate = rbf_formatDate(quarterDate, "MM/dd/yyyy");
						rbf_setField("upload1", objId, "return_period_end_disp_only", quarterDate);
				}
				
				/* Taxpayer */
				if (rpTaxDue) {
					taxDue = parseFloat(rpTaxDue.replace(/,/g,""));
					rbf_setField("upload1", objId, "tax_due", taxDue);
				}
				
				/* Spouse */
				if (rpTaxDueX) {
					taxDueX = parseFloat(rpTaxDueX.replace(/,/g,""));
					if(taxDueX >= 0) rbf_setField("upload1", objId, "tax_dueX", taxDueX);
				}
				
				/* Amended Return */
				if(rpIsAmendedReturn) {
					var isAmended = (rpIsAmendedReturn == "true") ? 1 : 0;
					rbf_setField("upload1", objId, "is_amended", isAmended);
				}
				
				/* Treaty Code */
				if(rpIsTaxTreatyCode){
					var isTreaty = (rpIsTaxTreatyCode == "true") ? 1 : 0;
					rbf_setField("upload1", objId, "is_treaty", isTreaty);
				}
				
				/* TCT/OCT/CCT No. (JTrac #825)*/
				if(rpTCT){
					var tctNo = String(rpTCT);
					if(tctNo != "" && tctNo != "null" && tctNo != "undefined")
						rbf_setField("upload1", objId, "tct", tctNo);
				}
				
				/* Kind of Transaction (JTrac #859 for 2552) */
				if(rpKindOfTxn){
					var kindOfTxn = String(rpKindOfTxn);
					if(kindOfTxn != "" && kindOfTxn != "null" && kindOfTxn != "undefined")
						rbf_setField("upload1", objId, "kind_of_txn", kindOfTxn);					
				}
				
				/* Buyer TIN (JTrac #867 for 1707) */
				if(rpBuyerTIN){
					var buyerTIN = String(rpBuyerTIN);
					if(buyerTIN != "" && buyerTIN != "null" && buyerTIN != "undefined")
						rbf_setField("upload1", objId, "buyer_tin", buyerTIN);					
				}				
				
				recompute();
			} catch(err) {
				alert("error = " +err);
			}
		} else if("{!upload_error#value}" == "false") {
			//Non-RF will have no return period (0605)		
			setValues(); //duplicateChecker();		
		}
	} else { //connection error
		rbf_setField("upload1", objId, "connection_error", 'true');
		"Connection Error".c_sectionHide(true);
		"Loading Image".c_sectionHide(false);
		"Return Form Information".c_sectionHide(true);
		"Successfully Filed".c_sectionHide(false);
		"Preview".c_sectionHide(false);
		"Error Message(div)".c_sectionHide(false);
		$(":submit[value*='Continue']").hide();
		"print_form".c_showHide(false);
		"print_form_sched".c_showHide(false);
		"filing_ref_num".c_showHide(false);
			
		$('#loading_image, #load').hide();
	}
}

function recompute() {	
	rbf_getFields("upload1", parseInt("{!id}"), "has_been_viewed,original_is_stored", function(objName,objId,data){
		if( String(data['has_been_viewed']) == "false") rbf_runTrigger("upload1", parseInt('{!id}'), "^recompute_values"); // Run trigger for re-computing the computations 
		if( String(data['original_is_stored']) == "false") storeOriginalValues();
	});
	var t = window.setTimeout("setValues()",300);	
}

/* Stores the Originally filed values (offline and online)
	Note: This will run only once after creation.*/
function storeOriginalValues(){
	var objName = "upload1";
	
	/* -- Taxpayer Details -- */
	/* Get the original values (client side) and store them thru rbf_setField*/
	var origAddress = $(".p3TPAddress").first().val(),
		origLOB = $(".p3TPLOB").first().val(),
		origTPName = $(".p3TPName").first().val(),
		origRdoCode = rpRDO,
		origTelNum = $(".p3TPTelNum").first().val(),
		origZIP = $(".p3TPZip").first().val();
	rbf_setField(objName, objId, 'orig_tp_addr', origAddress);
	rbf_setField(objName, objId, 'orig_tp_lob', origLOB);
	rbf_setField(objName, objId, 'orig_tp_name', origTPName);
	rbf_setField(objName, objId, 'orig_tp_rdo_code', origRdoCode);
	rbf_setField(objName, objId, 'orig_tp_telnum', origTelNum);
	rbf_setField(objName, objId, 'orig_tp_zip', origZIP);

	//DoB or DoI:
	var origMonth = $(".p3TPDOBMonth").first().val(),
		origDay = $(".p3TPDOBDay").first().val(),
		origYear = $(".p3TPDOBYear").first().val();	
	var	origDate = origMonth+ "/" +origDay+ "/" +origYear;
	if(origDate.length == 10){
		origDate = rbf_formatDate(new Date(origDate), "MM/dd/yyyy");
		rbf_setField(objName, objId, 'orig_date_of_birth_incorporation', origDate);
	}
	
	//Fiscal or Calendar
	var origIsFiscal = $(".calendarTypeRdoF").first().is(":checked"),
		origIsCalendar = $(".calendarTypeRdoC").first().is(":checked");
	if(String(origIsFiscal) == "true"){
		rbf_setField(objName, objId, 'fiscal_or_calendar', 'FI');	//Fiscal
	}else if(String(origIsCalendar) == "true"){
		rbf_setField(objName, objId, 'fiscal_or_calendar', 'CA');	//Calendar
	}
	
	//Calendar Type Start Month
	var origCalendarType = String($(".calendarTypeStartMonth option:selected").first().text()),
		origCalendarType = origCalendarType.substring(origCalendarType.indexOf("-")+1);
	if(origCalendarType != "") rbf_setField(objName, objId, 'calendar_type_start_month', origCalendarType);	//Start Month
	/* -- END Taxpayer Details -- */		
	
	rbf_setField(objName, objId, 'original_is_stored', true); //flag for running once only		
}

/* Set the values (client-side) w/o Refreshing the page : MPISCOSO */
function setValues() {
	rbf_getFields("upload1", parseInt("{!id}"),
	'tax_due, tax_dueX, return_period_end, tp_rdo_code, surcharge, interest, compromise, total_penalties, total_amount_payable, surchargeX, interestX, compromiseX, total_penaltiesX, total_amount_payX, is_amended',
	function(objName,objId,data) {
		var aggregateAP = 0;	
		/* RB Fields */
		$('#rbi_F_return_period_end').html( returnPeriod );
		$('#rbi_F_tp_rdo_code').html( data['tp_rdo_code'] );
		
		if( parseFloat(data['total_amount_payable']) != 0 && !isNaN(parseFloat(data['total_amount_payable'])) ) {
			/* TP */
			$('#rbi_F_tax_due').html( addCommas(data['tax_due']) );
			$('#rbi_F_surcharge').html( addCommas(data['surcharge']) );
			$('#rbi_F_interest').html( addCommas(data['interest']) );
			$('#rbi_F_compromise').html( addCommas(data['compromise']) );
			$('#rbi_F_total_penalties').html( addCommas(data['total_penalties']) );
			$('#rbi_F_total_amount_payable').html( addCommas(data['total_amount_payable']) );
			
			aggregateAP = parseFloat(data['total_amount_payable']);
		}
		if( parseFloat(data['tax_dueX']) != 0 && !isNaN(parseFloat(data['tax_dueX'])) ) {		
			/* Spouse */
			$('#rbi_F_tax_dueX').html( addCommas(data['tax_dueX']) );
			$('#rbi_F_surchargeX').html( addCommas(data['surchargeX']) );
			$('#rbi_F_interestX').html( addCommas(data['interestX']) );
			$('#rbi_F_compromiseX').html( addCommas(data['compromiseX']) );
			$('#rbi_F_total_total_penaltiesX').html( addCommas(data['total_penaltiesX']) );
			$('#rbi_F_total_total_amount_payX').html( addCommas(data['total_amount_payX']) );
			
			aggregateAP += parseFloat(data['total_amount_payX']);
		}
		/* Form Fields */		
		if( parseFloat(data['total_amount_payable']) != 0 && !isNaN(parseFloat(data['total_amount_payable'])) ) {	
			/* Taxpayer */
			$('.p3Surcharge').first().val( addCommas(data['surcharge']) );
			$('.p3Interest').first().val( addCommas(data["interest"]) );
			$('.p3Compromise').first().val( addCommas(data["compromise"]) );
			$('.p3TotalPenalty').first().val( addCommas(data["total_penalties"]) );
			$('.p3TotalAmountPayable').first().val( addCommas(data["total_amount_payable"]) );

			if (!isNaN(parseFloat(data['total_amount_payX'])) && !isNaN(parseFloat(data['total_amount_payable']))) {
				$('.p3AggregateAmountPayable').first().val( addCommas( parseFloat(String(data["total_amount_payable"]).replace(/,./gi,'')) + parseFloat(String(data["total_amount_payX"]).replace(/,./gi,'')) ) );
			} else if (!isNaN(parseFloat(data['total_amount_payX'])) && isNaN(parseFloat(data['total_amount_payable']))) {
				$('.p3AggregateAmountPayable').first().val( addCommas( parseFloat(String(data["total_amount_payX"]).replace(/,./gi,'')) ) );
			} else if (isNaN(parseFloat(data['total_amount_payX'])) && !isNaN(parseFloat(data['total_amount_payable']))) {
				$('.p3AggregateAmountPayable').first().val( addCommas( parseFloat(String(data["total_amount_payable"]).replace(/,./gi,'')) ) );
			} else if (isNaN(parseFloat(data['total_amount_payX'])) && isNaN(parseFloat(data['total_amount_payable']))) {
				$('.p3AggregateAmountPayable').first().val( '0.00' );
			}
		}
		if( parseFloat(data['tax_dueX']) != 0 && !isNaN(parseFloat(data['tax_dueX'])) ) {					
			/* Spouse */
			$('.p3SurchargeX').first().val( addCommas(data['surchargeX']) );
			$('.p3InterestX').first().val( addCommas(data['interestX']) );
			$('.p3CompromiseX').first().val( addCommas(data['compromiseX']) );
			$('.p3TotalPenaltyX').first().val( addCommas(data['total_penaltiesX']) );
			$('.p3TotalAmountPayableX').first().val( addCommas(data['total_amount_payX']) );
			
			if (!isNaN(parseFloat(data['total_amount_payX'])) && !isNaN(parseFloat(data['total_amount_payable']))) {
				$('.p3AggregateAmountPayable').first().val( addCommas( parseFloat(String(data["total_amount_payable"]).replace(/,./gi,'')) + parseFloat(String(data["total_amount_payX"]).replace(/,./gi,'')) ) );
			} else if (!isNaN(parseFloat(data['total_amount_payX'])) && isNaN(parseFloat(data['total_amount_payable']))) {
				$('.p3AggregateAmountPayable').first().val( addCommas( parseFloat(String(data["total_amount_payX"]).replace(/,./gi,'')) ) );
			} else if (isNaN(parseFloat(data['total_amount_payX'])) && !isNaN(parseFloat(data['total_amount_payable']))) {
				$('.p3AggregateAmountPayable').first().val( addCommas( parseFloat(String(data["total_amount_payable"]).replace(/,./gi,'')) ) );
			} else if (isNaN(parseFloat(data['total_amount_payX'])) && isNaN(parseFloat(data['total_amount_payable']))) {
				$('.p3AggregateAmountPayable').first().val( '0.00' );
			}
		}
		
		/* Penalties/Compromise Message */
		if (parseFloat(data['total_penalties']) > 0 && !isNaN(parseFloat(data['total_penalties'])) ) {
			"Late Filing".c_sectionHide(true);
			
			$(".p3CompromiseLabel").first().each(function(){
				if( String($(this).html()).indexOf("Compromise") != -1 )
					$(this).html("<span style='color:red;'>*</span><span style='font-size: 10px;'>Compromise</span>");
			});
		}
		
		/* Compute for the Aggregate Amount Payable, and display it on the form */
		aggregateAP = addCommas(aggregateAP);
		$('.p3Aggregate').first().val( addCommas(aggregateAP) );
		rbf_getFields("upload1", parseInt("{!id}"), "has_been_viewed", function(objName,objId,data){
			if( String(data['has_been_viewed']) == "false")	rbf_setField(objName, objId, "aggregate_amount", aggregateAP); //Store server-side
		});
			
		/* Amended Return Message */
		var is_amended = String( data['is_amended'] );
		var tsp_msg_text = $("#tsp_msg_ok").html();
		if(is_amended == "true" && tsp_msg_text.indexOf("Amended Return") == -1){
			$("#tsp_msg_ok").append("<br/><br/>You are filing for an <b>Amended Return</b> for the form no. <b>{!R95404485.name#text}</b>.");
		}		
	});	
	duplicateChecker();
}

function duplicateChecker(){
	if("{!is_duplicate#value}" == "true"){
		rbf_runTrigger("upload1", parseInt('{!id}'), "^check_duplicate");	// set to TRUE so trigger will run once only on Original Form
		rbf_runTrigger("upload1", parseInt('{!id}'), "^save_dup_links");	// store links into fields (handling for view page's first load)
	}
	rbf_getFields("upload1", parseInt("{!id}"), "has_been_viewed", function(objName,objId,data){
		if( String(data['has_been_viewed']) == "false") { //Handling for run once only
			rbf_runTrigger("upload1", parseInt('{!id}'), "^ITS_synched"); 		// Check if Data entered is in synch with ITS_REG
			rbf_runTrigger("upload1", parseInt('{!id}'), "^check_start_month"); // Check invalid start month & calendar type
		}
	});
	
	window.setTimeout(setDuplicateNotifications,200);
}

/* Fixes the first load issue of related Original Form's details (JTrac#961)*/
function setDuplicateNotifications(){
	var is_dup=false, is_auditLocked=false, originalFormID=0;
	rbf_getFields("upload1", parseInt("{!id}"), "is_duplicate, parent_is_audit_locked, Pupload11", 
	function(objName,objId,data){
		/* Check if the Form is a DUPLICATE */
		is_dup = String( data['is_duplicate'] );
		is_auditLocked = String( data['parent_is_audit_locked'] );
		originalFormID = parseInt( data['Pupload11'] );
	});
	if(originalFormID > 0){ //Check if there is a parent form (duplicate original)
		rbf_selectQuery("SELECT name, createdAt, date_locked FROM upload1 WHERE id = "+originalFormID, 1, function(data2){
			if( data2.length > 0 && is_dup == "true" ){
				var formName = String(data2[0][0]);
				var dateCreated = String(data2[0][1]); dateCreated = dateCreated.substring(0,10);
				var dateLocked = String(data2[0][2]); dateLocked = dateLocked.substring(0,10);
				if(is_auditLocked == "true"){
					/* Duplicate Form is For Auditing */				
					attachValidationMsg("This form has already been locked on "+dateLocked+" for Auditing. " +
						"See form <a href='https://{!#HOST_NAME}/prod1/m/main.jsp?pageId={!#PAGE_ID}&id="+originalFormID+"'>"+formName+"</a> for details.");				
				}else{
					/* Duplicate (Original) */
					attachValidationMsg("This form has already been filed on "+dateCreated+". " +
						"See form <a href='https://{!#HOST_NAME}/prod1/m/main.jsp?pageId={!#PAGE_ID}&id="+originalFormID+"'>"+formName+"</a> for details.");	
				}		
			}
		});
	}
	window.setTimeout(checkErrors,200);
}

function overrideTPdata() {
	/* Set the values for the TP's details, client-side (from the 'reg_registration' object) */
		var tp_rdo_code = "{!tp_rdo_code}".replace(/null/g,"");
		var tp_lob = "{!tp_lob}".replace(/null/g,"");
		var tp_name = "{!tp_name}".replace(/null/g,"");
		var tp_telnum = "{!tp_telnum}".replace(/null/g,"");
		var tp_addr = "{!tp_addr}".replace(/null/g,"");
		var tp_zip = "{!tp_zip}".replace(/null/g,"");		
		
		$('.p3TPBranchCode').first().val( "{!tp_branch_code}" );				//Branch Code
		//$('.labels').first().hide(); - do not use classnames as this is not consistent on all forms
		
		/* TP RDO */
		$('.p3TPRDOCode > option').each(function(){
			if( $(this).html() == "{!tp_rdo_code}"){ $(this).attr("selected", true); }
		});
		$('.p3TPRDOCode').next().html( tp_rdo_code );
		
		/* Right-side RDO */		
		if(rpRDOCode2 != ""){		
			$('.p3TPRDOCode2 > option').each(function(){
				if( $(this).html() == rpRDOCode2){ $(this).attr("selected", true); }
			});
			$('.p3TPRDOCode2').next().html( rpRDOCode2 );
		}
		
		$('.p3TPLineBus').first().val( tp_lob );							//Line of Business
		$('.p3TPLOB').first().val( tp_lob );								//Line of Business (for other class)
		$('.p3TPName').first().val( tp_name );								//TP Name
		$('.p3TPTelNum').first().val( tp_telnum );							//Telephone Number
		$('.p3TPAddress').first().val( tp_addr );							//TP Address
		$('.p3TPZip').first().val( tp_zip );								//ZIP Code
		
		/* TP Spouse (its_reg) */
		var tp_spouse_tin = "{!tp_spouse_tin}",	tp_spouse_branch_code = "{!tp_spouse_branch_code}";
			
		$(".p3SpsTPTIN1").first().val(tp_spouse_tin.substring(0,3));		//
		$(".p3SpsTPTIN2").first().val(tp_spouse_tin.substring(3,6));		//Spouse TIN	
		$(".p3SpsTPTIN3").first().val(tp_spouse_tin.substring(6,9));		//
		$(".p3SpsTPBranchCode").first().val(tp_spouse_branch_code);			//Spouse Branch Code	
}

/* Check if there are errors with the form filed */
function checkErrors(){
	rbf_getFields("upload1", parseInt("{!id}"), "is_duplicate, not_included_in_tp_assignment, tin_not_found__offline, upload_error, form_error, for_audit, is_invalid, parent_is_audit_locked, is_amended__with_no_original, is_amended, connection_error, invalid_start_month, has_been_viewed,email_notification_sent", 
	function(objName,objId,data){
		
		/* Filed an Amended Form without a previously filed Original Form */
		var amendedNoOrig = String( data['is_amended__with_no_original'] );
		if( amendedNoOrig == "true" ) attachValidationMsg("You can not file an amended form without filing the Original Form. " +
														  "Please submit the original form first.");
		
		/* Check if Unregistered Tax Type */
		var not_registered = String( data['is_invalid'] );
		if( not_registered == "true" ) attachValidationMsg("Your tax type is not registered. Please update in ITS-Registration System. " +
														   "On the third time you will file, your account will be locked. Please avoid being penalized.");	
														   
		/* Check if the Filer is eligible for filing */
		var not_assigned = String( data['not_included_in_tp_assignment'] );
		if( not_assigned == "true" ) attachValidationMsg("You are not allowed to file this form.");
		
		/* Check if the form's TIN is Valid (Online and Offline)*/
		var TIN_invalid = String( data['tin_not_found__offline'] );
		if( TIN_invalid == "true" ) attachValidationMsg("Submitted form {!R95404485#value} and supplied incorrect TIN of Taxpayer.");
		
		/* Check if the calendar type && start month is correct */
		var invalidStartMonth = String( data['invalid_start_month'] );
		if( invalidStartMonth == "true" ) attachValidationMsg("The filing period you have selected does not match with ITS-Reg, please "+
															  "correct this information and file again using the correct period.");

		var msgText = $('#errormsg').html();
		/* Hide|Show the "Continue" button */
		var cond1 = (String(data['upload_error']) == "false");
		var cond2 = (String(data['form_error']) == "false");
		var cond3 = (String(data['tin_not_found__offline']) == "false");
		var cond4 = (String(data['is_duplicate']) == "false");
		var cond5 = (String(data['not_included_in_tp_assignment']) == "false");
		var cond6 = (String(data['for_audit']) == "true");
		var cond7 = (String(data['parent_is_audit_locked']) == "false");
		var cond8 = (String(data['is_invalid']) == "false");
		var cond9 = (String(data['is_amended__with_no_original']) == "false");
		var cond10 = (String(data['connection_error']) == "false");
		var cond11 = (msgText.indexOf("Multiple") == -1);
		var cond12 = (String(data['invalid_start_month']) == "false");
		
		/*if(isJenAccount){
			alert("cond1 = " +cond1+ " :: cond2 = " +cond2+ " :: cond3 = " +cond3+ " :: cond4 = " +cond4+ " :: cond5 = " +cond5+ " :: for_audit = " +cond6+ " :: cond7 = " +cond7+
				  " :: cond8 = " +cond8+ " :: cond9 = " +cond9+ " :: cond10 = " +cond10+ " :: cond11 = " +cond11+ " :: cond12 = " +cond12);
			alert("successfully filed? " +(cond1 && cond2 && cond3 && cond4 && cond5 && cond7 && cond9 && cond10 && cond11 && cond12));
		}*/

		/* Processing will continue only if the form is successfully filed */
		if (cond1 && cond2 && cond3 && cond4 && cond5 && cond7 && cond9 && cond10 && cond11 && cond12) {//cond6
			"Preview".c_sectionHide(true); "Additional Note".c_sectionHide(true);
			var currUser="{!#CURR_USER.id}", currUserRole="{!#CURR_USER.role#code}", filedBy="{!R105188#id}", taxPayer="{!R95411340#id}";
			
			/* Check if ITS_REG comparison will commence */
			if( String(data['has_been_viewed']) == "false")
				filerWillContinue();
			else
				willContinue = "true";
				
			if(willContinue == "true"){
				rbf_setField(objName, objId, "successfully_filed_CB", true); 						//Flagging if Form was Successfully filed
				if("{!filing_ref_num}" == "") rbf_runTrigger(objName, objId, "^generate_frn");		//Generate an FRN				
				if((currUser == filedBy || currUser == taxPayer) && currUserRole != "$admin")
					$(":submit[value*='Continue']").show();	//Show only to the Filer OR TP
				else
					$(":submit[value*='Continue']").hide();
				
				/* Unregistered Tax Type handling (can continue, but with warning message) */
				if(!cond8){
					"Successfully Filed".c_sectionHide(false);
					"Validation Errors".c_sectionHide(true);
					"Error Message(div)".c_sectionHide(false);
				}
				
				/*--------------------- get savefile data from current form with original TP info but updated penalties --------------------------- */
				var allXML = "<?xml version='1.0'?>",tab=d.getElementById('xmlFormat').innerHTML; allXML += tab; //adds line break
				var elem = document.getElementById('frmMain').elements, selectValue, elementID_str;
				for(var i = 0; i < elem.length; i++)
				{
					if (elem[i].type != 'button' && elem[i].type != 'hidden' && elem[i].type != 'undefined') {				
						if (elem[i].type == 'text') {							
							allXML += "<div>"+elem[i].id+"=" +replaceHTMLChars(elem[i].value)+elem[i].id+"=</div>"+tab; //all select-one and text values
						}
						if (elem[i].type == 'radio' || elem[i].type == 'checkbox') {
							allXML += "<div>"+elem[i].id+"=" +elem[i].checked+elem[i].id+"=</div>"+tab; //all radio and checkbox values			
						}
						//Special handling for 'RDO Code' (JTrac #941) 
						if(elem[i].type == 'select-one'){
							selectValue = elem[i].options[elem[i].selectedIndex].innerHTML;
							elementID_str = String(elem[i].id);
							if( elementID_str.indexOf("txtRDOCode") != -1 || elementID_str.indexOf("rdoCode") != -1 || elementID_str.indexOf("txt5RDOCode") != -1 ) {
								if(rpRDO) selectValue = rpRDO; //TP RDO
							}else if( elementID_str.indexOf("txtRDOCodeS") != -1 || elementID_str.indexOf("txt7RDOCode") != -1 || elementID_str.indexOf("txtRDOCodeB") != -1 ){
								if(rpRDOCode2) selectValue = rpRDOCode2; //TP Spouse
							}
							allXML += "<div>"+elem[i].id+"=" +replaceHTMLChars(selectValue)+elem[i].id+"=</div>"+tab;
						}						
					}
				} 				
								
				allXML += tab+"All Rights Reserved BIR 2012.0"; fileData = allXML; fileData = fileData.toString();
				$('#debug1').html(fileData);
				/*--------------------- get savefile data from current form with original TP info but updated penalties --------------------------- */
				
				/* Tax Returns */
				if (!finished && parseInt("{!__of_xmls}") == 0) {
					var start=0, end=4000, repeats = Math.ceil(fileData.length / 4000), count = 0;
					do {
						if ( String(fileData.substring(start,end)).length > 0) {
							rbf_setField(objName, objId, 'xml_temp_string', fileData.substring(start,end), false);
							rbf_runTrigger(objName, objId, '^cr_taxrtrn');
						}
						start = end;
						end += 4000;
						count++;
					} while(count != repeats );
					finished = true;
				}
				
				overrideTPdata(); //Display REG_info fields
				
				/* Send email notification once, for successfully filed forms only */
				var emailSent = String( data['email_notification_sent'] );
				if(emailSent == "false"){
					rbf_runTrigger(objName, objId, "^notif_email1",true);
					rbf_runTrigger(objName, objId, "^notif_email2",true);
					rbf_runTrigger(objName, objId, "^notif_email3",true);
					rbf_setField(objName, objId, "email_notification_sent", true); //Flagging if email is already sent
				}
			}else{
				$("body").hide();
					alert("Your return has not been filed.");
					rbf_runTrigger(objName, objId, "^delete_form"); //Delete the Form record and redirected to the user's submitted tax returns
					/* Redirect user */
					if(currUserRole == "$TA" || currUserRole == "$TA_TSP"){
						//Submitted Tax Returns (TA):
						window.location.href = "https://ebirforms.bir.gov.ph/prod1/m/main.jsp?pageId=358512&tabId=20457&appId=15867"; //"{!#LINK.20457#tab} -- not working"
					}else{
						//Submitted Tax Returns (TP):
						window.location.href = "https://ebirforms.bir.gov.ph/prod1/m/main.jsp?pageId=356505&tabId=20453&appId=15867"; //"{!#LINK.20453#tab} -- not working"
					}
			} //end else willContinue
			
			/* PAYMENT TRANS (external DB >> RB Payment Track)*/
			if(isJenAccount) alert("1");
			rbf_runTrigger("upload1", parseInt("{!id}"), "^createpayment"); 
			if(isJenAccount) alert("2");
		} else {
			$(":submit[value*='Continue']").hide();
			"print_form".c_showHide(false);
			"print_form_sched".c_showHide(false);
			"filing_ref_num".c_showHide(false);
			"Successfully Filed".c_sectionHide(false);
			"Validation Errors".c_sectionHide(true);
			"Error Message(div)".c_sectionHide(false);
			"Preview".c_sectionHide(false);
			"Loading Image".c_sectionHide(false);
			"Late Filing".c_sectionHide(false);
			rbf_setField(objName, objId, "successfully_filed_CB", false); //Flagging if Form was Successfully filed
			
			if( $("#validation_errors").html() == "" ) $("#validation_errors").hide();
			if( $("#errormsg").html().indexOf("Validation successful") != - 1) $("#errormsg").hide();	
			
		} //end else successfully filed
		
		var formYear = parseInt("{!R54196.id}");
		if( !(formYear > 0) )rbf_runTrigger("upload1", parseInt("{!id}"), "^attach_year"); //Attach Return Period's Year
		
		/* Separate handling for Audit Locked forms */
		var for_audit = cond6;
		if(for_audit) { //Audit related show/hide			
			$(":submit[value*='Continue']").hide();
			"print_form".c_showHide(false);
			"print_form_sched".c_showHide(false);
			"filing_ref_num".c_showHide(true);
			"Audit Locked".c_sectionHide(true);
			"Loading Image".c_sectionHide(false);
			"Validation Errors".c_sectionHide(false);
			"Error Message(div)".c_sectionHide(false);
			"Return Form Information".c_sectionHide(true);
			"Successfully Filed".c_sectionHide(false);
			"Preview".c_sectionHide(true);		
			"Formscript Validations".c_sectionHide(false);
			"Late Filing".c_sectionHide(false);
			"Attachments".c_sectionHide(false);
			// rbf_setField(objName, objId, "successfully_filed_CB", true); //Flagging if Form was Successfully filed
		}
		
		rbf_setField(objName, objId, "has_been_viewed", true); //Flagging if Form has already been viewed --> First Load of view page
		
		rbf_getFields("upload1", parseInt("{!id}"), 'filing_ref_num', function(objName,objId,data) {
			$('#rbi_F_filing_ref_num').html( data['filing_ref_num'] );
		});
		
		"Loading Image".c_sectionHide(false);
		$('#loading_image, #load').hide();
	});
}
function replaceHTMLChars(str) {
	var newValue = "";
	newValue = String(str).replace(/>/gi,'>');
	newValue = String(newValue).replace(/</gi,'<');
	newValue = String(newValue).replace(/& /gi,'&');	
	return newValue; 
}	
function attachValidationMsg(validationMsg){
	var currentMsg = $("#validation_errors").html();
	if(currentMsg.indexOf(validationMsg) == - 1 && currentMsg.indexOf("This form has") == -1){
		currentMsg += "<b>"+validationMsg+"</b><br />";		
	}
	$("#validation_errors").html(currentMsg);
}
/* Filing Alert Messages 
	> This will determine whether the filer will still proceed with filing of the form
	> Checking will only run when there are no form errors*/
var willContinue = "false";
function filerWillContinue(){
	objId = parseInt("{!id}"), objName = "upload1"
	rbf_getFields("upload1", parseInt("{!id}"), 'data_in_synch_with_its', function(objName,objId,data) {		
		var synched = String( data['data_in_synch_with_its'] );
		var unsyncCounter = parseInt("{!unsync_its_data_filing_counter__filer}");
		if(synched == "false"){
			var continueFiling = confirm("The background information in your tax return does not match your record in ITS-Reg. "+
										 "The background information in ITS-Reg shall prevail and will be reflected in the return.\n\n"+
										 "Do you want to proceed with filing? If yes, click OK, if not, click Cancel.\n\n"+
										 "If you wish to update your ITS-Reg information, please fill up BIR Form 1905 "+
										 "and follow existing policies and procedures.");
			if (continueFiling){
				willContinue = "true";	//Continue on the Tax Return's Filing process (user triggered)
				alert("Please note that on your third filing attempt with an unsynchronized data, your account will be locked.");
				rbf_setField("USER", parseInt("{!R105188#id}"), 'unsync_its_data_filing_counter', unsyncCounter+1);	//Increment Unsync Data Counter (filer)
			}
		}else{
			willContinue = "true"; //Continue on the Tax Return's Filing process (automatic since the data is in synced with ITS_REG)
		}
	});
}
function addCommas(nStr) {
	nStr = String(nStr);
	nStr = parseFloat(nStr.replace(/,/g,""));
	nStr = nStr.toFixed(2);
	nStr += '';
	x = nStr.split('.');
	x1 = x[0];
	x2 = x.length > 1 ? '.' + x[1] : '';
	var rgx = /(\d+)(\d{3})/;
	while (rgx.test(x1)) {
		x1 = x1.replace(rgx, '$1' + ',' + '$2');
	}
	return x1 + x2;
}
function formIDFromWFXML(content) {
    if (content.indexOf("<FormName>") > -1 && content.indexOf("</FormName>") > -1) {
	return content.substring(content.indexOf("<FormName>")+10, content.indexOf("</FormName>"));
    }
}
function fastTrim (str) {
		var	str = str.replace(/^\s\s*/, ''),
			ws = /\s/,
			i = str.length;
		while (ws.test(str.charAt(--i)));
		return str.slice(0, i + 1);
}
function isLineValidForProcessing(lineContentID) {
		var strExemptedIDs = "<?xml version='1.0'?>,<BIRForm>,</BIRForm>,<FormName>,</FormName>,<FormVersion>,</FormVersion>,<ValidatedFormId>,</ValidatedFormId>,<TSPInfo>,</TSPInfo>," +
							 "<TSPId>,</TSPId>,<TSPName>,</TSPName>,<Main>,</Main>,<PartI>,</PartI>,<PartII>,</PartII>,<PartIII>,</PartIII>,<Modals>,</Modals>," +
							 "<TaxTypeCode>,</TaxTypeCode>,<Atc>,</Atc>,<AtcCode>,</AtcCode>,<AtcCodes>,</AtcCodes>,<SectionA>,</SectionA>,<Schedule1_1>,</Schedule1_1>," +
							 "<Schedule1>,</Schedule1>,<Schedule2>,</Schedule2>,<Schedule3>,</Schedule3>,<Schedule4>,</Schedule4>,<Schedule5>,</Schedule5>," +
							 "<Schedule6>,</Schedule6>,<Schedule7>,</Schedule7>,<Schedule8>,</Schedule8>,<SchedI>,</SchedI>,<SchedII>,</SchedII>" +
							 "<Schedule>,</Schedule>,All Rights Reserved BIR 2012.,All Rights Reserved BIR 2012.0"; 
							 
		if (strExemptedIDs.indexOf(lineContentID) >= 0) {
			return false;
		} else if (strExemptedIDs.indexOf(lineContentID) == -1) {
			return true;
		}		
}
function readTextAreaRows() {
    var lines;
    var TA=document.myForm.fileArea.value;
    formId = formIDFromWFXML(TA) ;
	return lines=TA.split("\n");
}	
function convertToOrigXMLForm() {
	try {	
		var arrTextAreaRows = readTextAreaRows();

		var tab="            "; 
		var tabAndEnter="\n            "; 
		var openDiv = "<div>";
		var closeDiv = "=</div>";
		var nextLine = "\r\n";
		var xmlHeader = "<?xml version='1.0'?>";

		var strOutputToTA;
		
		var response = d.getElementById('response');	

		var lineContent;
		var lineContentID;
		var lineValidForProcess = false;
		var newLineContent = "";
		
		strOutputToTA = "<?xml version='1.0'?>\n"; 
		//$('#debug1').html(arrTextAreaRows.length);
		for(var i=0; i<arrTextAreaRows.length; i++) {

		  lineContent = fastTrim(arrTextAreaRows[i]);			  
		  lineContentID = lineContent.substring(0, lineContent.indexOf(">")+1);  		  
		  lineValidForProcess = isLineValidForProcessing(lineContentID) ;	  
		  if (lineValidForProcess == true) {

			newLineContent = tab + openDiv.toLowerCase() + lineContent.substring(1, lineContent.indexOf(">")) + "=" +  //opening elementID
							 lineContent.substring(lineContent.indexOf(">")+1, lineContent.indexOf("</")) + //value
							 lineContent.substring(lineContent.indexOf("</")+2, lineContent.lastIndexOf(">")) + closeDiv.toLowerCase(); //closing elementID
		
			strOutputToTA = strOutputToTA + newLineContent + "\n";
		  } 	
		  lineValidForProcess = false;
		}
		strOutputToTA = strOutputToTA + "All Rights Reserved BIR 2012.0";
		
		$('#response').html( strOutputToTA ); //alert( "STROUT: " + strOutputToTA );
	} catch(e) {
		alert('Exception Thrown: '+e.message);
	}	
}
function loadimg() {
	$("img[src*='0605_1.jpg']").each(function() {	
		$(this).attr('src','{!#HOSTED_FILE.94686712}');
	});

	$("img[src*='0605_2.jpg']").each(function() {	
		$(this).attr('src','{!#HOSTED_FILE.94686725}');
	});

	$("img[src*='2550M.jpg']").each(function() {	
		$(this).attr('src','{!#HOSTED_FILE.94916532}');
	});

	$("img[src*='2550m_header.jpg']").each(function() {	
		$(this).attr('src','{!#HOSTED_FILE.94921064}');
	});

	$("img[src*='2550m_part1_header.jpg']").each(function() {	
		$(this).attr('src','{!#HOSTED_FILE.95528078}');
	});

	$("img[src*='2550m_part2_header.jpg']").each(function() {	
		$(this).attr('src','{!#HOSTED_FILE.95528219}');
	});

	$("img[src*='BCS.jpg']").each(function() {
	
		$(this).attr('src','{!#HOSTED_FILE.94921697}');
	});

	$("img[src*='birflog.gif']").each(function() {	
		$(this).attr('src','{!#HOSTED_FILE.94681231}');
	});

	$("img[src*='1600.jpg']").each(function() {	
		$(this).attr('src','{!#HOSTED_FILE.95524953}');
	});

	$("img[src*='1600WP.jpg']").each(function() {	
		$(this).attr('src','{!#HOSTED_FILE.95527613}');
	});

	$("img[src*='1601C.jpg']").each(function() {	
		$(this).attr('src','{!#HOSTED_FILE.95530226}');
	});

	$("img[src*='1601E.jpg']").each(function() {	
		$(this).attr('src','{!#HOSTED_FILE.95531434}');
	});

	$("img[src*='1601F.jpg']").each(function() {	
		$(this).attr('src','{!#HOSTED_FILE.95533618}');
	});

	$("img[src*='1602_header.jpg']").each(function() {	
		$(this).attr('src','{!#HOSTED_FILE.95535446}');
	});

	$("img[src*='1602.jpg']").each(function() {	
		$(this).attr('src','{!#HOSTED_FILE.95535844}');
	});

	$("img[src*='1603.jpg']").each(function() {	
		$(this).attr('src','{!#HOSTED_FILE.95546304}');
	});

	$("img[src*='1604CF.jpg']").each(function() {	
		$(this).attr('src','{!#HOSTED_FILE.95553416}');
	});

	$("img[src*='1604E.jpg']").each(function() {	
		$(this).attr('src','{!#HOSTED_FILE.95560851}');
	});

	$("img[src*='1606.jpg']").each(function() {	
		$(this).attr('src','{!#HOSTED_FILE.95575012}');
	});

	$("img[src*='1701Q.jpg']").each(function() {	
		$(this).attr('src','{!#HOSTED_FILE.95582975}');
	});

	$("img[src*='1702Q.jpg']").each(function() {	
		$(this).attr('src','{!#HOSTED_FILE.95593044}');
	});

	$("img[src*='1704_header.jpg']").each(function() {	
		$(this).attr('src','{!#HOSTED_FILE.95600907}');
	});

	$("img[src*='1704_top.jpg']").each(function() {	
		$(this).attr('src','{!#HOSTED_FILE.366030}');
	});
	
	$("img[src*='1704_bottom.jpg']").each(function() {	
		$(this).attr('src','{!#HOSTED_FILE.366031}');
	});
	
	$("img[src*='1704.jpg']").each(function() {	
		$(this).attr('src','{!#HOSTED_FILE.95600337}');
	});

	$("img[src*='1706.jpg']").each(function() {
	
		$(this).attr('src','{!#HOSTED_FILE.95607047}');
	});

	$("img[src*='1707.jpg']").each(function() {	
		$(this).attr('src','{!#HOSTED_FILE.95607266}');
	});

	$("img[src*='1800.jpg']").each(function() {
	
		$(this).attr('src','{!#HOSTED_FILE.95736394}');
	});

	$("img[src*='1801.jpg']").each(function() {	
		$(this).attr('src','{!#HOSTED_FILE.95744175}');
	});

	$("img[src*='2000.jpg']").each(function() {
	
		$(this).attr('src','{!#HOSTED_FILE.95748200}');
	});

	$("img[src*='2000OT.jpg']").each(function() {	
		$(this).attr('src','{!#HOSTED_FILE.95750382}');
	});

	$("img[src*='2200A.jpg']").each(function() {	
		$(this).attr('src','{!#HOSTED_FILE.95753327}');
	});

	$("img[src*='2200AN.jpg']").each(function() {
	
		$(this).attr('src','{!#HOSTED_FILE.95761448}');
	});

	$("img[src*='2200P.jpg']").each(function() {	
		$(this).attr('src','{!#HOSTED_FILE.95764758}');
	});

	$("img[src*='2200T.jpg']").each(function() {	
		$(this).attr('src','{!#HOSTED_FILE.95766830}');
	});

	$("img[src*='2550Q.jpg']").each(function() {	
		$(this).attr('src','{!#HOSTED_FILE.95767916}');
	});

	$("img[src*='2550q_header.jpg']").each(function() {	
		$(this).attr('src','{!#HOSTED_FILE.95768008}');
	});

	$("img[src*='2551Q.jpg']").each(function() {	
		$(this).attr('src','{!#HOSTED_FILE.95768598}');
	});

	$("img[src*='2551M.jpg']").each(function() {	
		$(this).attr('src','{!#HOSTED_FILE.95769346}');
	});

	$("img[src*='2552.jpg']").each(function() {	
		$(this).attr('src','{!#HOSTED_FILE.95769942}');
	});

	$("img[src*='2553.jpg']").each(function() {	
		$(this).attr('src','{!#HOSTED_FILE.95770324}');
	});

	$("img[src*='2200M.jpg']").each(function() {	
		$(this).attr('src','{!#HOSTED_FILE.95787548}');
	});

	$("#rbi_S_" + rbf_getSectionIdByTitle('Preview') ).find('a').css({
		"color":"#000",
		"text-decoration":"none",
		"cursor":"default"
	}).attr({
		'href':'#',
		'onclick':'return false;'
	});

	$("#rbi_S_" + rbf_getSectionIdByTitle('Preview')).find('input').css({
		"background":"#FFF"
	}).attr({
		'onclick':'return false'
	}).removeAttr('disabled');
}

//Synchronous setField
function rbf_setField(objName,id,fieldName,fieldValue,useIds) {
	var ajaxRreq=new XMLHttpRequest();
	if(!ajaxRreq) return;
	var url=rbf_getAjaxURL()+"&cmd=apiSetField&useIds="+(useIds?"true":"false")+
		"&objName="+objName+"&id="+id+"&field="+encodeURIComponent(fieldName)+
		"&value="+encodeURIComponent(fieldValue);
	ajaxRreq.open("GET",url,false);
	ajaxRreq.setRequestHeader("Content-Type","application/x-www-form-urlencoded; charset=UTF-8");
	ajaxRreq.send();
	var jsResponse=ajaxRreq.responseText;
	if(rbf_checkAjaxError(jsResponse)) return;
}
//Synchronous getFields
function rbf_getFields(objName,id,fields,callback){
	var ajaxRreq=new XMLHttpRequest();
	if(!ajaxRreq) return;	
	var url=rbf_getAjaxURL()+"&cmd=apiGetFields&output=json&objName="+
		objName+"&id="+id+"&fields="+encodeURIComponent(fields);
	ajaxRreq.open("GET",url,false);
	ajaxRreq.setRequestHeader("Content-Type","application/x-www-form-urlencoded; charset=UTF-8");
	ajaxRreq.send();
	var jsResponse=ajaxRreq.responseText;
	if(rbf_checkAjaxError(jsResponse)) return;
	var dataValues=eval('('+jsResponse+')');
	callback(objName,id,dataValues);	
}
//Synchronous runTrigger
function rbf_runTrigger(objName,id,triggerId,checkValidation){
	var ajaxRreq=new XMLHttpRequest();
	if(!ajaxRreq) return;
	var url=rbf_getAjaxURL()+"&cmd=apiRunTrigger&objName="+
		objName+"&id="+id+"&eventId="+encodeURIComponent(triggerId)+
		(checkValidation!=null&&checkValidation==true?"&checkValidation=true":"");
	ajaxRreq.open("GET",url,false);
	ajaxRreq.setRequestHeader("Content-Type","application/x-www-form-urlencoded; charset=UTF-8");
	ajaxRreq.send();
	var jsResponse=ajaxRreq.responseText;
	if(rbf_checkAjaxError(jsResponse)) return;
}
</script>