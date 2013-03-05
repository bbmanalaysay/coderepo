<style>
.rbs_ComponetHeaderInfo, #rbi_L_rolechange, #rbi_F_rolechange { display:none; }
.detailHTMLCol{ padding-top:20px; }
td.rbs_leftDataColWide{ padding-left: 50px; }
td.rbs_rightLabelWide, td.rbs_rightLabel3, td.rbs_rightLabel, rbs_rightWideLabelRequired { border:0px }
#rbi_S_99512550{ padding-bottom: 10px; }
#taTR{ float:left; }
#tspTR{ float:left; }
#no_downgrading{
	color: red;
	border: 1px #CCC solid;
	padding: 5px;
	background: #FFC;
}
</style>

<script>
var d = document, currRole = "{!#CURR_USER.role#code}";
"No Downgrading".c_sectionHide(false);
$(d).ready(function(){
	hideCBRoles();
	toggleTAdetails();
	alertTSP();
	d.theForm.rolechange.checked = true; //used for auto-logout
	//Moves the Position of the checkboxes:
	$('#taTR').append( $("#rbi_F_is_tax_agent").attr('nowrap','nowrap') );
	$('#taTR').append( $("#rbi_L_is_tax_agent").attr('nowrap','nowrap') );
	$('#tspTR').append( $("#rbi_F_tax_software_provide").attr('nowrap','nowrap') );
	$('#tspTR').append( $("#rbi_L_tax_software_provide").attr('nowrap','nowrap') );
});

function toggleTAdetails(){
	var isTA = rbf_isChecked("is_tax_agent");
	
	//Enable|Disable Tax Agent Corresponding Fields:
	if(isTA){
		$("#gpp_company").removeAttr('disabled');
		$("#accreditation_number").removeAttr('disabled');		
		$("#rbi_L_accreditation_number").attr("class","rbs_rightWideLabelRequired").css("border","0px");
	}else{
		$("#gpp_company").attr('disabled','disabled');
		$("#accreditation_number").attr('disabled','disabled');
		$("#rbi_L_accreditation_number").attr("class","rbs_rightLabel").css("border","0px");;		
		
		"Tax Agent".c_clearSection();
	}
}

/* Hides the corresponding sections for updating current user's role:
	> if user is enrolled as TP - update user role is TA and TSP
	> if user is enrolled as TP/TA - update user role is TSP only
	> if user is enrolled as TP/TA/TSP - user will no longer be able to udpate his/her role
	
	Note: Downgrading/Removal of user role is no longer allowed (JTrac #463)*/	
function hideCBRoles(){	
	if(currRole == "$TA"){
		"Tax Agent".c_sectionHide(false);
		"Tax Agent CB".c_sectionHide(false);
		"Tax Agent Details".c_sectionHide(false);
	}else if(currRole == "$TSP"){
		"Tax Software Provider".c_sectionHide(false);
	}else if(currRole == "$TA_TSP"){
		"Tax Agent".c_sectionHide(false);
		"Tax Agent CB".c_sectionHide(false);
		"Tax Agent Details".c_sectionHide(false);
		"Tax Software Provider".c_sectionHide(false);
		"No Downgrading".c_sectionHide(true);
		"Please choose your User Classification if applicable.".c_sectionHide(false);
		$(":submit[value*='Save']").hide();
	}
}

/* Displays an alert popup when upgrading to TSP role (JTrac #892)*/
function alertTSP(){
	var isTSP = rbf_isChecked("tax_software_provide");
	if(currRole != "$TSP" && currRole != "$TA_TSP" && isTSP){ //show alert message once only
		var buttonVal;
		$(".rbs_recordActionCol > input").each( function (){
			buttonVal = String($(this).val());
			if( buttonVal.indexOf("Save") != -1 ){
				$(this).on('click',function() {
					alert("Please go to the RDO to submit additional requirements for TSP.");
						this.enabled=false;
						return true;
				});
			} 
		});
	}
}

/* Clear ALL the fields in the desired section */
String.prototype.c_clearSection = function() {
	$('input',"#rbi_S_"+rbf_getSectionIdByTitle(this) ).val('');
	$('select',"#rbi_S_"+rbf_getSectionIdByTitle(this) ).each(function() {
		this.selectedIndex = 0;
	});
};
</script>