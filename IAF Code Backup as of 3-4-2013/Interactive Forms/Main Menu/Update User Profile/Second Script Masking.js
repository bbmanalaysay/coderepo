<style>
#rbi_L_answer, #rbi_L_confirm_answer_temp { visibility:hidden; }
#rbi_F_answer input, #rbi_F_confirm_answer_temp input, #rbi_F_answer font br, #rbi_F_confirm_answer_temp font br { display:none; }
#rbi_F_answer, #rbi_F_confirm_answer_temp { vertical-align:top; }
#rbi_F_R49114{ padding-bottom:20px; }
</style>

<tr>
<td class="rbs_rightLabelRequired"><label for="passMasked">Answer</label></td>
<td class="rbs_leftDataCol"><input type="password" onkeyup="storePass();" id="passMasked"/></td>
</tr>


<script>
$(document).ready(function(){
	var answer1 = rbf_getFieldValue("answer");
	var answer2 = rbf_getFieldValue("confirm_answer_temp");
	
	$("#passMasked").val( answer1 );
	$("#passMasked2").val( answer2 );	
});

function storePass(){ 
	$("#answer").val($("#passMasked").val()).blur();
}
function storePass2(){ 
	$("#confirm_answer_temp").val($("#passMasked2").val()).blur(); 
}
</script>