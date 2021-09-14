import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pipe, PipeTransform } from '@angular/core';
import { SafeUrl, DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Pipe({
  name: 'images'
})


export class ImagesPipe implements PipeTransform {

  constructor(
    private http: HttpClient,
    private sanitizer: DomSanitizer
    ) { }

  // transform(url: string) {

    // return new Observable<string>((observer) => {
    //   // // This is a tiny blank image
    //   observer.next('data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==');

    //   this.http.get(url, {responseType: 'blob'}).subscribe(response => {
    //     const reader:any = new FileReader();
    //     reader.readAsDataURL(response);
    //     reader.onloadend = function() {
    //       observer.next(reader.result);
    //     };
    //   });

    //   return {unsubscribe() {  }};
    // });
    transform(url:string): SafeResourceUrl {
      // let results = this.http.get(url, { responseType: 'blob' });
      // let image = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(results))
      // var binaryData = [];
      // binaryData.push(url);
      // let safeUrl:any = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(new Blob(binaryData, {type: "application/zip"})))
      // let results = this.http.get(safeUrl, { responseType: 'blob' });

      return this.sanitizer.bypassSecurityTrustResourceUrl(url);
      // return results;
    }

}
