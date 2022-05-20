import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductsService } from 'src/app/shared/services/products.service';
import { deleteObject, getDownloadURL, percentage, ref, Storage, uploadBytesResumable } from '@angular/fire/storage';
import { ProductResponseModel } from 'src/app/shared/models/product.model';
import { CategoryResponseModel } from 'src/app/shared/models/category.model';
import { CategoriesService } from 'src/app/shared/services/categories.service';

@Component({
  selector: 'app-admin-articles',
  templateUrl: './admin-articles.component.html',
  styleUrls: ['./admin-articles.component.scss']
})
export class AdminArticlesComponent implements OnInit {

  public productsForm!: FormGroup;
  public adminProducts = new Array<ProductResponseModel>();
  public isFormHidden = true;
  public editStatus = false;
  public uploadPercent!: number;
  public isUploaded = false;
  private currentProductId!: number;
  public adminCategories =  new Array<CategoryResponseModel>();

  constructor(
    private fb: FormBuilder,
    private productsService: ProductsService,
    private categoriesService: CategoriesService,
    private storage: Storage
  ) { }

  ngOnInit(): void {
    this.getCategories();
    this.getProducts();
    this.initProductsForm()
  }

  initProductsForm(): void {
    this.productsForm = this.fb.group({
      category: [null, Validators.required],
      name: [null, Validators.required],
      path: [null, Validators.required],
      ingridients: [null, Validators.required],
      weight: [null, Validators.required],
      price: [null, Validators.required],
      imagePath: [null, Validators.required],
      count: [1]
    });
  }

  getCategories(): void {
    this.categoriesService.getAll().subscribe(categories => {
      this.adminCategories = categories;
      this.productsForm.patchValue({
        category: this.adminCategories[0].name
      })
    })
  }

  getProducts(): void {
    this.productsService.getAll().subscribe(products => {
      this.adminProducts = products;
    })
  }

  addProduct(): void {
    this.isFormHidden = false;
  }

  saveProduct(): void {
    if (this.editStatus) {
      this.productsService.update(this.productsForm.value, this.currentProductId).subscribe(() => {
        this.getProducts();
      })
    } else {
      this.productsService.create(this.productsForm.value).subscribe(() => {
        this.getProducts();
      })
    }
    this.editStatus = false;
    this.productsForm.reset();
    this.isUploaded = false;
    this.uploadPercent = 0;
    this.isFormHidden = true;
  }

  deleteProduct(discountId: number): void {
    this.productsService.delete(discountId).subscribe(() => {
      this.getProducts();
    })
  }

  editProduct(editedCategory: ProductResponseModel) {
    this.productsForm.patchValue({
      category: editedCategory.category,
      name: editedCategory.name,
      path: editedCategory.path,
      ingridients: editedCategory.ingridients,
      weight: editedCategory.weight,
      price: editedCategory.price,
      imagePath: editedCategory.imagePath,
    });
    this.editStatus = true;
    this.currentProductId = editedCategory.id;
    this.isUploaded = true;
    this.isFormHidden = false;
  }

  upload(event: any): void {
    const file = event.target.files[0];
    this.uploadFile('images', file.name, file)
      .then(data => {
        this.productsForm.patchValue({
          imagePath: data
        });
        this.isUploaded = true;
      })
      .catch(err => {
        console.log(err);
      })
  }

  async uploadFile(folder: string, name: string, file: File | null): Promise<string> {
    const path = `${folder}/${name}`;
    let url = '';
    if (file) {
      try {
        const storageRef = ref(this.storage, path);
        const task = uploadBytesResumable(storageRef, file);
        percentage(task).subscribe(data => {
          this.uploadPercent = data.progress
        });
        await task;
        url = await getDownloadURL(storageRef);
      } catch (e: any) {
        console.error(e);
      }
    } else {
      console.log('wrong format');
    }
    return Promise.resolve(url);
  }

  valueByControl(control: string): string {
    return this.productsForm.get(control)?.value;
  }

  deleteImage(): void {
    const task = ref(this.storage, this.valueByControl('imagePath'));
    deleteObject(task).then(() => {
      this.isUploaded = false;
      this.uploadPercent = 0;
      this.productsForm.patchValue({
        imagePath: null
      });
    });
  }

}
