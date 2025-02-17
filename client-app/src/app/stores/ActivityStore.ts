import { makeAutoObservable } from "mobx";
import moment from "moment";
import agent from "../api/agent";
import { IActivity } from "../models/Activity";

export default class ActivityStore {

  activities: Map<string, IActivity> = new Map();
  selectedActivity: IActivity | undefined = undefined;
  todeleteActivity: IActivity | undefined = undefined;
  isLoading: boolean = true;
  editMode: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  loadActivities = async () => {
    this.setLoading(true);
    let activities: Map<string, IActivity> = new Map();
    const rawActivities = await agent.Activities.list();
    activities = this._formatData(rawActivities).reduce((prev, act) => prev.set(act.id, act), new Map());
    this.setActivities(activities);
    this.setLoading(false);
  };

  activitiesOrderedByDate = (): IActivity[] => {
    return [...this.activities.values()].sort((a, b) => a.date.diff(b.date))
  }

  activitiesGroupedBy = (prop: keyof IActivity) => {
    return this.activitiesOrderedByDate().reduce((prev, value) => {
      let propValue = value[prop];
      if (moment.isMoment(propValue)){
        propValue = propValue.format("YYYY-MM-DD");
      }
      if (!prev.has(propValue)){
        prev.set(propValue, []);
      }
      prev.get(propValue)?.push(value);
      return prev;
      
    }, new Map<string, Array<IActivity>>())
  } 

  async getActivityById(id: string): Promise<IActivity> {
    this.setLoading(true);
    let activity = this.activities.get(id);
    if (activity) {
      this.setLoading(false);
      return activity;
    }
    else{
      activity = await agent.Activities.getByID(id);
      activity = this._formatData([activity])[0];
      this.setLoading(false);
      return activity;
    }
  }

  deleteActivity = async (activity: IActivity) => {
    this.setLoading(true);
    await agent.Activities.remove(activity.id);
    this.removeActivity(activity);
    if (this.selectedActivity?.id == activity.id) {
      this.setSelectedActivity(undefined);
    }
    this.setLoading(false);
  };

  addActivity = async (activity: IActivity) => {
    this.setLoading(true);
    let newAct = await agent.Activities.add(activity);
    newAct = this._formatData([newAct])[0];
    this.setActivity(newAct);
    this.setSelectedActivity(newAct);
    this.setLoading(false);
    return newAct;
  };

  updateActivity = async (activity: IActivity) => {
    this.setLoading(true);
    let updatedAct = await agent.Activities.update(activity);
    updatedAct = this._formatData([updatedAct])[0];
    this.setActivity(updatedAct);
    this.setSelectedActivity(updatedAct);
    this.setLoading(false);
    return updatedAct;
  };

  _formatData = (activities: IActivity[]) => {
    return activities.map((act: IActivity) => {
      return { ...act, date: moment(act.date) };
    });
  };

  setLoading = (state: boolean) => (this.isLoading = state);
  setActivity = (activity: IActivity) => (this.activities.set(activity.id, activity));
  removeActivity = (activity: IActivity) => (this.activities.delete(activity.id));
  setActivities = (activities: Map<string, IActivity>) => (this.activities = activities);
  setSelectedActivity = (activity: IActivity | undefined) => {
    this.selectedActivity = activity;
  };
  setTodeleteActivity = (activity: IActivity | undefined) => {
    this.todeleteActivity = activity;
  };
  setEditMode = (state: boolean) => (this.editMode = state);
  
}
