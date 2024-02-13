import { ResonseData } from "../../../common/responseData";
import { CreateProductDto } from "../dto/create.dto";
import { IProductQueryDto } from "../dto/query.dto";
import { UpdateProductDto } from "../dto/update.dto";
import { ProductEntity } from "../entity/product.entity";

export interface IProductService {
  getOneById(id: number): Promise<ResonseData<ProductEntity>>;
  getAll(query: IProductQueryDto): Promise<ResonseData<ProductEntity[]>>;
  create(dto: CreateProductDto): Promise<ResonseData<ProductEntity>>;
  getByName(name: string): Promise<ResonseData<ProductEntity | undefined>>;
  update(
    id: number,
    dto: UpdateProductDto
  ): Promise<ResonseData<ProductEntity>>;
}
