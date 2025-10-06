import { Component, OnInit, ViewChild, viewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ImageService } from './image.service';
import { response } from 'express';
import { Observable, pipe } from 'rxjs';
import { BlogImage } from '../../models/blog-image.model';
import { AsyncPipe, CommonModule, NgIf } from '@angular/common';
// import { AsyncPipe, NgIf, NgForOf } from "../../../../../node_modules/@angular/common/common_module.d-NEF7UaHr";


@Component({
  selector: 'app-image-selector',
  imports: [FormsModule, NgIf, AsyncPipe, CommonModule],
  templateUrl: './image-selector.component.html',
  styleUrl: './image-selector.component.css'
})
export class ImageSelectorComponent implements OnInit {
  
  private file?:File;
  fileName:string = '';
  title: string = '';
  images$?: Observable<BlogImage[]>;

  @ViewChild('form',{static:false}) imageUploadForm?:NgForm;

  constructor(private imageService : ImageService){}


  ngOnInit(): void {

    this.getImages();
    
  }

  onFileUploadChange(event:Event):void{
    const element = event.currentTarget as HTMLInputElement;
    this.file = element.files?.[0];

  }

  uploadImage():void{

    if(this.file && this.fileName !=='' && this.title!=='')
    {
      //Image service to upload the image
      this.imageService.uploadImage(this.file, this.fileName, this.title)
      .subscribe({
        next:(response) =>{
          this.imageUploadForm?.resetForm();
          this.getImages();
        }
      })

    }

  }


  SelectImage(image:BlogImage):void
  {
    this.imageService.SelectImage(image); 
  }


  private getImages(){

    this.images$ = this.imageService.getAllImages();

  }

}
