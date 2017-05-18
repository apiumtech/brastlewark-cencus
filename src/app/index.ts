import * as angular from "angular";
import "angular-route";
import {config as routesConfig} from "./routes";

import {PageAboutComponent} from "../pages/about/about";
import {AppComponent, AppComponentCtrl} from "./app.component";
import {GnomeListComponent, GnomeListController} from "../pages/gnomelist/gnomelist";
import {GnomeService} from "../services/GnomeService";
angular.module("app.application", ["ngRoute"])
    .service("IGnomeService", GnomeService)
    .directive("appComponent", () => new AppComponent())
    .controller("AppComponentCtrl", () => AppComponentCtrl)
    .directive("pageAbout", () => new PageAboutComponent())
    .directive("gnomeList", () => new GnomeListComponent())
    .controller("GnomeListController", () => GnomeListController)
    .config(routesConfig);