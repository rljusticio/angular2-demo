import {Component, OnInit, EventEmitter} from 'angular2/core';
import {HTTP_PROVIDERS} from 'angular2/http';
import {ROUTER_DIRECTIVES} from "angular2/router";
import {UsersService} from './users.service';
import {SpinnerComponent} from '../shared/spinner.component'

@Component({
    templateUrl: 'app/users/users.template.html',
    styles: [`
        .glyphicon:hover {
            color: #00bc8c;
            cursor: pointer;
        }
        a.btn {
            margin-bottom: 10px;
        }
    `],
    providers: [UsersService, HTTP_PROVIDERS],
    directives: [ROUTER_DIRECTIVES, SpinnerComponent]
})

export class UsersComponent implements OnInit{
    isLoading = true;
    users = [];
    constructor(private _usersService: UsersService) {}

    ngOnInit() {
        this._usersService.getUsers()
            .subscribe(users => {
                this.users = users;
                this.isLoading = false;
            });
    }

    edit(id) {
        this._usersService.updateUser(id).subscribe(
            user => console.log(user)
        )
    }
    
    deleteUser(user) {
        var message = 'Are you sure you want to delete ' + user.name + '?';
        if(confirm(message)) {
            // Original Solution
            // var id = user.id;
            // function filterById(user) {
            //     return user.id !== id;
            // }
            // this.users = this.users.filter(filterById);
            var index = this.users.indexOf(user);
            this.users.splice(index, 1);
            this._usersService.deleteUser(user).subscribe(
                x => console.log(this.users),
                err => {
                    alert('Could not delete the user.');
                    this.users.splice(index, 0, user);
                }
            );
        }
    }
}