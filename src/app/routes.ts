config.$inject = ["$routeProvider"];
export function config($routeProvider: ng.route.IRouteProvider): void {
    $routeProvider
        .when("/", {
            template: "<gnome-list></gnome-list>"
        })
        .when("/about", {
            template: "<page-about></page-about>"
        })
        .otherwise({redirectTo : '/'});
}