import moment from "moment";

export interface IActivity {
    id: string;
    title: string;
    date: moment.Moment;
    category: string;
    city: string;
    venue: string;
    updatedAt: moment.Moment;
}