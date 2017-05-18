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
    professions: string[];
    hairColours: string[];
    maxAge: number;
    minAge: number;
    maxHeight: number;
    minHeight: number;
    maxWeight: number;
    minWeight: number;
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
        this.parseGnomes(this.$scope.gnomeList, this.$scope);
    }

    private parseGnomes(gnomeList: Gnome[], scope: IGnomeListScope): void{
        gnomeList.forEach((gnome: Gnome) => this.parseGnome(gnome, scope))
    }

    private parseGnome(gnome:Gnome, scope: IGnomeListScope): void {
        this.parseGnomeAge(gnome, scope);
        this.parseGnomeHeight(gnome, scope);
        this.parseGnomeWeight(gnome, scope);
        this.parseGnomeHairColor(scope, gnome);
        this.parseGnomeProfessions(gnome, scope);
    }

    private parseGnomeProfessions(gnome: Gnome, scope: IGnomeListScope) {
        gnome.professions.forEach((profession: string) => {
            if (scope.professions.indexOf(profession) === -1) {
                scope.professions.push(profession);
            }
        });
    }

    private parseGnomeHairColor(scope: IGnomeListScope, gnome: Gnome) {
        if (scope.hairColours.indexOf(gnome.hair_color) === -1) {
            scope.hairColours.push(gnome.hair_color);
        }
    }

    private parseGnomeWeight(gnome: Gnome, scope: IGnomeListScope) {
        if (gnome.weight < scope.minWeight) {
            scope.minWeight = gnome.weight;
        }
        if (gnome.weight > scope.maxWeight) {
            scope.maxWeight = gnome.weight;
        }
    }

    private parseGnomeHeight(gnome: Gnome, scope: IGnomeListScope) {
        if (gnome.height < scope.minHeight) {
            scope.minHeight = gnome.height;
        }
        if (gnome.height > scope.maxHeight) {
            scope.maxHeight = gnome.height;
        }
    }

    private parseGnomeAge(gnome: Gnome, scope: IGnomeListScope) {
        if (gnome.age < scope.minAge) {
            scope.minAge = gnome.age;
        }
        if (gnome.age > scope.maxAge) {
            scope.maxAge = gnome.age;
        }
    }


}