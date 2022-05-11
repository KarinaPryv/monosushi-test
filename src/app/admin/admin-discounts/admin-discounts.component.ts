import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DiscountResponseModel } from 'src/app/shared/models/discount.model';
import { DiscountsService } from 'src/app/shared/services/discounts.service';
import { deleteObject, getDownloadURL, percentage, ref, Storage, uploadBytesResumable } from '@angular/fire/storage';

@Component({
  selector: 'app-admin-discounts',
  templateUrl: './admin-discounts.component.html',
  styleUrls: ['./admin-discounts.component.scss']
})
export class AdminDiscountsComponent implements OnInit {

  public discountsForm!: FormGroup;
  public adminDiscounts = new Array<DiscountResponseModel>();
  public isFormHidden = true;
  public editStatus = false;
  public uploadPercent!: number;
  public isUploaded = false;
  private currentDiscountId!: number;

  constructor(
    private fb: FormBuilder,
    private discountService: DiscountsService,
    private storage: Storage
  ) { }

  ngOnInit(): void {
    this.getDiscounts();
    this.initDiscountsForm();
  }

  getDiscounts(): void {
    this.discountService.getAll().subscribe(discounts => {
      this.adminDiscounts = discounts;
    })
  }

  initDiscountsForm(): void {
    this.discountsForm = this.fb.group({
      name: [null, Validators.required],
      title: [null, Validators.required],
      description: [null, Validators.required],
      imagePath: ['https://monosushi.com.ua/wp-content/uploads/2020/12/rol-tyzhnya-2-1-697x379.png', Validators.required]
    });
  }

  addDiscount():void {
    this.isFormHidden = false;
  }

  saveDiscount(): void {
    if(this.editStatus){
      this.discountService.update(this.discountsForm.value, this.currentDiscountId).subscribe(() => {
        this.getDiscounts();
      })
    } else {
      this.discountService.create(this.discountsForm.value).subscribe(() => {
        this.getDiscounts();
      })
    }
    this.editStatus = false;
    this.discountsForm.reset();
    this.isUploaded = false;
    this.uploadPercent = 0;
    this.isFormHidden = true;
  }

  deleteDiscount(discountId: number): void {
    this.discountService.delete(discountId).subscribe(() => {
      this.getDiscounts();
    })
  }

  editDiscount(editedDiscount: DiscountResponseModel) {
    this.discountsForm.patchValue({
      name: editedDiscount.name,
      title: editedDiscount.title,
      description: editedDiscount.description,
      imagePath: editedDiscount.imagePath,
    });
    this.editStatus = true;
    this.currentDiscountId = editedDiscount.id;
    this.isUploaded = true;
    this.isFormHidden = false;
  }

  upload(event: any): void {
    const file = event.target.files[0];
    this.uploadFile('images', file.name, file)
      .then(data => {
        this.discountsForm.patchValue({
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
    if(file) {
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
    return this.discountsForm.get(control)?.value;
  }

  deleteImage(): void {
    const task = ref(this.storage, this.valueByControl('imagePath'));
    deleteObject(task).then(() => {
      this.isUploaded = false;
      this.uploadPercent = 0;
      this.discountsForm.patchValue({
        imagePath: null
      });
    });
  }

}