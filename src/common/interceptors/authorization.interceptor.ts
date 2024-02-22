import { CallHandler, ExecutionContext, Injectable, NestInterceptor, UnauthorizedException } from "@nestjs/common";
import { AuthorizationService } from "../services/authorization.service";
import { Observable } from "rxjs";

@Injectable()
export class AuthorizationInterceptor implements NestInterceptor {
  constructor(private readonly authorizationService: AuthorizationService) { }
  async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();
    const user = request.user; // Assurez-vous que l'utilisateur est déjà défini, par exemple via un Guard
    const resourceId = request.params.id; // Ou adaptez en fonction de la structure de votre requête
    const resourceType = request.baseUrl.split('/')[1]; // Extrait le type de ressource de l'URL, à adapter selon votre cas

    const hasAccess = await this.authorizationService.userCanSeeResource(user.id, Number(resourceId), resourceType);
    if (!hasAccess) {
      throw new UnauthorizedException('Accès non autorisé à cette ressource');
    }
    return next.handle();
  }

}
