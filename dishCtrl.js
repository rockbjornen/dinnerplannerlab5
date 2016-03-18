// Dinner controller that we use whenever we want to display detailed
// information for one dish
dinnerPlannerApp.controller('DishCtrl', function ($scope,$routeParams,Dinner,$location) {
  
  // TODO in Lab 5: you need to get the dish according to the routing parameter
   //$scope.dishid = $routeParams.dishId


   $scope.getdish = function(dishid){
   	Dinner.Dish.get({id:dishid},function(data){
	     $scope.dish=data
   		//$scope.dish=data;
   	})
   	}

   	$scope.getdish($routeParams.dishId)


  $scope.getNumberOfGuests = function() {
    return Dinner.getNumberOfGuests();
  }

    $scope.dishCost = function(dish){
      return Dinner.getDishPrice(dish);
  }


    $scope.ingredQuantity = function(ingr) {
      var quant = ingr.Quantity.toFixed(2);
      var quant = quant * $scope.getNumberOfGuests();
      return quant;
    }


    $scope.ingredPrice = function(ingr) {
      var ingrprice = ingr.Quantity * 1;
      var ingrprice = ingrprice * $scope.getNumberOfGuests();
      return ingrprice;
    }



    $scope.back = function(path){
      $location.path(path);
    };


    $scope.adddish = function(dish){
      Dinner.addDishToMenu(dish)
    };
   
  // Check the app.js to figure out what is the paramName in this case
  
});