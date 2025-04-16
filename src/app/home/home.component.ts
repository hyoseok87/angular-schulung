import { Component } from '@angular/core';
import { BlogListComponent } from "./blog-list/blog-list.component";
import { BlogFormComponent } from "./blog-form/blog-form.component";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports: [BlogListComponent, BlogFormComponent]
})
export class HomeComponent  {

}
