import {Component, OnInit, OnChanges} from 'angular2/core';
import {HTTP_PROVIDERS} from 'angular2/http';

import {PostsService} from './posts.service';
import {SpinnerComponent} from '../shared/spinner.component'
import {PaginationComponent} from '../shared/pagination.component';

@Component({
    templateUrl: 'app/posts/posts.template.html',
    providers: [PostsService, HTTP_PROVIDERS],
    directives: [SpinnerComponent, PaginationComponent],
    styles: [`
        .list-group-item:hover,
        .list-group-item:focus,
        .list-group-item.active{
            background-color: #00BC8C;
            cursor: pointer;
        }
        
        .media-object {
            border-radius: 100%;
        }
        
        .img-holder {
            width: 80px;
            height: 80px;
            border-radius: 100%;
            background-color: #2c2c2c;
        }
    `]
})

export class PostsComponent implements OnInit {
    posts:any[] = [];
    pagedPosts = [];
    users:any[] = [];
    postsLoading = true;
    commentsLoading;
    pageSize:number = 10;
    currentPost;

    constructor(private _postsService: PostsService){}

    ngOnInit():any {
        this.loadPosts();
        this.loadUsers();
    }


    private loadUsers() {
        this._postsService.getUsers().subscribe(
            users => {
                this.users = users;
            }
        )
    }

    private loadPosts(filter?) {
        this.postsLoading = true;
        this._postsService.getPosts(filter).subscribe(
            posts => {
                this.posts = posts;
                // this.pagedPosts = this.getPostsInPage(1);
                this.pagedPosts = _.take(this.posts, this.pageSize);
            },
            null,
            () => { this.postsLoading = false; }
        )
    }

    select(post) {
        if(post == this.currentPost){ return; }
        this.currentPost = post;
        this.commentsLoading = true;
        this._postsService.getComments(post.id).subscribe(
            comments => {
                // console.log(comments);
                this.currentPost.comments = comments;
                this.commentsLoading = false;
            }
        )
    }

    reloadPosts(filter) {
        this.currentPost = null;
        this.loadPosts(filter);
        console.log(filter);
    }

    onPageChanged(page) {
        var startIndex = (page - 1) * this.pageSize;
        this.pagedPosts = _.take(_.rest(this.posts, startIndex), this.pageSize);
        console.log(this.pagedPosts);
    }

    private getPostsInPage(page) {
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
    }
}