﻿<!DOCTYPE html>
<html data-ng-app="main">
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width" />
    <title data-ng-bind="'Wealth Economy' + (viewTitle !== '' ? ' - ' + viewTitle : '')"></title>
    <base href="/" />

    <!-- External CSS -->
    <link href="/Content/bootstrap.min.css?v=024" rel="stylesheet" />
    <link href="/Content/breeze.directives.css?v=024" rel="stylesheet" />
    <link href="/Content/toastr.css?v=024" rel="stylesheet" />

    <!-- Internal CSS -->
    <link href="/Content/site.css?v=022" rel="stylesheet" />
    <link href="/App/directives/resourcePoolEditor.css?v=022" rel="stylesheet" />

    <!-- jQuery -->
    <script src="/Scripts/jquery-2.1.4.min.js"></script>

    <!-- Modernizr - TODO Not in use at the moment -->
    <!--
    <script src="/Scripts/modernizr-2.8.3.js"></script>-->

</head>
<body data-ng-app="main" data-ng-controller="mainController as vm">
    <div class="navbar navbar-inverse navbar-fixed-top">
        <div class="container">
            <div class="navbar-header">
                <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                <a href="/" class="navbar-brand">Wealth Economy</a>
            </div>
            <div class="navbar-collapse collapse">
                <ul class="nav navbar-nav">
                    <li class="dropdown hide">
                        <a href="" class="dropdown-toggle" data-toggle="dropdown">Content <b class="caret"></b></a>
                        <ul class="dropdown-menu">
                            <li><a href="/content/overview">Overview</a></li>
                            <li><a href="/content/technologies">Technologies</a></li>
                        </ul>
                    </li>
                    <li class="dropdown hide" data-ng-show="vm.userInfo !== null">
                        <a href="" class="dropdown-toggle" data-toggle="dropdown">Manage <b class="caret"></b></a>
                        <!-- Manage Menu - Generated -->
                        <script src="/App/includes/manageMenu.js?v=027"></script>
                    </li>
                    <li class="dropdown" data-ng-show="vm.userInfo !== null">
                        <a href="/manage/custom/resourcePool">CMRP</a>
                    </li>
                </ul>
                <ul class="nav navbar-nav navbar-right">
                    <li class="dropdown" data-ng-if="(vm.userInfo !== null)">
                        <a href="" class="dropdown-toggle" data-toggle="dropdown">User: {{ vm.userInfo.Email }} <b class="caret"></b></a>
                        <ul class="dropdown-menu">
                            <li><a href="/account/accountEdit">Edit</a></li>
                            <li><a href="/account/changePassword">Change password</a></li>
                            <li><a href="" data-ng-click="vm.logout()">Logout</a></li>
                        </ul>
                    </li>
                    <li data-ng-if="vm.userInfo === null">
                        <div class="navbar-text nofloat">
                            <a href="/account/register">Register</a>
                            &nbsp;
                            <a href="/account/login">Login</a>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
    <div class="container body-content">

        <div data-ng-view></div>

        <hr />
        <footer>
            <p class="small">
                {{ vm.applicationInfo.CurrentVersion }} - Beta<br />
                {{ vm.applicationInfo.Organization }}<br />
            </p>
        </footer>
    </div>

    <script src="/Scripts/bootstrap.min.js?v=024"></script>
    <script src="/Scripts/respond.min.js?v=024"></script>

    <script src="/Scripts/angular.min.js?v=024"></script>
    <script src="/Scripts/angular-route.min.js?v=024"></script>
    <script src="/Scripts/angular-sanitize.min.js?v=024"></script>
    <script src="/Scripts/datajs-1.1.3.min.js?v=024"></script>
    <script src="/Scripts/toastr.min.js?v=024"></script>

    <script src="/Scripts/breeze.min.js?v=024"></script>
    <script src="/Scripts/breeze.bridge.angular.js?v=024"></script>
    <script src="/Scripts/breeze.directives.js?v=024"></script>

    <!-- Highcharts - TODO Try to find (or create) nuget package for these two -->
    <script src="/App/external/highcharts.js?v=024"></script>
    <script src="/App/external/highcharts-ng.js?v=024"></script>

    <!-- Main -->
    <script src="/App/main.js?v=022"></script>
    <script src="/App/logger.js?v=022"></script>
    <script src="/App/route.js?v=027"></script>
    <script src="/App/authorization.js?v=022"></script>

    <!-- Entities -->
    <script src="/App/entities/resourcePool.js?v=027"></script>
    <script src="/App/entities/element.js?v=027"></script>
    <script src="/App/entities/elementCell.js?v=027"></script>
    <script src="/App/entities/elementField.js?v=027"></script>
    <script src="/App/entities/elementItem.js?v=027"></script>
    <script src="/App/entities/userElementCell.js?v=027"></script>

    <!-- breezeJS -->
    <script src="/App/entityManagerFactory.js?v=027"></script>
    <script src="/App/dataContext.js?v=026"></script>

    <script src="/App/services/mainService.js?v=022"></script>

    <!-- Manage Scripts - Generated (Services, Controllers) -->
    <script src="/App/includes/manageScripts.js?v=027"></script>

    <!-- Service extensions -->
    <script src="/App/services/userService.js?v=027"></script>
    <script src="/App/services/resourcePoolService.js?v=027"></script>

    <!-- Content -->
    <script src="/App/controllers/content/mainController.js?v=027"></script>
    <script src="/App/controllers/content/introductionController.js?v=027"></script>
    <script src="/App/controllers/content/basicsController.js?v=027"></script>
    <script src="/App/controllers/content/sectorIndexSampleController.js?v=022"></script>
    <script src="/App/controllers/content/knowledgeIndexSampleController.js?v=022"></script>
    <script src="/App/controllers/content/totalCostIndexSampleController.js?v=022"></script>
    <script src="/App/controllers/content/fairShareIndexSampleController.js?v=022"></script>
    <script src="/App/controllers/content/indexesPieSampleController.js?v=022"></script>
    <script src="/App/controllers/content/resourcePoolRateSampleController.js?v=022"></script>
    <script src="/App/controllers/content/closingNotesController.js?v=026"></script>

    <!-- Account -->
    <script src="/App/controllers/account/loginController.js?v=022"></script>
    <script src="/App/controllers/account/registerController.js?v=022"></script>
    <script src="/App/controllers/account/accountEditController.js?v=022"></script>
    <script src="/App/controllers/account/changePasswordController.js?v=022"></script>

    <!-- Manage Scripts - Custom -->
    <script src="/App/controllers/manage/resourcePool/resourcePoolCustomListController.js?v=022"></script>
    <script src="/App/controllers/manage/resourcePool/resourcePoolCustomViewController.js?v=027"></script>

    <!-- Directives -->
    <script src="/App/directives/resourcePoolEditor.js?v=027"></script>

    <!-- Filters -->
    <script src="/App/filters/angular-percentage.js?v=022"></script>

    <!-- Google Analytics -->
    <script src="/App/external/googleAnalytics.js"></script>

</body>
</html>