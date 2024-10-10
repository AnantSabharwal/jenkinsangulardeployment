
import { Component, OnInit } from '@angular/core';
import { User } from '../entity/user';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
  userForm: FormGroup;
  users: User[] = [];
  editMode = false;
  currentUserId!: number | undefined;

  constructor(private userService: UserService, private formBuilder: FormBuilder) { 
    this.userForm = this.formBuilder.group({
      name: new FormControl('', [Validators.required, Validators.minLength(1)]),
      age: new FormControl('', [Validators.required, Validators.min(0)]),
      salary: new FormControl('', [Validators.required, Validators.min(0)])
    });
  }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe((users: User[]) => this.users = users);
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      const user: User = this.userForm.value;
  
      if (this.editMode && this.currentUserId !== null) {
        user.id = this.currentUserId;
        this.userService.updateUser(user).subscribe((data) => {
          console.log(data)
          this.loadUsers();
          this.resetForm();
        });
      } else {
        this.userService.addUser(user).subscribe(() => {
          this.loadUsers();
          this.resetForm();
        });
      }
    }
  }
  

  resetForm(): void {
    this.userForm.reset();
    this.editMode = false;
    this.currentUserId = -1;
  }

  editUser(user: User): void {
    this.userForm.patchValue(user);
    this.editMode = true;
    this.currentUserId = user.id;
  }

  deleteUser(id: number | undefined): void {
    this.userService.deleteUser(id).subscribe(() => this.loadUsers());
  }
}
