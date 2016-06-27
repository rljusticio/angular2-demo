System.register(['angular2/core', 'angular2/http', './posts.service', '../shared/spinner.component', '../shared/pagination.component'], function(exports_1, context_1) {
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
    var core_1, http_1, posts_service_1, spinner_component_1, pagination_component_1;
    var PostsComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (posts_service_1_1) {
                posts_service_1 = posts_service_1_1;
            },
            function (spinner_component_1_1) {
                spinner_component_1 = spinner_component_1_1;
            },
            function (pagination_component_1_1) {
                pagination_component_1 = pagination_component_1_1;
            }],
        execute: function() {
            PostsComponent = (function () {
                function PostsComponent(_postsService) {
                    this._postsService = _postsService;
                    this.posts = [];
                    this.pagedPosts = [];
                    this.users = [];
                    this.postsLoading = true;
                    this.pageSize = 10;
                }
                PostsComponent.prototype.ngOnInit = function () {
                    this.loadPosts();
                    this.loadUsers();
                };
                PostsComponent.prototype.loadUsers = function () {
                    var _this = this;
                    this._postsService.getUsers().subscribe(function (users) {
                        _this.users = users;
                    });
                };
                PostsComponent.prototype.loadPosts = function (filter) {
                    var _this = this;
                    this.postsLoading = true;
                    this._postsService.getPosts(filter).subscribe(function (posts) {
                        _this.posts = posts;
                        // this.pagedPosts = this.getPostsInPage(1);
                        _this.pagedPosts = _.take(_this.posts, _this.pageSize);
                    }, null, function () { _this.postsLoading = false; });
                };
                PostsComponent.prototype.select = function (post) {
                    var _this = this;
                    if (post == this.currentPost) {
                        return;
                    }
                    this.currentPost = post;
                    this.commentsLoading = true;
                    this._postsService.getComments(post.id).subscribe(function (comments) {
                        // console.log(comments);
                        _this.currentPost.comments = comments;
                        _this.commentsLoading = false;
                    });
                };
                PostsComponent.prototype.reloadPosts = function (filter) {
                    this.currentPost = null;
                    this.loadPosts(filter);
                    console.log(filter);
                };
                PostsComponent.prototype.onPageChanged = function (page) {
                    var startIndex = (page - 1) * this.pageSize;
                    this.pagedPosts = _.take(_.rest(this.posts, startIndex), this.pageSize);
                    console.log(this.pagedPosts);
                };
                PostsComponent.prototype.getPostsInPage = function (page) {
                    //     var number = parseInt(page);
                    //     var result = [];
                    //     var startingIndex = (number - 1) * this.pageSize;
                    //     var endIndex = Math.min(startingIndex + this.pageSize, this.posts.length);
                    //     console.log('starting index: ' + startingIndex + ', endingIndex: ' + endIndex + ', page: ' + number + ', pageSize: ' + this.pageSize);
                    //     for(var i = startingIndex; i < endIndex; i++)
                    //         result.push(this.posts[i]);
                    //
                    //     return result;
                    // }
                };
                PostsComponent = __decorate([
                    core_1.Component({
                        templateUrl: 'app/posts/posts.template.html',
                        providers: [posts_service_1.PostsService, http_1.HTTP_PROVIDERS],
                        directives: [spinner_component_1.SpinnerComponent, pagination_component_1.PaginationComponent],
                        styles: ["\n        .list-group-item:hover,\n        .list-group-item:focus,\n        .list-group-item.active{\n            background-color: #00BC8C;\n            cursor: pointer;\n        }\n        \n        .media-object {\n            border-radius: 100%;\n        }\n        \n        .img-holder {\n            width: 80px;\n            height: 80px;\n            border-radius: 100%;\n            background-color: #2c2c2c;\n        }\n    "]
                    }), 
                    __metadata('design:paramtypes', [posts_service_1.PostsService])
                ], PostsComponent);
                return PostsComponent;
            }());
            exports_1("PostsComponent", PostsComponent);
        }
    }
});
//# sourceMappingURL=posts.component.js.map