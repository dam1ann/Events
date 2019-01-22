import { IUser } from './user.interface';

export interface IEvent {
  id: string;
  start: Date;
  end: Date;
  title: string;
  location: string;
  description: string;
  type: string;
  last_updated: Date;
  creator: IUser;
  tags?: Array<any>;
  flags?: Array<any>;
  repeat_interval?: number;
  repaet_rule?: number;
  repeat_limit?: number;

}


export class Event implements IEvent {

  constructor(public id: string,
              public start: Date,
              public end: Date,
              public title: string,
              public location: string,
              public description: string,
              public type: string,
              public last_updated: Date,
              public creator: IUser) {
  }
}
