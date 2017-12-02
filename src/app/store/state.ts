import { HangActivitySettings } from './hang-activity-settings';
import { Hang } from '../hang/hang';

export interface State {
  hangActivitySettings: HangActivitySettings;
  hangs: Hang[];
  todaysHangs: Hang[];
  isLoadingHangs: boolean;
}
