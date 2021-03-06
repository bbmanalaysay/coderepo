<style>
.vcenter a { display:none; }
span { font-weight: bolder; font-size: 14px;}
#tin { letter-spacing: 1px; }
</style>
<script>
$(document).ready(function(){
	$("input[value*='Clear']").hide().after("<input type='button' value=' Clear ' class='bold' onClick='clearAll();' />");
	$("input[value*='Search']").attr("disabled","disabled");
	$(".rbs_rightLabelWide").each(function(){
		var thisLabel = $(this).html();
		if(thisLabel.indexOf("equals") != -1){
			$(this).html(thisLabel.substring(0, thisLabel.indexOf("equals")));
		}
	});
	numOnly(0);
	searchLength(0,15);
	searchButton(0,15);
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
function searchButton(pos,len, numOnly){	
	var inputElem = $("input[name*='opValueDet"+pos+"']");	
	inputElem.after("<div style='text-indent: 3px;font-size: 10px;'><p id = 'tin'>Format: ###<span>-</span>###<span>-</span>###<span>-</span>###</p></div>");
	//Bind KeyUp event
	inputElem.keyup(function(evt) {
		var charCode = (evt.which) ? evt.which : event.keyCode;
		if (charCode != 8 && charCode != 37 && charCode != 39 && charCode != 46 ) $(this).val( rbf_formatUsingMask( $(this).val() , "###-###-###-###") );
		//exclude backspace, delete, left, and right arrows
		if( String( $(this).val() ).length == len ) {
			$("input[value*='Search']").removeAttr("disabled");
			if (charCode == 13) $("input[value*='Search']").click();
		} else	
			$("input[value*='Search']").attr("disabled","disabled");
	});
	inputElem.focusout(function(evt) {
		var charCode = (evt.which) ? evt.which : event.keyCode;
		if (charCode != 8 && charCode != 37 && charCode != 39 && charCode != 46 ) $(this).val( rbf_formatUsingMask( $(this).val() , "###-###-###-###") );
		//exclude backspace, delete, left, and right arrows
		if( String( $(this).val() ).length == len )
			$("input[value*='Search']").removeAttr("disabled");
		else	
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
}
$("input[name*='opValueDet']").val("");	//clear onload
</script>