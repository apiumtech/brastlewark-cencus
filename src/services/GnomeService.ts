import {Gnome} from "../models/Gnome";
import {IGnomeService} from "./IGnomeService";
/**
 * Created by ecobos on 5/18/17.
 */
export class GnomeService implements IGnomeService{

    public static $inject = ['$http', '$q'];

    constructor(public $http: ng.IHttpService, public $q: ng.IQService){ }

    public getGnomes(): ng.IPromise<Gnome[]> {
        return this.$http.get('https://raw.githubusercontent.com/rrafols/mobile_test/master/data.json').then((response: any) => {
            console.info("Response", response);
            return response.data.Brastlewark;
        });
    }
}
