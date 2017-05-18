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
    var obj = [new Gnome("1", "gnomeObjName")];
    beforeEach(angular.mock.module("app.application", ($provide: any) => {
        $provide.service("IGnomeService", () => gnomeServiceMock);
    }));
    beforeEach(() => {
        directiveTest = new ComponentTest<GnomeListController>("<gnome-list></gnome-list>", "gnomeList");
        gnomeServiceMock = <IGnomeService> {};
        deferred = directiveTest.q.defer();
        deferred.resolve(obj);
        gnomeServiceMock.getGnomes = jasmine.createSpy().and.returnValue(deferred.promise);
    });

    it("should call the service", () => {
        var vm: GnomeListController = directiveTest.createComponent({});
        expect(vm["gnomeService"].getGnomes).toHaveBeenCalled();
        expect(vm.$scope.gnomeList[0].name).toBe("gnomeObjName");
    });
});

