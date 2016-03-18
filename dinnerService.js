// Here we create an Angular service that we will use for our 
// model. In your controllers (or other services) you can include the
// dependency on any service you need. Angular will insure that the
// service is created first time it is needed and then just reuse it
// the next time.
dinnerPlannerApp.factory('Dinner',function ($resource, $cookieStore) {
  
  var guests = 3;
  var menu = [];
  var cost = ["0.00"];

  var activeDish = 0;



  this.setActiveDish = function(id){
    activeDish = this.getDish(id);
  }

  this.getActiveDish = function(){
    return activeDish;
  }

  this.setNumberOfGuests = function(num) {
    guests = num;
    //$cookieStore.remove('guests')
    $cookieStore.put('guests', guests)
  }

  // should return 
  this.getNumberOfGuests = function() {
    //TODO Lab 2
    var guests = $cookieStore.get('guests')
    return guests;

  }

  //Returns the dish that is on the menu for selected type 
  this.getSelectedDish = function(type) {
    //TODO Lab 2

    var typelist = [];

    for (i = 0; i < dishes.length; i++) {
        if(dishes[i].type == type) {
          typelist.push(dishes[i]);
        }
      }
    return typelist;

  }

  //Returns all the dishes on the menu.
  this.getFullMenu = function() {
    //TODO Lab 2
    var cookie = $cookieStore.get('menu')
    var objects = [];

    if (cookie != undefined) {
      menu = $cookieStore.get('menu')
    //   console.log('get menu if')
     }


    for (var i = 0; i < menu.length; i++) {
         this.Dish.get({id:menu[i]},function(data){
           var dish = data;
           console.log(menu[i])
          objects.push(data);
      })
     }
     console.log(objects)
    return objects;
  }

  this.getDishPrice = function(dish) {
    if (dish === undefined) {
         console.log("hundefined")
       }
    else{
      totprice = 0
      var item = dish.Ingredients
      for (var i = 0; i < item.length; i++){
        var itemprice = 1;
        ingrprice = itemprice * item[i].Quantity;
        totprice = totprice + ingrprice;
      }
      totprice = totprice * guests
      return totprice;
    }
      // var item = dish.Ingredients;
      // console.log('getDishPrice',dish)
      // var totprice = 0;

      // for (var i = 0; i < item.length; i++) {
      //   var itemprice = 1;
      //   ingrprice = itemprice * item[i].Quantity;
      //   totprice = totprice + ingrprice;
      // }

      // totprice = totprice * guests;
      // totprice = Number(totprice.toFixed(2))
    }


  //Returns all ingredients for all the dishes on the menu.
  this.getAllIngredients = function() {
    //TODO Lab 2
  }

  this.totalPrice = function(dish){
    
    var totprice = 0;  

    if (dish.length == 0){
      console.log("tomt")
    }
    else{
      
      for(var i=0; i<dish.length; i++){
        console.log(dish[i].Ingredients)
        var item = dish[i].ingredients
        for(var j=0; j<item.length; j++){
          var itemprice = 1;
          ingrprice = itemprice * item[i].Quantity;
          totprice = totprice + ingrprice;
        }
        console.log(totprice)
      }

    }
    return totprice;
  }

  //Returns the total price of the menu (all the ingredients multiplied by number of guests).
  this.getTotalMenuPrice = function() {
    //TODO Lab 2
    var totcost = 0;
    if (menu.length == 0){
      totcost = 0;
      console.log("det är tomt")
    } 
    else {
      for (var j =0; j < menu.length; j++){
        //this.Dish.get({id:menu[j]},function(data){
          // var dish = data;
          // console.log(dish)
          //})
        //var menuobj = this.Dish(menu[j])
        //console.log(menuobj)
        //totcost = totcost + this.getDishPrice(menu[j])
        totcost=10;
      }
    }
    //var menuobj = this.getFullMenu();
    // var totcost = 0;

    // for (var j = 0; j < menu.length; j++) {
    //   totcost = totcost + this.getDishPrice(menuobj[j]);
    // }
    // totcost = Number(totcost.toFixed(2))
    return totcost;
  }

  //Adds the passed dish to the menu. If the dish of that type already exists on the menu
  //it is removed from the menu and the new one added.
  this.addDishToMenu = function(dish) {
    
   var cookie = $cookieStore.get('menu')

    if (cookie != undefined) {
       menu = $cookieStore.get('menu')
     }

   // menu.push(dish)
    menu.push(dish.RecipeID)
   $cookieStore.put('menu', menu)
    //console.log($cookieStore.put('menu', menu))
    //TODO Lab 2 
  }

  //Removes dish from menu
  this.removeDishFromMenu = function(id) {
    //TODO Lab 2
    for (var j = 0; j < menu.length; j++) {
      if (menu[j] == id){
        menu.splice(j,1);
        break;
      }
    }
    $cookieStore.put('menu', menu)
    location.reload()
  }




this.DishSearch = $resource('http://api.bigoven.com/recipes',{pg:1,rpp:25,api_key:'sV1fPGQKrO0b6oUYb6w9kLI8BORLiWox'});
this.Dish = $resource('http://api.bigoven.com/recipe/:id',{api_key:'sV1fPGQKrO0b6oUYb6w9kLI8BORLiWox'});






  // TODO in Lab 5: Add your model code from previous labs
  // feel free to remove above example code
  // you will need to modify the model (getDish and getAllDishes) 
  // a bit to take the advantage of Angular resource service
  // check lab 5 instructions for details



  // Angular service needs to return an object that has all the
  // methods created in it. You can consider that this is instead
  // of calling var model = new DinnerModel() we did in the previous labs
  // This is because Angular takes care of creating it when needed.
  return this;

});