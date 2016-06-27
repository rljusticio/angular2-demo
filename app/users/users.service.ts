import {Http} from 'angular2/http';
import {Injectable} from 'angular2/core';
import 'rxjs/add/operator/map';

@Injectable()

export class UsersService {
    url:string = 'http://jsonplaceholder.typicode.com/users';
    constructor(private _http: Http){};
    getUsers() {
       return this._http.get(this.url).map(res => res.json());
    }

    addUser(user) {
        return this._http.post(this.url, JSON.stringify(user)).map(res => res.json());
    }

     updateUser(id:number) {
         return this._http.get(this.url + '/' + id).map(res => res.json());
     }

    editUser(user, id) {
        return this._http.put(this.url + '/' + id, JSON.stringify(user)).map(res => res.json());
    }
    
    deleteUser(user) {
        return this._http.delete(this.url + '/' + user.id).map(res => res.json());
    }
}