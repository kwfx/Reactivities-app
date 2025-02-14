import {
  Button,
  ButtonGroup,
  DropdownProps,
  Form,
  FormInput,
  FormSelect,
  Label,
  Segment,
} from "semantic-ui-react";
import { IActivity } from "../../../app/models/Activity";
import { ChangeEvent, SyntheticEvent, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import { v4 as uuid } from "uuid";
import { useStore } from "../../../app/stores/Store";
import { observer } from "mobx-react-lite";

const categories = [
  { key: "culture", text: "Culture", value: "culture" },
  { key: "drinks", text: "Drinks", value: "drinks" },
  { key: "film", text: "Film", value: "film" },
  { key: "food", text: "Food", value: "food" },
  { key: "music", text: "Music", value: "music" },
  { key: "travel", text: "Travel", value: "travel" },
];

export const ActivityForm = observer(function ({
  activity,
  onClickCancel,
}: {
  activity: IActivity | undefined;
  onClickCancel: () => void;
}) {
  const intialState = activity ?? {
    id: uuid(),
    title: "",
    date: moment(),
    category: "",
    city: "",
    venue: "",
    updatedAt: moment(),
  };
  const [activityValues, setActivityValues] = useState(intialState);
  const { activityStore } = useStore();

  const onSubmit = async function () {
    if (activity) {
      await activityStore.updateActivity(activityValues);
    } else {
      await activityStore.addActivity(activityValues);
    }
    onClickCancel();
  };

  function onInputFieldChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setActivityValues({ ...activityValues, [name]: value });
  }

  function onSelectFieldChange(_event: SyntheticEvent<HTMLElement>, data: DropdownProps) {
    const name = data.name;
    setActivityValues({ ...activityValues, [name]: data.value });
  }

  return (
    <Segment>
      <Form autoComplete="off" onSubmit={onSubmit}>
        <FormInput
          fluid
          name="title"
          label="Title"
          placeholder="Activity Title"
          defaultValue={activityValues.title}
          onChange={onInputFieldChange}
        />
        <Label for="date" basic style={{ border: "none", padding: "0 2px" }}>
          Date of activity
        </Label>
        <DatePicker
          title="Date of activity"
          name="date"
          selected={activityValues.date.toDate()}
          onChange={(val) => setActivityValues({ ...activityValues, date: moment(val) })}
          dateFormat="MM/dd/yyyy h:mm aa"
          showTimeInput
        />
        <FormSelect
          defaultValue={activityValues.category}
          name="category"
          fluid
          label="Category"
          options={categories}
          placeholder="Category"
          onChange={onSelectFieldChange}
        />
        <FormInput
          fluid
          name="city"
          label="City"
          placeholder="City"
          defaultValue={activityValues.city}
          onChange={onInputFieldChange}
        />
        <FormInput
          fluid
          name="venue"
          label="Venue"
          placeholder="Venue"
          defaultValue={activityValues.venue}
          onChange={onInputFieldChange}
        />
        <ButtonGroup fluid>
          <Button floated="left" type="submit" positive content="Submit"></Button>
          <Button floated="right" content="Cancel" onClick={() => onClickCancel()}></Button>
        </ButtonGroup>
      </Form>
    </Segment>
  );
});
