import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { ProcessHttpmsgService } from './process-httpmsg.service';
import { RestangularModule, Restangular } from 'ngx-restangular';
import { Feedback } from '../shared/feedback';

@Injectable()
export class FeedbackService {

  constructor(private restangular: Restangular,
    private processHttpmsgService: ProcessHttpmsgService) { }

    submitFeedback(fback: Feedback): Observable<Feedback> {
      var baseFeedback = this.restangular.all('feedback');
      return baseFeedback.post(fback);
    }

}
