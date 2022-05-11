export class DiscountRequestModel {
    date!: Date;
    name!: string;
    title!: string;
    description!: string;
    imagePath!: string;
}

export class DiscountResponseModel extends  DiscountRequestModel{
    id!: number;
}