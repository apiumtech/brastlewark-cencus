import {Gnome} from "../models/Gnome";
/**
 * Created by ecobos on 5/18/17.
 */
export class IGnomeService{
    getGnomes: () => ng.IPromise<Gnome[]>;
}