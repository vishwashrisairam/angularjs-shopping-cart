var app=angular.module("cart",["ngRoute","LocalStorageModule","angularUtils.directives.dirPagination"]);

app.config(function($routeProvider){
	$routeProvider
		.when("/items",{
			templateUrl:"item-list.html",
			controller:"ItemL"
		})
		.when("/cart",{
			templateUrl:"cart.html",
			controller:"CartListCntroller"
		})
		.otherwise({
			redirectTo:"/items"
		});

});

app.config(function (localStorageServiceProvider) {
  localStorageServiceProvider
    .setPrefix('cart');
});

app.factory("itemService",function(){
	var items=[
		{
			imgUrl: "1.jpeg",
			name: "Adultery",
			price: 205,
			rating: 4,
			binding: "Paperback",
			publisher: "Random House India",
			releaseDate: "12-08-2014",
			details: "Linda, in her thirties, begins to question the routine and predictability of her days. In everybodys eyes, she has a perfect life-happy marriage, children and a career. Yet what she feels is an eno... <a href='#'>View More<a>"
		},
		{
			imgUrl: "2.jpeg",
			name: "Geronimo Stilton Spacemice#2 : You're Mine, Captain!",
			price: 168,
			rating: 5,
			binding: "Paperback",
			publisher: "Scholastic",
			releaseDate: "01-07-2014",
			details: "Geronimo Stilton meets outer space in this cosmically fun spin-off series!Meet Geronimo StiltonixHe is a spacemouse - the Geronimo Stilton of a parallel universe! He is captain of the spaceship Mou... View More"
		},
		{
			imgUrl: "3.jpeg",
			name: "Life or Death",
			price: 339,
			rating: 4,
			binding: "Paperback",
			publisher: "Hachette India",
			releaseDate: "01-04-2014",
			details: "Why would a man escape from prison the day before he's due to be released? Audie Palmer has spent a decade in prison for an armed robbery in which four people died, including two of his gang. Five... View More"
		},
		{
			imgUrl: "1.jpeg",
			name: "Introduction to Algorithms",
			price: 205,
			rating: 5,
			binding: "Paperback",
			publisher: "Cormen",
			releaseDate: "12-08-2014",
			details: "Bible of this subject"
		},
	];

	return {
		getItems:function(){
			return items;
		},
		addToCart:function(item){

		}
	}
});

app.factory("cartService",function(localStorageService){
	var cart=[];
	return {
		getCart:function(item){
			//return cart;
			return JSON.parse(localStorage.getItem("cart"));
		},
		addToCart:function(item){
			cart.push(item);
			localStorage.setItem("cart",JSON.stringify(cart));
		},
		buy:function(item){
			alert("Thanks for buying.Do visit again.");
		}

	}

});



app.controller("ItemL",function($scope,itemService,cartService){
	$scope.items=itemService.getItems();


	$scope.addToKart=function(item){
		cartService.addToCart(item);
	}
});

app.controller("CartListCntroller",function($scope,cartService){
	$scope.items=cartService.getCart();

	$scope.buy=function(item){
		cartService.buy(item);
	},

	$scope.removeItem = function(index) {
        $scope.items.splice(index, 1);
    },

	$scope.total = function() {
        var total = 0;
        angular.forEach($scope.items, function(item) {
            total += item.quantity * item.price;
        })

        return total;
    }
});