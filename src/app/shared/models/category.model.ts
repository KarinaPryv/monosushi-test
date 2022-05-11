export class CategoryRequestModel {
    name!: string;
    path!: string;
    imagePath!: string;
}

export class CategoryResponseModel extends  CategoryRequestModel{
    id!: number;
}