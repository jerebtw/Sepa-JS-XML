# Sepa JS XML

This is a libary to generate SEPA xml files.

```
Note that this library has not been tested 100%
If you find a problem, please report it
```

## Example

```ts
import createSepaXML from "sepa-js-xml";

createSepaXML({
  id: "1",
  creationDate: new Date(2022, 5, 16, 0, 0),
  initiatorName: "Test",
  positions: [
    {
      name: "Test",
      iban: "",
      bic: "",
      requestedExecutionDate: new Date(2022, 5, 16, 0, 0),
      id: "123",
      payments: [
        {
          id: "Payment 1",
          amount: 123,
          iban: "",
          bic: "",
          name: "Test",
          remittanceInformation: "WOW 1",
        },
        {
          id: "Payment 2",
          amount: 123.83,
          iban: "",
          bic: "",
          name: "Test",
          remittanceInformation: "WOW 2",
        },
        {
          id: "Payment 3",
          amount: 69,
          iban: "",
          bic: "",
          name: "Test",
          remittanceInformation: "WOW 3",
        },
      ],
    },
  ],
});
```

## License

[MIT](https://choosealicense.com/licenses/mit/)
