import { NextFunction,Response,Request } from "express";
import { ToppingsService } from "../service";
import { CreateToppingRequest } from "../types";
import { validationResult } from "express-validator";
import createHttpError from "http-errors";
import { UploadedFile } from "express-fileupload";
import { v4 as uuidv4 } from 'uuid';
import { FileStorage } from "../../common/types/storage";
import { AuthRequest, Roles } from "../../common/types";
export class ToppingsController{
  constructor(
    private readonly toppingService: ToppingsService,
    private readonly fileStorage: FileStorage
  ) {}

  create = async (req: CreateToppingRequest, res: Response, next: NextFunction) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return next(
        createHttpError(400, result.array()[0].msg as string, {
          errors: result.array()[0],
        })
      );
    }

    //image upload
    const image = req.files?.imageUrl as UploadedFile;

    const imageName = uuidv4();
    const imageUrl = await this.fileStorage.uploadFile({
      fileName: imageName,
      fileData: image.data.buffer,
    });

    const { name, price, tenantId,isPublished } = req.body;
    const createdTopping = await this.toppingService.create({
      name,
      price,
      tenantId,
      isPublished,
      imageUrl: imageUrl,
    });

    res.status(201).json({
      status: "success",
      data: createdTopping,
    });
  }

  update = async (req: AuthRequest, res: Response, next: NextFunction) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return next(
        createHttpError(400, result.array()[0].msg as string, {
          errors: result.array()[0],
        })
      );
    }

    const id = req.params.id;
    const existingTopping = await this.toppingService.findById(id);

    if (!existingTopping) {
      return next(createHttpError(404, "Topping not found"));
    }

    if (!req.auth.roles?.includes(Roles.ADMIN)) {
      //Check if tenant has access to the product
      const tenant = req?.auth.tenantId;
      if (existingTopping.tenantId.toString() !== tenant.toString()) {
          return next(
              createHttpError(
                  403,
                  'You are not authorized to perform this action',
              ),
          );
      }
  }
  let imageName: string | undefined;
  let uploadedImageUrl: string | undefined;
  let oldImage: string;

  if (req?.files?.imageUrl) {
      const image = req.files?.imageUrl as UploadedFile;
      imageName = uuidv4();
      oldImage = existingTopping.imageUrl;
      uploadedImageUrl = await this.fileStorage.uploadFile({
          fileName: imageName,
          fileData: image.data.buffer,
      });
      await this.fileStorage.deleteFile(oldImage);
  }

    const { name, price, tenantId,isPublished } = req.body;
    const updatedTopping = await this.toppingService.update(req.params.id, {
      name,
      price,
      tenantId,
      isPublished,
      imageUrl: uploadedImageUrl ?? existingTopping.imageUrl,
    });

    res.status(200).json({
      status: "success",
      data: updatedTopping,
    });
  }

  findAll = async (req: Request, res: Response, next: NextFunction) => {
    const toppings = await this.toppingService.findAll();
    res.status(200).json({
      status: "success",
      data: toppings,
    });
  }


  findById = async (req: Request, res: Response, next: NextFunction) => {
    const topping = await this.toppingService.findById(req.params.id);
    if (!topping) {
      return next(createHttpError(404, "Topping not found"));
    }
    res.status(200).json({
      status: "success",
      data: topping,
    });
  }


  delete = async (req: AuthRequest, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const existingTopping = await this.toppingService.findById(id);

    if (!existingTopping) {
      return next(createHttpError(404, "Topping not found"));
    }

    if (!req.auth.roles?.includes(Roles.ADMIN)) {
      //Check if tenant has access to the product
      const tenant = req?.auth.tenantId;
      if (existingTopping.tenantId.toString() !== tenant.toString()) {
          return next(
              createHttpError(
                  403,
                  'You are not authorized to perform this action',
              ),
          );
      }
  }

    await this.toppingService.delete(id);
    res.status(204).json();
  }
}