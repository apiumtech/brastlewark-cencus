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
    selectedJob: string;
    Ctrl: GnomeListController;
    showFilters: boolean;
    nameFilter: string;
    currentPage: number;
    limitTotalElements: number;
    gnomeListFiltered: Gnome[];
}

export class GnomeListController {
    public static $inject: any = ["$scope", "IGnomeService"];
    constructor(public $scope: IGnomeListScope, public gnomeService: IGnomeService) {
        $scope.gnomeListFiltered = [];
        $scope.showFilters = false;
        let gnomes = this.gnomeService.getGnomes();
        gnomes.then((response) => this.setGnomes(response));
        this.$scope.professions = [];
        this.$scope.nameFilter = "";
        this.$scope.selectedJob = "";
        this.resetScroll();
    }

    public setGnomes(response: Gnome[]) {
        this.$scope.gnomeList = response;
        this.parseGnomes(this.$scope.gnomeList, this.$scope);
    }

    public parseGnomes(gnomeList: Gnome[], scope: IGnomeListScope): void{
        gnomeList.forEach((gnome: Gnome) => {
            this.parseGnome(gnome, scope);
        })
    }

    public onShowFilters (): void{
        this.$scope.showFilters = true;
    }

    public parseGnome(gnome:Gnome, scope: IGnomeListScope): void {
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

    public addMoreItems(){
        this.$scope.currentPage += 1;
        this.$scope.limitTotalElements = this.$scope.currentPage * 15;
    }

    public resetScroll(){
        this.$scope.currentPage = 1;
        this.$scope.limitTotalElements = 15;
    }
}