import {IGnomeListScope} from "../pages/gnomelist/gnomelist";
import {Gnome} from "../models/Gnome";
/**
 * Created by ecobos on 5/23/17.
 */
export function GnomeFilter() {
    return function(gnomes: any, scope: IGnomeListScope) {
        let gnomesToReturn: Gnome[] = [];
        if(gnomes){
            gnomes.forEach((gnome: Gnome) => {
                if(scope.selectedJob.length>=1){
                    if(gnome.professions.indexOf(scope.selectedJob) === -1){
                        return false;
                    }
                }
                if(scope.nameFilter.length>=1){
                    if(gnome.name.toLowerCase().indexOf(scope.nameFilter.toLowerCase()) === -1){
                        return false;
                    }
                }
                gnomesToReturn.push(gnome);
            });
        }
        return gnomesToReturn;
    }
}