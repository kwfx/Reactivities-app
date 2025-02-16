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
    this.setActivity(newAct);
    this.setActivities(new Map([...this.activities]));
    this.setSelectedActivity(newAct);
    this.setLoading(false);
    return newAct;
  };

  updateActivity = async (activity: IActivity) => {
    this.setLoading(true);
    let updatedAct = await agent.Activities.update(activity);
    updatedAct = this._formatData([updatedAct])[0];
    this.setActivity(updatedAct);
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
  setActivity = (activity: IActivity) => (this.activities.set(activity.id, activity));
  setActivities = (activities: Map<string, IActivity>) => (this.activities = activities);
  setSelectedActivity = (activity: IActivity | undefined) => {
    this.selectedActivity = activity;
  };
  setEditMode = (state: boolean) => (this.editMode = state);
}
