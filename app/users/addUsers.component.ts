import {Component, OnInit} from 'angular2/core';
import {ControlGroup, FormBuilder, Validators} from 'angular2/common';
import {Router, CanDeactivate, RouteParams} from 'angular2/router';
import {HTTP_PROVIDERS} from 'angular2/http';

import {EmailValidator} from '../shared/emailValidator';
import {UsersService} from './users.service';
import {User} from './user';

@Component({
    templateUrl: 'app/addUsers.template.html',
    styles: [`
        .form-container {
            border-radius: 10px;
            margin-bottom: 50px;
        }
        .form-control {
            margin-bottom: 15px;
        }
        .form-control:focus {
            border: 3px solid #0ce3ac;
        }
    `],
    providers: [UsersService, HTTP_PROVIDERS]
})

export class AddUsersComponent implements CanDeactivate, OnInit {
    form: ControlGroup;
    address: ControlGroup;
    redirect:boolean = false;
    title: string;
    id:any = this.routeParams.get('id');
    user = { name: '', email: '', phone: '', address: {
            street: '', city: '', zipcode: ''
        }
    };
    constructor(fb: FormBuilder, private _usersService: UsersService, private _router: Router,
                private routeParams: RouteParams) {
        this.form = fb.group({
            name: ['', Validators.required],
            email: ['', Validators.compose([
                EmailValidator.validateEmail
            ])],
            phone: [],
            address: fb.group({
                street: [],
                suite: [],
                city: [],
                zipcode: []
            })
        })
    }
    routerCanDeactivate(next, previous) {
        console.log('next', next);
        console.log('previous', previous);
        if (this.form.dirty && !this.redirect){
            return confirm('Are you sure?');
        }
    }
    
    onSubmit(form) {
        this.redirect = true;

        if(!this.id) {
            this._usersService.addUser(form).subscribe(
                x => {
                    this._router.navigate(['Users']);
                    return console.log(form.name + ' added');
                }
            );
        }

        if(this.id) {
            this._usersService.editUser(form, this.id).subscribe(
                x => {
                    this._router.navigate(['Users']);
                    return console.log(this.id + ' updated');
                }
            );
        }
    }

    ngOnInit():any {

        this.title = this.id ? 'Edit User' : 'New User';
        if(!this.id){ return }



        this._usersService.updateUser(this.id).subscribe(
            user => {
                this.user = user;
                console.log(this.id);
                console.log(this.user);
            },
            res => {
                if (res.status == 404) {
                    this._router.navigate(['NotFound']);
                }
            }
        )
    }
}