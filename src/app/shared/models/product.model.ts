import { CategoryResponseModel } from "./category.model";

export class ProductRequestModel {
    category!: CategoryResponseModel;
    name!: string;
    path!: string;
    ingridients!: string;
    weight!: number;
    price!: number;
    imagePath!: string;
    count!: number
}

export class ProductResponseModel extends ProductRequestModel{
    id!: number;
}