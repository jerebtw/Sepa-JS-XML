import { createSepaXML } from "./index";

describe("createSepaXML", () => {
  it("check valid xml", () => {
    expect(
      createSepaXML({
        painVersion: "pain.001.001.02",
        id: "1",
        creationDate: new Date(2022, 5, 16, 0, 0),
        initiatorName: "Test",
        positions: [
          {
            name: "Test",
            iban: "DE02701500000000594937",
            bic: "SSKMDEMM",
            requestedExecutionDate: new Date(2022, 5, 16, 0, 0),
            id: "123",
            payments: [
              {
                id: "Payment 1 ",
                amount: 123,
                iban: "DE02701500000000594937",
                bic: "SSKMDEMM",
                name: "Test",
                remittanceInformation: "WOW 1",
              },
              {
                id: "Payment 2",
                amount: 123.83,
                iban: "DE02701500000000594937",
                bic: "SSKMDEMM",
                name: "Test",
                remittanceInformation: "WOW 2",
              },
              {
                id: "Payment 3",
                amount: 69,
                iban: "DE02701500000000594937",
                bic: "SSKMDEMM",
                name: "Test",
                remittanceInformation: "WOW 3",
              },
            ],
          },
        ],
      })
    ).toEqual(
      `<?xml version="1.0" encoding="UTF-8"?><Document xmlns="urn:iso:std:iso:20022:tech:xsd:pain.001.001.02" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="urn:iso:std:iso:20022:tech:xsd:pain.001.001.02 pain.001.001.02.xsd"><pain.001.001.02><GrpHdr><MsgId>1</MsgId><CreDtTm>2022-06-15T22:00:00</CreDtTm><NbOfTxs>3</NbOfTxs><CtrlSum>315.83</CtrlSum><InitgPty><Nm>Test</Nm></InitgPty><BtchBookg>false</BtchBookg><Grpg>MIXD</Grpg></GrpHdr><PmtInf><PmtInfId>123</PmtInfId><PmtMtd>TRF</PmtMtd><BtchBookg/><NbOfTxs/><CtrlSum/><PmtTpInf><SvcLvl><Cd>SEPA</Cd></SvcLvl></PmtTpInf><ReqdExctnDt>2022-06-15</ReqdExctnDt><Dbtr><Nm>Test</Nm></Dbtr><DbtrAcct><Id><IBAN>DE02701500000000594937</IBAN></Id></DbtrAcct><DbtrAgt><FinInstnId><BIC>SSKMDEMM</BIC></FinInstnId></DbtrAgt><ChrgBr>SLEV</ChrgBr><CdtTrfTxInf><PmtId><InstrId>Payment 1 </InstrId></PmtId><Amt><InstdAmt Ccy="EUR">123.00</InstdAmt></Amt><CdtrAgt><FinInstnId><BIC>SSKMDEMM</BIC></FinInstnId></CdtrAgt><Cdtr><Nm>Test</Nm></Cdtr><CdtrAcct><Id><IBAN>DE02701500000000594937</IBAN></Id></CdtrAcct><RmtInf><Ustrd>WOW 1</Ustrd></RmtInf></CdtTrfTxInf><CdtTrfTxInf><PmtId><InstrId>Payment 2</InstrId></PmtId><Amt><InstdAmt Ccy="EUR">123.83</InstdAmt></Amt><CdtrAgt><FinInstnId><BIC>SSKMDEMM</BIC></FinInstnId></CdtrAgt><Cdtr><Nm>Test</Nm></Cdtr><CdtrAcct><Id><IBAN>DE02701500000000594937</IBAN></Id></CdtrAcct><RmtInf><Ustrd>WOW 2</Ustrd></RmtInf></CdtTrfTxInf><CdtTrfTxInf><PmtId><InstrId>Payment 3</InstrId></PmtId><Amt><InstdAmt Ccy="EUR">69.00</InstdAmt></Amt><CdtrAgt><FinInstnId><BIC>SSKMDEMM</BIC></FinInstnId></CdtrAgt><Cdtr><Nm>Test</Nm></Cdtr><CdtrAcct><Id><IBAN>DE02701500000000594937</IBAN></Id></CdtrAcct><RmtInf><Ustrd>WOW 3</Ustrd></RmtInf></CdtTrfTxInf></PmtInf></pain.001.001.02></Document>`
    );
  });

  it("check currency", () => {
    expect(
      createSepaXML({
        painVersion: "pain.001.001.02",
        id: "1",
        creationDate: new Date(2022, 5, 16, 0, 0),
        initiatorName: "Test",
        positions: [
          {
            name: "Test",
            iban: "DE02701500000000594937",
            bic: "SSKMDEMM",
            requestedExecutionDate: new Date(2022, 5, 16, 0, 0),
            id: "123",
            payments: [
              {
                id: "Payment 1 ",
                amount: 123,
                iban: "DE02701500000000594937",
                bic: "SSKMDEMM",
                name: "Test",
                remittanceInformation: "WOW 1",
                currency: "USD",
              },
              {
                id: "Payment 2",
                amount: 123.83,
                iban: "DE02701500000000594937",
                bic: "SSKMDEMM",
                name: "Test",
                remittanceInformation: "WOW 2",
                currency: "USD",
              },
              {
                id: "Payment 3",
                amount: 69,
                iban: "DE02701500000000594937",
                bic: "SSKMDEMM",
                name: "Test",
                remittanceInformation: "WOW 3",
                currency: "USD",
              },
            ],
          },
        ],
      })
    ).toEqual(
      `<?xml version="1.0" encoding="UTF-8"?><Document xmlns="urn:iso:std:iso:20022:tech:xsd:pain.001.001.02" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="urn:iso:std:iso:20022:tech:xsd:pain.001.001.02 pain.001.001.02.xsd"><pain.001.001.02><GrpHdr><MsgId>1</MsgId><CreDtTm>2022-06-15T22:00:00</CreDtTm><NbOfTxs>3</NbOfTxs><CtrlSum>315.83</CtrlSum><InitgPty><Nm>Test</Nm></InitgPty><BtchBookg>false</BtchBookg><Grpg>MIXD</Grpg></GrpHdr><PmtInf><PmtInfId>123</PmtInfId><PmtMtd>TRF</PmtMtd><BtchBookg/><NbOfTxs/><CtrlSum/><PmtTpInf><SvcLvl><Cd>SEPA</Cd></SvcLvl></PmtTpInf><ReqdExctnDt>2022-06-15</ReqdExctnDt><Dbtr><Nm>Test</Nm></Dbtr><DbtrAcct><Id><IBAN>DE02701500000000594937</IBAN></Id></DbtrAcct><DbtrAgt><FinInstnId><BIC>SSKMDEMM</BIC></FinInstnId></DbtrAgt><ChrgBr>SLEV</ChrgBr><CdtTrfTxInf><PmtId><InstrId>Payment 1 </InstrId></PmtId><Amt><InstdAmt Ccy="USD">123.00</InstdAmt></Amt><CdtrAgt><FinInstnId><BIC>SSKMDEMM</BIC></FinInstnId></CdtrAgt><Cdtr><Nm>Test</Nm></Cdtr><CdtrAcct><Id><IBAN>DE02701500000000594937</IBAN></Id></CdtrAcct><RmtInf><Ustrd>WOW 1</Ustrd></RmtInf></CdtTrfTxInf><CdtTrfTxInf><PmtId><InstrId>Payment 2</InstrId></PmtId><Amt><InstdAmt Ccy="USD">123.83</InstdAmt></Amt><CdtrAgt><FinInstnId><BIC>SSKMDEMM</BIC></FinInstnId></CdtrAgt><Cdtr><Nm>Test</Nm></Cdtr><CdtrAcct><Id><IBAN>DE02701500000000594937</IBAN></Id></CdtrAcct><RmtInf><Ustrd>WOW 2</Ustrd></RmtInf></CdtTrfTxInf><CdtTrfTxInf><PmtId><InstrId>Payment 3</InstrId></PmtId><Amt><InstdAmt Ccy="USD">69.00</InstdAmt></Amt><CdtrAgt><FinInstnId><BIC>SSKMDEMM</BIC></FinInstnId></CdtrAgt><Cdtr><Nm>Test</Nm></Cdtr><CdtrAcct><Id><IBAN>DE02701500000000594937</IBAN></Id></CdtrAcct><RmtInf><Ustrd>WOW 3</Ustrd></RmtInf></CdtTrfTxInf></PmtInf></pain.001.001.02></Document>`
    );
  });

  it("check id error", () => {
    try {
      createSepaXML(
        {
          id: "123456789123456789123456789123456789",
          creationDate: new Date(),
          initiatorName: "Test",
          positions: [],
        },
        {
          checkIBAN: true,
          checkBIC: true,
        }
      );
    } catch (e) {
      if (e instanceof Error) {
        expect(e.message).toEqual(
          "Max length for sepaData.id is 35 (123456789123456789123456789123456789)"
        );
        return;
      }
    }

    throw new Error("Error not thrown");
  });

  it("check iban validation", () => {
    try {
      createSepaXML({
        id: "Test",
        creationDate: new Date(),
        initiatorName: "Test",
        positions: [
          {
            name: "Test",
            iban: "Test",
            bic: "Test",
            id: "123",
            payments: [],
            requestedExecutionDate: new Date(),
          },
        ],
      });
    } catch (e) {
      if (e instanceof Error) {
        expect(e.message).toEqual(
          "sepaData.positions[0].iban is not valid (Test)"
        );
        return;
      }
    }

    throw new Error("Error not thrown");
  });

  it("check bic validation", () => {
    try {
      createSepaXML({
        id: "Test",
        creationDate: new Date(),
        initiatorName: "Test",
        positions: [
          {
            name: "Test",
            iban: "DE02701500000000594937",
            bic: "Test",
            id: "123",
            payments: [],
            requestedExecutionDate: new Date(),
          },
        ],
      });
    } catch (e) {
      if (e instanceof Error) {
        expect(e.message).toEqual(
          "sepaData.positions[0].bic is not valid (Test)"
        );
        return;
      }
    }

    throw new Error("Error not thrown");
  });

  it("issue #172", () => {
    const result = createSepaXML(
      {
        painVersion: "pain.001.001.03",
        batchBooking: false,
        id: "Test1345",
        creationDate: new Date(2022, 5, 16, 0, 0),
        initiatorName: "Test Company",
        positions: [
          {
            id: "Test123",
            iban: "DE02701500000000594937",
            bic: "Test",
            requestedExecutionDate: new Date(2022, 5, 16, 0, 0),
            name: "Pos 1",
            payments: [
              {
                id: "123",
                amount: 230,
                currency: "EUR",
                bic: "Test",
                name: "Money Company",
                iban: "DE02701500000000594937",
                remittanceInformation: "Money please",
                end2endReference: "lol",
              },
            ],
          },
        ],
      },
      {
        checkIBAN: false,
        checkBIC: false,
      }
    );
    expect(result).toBe(
      `<?xml version="1.0" encoding="UTF-8"?><Document xmlns="urn:iso:std:iso:20022:tech:xsd:pain.001.001.03" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="urn:iso:std:iso:20022:tech:xsd:pain.001.001.03 pain.001.001.03.xsd"><CstmrCdtTrfInitn><GrpHdr><MsgId>Test1345</MsgId><CreDtTm>2022-06-15T22:00:00</CreDtTm><NbOfTxs>1</NbOfTxs><CtrlSum>230.00</CtrlSum><InitgPty><Nm>Test Company</Nm></InitgPty></GrpHdr><PmtInf><PmtInfId>Test123</PmtInfId><PmtMtd>TRF</PmtMtd><BtchBookg>false</BtchBookg><NbOfTxs>1</NbOfTxs><CtrlSum>230.00</CtrlSum><PmtTpInf><SvcLvl><Cd>SEPA</Cd></SvcLvl></PmtTpInf><ReqdExctnDt>2022-06-15</ReqdExctnDt><Dbtr><Nm>Pos 1</Nm></Dbtr><DbtrAcct><Id><IBAN>DE02701500000000594937</IBAN></Id></DbtrAcct><DbtrAgt><FinInstnId><BIC>Test</BIC></FinInstnId></DbtrAgt><ChrgBr>SLEV</ChrgBr><CdtTrfTxInf><PmtId><InstrId>123</InstrId><EndToEndId>lol</EndToEndId></PmtId><Amt><InstdAmt Ccy="EUR">230.00</InstdAmt></Amt><CdtrAgt><FinInstnId><BIC>Test</BIC></FinInstnId></CdtrAgt><Cdtr><Nm>Money Company</Nm></Cdtr><CdtrAcct><Id><IBAN>DE02701500000000594937</IBAN></Id></CdtrAcct><RmtInf><Ustrd>Money please</Ustrd></RmtInf></CdtTrfTxInf></PmtInf></CstmrCdtTrfInitn></Document>`
    );
  });
});
