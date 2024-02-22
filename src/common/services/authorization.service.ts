import { Injectable, NotFoundException } from "@nestjs/common";
import { CategoriesService } from "src/modules/categories/categories.service";
import { TasksService } from "src/modules/tasks/tasks.service";

@Injectable()
export class AuthorizationService {
  constructor(
    private readonly taskService: TasksService,
    private readonly categoriesService: CategoriesService
  ) { }

  async userCanSeeResource(userId: number, resourceId: number, resourceType: string): Promise<boolean> {
    let resource; // TODO: Make the type

    switch (resourceType) {
      case 'tasks':
        resource = this.taskService.findOne(resourceId);
        break;
      case 'categories':
        resource = this.categoriesService.findOne(resourceId);
        break;
      default:
        throw new NotFoundException(`Resource type ${resourceType} not found`);
    }

    if (!resource) {
      throw new NotFoundException(`${resourceType}with ID ${resourceId} not found`);
    }
    return resource.userId === userId;
  }
}
