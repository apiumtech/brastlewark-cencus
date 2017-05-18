/**
 * Created by ecobos on 5/16/17.
 */
export class AppComponent implements ng.IDirective {
    public template: string = require("./app.html");
    public restrict: string = "E";
    public replace: boolean = true;
    public controller: Function = AppComponentCtrl;
    public controllerAs: string = 'Ctrl';
    public scope: any = {};
}

export interface IAppComponentScope  extends ng.IScope {
    SearchedValue: string;
    FoundResult: string;
    Ctrl: AppComponentCtrl;
    varContent: string ;
}

export class AppComponentCtrl {
    public static $inject: any = ["$scope", "$http", "$location"];
    constructor(public $scope: IAppComponentScope,
                public $http: ng.IHttpService,
                public $location: ng.ILocationService) {
        $scope.SearchedValue = "This is the search value";
    }

    public isActive (viewLocation) {
        return viewLocation === this.$location.path();
    };
}