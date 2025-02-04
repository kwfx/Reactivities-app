import {
  Button,
  ButtonGroup,
  Form,
  FormInput,
  FormSelect,
} from "semantic-ui-react";
import { IActivity } from "../../../app/models/Activity";

const categories = [
  { key: "culture", text: "Culture", value: "culture" },
  { key: "drink", text: "Drink", value: "drink" },
  { key: "film", text: "Film", value: "film" },
  { key: "food", text: "Food", value: "food" },
  { key: "music", text: "Music", value: "music" },
  { key: "travel", text: "Travel", value: "travel" },
];

export default function ActivityForm({ activity }: { activity: IActivity }) {
  return (
    <Form>
      <FormInput
        fluid
        label="Title"
        placeholder="Activity Title"
        defaultValue={activity.title}
      />
      <FormInput
        fluid
        label="Date"
        placeholder="Date of activity"
        defaultValue={activity.date}
      />
      <FormSelect
        defaultValue={activity.category}
        fluid
        label="Category"
        options={categories}
        placeholder="Category"
      />
      <FormInput
        fluid
        label="City"
        placeholder="City"
        defaultValue={activity.city}
      />
      <FormInput
        fluid
        label="Venue"
        placeholder="Venue"
        defaultValue={activity.venue}
      />
      <ButtonGroup fluid>
        <Button
          floated="right"
          content="Cancel"
        ></Button>
        <Button floated="left" type="submit" positive content="Submit"></Button>
      </ButtonGroup>
    </Form>
  );
}
