import {RepertoireListModel} from './repertoire-list.model';

export class RepertoireComponentModel {
  public bookmarkLetters: string[];
  public repertoireList: RepertoireListModel;
  public repertoireDays: string[];

  constructor() {
    this.bookmarkLetters = ['a', 'b', 'c', 'd', 'e', 'formControls', 'g', 'h'];
    this.repertoireList = new RepertoireListModel();
    this.repertoireDays = [];
  }
}
