import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";
import { JwtDto } from "../models/jwt-dto";

export class InterceptorAuth implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const storedJwtData = localStorage.getItem('jwtData');
        if (storedJwtData) {
            const jwtData: JwtDto = JSON.parse(storedJwtData);
            const token = jwtData.token;
            console.log("----------> " + token);
            
            if (token) {
                const cloned = req.clone({
                    setHeaders: {
                        Authorization: `Bearer ${token}`
                    }
                });
                return next.handle(cloned);
            }
        }
        
  
        return next.handle(req);
    }
}
