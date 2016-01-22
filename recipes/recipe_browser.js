var app = angular.module('RecipeBrowser', []);

app.controller('RecipeController', function($scope,$http) {
   $scope.categories = null;
   $scope.selectedRecipe = null;

   app.loadRecipes($scope,$http,'recipes.json');

   $scope.selectRecipe = function(recipe) { $scope.selectedRecipe = recipe; };
});


app.loadRecipes = function($scope,$http,filename) {
   // Load the recipe data

   $http.get(filename)
   .success(function(data) {
      var recipes = data;

      // Calculate list of categories

      var cats = {};
      recipes.forEach(function (e,i) {
         var cat = e.Category;
         if (!(cat in cats)) {
            cats[cat] = [];
         }
         cats[cat].push(e);
      });
      for (var cat in cats) {
         cats[cat].sort(function(a,b) { return (a.Recipe < b.Recipe) ? -1 : (a.Recipe == b.Recipe) ? 0 : 1; });
         if ($scope.selectedRecipe == null) {
            $scope.selectedRecipe = cats[cat][0];
         }
      }
      $scope.categories = cats;
   })
   .error(function(data,status,error,config){
      $scope.recipes = [{heading:"Error",description:"Could not load json data"}];
   });
};
