import { inject } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';
import { TokenService } from '../servicios/token.service';
export const usuarioInterceptor: HttpInterceptorFn = (req, next) => {
const tokenService = inject(TokenService);
const isApiUrl = req.url.includes("api/auth");
const isApiNegocio= req.url.includes("api/negocio");
if (!tokenService.isLogged() || isApiUrl || isApiNegocio) {
return next(req);
}
const token = tokenService.getToken();
const authReq = req.clone({
setHeaders: {
Authorization: `Bearer ${token}`
}
});
return next(authReq);
};

7