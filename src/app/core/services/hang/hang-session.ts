import { Hang } from './hang';

export interface HangSession {
  id?: number;
  targetTime: number;
  restTime: number;
  date: string;
  hangs: Hang[];
}
