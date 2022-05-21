import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryResponseModel } from 'src/app/shared/models/category.model';
import { CategoriesService } from 'src/app/shared/services/categories.service';
import { ImagesStorageService } from 'src/app/shared/services/images-storage.service';

@Component({
  selector: 'app-admin-categories',
  templateUrl: './admin-categories.component.html',
  styleUrls: ['./admin-categories.component.scss']
})
export class AdminCategoriesComponent implements OnInit {

  public categoriesForm!: FormGroup;
  public adminCategories = new Array<CategoryResponseModel>();
  public isFormHidden = true;
  public editStatus = false;
  public uploadPercent!: number;
  public isUploaded = false;
  private currentCategoryId!: number;

  constructor(
    private fb: FormBuilder,
    private categoriesService: CategoriesService,
    private imagesStorageService: ImagesStorageService
  ) { }

  ngOnInit(): void {
    this.getCategories();
    this.initCategoriesForm();
  }

  ngDoCheck(): void {
    this.uploadPercent = this.imagesStorageService.uploadPercent;
  }

  getCategories(): void {
    this.categoriesService.getAll().subscribe(categories => {
      this.adminCategories = categories;
    })
  }

  initCategoriesForm(): void {
    this.categoriesForm = this.fb.group({
      name: [null, Validators.required],
      path: [null, Validators.required],
      imagePath: ['https://monosushi.com.ua/wp-content/uploads/2020/12/rol-tyzhnya-2-1-697x379.png', Validators.required]
    });
  }

  addCategory(): void {
    this.isFormHidden = false;
  }

  saveCategory(): void {
    if (this.editStatus) {
      this.categoriesService.update(this.categoriesForm.value, this.currentCategoryId).subscribe(() => {
        this.getCategories();
      })
    } else {
      this.categoriesService.create(this.categoriesForm.value).subscribe(() => {
        this.getCategories();
      })
    }
    this.editStatus = false;
    this.categoriesForm.reset();
    this.isUploaded = false;
    this.uploadPercent = 0;
    this.isFormHidden = true;
  }

  deleteCategory(categoryId: number): void {
    this.categoriesService.delete(categoryId).subscribe(() => {
      this.getCategories();
    })
  }

  editCategory(editedCategory: CategoryResponseModel) {
    this.categoriesForm.patchValue({
      name: editedCategory.name,
      path: editedCategory.path,
      imagePath: editedCategory.imagePath,
    });
    this.editStatus = true;
    this.currentCategoryId = editedCategory.id;
    this.isUploaded = true;
    this.isFormHidden = false;
  }

  upload(event: any): void {
    const file = event.target.files[0];
    this.imagesStorageService.uploadFile('images', file.name, file)
      .then(data => {
        this.categoriesForm.patchValue({
          imagePath: data
        });
        this.isUploaded = true;
      })
      .catch(err => {
        console.log(err);
      })
  }

  deleteImage(): void {
    this.imagesStorageService.deleteUploadFile(this.valueByControl('imagePath')).then(() => {
      this.isUploaded = false;
      this.uploadPercent = 0;
      this.categoriesForm.patchValue({
        imagePath: null
      })
    })
  }

  valueByControl(control: string): string {
    return this.categoriesForm.get(control)?.value;
  }

}