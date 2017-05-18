import {Gnome} from "../../models/Gnome";
/**
 * Created by ecobos on 5/17/17.
 */
export class GnomeComponent implements ng.IDirective {
    public template: string = require("./gnome.html");
    public restrict: string = "E";
    public replace: boolean = true;
    public controller: Function = GnomeController;
    public controllerAs: string = 'Ctrl';
    public scope: any = {
        gnome: '=data'
    };
}

export interface IGnomeScope  extends ng.IScope {
    gnome: Gnome;
    Ctrl: GnomeController;
}

export class GnomeController {
    public static $inject: any = ["$scope"];
    constructor(public $scope: IGnomeScope) {

    }

}