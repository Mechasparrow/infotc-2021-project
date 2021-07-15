import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';


import { Group } from 'src/app/models/Group';
import { ApiService } from 'src/app/services/api/api.service';
import { TokenStoreService } from 'src/app/services/token-store/token-store.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-new-group',
  templateUrl: './add-new-group.component.html',
  styleUrls: ['./add-new-group.component.scss']
})
export class AddNewGroupComponent implements OnInit {

  constructor(private api: ApiService, private tokenStore: TokenStoreService, private router: Router, private activatedRoute: ActivatedRoute) { }

  defaultDate: Date = new Date(Date.now());

  groupForm: FormGroup = new FormGroup({
    name: new FormControl("", Validators.required),
    description: new FormControl("", Validators.required),
    isfaculty: new FormControl(false ,Validators.required)
  });

  groupId: number = -1;
  group: Group | null = null;
  editting: boolean = false;


  ngOnInit(): void {
    let groupIdRaw: string | null = this.activatedRoute.snapshot.paramMap.get("id");
    this.groupId = groupIdRaw != null ? parseInt(groupIdRaw) : -1;

    if (groupIdRaw != null){
      this.editting = true;
      this.retrieveGroupForUpdate();
    }
  }

  async retrieveGroupForUpdate(){
    let authToken = await this.tokenStore.getAuthenticationToken();
    
    if (authToken != null){
      try{
        this.group = <Group>await this.api.getGroup(this.groupId);
        this.groupForm.setValue({
          name: this.group.name,
          description: this.group.description,
          isfaculty: this.group.isfaculty
        })
      }catch(err){
        console.log(err);
      }
    }
  }

  async createGroup(groupPartial: Group, token:string): Promise<Group>{
    return <Group>await this.api.createGroup(groupPartial, token);
  }

  async updateGroup(groupPartial: Group, token:string): Promise<Group>{
    return <Group>await this.api.updateGroup(this.groupId, groupPartial,  token);
  }

  async onSubmit(){
    let formValues = this.groupForm.value;
    let newGroup: Group = <Group>formValues

    //TODO create group
    let token = this.tokenStore.getAuthenticationToken();

    if (token != null){
      try {

        let returnedGroup: Group | null = null;
        
        if (this.editting){
     
          returnedGroup = await this.updateGroup(newGroup, token);
        }else{
          returnedGroup = await this.createGroup(newGroup, token);
        }

        if (returnedGroup){
          this.router.navigate([`/groups/${returnedGroup?.id}`]);
        }

      }catch(err){
        console.log(err)
      }
    }
  }



}
