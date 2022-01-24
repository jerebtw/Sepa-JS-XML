import createSepaXML, { PAIN_VERSIONS } from "./index";

describe("createSepaXML", () => {
  it("check valid xml", () => {
    expect(
      createSepaXML({
        painVersion: PAIN_VERSIONS["pain.001.001.02"],
        id: "1",
        creationDate: new Date(2022, 5, 16, 0, 0),
        initiatorName: "Test",
        positions: [
          {
            name: "Test",
            iban: "DE1234567890123456789012345678901",
            bic: "BICDEFF",
            requestedExecutionDate: new Date(2022, 5, 16, 0, 0),
            id: "123",
            payments: [
              {
                id: "Payment 1 ",
                amount: 123,
                iban: "DE1234567890123456789012345678901",
                bic: "BICDEFF",
                name: "Test",
                remittanceInformation: "WOW 1",
              },
              {
                id: "Payment 2",
                amount: 123.83,
                iban: "DE1234567890123456789012345678901",
                bic: "BICDEFF",
                name: "Test",
                remittanceInformation: "WOW 2",
              },
              {
                id: "Payment 3",
                amount: 69,
                iban: "DE1234567890123456789012345678901",
                bic: "BICDEFF",
                name: "Test",
                remittanceInformation: "WOW 3",
              },
            ],
          },
        ],
      }),
    ).toEqual(
      `<?xml version="1.0" encoding="UTF-8"?><Document xmlns="urn:iso:std:iso:20022:tech:xsd:pain.001.001.02" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="urn:iso:std:iso:20022:tech:xsd:pain.001.001.02 pain.001.001.02.xsd"><pain.001.001.02><GrpHdr><MsgId>1</MsgId><CreDtTm>2022-06-15T22:00:00</CreDtTm><NbOfTxs>3</NbOfTxs><CtrlSum>315.83</CtrlSum><InitgPty><Nm>Test</Nm></InitgPty><BtchBookg>false</BtchBookg><Grpg>MIXD</Grpg></GrpHdr><PmtInf><PmtInfId>123</PmtInfId><PmtMtd>TRF</PmtMtd><PmtTpInf><SvcLvl><Cd>SEPA</Cd></SvcLvl></PmtTpInf><ChrgBr>SLEV</ChrgBr><ReqdExctnDt>2022-06-15</ReqdExctnDt><Dbtr><Nm>Test</Nm></Dbtr><DbtrAcct><Id><IBAN>DE1234567890123456789012345678901</IBAN></Id></DbtrAcct><DbtrAgt><FinInstnId><BIC>BICDEFF</BIC></FinInstnId></DbtrAgt><CdtTrfTxInf><PmtId><InstrId>Payment 1 </InstrId></PmtId><RmtInf><Ustrd>WOW 1</Ustrd></RmtInf><Amt><InstdAmt Ccy="EUR">123.00</InstdAmt></Amt><CdtrAcct><Id><IBAN>DE1234567890123456789012345678901</IBAN></Id></CdtrAcct><CdtrAgt><FinInstnId><BIC>BICDEFF</BIC></FinInstnId></CdtrAgt><Cdtr><Nm>Test</Nm></Cdtr></CdtTrfTxInf><CdtTrfTxInf><PmtId><InstrId>Payment 2</InstrId></PmtId><RmtInf><Ustrd>WOW 2</Ustrd></RmtInf><Amt><InstdAmt Ccy="EUR">123.83</InstdAmt></Amt><CdtrAcct><Id><IBAN>DE1234567890123456789012345678901</IBAN></Id></CdtrAcct><CdtrAgt><FinInstnId><BIC>BICDEFF</BIC></FinInstnId></CdtrAgt><Cdtr><Nm>Test</Nm></Cdtr></CdtTrfTxInf><CdtTrfTxInf><PmtId><InstrId>Payment 3</InstrId></PmtId><RmtInf><Ustrd>WOW 3</Ustrd></RmtInf><Amt><InstdAmt Ccy="EUR">69.00</InstdAmt></Amt><CdtrAcct><Id><IBAN>DE1234567890123456789012345678901</IBAN></Id></CdtrAcct><CdtrAgt><FinInstnId><BIC>BICDEFF</BIC></FinInstnId></CdtrAgt><Cdtr><Nm>Test</Nm></Cdtr></CdtTrfTxInf></PmtInf></pain.001.001.02></Document>`,
    );
  });

  it("check currency", () => {
    expect(
      createSepaXML({
        painVersion: PAIN_VERSIONS["pain.001.001.02"],
        id: "1",
        creationDate: new Date(2022, 5, 16, 0, 0),
        initiatorName: "Test",
        positions: [
          {
            name: "Test",
            iban: "DE1234567890123456789012345678901",
            bic: "BICDEFF",
            requestedExecutionDate: new Date(2022, 5, 16, 0, 0),
            id: "123",
            payments: [
              {
                id: "Payment 1 ",
                amount: 123,
                iban: "DE1234567890123456789012345678901",
                bic: "BICDEFF",
                name: "Test",
                remittanceInformation: "WOW 1",
                currency: "USD",
              },
              {
                id: "Payment 2",
                amount: 123.83,
                iban: "DE1234567890123456789012345678901",
                bic: "BICDEFF",
                name: "Test",
                remittanceInformation: "WOW 2",
                currency: "USD",
              },
              {
                id: "Payment 3",
                amount: 69,
                iban: "DE1234567890123456789012345678901",
                bic: "BICDEFF",
                name: "Test",
                remittanceInformation: "WOW 3",
                currency: "USD",
              },
            ],
          },
        ],
      }),
    ).toEqual(
      `<?xml version="1.0" encoding="UTF-8"?><Document xmlns="urn:iso:std:iso:20022:tech:xsd:pain.001.001.02" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="urn:iso:std:iso:20022:tech:xsd:pain.001.001.02 pain.001.001.02.xsd"><pain.001.001.02><GrpHdr><MsgId>1</MsgId><CreDtTm>2022-06-15T22:00:00</CreDtTm><NbOfTxs>3</NbOfTxs><CtrlSum>315.83</CtrlSum><InitgPty><Nm>Test</Nm></InitgPty><BtchBookg>false</BtchBookg><Grpg>MIXD</Grpg></GrpHdr><PmtInf><PmtInfId>123</PmtInfId><PmtMtd>TRF</PmtMtd><PmtTpInf><SvcLvl><Cd>SEPA</Cd></SvcLvl></PmtTpInf><ChrgBr>SLEV</ChrgBr><ReqdExctnDt>2022-06-15</ReqdExctnDt><Dbtr><Nm>Test</Nm></Dbtr><DbtrAcct><Id><IBAN>DE1234567890123456789012345678901</IBAN></Id></DbtrAcct><DbtrAgt><FinInstnId><BIC>BICDEFF</BIC></FinInstnId></DbtrAgt><CdtTrfTxInf><PmtId><InstrId>Payment 1 </InstrId></PmtId><RmtInf><Ustrd>WOW 1</Ustrd></RmtInf><Amt><InstdAmt Ccy="USD">123.00</InstdAmt></Amt><CdtrAcct><Id><IBAN>DE1234567890123456789012345678901</IBAN></Id></CdtrAcct><CdtrAgt><FinInstnId><BIC>BICDEFF</BIC></FinInstnId></CdtrAgt><Cdtr><Nm>Test</Nm></Cdtr></CdtTrfTxInf><CdtTrfTxInf><PmtId><InstrId>Payment 2</InstrId></PmtId><RmtInf><Ustrd>WOW 2</Ustrd></RmtInf><Amt><InstdAmt Ccy="USD">123.83</InstdAmt></Amt><CdtrAcct><Id><IBAN>DE1234567890123456789012345678901</IBAN></Id></CdtrAcct><CdtrAgt><FinInstnId><BIC>BICDEFF</BIC></FinInstnId></CdtrAgt><Cdtr><Nm>Test</Nm></Cdtr></CdtTrfTxInf><CdtTrfTxInf><PmtId><InstrId>Payment 3</InstrId></PmtId><RmtInf><Ustrd>WOW 3</Ustrd></RmtInf><Amt><InstdAmt Ccy="USD">69.00</InstdAmt></Amt><CdtrAcct><Id><IBAN>DE1234567890123456789012345678901</IBAN></Id></CdtrAcct><CdtrAgt><FinInstnId><BIC>BICDEFF</BIC></FinInstnId></CdtrAgt><Cdtr><Nm>Test</Nm></Cdtr></CdtTrfTxInf></PmtInf></pain.001.001.02></Document>`,
    );
  });

  it("check error", () => {
    try {
      createSepaXML({
        id: "123456789123456789123456789123456789",
        creationDate: new Date(),
        initiatorName: "Test",
        positions: [],
      });
    } catch (e) {
      if (e instanceof Error) {
        expect(e.message).toEqual("Max length for sepaData.id is 35");
      }
    }
  });
});
