function calculate(){
	const gender = input.get('gender').raw();
	const activity = input.get('activity').index().val();
	const formula = input.get('formula').index().val();
	const goal = input.get('goal').index().val();
	const weight = input.get('weight').gt(0).val();
	let height = input.get('height').gt(0).val();
	let age = input.get('age').natural().gte(15).lte(80).val();
	let bodyFat = 0;
	if(!input.valid()) return;

	if(formula === 2){
		bodyFat = input.get('fat').gt(0).val();
		if(!input.valid()) return;
	}
	const weightUnit = isMetricSystem() ? 'kg' : 'lb';
	let bmr = 0;
	let activityVal = 1;
	switch(activity){
		case 0:
			activityVal = 1;
			break;
		case 1:
			activityVal = 1.2;
			break;
		case 2:
			activityVal = 1.375;
			break;
		case 3:
			activityVal = 1.465;
			break;
		case 4:
			activityVal = 1.55;
			break;
		case 5:
			activityVal = 1.725;
			break;
		case 6:
			activityVal = 1.9;
			break;
	}
	let goalVal = 0;
	switch(goal){
		case 0:
			goalVal = 1;
			break;
		case 1:
			goalVal = -250;
			break;
		case 2:
			goalVal = -500;
			break;
		case 3:
			goalVal = -1000;
			break;
		case 4:
			goalVal = 250;
			break;
		case 5:
			goalVal = 500;
			break;
		case 6:
			goalVal = 1000;
			break;
	}
	switch(formula) {
		case 0:
			if(gender === 'male') {
				bmr = (10 * weight + (6.25 * height) - (5 * age) + 5);
			}
			else {
				bmr = (10 * weight + (6.25 * height) - (5 * age) - 161);
			}
			break;
		case 1:
			if(gender === 'male') {
				bmr = (13.397 * weight + (4.799 * height) - (5.677 * age) + 88.362);
			}
			else {
				bmr = (9.247 * weight + (3.098 * height) - (4.330 * age) + 447.593);
			}
			break;
		case 2:
			bmr = (370 + 21.6 * (1 - (bodyFat / 100)) * weight);
			break;
	}
	bmr = bmr * activityVal + goalVal;
	const protein = bmr / 4;
	const carbs = bmr / 4;
	const fat = bmr / 9;
	_('no-activity-protein').innerHTML = (protein * 0.243267).toFixed(0);
	_('no-activity-carbs').innerHTML = (carbs * 0.5325).toFixed(0);
	_('no-activity-fat').innerHTML = (fat * 0.2564).toFixed(0);

	_('low-fat-protein').innerHTML = (protein * 0.26878462143684942).toFixed(0);
	_('low-fat-carbs').innerHTML =  (carbs * 0.5596844332450851).toFixed(0);
	_('low-fat-fat').innerHTML = (fat * 0.2).toFixed(0);

	_('low-carb-protein').innerHTML = (protein * 0.2926009802983424).toFixed(0);
	_('low-carb-carbs').innerHTML = (carbs * 0.427).toFixed(0);
	_('low-carb-fat').innerHTML = (fat * 0.3062).toFixed(0);

	_('high-protein-protein').innerHTML = (protein * 0.342).toFixed(0);
	_('high-protein-carbs').innerHTML = (carbs * 0.4525).toFixed(0);
	_('high-protein-fat').innerHTML = (fat * 0.23).toFixed(0);


	$$('.sugar').forEach(function(el){
		el.innerHTML = '<' + (carbs * 0.5325 / 5).toFixed(0);
	})
	$$('.saturated-fat').forEach(function(el){
		el.innerHTML = '<' + (fat * 0.2564 * 0.4).toFixed(0);
	});
	$$('.energy').forEach(function(el){
		el.innerHTML = numberWithCommas(bmr.toFixed(0));
	});
}

function numberWithCommas(x) {
	return x.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
