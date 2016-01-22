var app = angular.module('RecipeBrowser', []);

app.controller('RecipeController', function($scope,$http) {
   var recipes = {}

   $scope.recipes = recipes;
   $scope.selectRecipe = function(recipe) { $scope.recipes.selectedRecipe = recipe; };

   app.loadRecipes(recipes,$http,'recipes.json');
});


app.loadRecipes = function(recipes,$http,filename) {
   // Load the recipe data

   $http.get(filename)
   .success(function(data) {
      // Calculate list of categories

      var cats = {};
      selectedRecipe = null;
      data.forEach(function (e,i) {
         var cat = e.Category;
         if (!(cat in cats)) {
            cats[cat] = [];
         }
         cats[cat].push(e);
      });
      for (var cat in cats) {
         cats[cat].sort(function(a,b) { return (a.Recipe < b.Recipe) ? -1 : (a.Recipe == b.Recipe) ? 0 : 1; });
         if (selectedRecipe == null) {
             selectedRecipe = cats[cat][0];
         }
      }
      recipes.selectedRecipe = selectedRecipe;
      recipes.categories = cats;
   })
   .error(function(data,status,error,config){
      recipes = [{heading:"Error",description:"Could not load json data"}];
   });
};
