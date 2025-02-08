import {
  Button,
  ButtonGroup,
  DropdownProps,
  Form,
  FormInput,
  FormSelect,
  Label,
  Modal,
  ModalContent,
  ModalHeader,
} from "semantic-ui-react";
import { IActivity } from "../../../app/models/Activity";
import { ChangeEvent, SyntheticEvent, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import axios from "axios";
import {v4 as uuid} from 'uuid';

const categories = [
  { key: "culture", text: "Culture", value: "culture" },
  { key: "drink", text: "Drink", value: "drink" },
  { key: "film", text: "Film", value: "film" },
  { key: "food", text: "Food", value: "food" },
  { key: "music", text: "Music", value: "music" },
  { key: "travel", text: "Travel", value: "travel" },
];

export const ActivityForm = function ({
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
  };
  const [activityValues, setActivityValues] = useState(intialState);

  const onSubmit = async function () {
    const formattedActivityValues = {...activityValues, date: activityValues.date.toISOString()}
    await axios.post("http://localhost:5208/api/activities", formattedActivityValues, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(function () {
      onClickCancel();
    })
    .catch(function (error) {
      if (error.response) {
        console.log(error.response.data);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log('Error', error.message);
      }
      console.log(error.config);
    });
  };

  function onInputFieldChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setActivityValues({...activityValues, [name]: value})
  }

  function onSelectFieldChange(_event: SyntheticEvent<HTMLElement>, data: DropdownProps) {
    const name = data.name;
    setActivityValues({...activityValues, [name]: data.value})
  }

  return (
    <Form autoComplete="off" onSubmit={onSubmit}>
      <FormInput
        fluid
        name="title"
        label="Title"
        placeholder="Activity Title"
        defaultValue={activityValues.title}
        onChange={onInputFieldChange}
      />
      <Label for="date" basic style={{border: "none", padding: "0 2px"}}>Date of activity</Label>
      <DatePicker
        title="Date of activity"
        name="date"
        selected={activityValues.date.toDate()}
        onChange={(val) => setActivityValues({...activityValues, "date": moment(val)})}
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
  );
};

export const ActivityFormModal = function () {
  const [open, setOpen] = useState(false);
  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={<Button positive content="Create activity"></Button>}
    >
      <ModalHeader>Create an activity</ModalHeader>
      <ModalContent>
        <ActivityForm activity={undefined} onClickCancel={() => setOpen(false)}></ActivityForm>
      </ModalContent>
    </Modal>
  );
};
