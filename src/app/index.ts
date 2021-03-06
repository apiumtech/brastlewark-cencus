import * as angular from "angular";
import "angular-route";
import {config as routesConfig} from "./routes";
import "ng-infinite-scroll";

import {PageAboutComponent} from "../pages/about/about";
import {AppComponent, AppComponentCtrl} from "./app.component";
import {GnomeService} from "../services/GnomeService";
import {GnomeListComponent, GnomeListController} from "../pages/gnomelist/gnomelist";
import {GnomeComponent, GnomeController} from "../components/gnome/Gnome.component";
import {GnomeFilter} from "../filter/gnomeFilter";
angular.module("app.application", ["ngRoute", "infinite-scroll"])
    .service("IGnomeService", GnomeService)
    .directive("appComponent", () => new AppComponent())
    .controller("AppComponentCtrl", () => AppComponentCtrl)
    .directive("pageAbout", () => new PageAboutComponent())
    .directive("gnomeList", () => new GnomeListComponent())
    .controller("GnomeListController", () => GnomeListController)
    .directive("gnome", () => new GnomeComponent())
    .controller("GnomeController", () => GnomeController)
    .filter("gnomeFilter", GnomeFilter)
    .config(routesConfig);