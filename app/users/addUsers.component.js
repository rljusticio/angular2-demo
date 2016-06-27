System.register(['angular2/core', 'angular2/common', 'angular2/router', 'angular2/http', '../shared/emailValidator', './users.service'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, common_1, router_1, http_1, emailValidator_1, users_service_1;
    var AddUsersComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (emailValidator_1_1) {
                emailValidator_1 = emailValidator_1_1;
            },
            function (users_service_1_1) {
                users_service_1 = users_service_1_1;
            }],
        execute: function() {
            AddUsersComponent = (function () {
                function AddUsersComponent(fb, _usersService, _router, routeParams) {
                    this._usersService = _usersService;
                    this._router = _router;
                    this.routeParams = routeParams;
                    this.redirect = false;
                    this.id = this.routeParams.get('id');
                    this.user = { name: '', email: '', phone: '', address: {
                            street: '', city: '', zipcode: ''
                        }
                    };
                    this.form = fb.group({
                        name: ['', common_1.Validators.required],
                        email: ['', common_1.Validators.compose([
                                emailValidator_1.EmailValidator.validateEmail
                            ])],
                        phone: [],
                        address: fb.group({
                            street: [],
                            suite: [],
                            city: [],
                            zipcode: []
                        })
                    });
                }
                AddUsersComponent.prototype.routerCanDeactivate = function (next, previous) {
                    console.log('next', next);
                    console.log('previous', previous);
                    if (this.form.dirty && !this.redirect) {
                        return confirm('Are you sure?');
                    }
                };
                AddUsersComponent.prototype.onSubmit = function (form) {
                    var _this = this;
                    this.redirect = true;
                    if (!this.id) {
                        this._usersService.addUser(form).subscribe(function (x) {
                            _this._router.navigate(['Users']);
                            return console.log(form.name + ' added');
                        });
                    }
                    if (this.id) {
                        this._usersService.editUser(form, this.id).subscribe(function (x) {
                            _this._router.navigate(['Users']);
                            return console.log(_this.id + ' updated');
                        });
                    }
                };
                AddUsersComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    this.title = this.id ? 'Edit User' : 'New User';
                    if (!this.id) {
                        return;
                    }
                    this._usersService.updateUser(this.id).subscribe(function (user) {
                        _this.user = user;
                        console.log(_this.id);
                        console.log(_this.user);
                    }, function (res) {
                        if (res.status == 404) {
                            _this._router.navigate(['NotFound']);
                        }
                    });
                };
                AddUsersComponent = __decorate([
                    core_1.Component({
                        templateUrl: 'app/addUsers.template.html',
                        styles: ["\n        .form-container {\n            border-radius: 10px;\n            margin-bottom: 50px;\n        }\n        .form-control {\n            margin-bottom: 15px;\n        }\n        .form-control:focus {\n            border: 3px solid #0ce3ac;\n        }\n    "],
                        providers: [users_service_1.UsersService, http_1.HTTP_PROVIDERS]
                    }), 
                    __metadata('design:paramtypes', [common_1.FormBuilder, users_service_1.UsersService, router_1.Router, router_1.RouteParams])
                ], AddUsersComponent);
                return AddUsersComponent;
            }());
            exports_1("AddUsersComponent", AddUsersComponent);
        }
    }
});
//# sourceMappingURL=addUsers.component.js.map