// Dinner controller that we use whenever we have view that needs to 
// display or modify the dinner menu
dinnerPlannerApp.controller('DinnerCtrl', function ($scope,Dinner, $location) {

	$scope.menu = Dinner.getFullMenu();
  $scope.numberOfGuests = Dinner.getNumberOfGuests();

  $scope.dishPrice = function(dish){
  	return Dinner.getDishPrice(dish);
  }

 // $scope.menuPrice = function(){
 // 	return Dinner.getTotalMenuPrice();
 // }

 $scope.menuPrice = function(){
    console.log($scope.menu)
    var price = Dinner.totalPrice($scope.menu)
    return 10;
  }

  $scope.setNumberOfGuest = function(number){
    Dinner.setNumberOfGuests(number);
  }

  $scope.getNumberOfGuests = function() {
    return Dinner.getNumberOfGuests();
  }

  $scope.remove = function(dish){
    Dinner.removeDishFromMenu(dish);
  }

  $scope.confirm = function(path){
      $location.path(path);
  };

  $scope.printclick = function(path){
    $location.path(path);
  };

   $scope.editclick = function(path){
    $location.path(path);
  };

  // TODO in Lab 5: Implement the methods to get the dinner menu
  // add dish to menu and get total menu price

});