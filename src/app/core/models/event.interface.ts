import { IUser } from './user.interface';
import { ICategory } from './category.interface';

export interface IEvent {
  id?: string;
  creator?: IUser;
  category?: ICategory;
  start?: Date;
  end?: Date;
  title?: string;
  location?: string;
  description?: string;
  type?: string;
  last_updated?: Date;
  tags?: Array<any>;
  flags?: Array<any>;
  repeat_interval?: number;
  repaet_rule?: number;
  repeat_limit?: number;
  venue?: string;
}
