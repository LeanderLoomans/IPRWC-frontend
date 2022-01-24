import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import { catchError } from "rxjs/operators";
import { throwError } from "rxjs";
import { handleHttpErrors } from "../../typescript/utils/http-error.util";
import { environment } from "../../../environments/environment";

@Injectable({providedIn: "root"})


export class HttpService {

  constructor(
    private http: HttpClient
  ) { }

  get<T>(uri: string) {
    return this.http.get<{data: T}>(environment.backendUrl + uri)
      .pipe(
        catchError( error => throwError(handleHttpErrors(error)))
      );
  }

  post<T>(uri: string, body: any) {
    return this.http.post<{data: T}>(environment.backendUrl + uri, body)
      .pipe(
        catchError( error => throwError(handleHttpErrors(error)))
      );
  }

  put(uri: string, body: any) {
    return this.http.put(environment.backendUrl + uri, body)
      .pipe(
        catchError( error => throwError(handleHttpErrors(error)))
      );
  }

  delete(uri: string) {
    return this.http.delete(environment.backendUrl + uri)
      .pipe(
        catchError( error => throwError(handleHttpErrors(error)))
      );
  }
}
