function checkCategories(){var a=$("#parentCategory").val(),b=$("#category").val();parseInt(a)&&(current_data={},getDataCategories(a).success(function(a){$.each(a.categories,function(a,b){current_data[b.id]=b.description})})),168==b?$("#categoryText").prop("disabled",!1):$("#categoryText").prop("disabled","disabled")}function getSubCategory(a){$select=$("#category"),$textarea=$("#categoryText"),$textarea.val(""),$textarea.prop("disabled","disabled"),$select.find("option").remove(),$select.append('<option value="">Loading...</option>'),$select.prop("disabled","disabled"),current_data={},parseInt(a)?getDataCategories(a).success(function(a){$select.find("option").remove(),$select.append('<option value="">Please Select</option>'),$.each(a.categories,function(a,b){$select.append("<option value="+b.id+">"+b.description.substring(0,73)+"</option>"),current_data[b.id]=b.description}),$select.prop("disabled",!1)}):($select.find("option").remove(),$select.append('<option value="">Please Select</option>'))}function getDescription(){if(subCategory=$("#category").val(),$textarea=$("#categoryText"),$textarea.prop("disabled","disabled"),""==subCategory)$textarea.val("");else if(168==subCategory){$textarea.prop("disabled",!1),$textarea.val("User defined: ");var a=$textarea.val().length;$textarea.focus(),$textarea[0].setSelectionRange(a,a)}else $textarea.val(current_data[subCategory])}function getDataCategories(a){return $.ajax({type:"POST",url:"/ajax/convictions/categories",dataType:"json",data:{parent:a}})}function showDependantTypeFields(a){"defendant_type.operator"==$(a).val()?($("#personFirstname, #personLastname").val(""),$("#personFirstname, #personLastname").parent().addClass("visually-hidden"),$("[name='defendant-details[dateOfBirth][month]']").parent().addClass("visually-hidden"),$("#operatorName").parent().removeClass("visually-hidden")):($("#personFirstname, #personLastname").parent().removeClass("visually-hidden"),$("#operatorName").val(""),$("#operatorName").parent().addClass("visually-hidden"),$("[name='defendant-details[dateOfBirth][month]']").parent().removeClass("visually-hidden"))}function checkVenueOther(){var a=$("#piVenue").val();toggleVenueOther(""===a||a>0?"hide":"show")}function checkImpoundingType(){var a=$("#impoundingType").val();switch(a){case"impounding_type.1":toggleHearingFieldset("show");break;default:toggleHearingFieldset("hide")}}function toggleVenueOther(a){"show"===a?($("#piVenueOther").show(),$('label[for="piVenueOther"]').show()):($("#piVenueOther").val(""),$("#piVenueOther").hide(),$('label[for="piVenueOther"]').hide())}function toggleHearingFieldset(a){"show"===a?($("fieldset:eq(1) select, fieldset:eq(1) input").prop("disabled",!1),$("fieldset:eq(1)").show()):($("fieldset:eq(1) select, fieldset:eq(1) input").prop("disabled","disabled"),$("fieldset:eq(1)").hide())}
//# sourceMappingURL=internal.map