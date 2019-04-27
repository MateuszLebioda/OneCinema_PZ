import {RepertoireListModel} from './repertoire-list.model';

export class RepertoireComponentModel {
  public bookmarkLetters: string[] = ['a', 'b', 'c', 'd', 'e', 'formControls', 'g', 'h'];
  public repertoireList: RepertoireListModel = new RepertoireListModel();
  public repertoireDays: string[] = [];
}
