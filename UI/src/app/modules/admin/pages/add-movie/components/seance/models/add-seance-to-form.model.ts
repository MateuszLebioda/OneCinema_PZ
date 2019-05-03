import {FormGroup} from '@angular/forms';
import {ProjectionType} from '../../../../../../movie/enums/projection-type.enum';

export class AddSeanceToFormModel {
  public form: FormGroup;
  public week: number;
  public day: number;
  public duration: number;
  public projectionType: ProjectionType;
}
