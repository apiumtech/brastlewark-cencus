import "./app/index";
import * as angular from "angular";
import 'jquery';
import 'bootstrap/dist/js/bootstrap';

import "font-awesome/css/font-awesome.css";
import "bootstrap/dist/css/bootstrap.css";
import "angularjs-slider/dist/rzslider.css";
import "./styles/screen.scss";

angular.module("app", ["app.application"]);
angular.bootstrap(document, ["app"], {
    strictDi: true
});