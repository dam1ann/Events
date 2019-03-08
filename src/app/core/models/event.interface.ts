import { IUser } from './user.interface';

export interface IEvent {
  id?: string;
  start?: Date;
  end?: Date;
  title?: string;
  location?: string;
  description?: string;
  type?: string;
  last_updated?: Date;
  creator?: IUser;
  tags?: Array<any>;
  flags?: Array<any>;
  repeat_interval?: number;
  repaet_rule?: number;
  repeat_limit?: number;
  venue?: string;
}
