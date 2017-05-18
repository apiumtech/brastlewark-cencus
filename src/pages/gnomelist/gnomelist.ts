import {Gnome} from "../../models/Gnome";
import {IGnomeService} from "../../services/IGnomeService";
/**
 * Created by ecobos on 5/17/17.
 */
export class GnomeListComponent implements ng.IDirective {
    public template: string = require("./gnome-list.html");
    public restrict: string = "E";
    public replace: boolean = true;
    public controller: Function = GnomeListController;
    public controllerAs: string = 'Ctrl';
    public scope: any = {};
}

export interface IGnomeListScope  extends ng.IScope {
    gnomeList: Gnome[];
    Ctrl: GnomeListController;
}

export class GnomeListController {
    public static $inject: any = ["$scope", "IGnomeService"];
    constructor(public $scope: IGnomeListScope, public gnomeService: IGnomeService) {
        let gnomes = this.gnomeService.getGnomes();
        gnomes.then((response) => this.setGnomes(response));
    }

    private setGnomes(response: Gnome[]) {
        this.$scope.gnomeList = response;
    }
}