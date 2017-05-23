/**
 * Created by ecobos on 5/18/17.
 */
import "../../index";
import * as angular from "angular";
import "angular-mocks";
import {ComponentTest} from "../../util/ComponentTest";
import {GnomeListController} from "./gnomelist";
import {IGnomeService} from "../../services/IGnomeService";
import {Gnome} from "../../models/Gnome";

describe("Gnomelist Component", () => {
    var directiveTest: ComponentTest<GnomeListController>;
    var gnomeServiceMock: IGnomeService;
    var deferred: any;
    let gnome1 = new Gnome(1, "gnomeObjName", "thumb", 124, 500, 210, "Blue", ["Hairdresser", "Programmer"], ["Wagner Grand"]);
    let gnome2 = new Gnome(2, "gnomeObjName2", "thumb2", 300, 250, 340, "Pink", ["Programmer", "Woodworker"], ["gnome1"]);
    var gnomeArray: any = [gnome1, gnome2];
    let sut: GnomeListController;
    beforeEach(angular.mock.module("app.application", ($provide: any) => {
        $provide.service("IGnomeService", () => gnomeServiceMock);
    }));
    beforeEach(() => {
        directiveTest = new ComponentTest<GnomeListController>("<gnome-list></gnome-list>", "gnomeList");
        gnomeServiceMock = <IGnomeService> {};
        deferred = directiveTest.q.defer();
        deferred.resolve(gnomeArray);
        gnomeServiceMock.getGnomes = jasmine.createSpy().and.returnValue(deferred.promise);
        sut = directiveTest.createComponent({});
    });

    it("should init the gnomes on init", () => {
        expect(sut["gnomeService"].getGnomes).toHaveBeenCalled();
        expect(sut.$scope.gnomeList[0].name).toBe("gnomeObjName");
    });

    it("should set professions array", () => {
        expect(sut.$scope.professions[0]).toBe("Hairdresser");
    });
});