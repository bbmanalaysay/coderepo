<style>
.vcenter a { display:none; }
span { font-weight: bolder; font-size: 14px;}
#tin { letter-spacing: 1px; }
</style>
<script>
$(document).ready(function(){

	/* Retain only the field name */
	var thisLabel, remove1, remove2;
	$(".rbs_rightLabel").each(function(){
		thisLabel = $(this).html();
		/* Everything after these characters/words will be removed */
		remove1 = thisLabel.indexOf("[");
		remove2 = thisLabel.indexOf("[locationId]");
		remove3 = thisLabel.indexOf("[taxpayer_identification_number]");
		if(remove1 != -1) $(this).html(thisLabel.substring(0, remove1));
		if(remove2 != -1) $(this).html(thisLabel.substring(0, remove2));
		if(remove3 != -1) $(this).html(thisLabel.substring(0, remove3));			
	});
	
	
	$("input[value*='Clear']").hide().after("<input type='button' value=' Clear ' class='bold' onClick='clearAll();' />");
	//$("input[value*='Search']").attr("disabled","disabled");
	numOnly(2);
	searchLength(2,15);
	searchButton(2,15, false);
	$('body').on('keypress',function(evt) {
		var charCode = (evt.which) ? evt.which : event.keyCode;
		if (charCode == 13) return false;
	});
});
/* Enable|Disable the 'Search' button 
- added masking
- added max length parameter
- new function searchLength
- new function for number only */
function searchButton(pos,len, disable){	
	var inputElem = $("input[name*='opValueDet"+pos+"']");	
	inputElem.after("<div style='text-indent: 3px;font-size: 10px;'><p id = 'tin'>Format: ###<span>-</span>###<span>-</span>###<span>-</span>###</p></div>");
	//Bind KeyUp event
	inputElem.keyup(function(evt) {
		var charCode = (evt.which) ? evt.which : event.keyCode;
		if (charCode != 8 && charCode != 37 && charCode != 39 && charCode != 46 ) $(this).val( rbf_formatUsingMask( $(this).val() , "###-###-###-###") );
		//exclude backspace, delete, left, and right arrows
		if( String( $(this).val() ).length == len && disable ) {
			$("input[value*='Search']").removeAttr("disabled");
			if (charCode == 13) $("input[value*='Search']").click();
		} else if (!disable) {
			if (charCode == 13) $("input[value*='Search']").click();
		} else
			$("input[value*='Search']").attr("disabled","disabled");
	});
	inputElem.focusout(function(evt) {
		var charCode = (evt.which) ? evt.which : event.keyCode;
		if (charCode != 8 && charCode != 37 && charCode != 39 && charCode != 46 ) $(this).val( rbf_formatUsingMask( $(this).val() , "###-###-###-###") );
		//exclude backspace, delete, left, and right arrows
		if( String( $(this).val() ).length == len && disable ) {
			$("input[value*='Search']").removeAttr("disabled");
			if (charCode == 13) $("input[value*='Search']").click();
		} else if (!disable) {
			if (charCode == 13) $("input[value*='Search']").click();
		} else
			$("input[value*='Search']").attr("disabled","disabled");
	});		
}
function searchLength(pos,len) {
	$("input[name*='opValueDet"+pos+"']").attr('maxlength',len);
}
function numOnly(pos) {
	var inputElem = $("input[name*='opValueDet"+pos+"']");
	//Bind keypress events
	inputElem.attr({
		"onkeydown":"return c_numerical(event,false);",
		"onkeypress":"return c_numerical(event,false);"
	});
}
function clearAll() {
	$("input[name*='opValueDet']").val("").focusout();
        $("select[name='opValueDet1']").prop('selectedIndex', 0);
        $("select[name='opValueDet7']").prop('selectedIndex', 0);
}
$("input[name*='opValueDet']").val("");	//clear onload
</script>