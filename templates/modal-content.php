<?php include 'includes/page-header.php';  ?>
<form>
	<fieldset id="postal-address">
		<div class="field">
			<label for="address__line-one">Address line 1</label>
			<input id="address__line-one" type="text" class="address__line long" />
		</div>
		<div class="field">
			<label for="address__line-two">Address line 2</label>
			<input id="address__line-two" type="text" class="address__line long" />
		</div>
		<div class="field">
			<label for="town">Town/City</label>
			<input id="town" type="text" class="town long" />
		</div>
		<div class="field">
			<label for="postcode">Postcode</label>
			<input id="postcode" type="text" class="postcode short" />
		</div>
	</fieldset><!-- end fieldset- postal-address -->
	<div class="actions">
		<input class="button--primary" type="submit" value="Save">
		<input class="button--secondary" type="submit" value="Cancel">
	</div><!-- end actions -->
</form>
