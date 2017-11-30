var app = angular.module('App', []);
app.controller('AppController', function($scope) {
	$scope.contacts = [
		{
			name: 'Mark',
			age: 34,
			gender: 'Male'
		},
		{
			name: 'Sarah',
			age: 29,
			gender: 'Female'
		},
		{
			name: 'Jacob',
			age: 5,
			gender: 'Male'
		},
		{
			name: 'Abigail',
			age: 0,
			gender: 'Female'
		}];
		
	$scope.sortOrderOptions = ['name','age','gender'];
	$scope.sortOrder = 'name';
	$scope.genderFilter = [];
	$scope.currentFilters = {
		gender: false,
		name: false
	}
	
	$scope.hideFilter = function(filter) {
		if (filter === 'gender') {
			for (var i = 0; i < $scope.genderFilter.length; i++) {
				$scope.genderFilter[i].selected = false;
			}
			$scope.currentFilters.gender = false;
		}
		if (filter === 'name') {
			$scope.nameFilter = "";
			$scope.currentFilters.name = false;
		}
	}
	
	for (var i = 0; i < $scope.contacts.length; i++) {
		buildGenderFilter($scope.contacts[i]);
	}
	
	function buildGenderFilter(contact) {
		var gender = {
			name: contact.gender,
			count: 1,
			selected: false
		};
    
		var genderAdded = false;
		for (var i = 0; i < $scope.genderFilter.length; i++) {
			if ($scope.genderFilter[i].name === contact.gender) {
				$scope.genderFilter[i].count++;
				genderAdded = true;
				break;
			}
		}
    
		if (!genderAdded) {
			$scope.genderFilter.push(gender);
		}
	}
})
.filter('byGender', function () {
	return function (items, gender, currentFilters) {

		if (typeof items == 'undefined') {
			return;
		}

		if (typeof gender == 'undefined') {
			return items;
		}

		var noneSelected = true;
		for (var j = 0; j < gender.length; j++) {
			if (gender[j].selected) {
				noneSelected = false;
			}
		}

		if (noneSelected) {
			return items;
		}

		var filtered = [];
		var filterSelected = false;
		
		for (var i = 0; i < items.length; i++) {
			var item = items[i];

			for (var j = 0; j < gender.length; j++) {
				if (item.gender == gender[j].name && gender[j].selected) {
					filterSelected = true;
					filtered.push(item);
				}
			}			
		}
		
		if (filterSelected) {
			currentFilters.gender = true;
		}

		return filtered;
	}
})
.filter('byName', function () {
	return function (items, name, currentFilters) {

		var filterinuse = false;

		if (typeof items == 'undefined') {
			return;
		}

		if (typeof name == 'undefined') {
			return items;
		}

		var filtered = [];

		for (var i = 0; i < items.length; i++) {
			var item = items[i];

			if (item.name.toLowerCase().indexOf(name.toLowerCase()) != -1) {
				filtered.push(item);
			}
		}

		if (name != "") {
			filterinuse = true;
		}

		currentFilters.name = filterinuse;

		return filtered;
	};
});