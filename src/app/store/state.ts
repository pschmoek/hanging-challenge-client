import { HangActivitySettings } from './hang-activity-settings';
import { Hang } from '../hang/hang';

export interface State {
  facebookToken: string|null;
  jwt?: string;
  userName?: string;
  hangActivitySettings: HangActivitySettings;
  hangs: Hang[];
  todaysHangs: Hang[];
  isLoadingHangs: boolean;
}
