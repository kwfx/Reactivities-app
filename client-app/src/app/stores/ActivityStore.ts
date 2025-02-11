import { makeAutoObservable } from "mobx";
import { IActivity } from "../models/Activity";
import agent from "../api/agent";
import moment from "moment";

export default class ActivityStore {

    activities: IActivity[] = [];
    selectedActivity: IActivity | undefined = undefined;
    isLoading: boolean = true;

    constructor() {
        makeAutoObservable(this);
    }

    loadActivities = async () => {
        this.setLoading(true);
        const rawActivities = await agent.Activities.list();
        this.setActivities(rawActivities.map((act: IActivity) => {
            return {...act, date: moment(act.date)}
        }));
        this.setLoading(false);
    }

    setLoading = (state: boolean) => this.isLoading = state; 
    setActivities = (activities: IActivity[]) => this.activities = activities; 
    setSelectedActivity = (activity: IActivity | undefined) => this.selectedActivity = activity; 
}