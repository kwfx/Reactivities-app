import { makeAutoObservable } from "mobx";
import moment from "moment";
import agent from "../api/agent";
import { IActivity } from "../models/Activity";

export default class ActivityStore {

  activities: Map<string, IActivity> = new Map();
  selectedActivity: IActivity | undefined = undefined;
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
    this.activities.delete(activity.id);
    this.setActivities(new Map([...this.activities]));
    if (this.selectedActivity?.id == activity.id) {
      this.setSelectedActivity(undefined);
    }
    this.setLoading(false);
  };

  addActivity = async (activity: IActivity) => {
    this.setLoading(true);
    let newAct = await agent.Activities.add(activity);
    newAct = this._formatData([newAct])[0];
    this.activities.set(newAct.id, newAct);
    this.setActivities(new Map([...this.activities]));
    this.setSelectedActivity(newAct);
    this.setLoading(false);
    return newAct;
  };

  updateActivity = async (activity: IActivity) => {
    this.setLoading(true);
    let updatedAct = await agent.Activities.update(activity);
    updatedAct = this._formatData([updatedAct])[0];
    this.activities.set(updatedAct.id, updatedAct);
    this.setActivities(new Map([...this.activities]));
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
  setActivities = (activities: Map<string, IActivity>) => (this.activities = activities);
  setSelectedActivity = (activity: IActivity | undefined) => {
    this.selectedActivity = activity;
  };
  setEditMode = (state: boolean) => (this.editMode = state);
}
