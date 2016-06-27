import {Http} from 'angular2/http';
import {Injectable} from 'angular2/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/forkJoin';

@Injectable()

export class PostsService {
    url:string = 'http://jsonplaceholder.typicode.com/posts';
    usersUrl:string = 'http://jsonplaceholder.typicode.com/users';
    constructor(private _http: Http){}


    getUsers() {
        return this._http.get(this.usersUrl).map(res => res.json());
    }

    getFilteredPosts(id) {
        return this._http.get(this.url + '?userId=' + id).map(res => res.json());
    }

    getComments(id) {
        return this._http.get(this.url + '/' + id + '/comments').map(res => res.json());
    }

    getPosts(filter?) {
        var url = this.url;
        if (filter) {
            url += '?userId=' + filter;
        }
        return this._http.get(url).map(res => res.json());
    }

}