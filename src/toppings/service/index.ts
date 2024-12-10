import { CreateTopping } from "../types";
import ToppingModel from "../model/Toppings.Model"
export class ToppingsService{
    create = async (topping: CreateTopping) => await ToppingModel.create(topping);
    findById = async (id: string) => await ToppingModel.findById(id);
    update = async (id: string, topping: CreateTopping) => await ToppingModel.findByIdAndUpdate(id, topping, { new: true });
    findAll = async () => await ToppingModel.find();
    delete = async (id: string) => await ToppingModel.findByIdAndDelete(id);
}