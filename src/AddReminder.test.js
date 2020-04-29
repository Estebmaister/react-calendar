import reminders from "./app/reducers/reminders";

test("addReminder", () => {
  let state;
  state = reminders(
    { initialDate: "2020-04-29", reminders: {} },
    {
      type: "ADD_REMINDER",
      payload: {
        "2020-04-29": [
          {
            title: "Hello World!",
            city: "Bogotá",
            date: "2020-04-29",
            startTime: "10:00",
            category: "home",
            index: 0,
          },
        ],
      },
    }
  );
  expect(state).toEqual({
    initialDate: "2020-04-29",
    reminders: {
      "2020-04-29": [
        {
          title: "Hello World!",
          city: "Bogotá",
          date: "2020-04-29",
          startTime: "10:00",
          category: "home",
          index: 0,
        },
      ],
    },
  });
});
