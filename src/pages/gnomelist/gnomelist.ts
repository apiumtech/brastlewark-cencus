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
    selectedMinAge: number;
    selectedMaxAge: number;
    ageSliderOptions: any;
    Ctrl: GnomeListController;
}

export class GnomeListController {
    public static $inject: any = ["$scope", "IGnomeService", "$timeout"];
    constructor(public $scope: IGnomeListScope, public gnomeService: IGnomeService, public $timeout: ng.ITimeoutService) {
        let gnomes = this.gnomeService.getGnomes();
        $scope.selectedMinAge = 1;
        $scope.selectedMaxAge = 56;
        gnomes.then((response) => this.setGnomes(response));

    }

    public setGnomes(response: Gnome[]) {
        this.$scope.gnomeList = response;
        this.parseGnomes(this.$scope.gnomeList, this.$scope);
        this.$timeout(() => {
            this.$scope.ageSliderOptions = {
                min: this.$scope.selectedMinAge,
                max: this.$scope.selectedMaxAge,
                options: {
                    floor: this.$scope.minAge,
                    ceil: this.$scope.maxAge
                }
            };
            this.$scope.$broadcast('rzSliderForceRender');
            console.info("SliderOpts", this.$scope);
        }, 5000);
    }

    public parseGnomes(gnomeList: Gnome[], scope: IGnomeListScope): void{
        gnomeList.forEach((gnome: Gnome, index, array) => {
            this.parseGnome(gnome, scope);
            if(index === array.length -1){

            }
        })
    }

    public parseGnome(gnome:Gnome, scope: IGnomeListScope): void {
        this.parseGnomeAge(gnome, scope);
        this.parseGnomeHeight(gnome, scope);
        this.parseGnomeWeight(gnome, scope);
        this.parseGnomeHairColor(scope, gnome);
        this.parseGnomeProfessions(gnome, scope);
    }

    public parseGnomeProfessions(gnome: Gnome, scope: IGnomeListScope) {
        gnome.professions.forEach((profession: string) => {
            try{
                if (scope.professions.indexOf(profession) === -1) {
                    scope.professions.push(profession);
                }
            }catch(e){
                scope.professions = [profession];
            }
        });
    }

    public parseGnomeHairColor(scope: IGnomeListScope, gnome: Gnome) {
        try{
            if (scope.hairColours.indexOf(gnome.hair_color) === -1) {
                scope.hairColours.push(gnome.hair_color);
            }
        }catch(e){
            scope.hairColours = [gnome.hair_color];
        }
    }

    public parseGnomeWeight(gnome: Gnome, scope: IGnomeListScope) {
        if (gnome.weight < scope.minWeight) {
            scope.minWeight = gnome.weight;
        }
        if (gnome.weight > scope.maxWeight) {
            scope.maxWeight = gnome.weight;
        }
    }

    public parseGnomeHeight(gnome: Gnome, scope: IGnomeListScope) {
        if (gnome.height < scope.minHeight) {
            scope.minHeight = gnome.height;
        }
        if (gnome.height > scope.maxHeight) {
            scope.maxHeight = gnome.height;
        }
    }

    public parseGnomeAge(gnome: Gnome, scope: IGnomeListScope) {
        if (gnome.age < scope.minAge || !scope.minAge) {
            scope.minAge = gnome.age;
        }
        if (gnome.age > scope.maxAge || !scope.maxAge) {
            scope.maxAge = gnome.age;
        }
    }


}