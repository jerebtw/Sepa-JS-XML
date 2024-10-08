import { expect, test } from "bun:test";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { createSepaXML } from "./index";
dayjs.extend(utc);

test("check valid xml", () => {
  expect(
    createSepaXML({
      painVersion: "pain.001.001.02",
      id: "1",
      creationDate: dayjs.utc("2022-06-16").toDate(),
      initiatorName: "Test",
      positions: [
        {
          name: "Test",
          iban: "DE02701500000000594937",
          bic: "SSKMDEMM",
          requestedExecutionDate: dayjs.utc("2022-06-16").toDate(),
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
    }),
  ).toEqual(
    `<?xml version="1.0" encoding="UTF-8"?><Document xmlns="urn:iso:std:iso:20022:tech:xsd:pain.001.001.02" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="urn:iso:std:iso:20022:tech:xsd:pain.001.001.02 pain.001.001.02.xsd"><pain.001.001.02><GrpHdr><MsgId>1</MsgId><CreDtTm>2022-06-16T00:00:00</CreDtTm><BtchBookg>true</BtchBookg><NbOfTxs>3</NbOfTxs><CtrlSum>315.83</CtrlSum><Grpg>MIXD</Grpg><InitgPty><Nm>Test</Nm></InitgPty></GrpHdr><PmtInf><PmtInfId>123</PmtInfId><PmtMtd>TRF</PmtMtd><PmtTpInf><SvcLvl><Cd>SEPA</Cd></SvcLvl></PmtTpInf><ReqdExctnDt>2022-06-16</ReqdExctnDt><Dbtr><Nm>Test</Nm></Dbtr><DbtrAcct><Id><IBAN>DE02701500000000594937</IBAN></Id></DbtrAcct><DbtrAgt><FinInstnId><BIC>SSKMDEMM</BIC></FinInstnId></DbtrAgt><ChrgBr>SLEV</ChrgBr><CdtTrfTxInf><PmtId><InstrId>Payment 1 </InstrId></PmtId><Amt><InstdAmt Ccy="EUR">123.00</InstdAmt></Amt><CdtrAgt><FinInstnId><BIC>SSKMDEMM</BIC></FinInstnId></CdtrAgt><Cdtr><Nm>Test</Nm></Cdtr><CdtrAcct><Id><IBAN>DE02701500000000594937</IBAN></Id></CdtrAcct><RmtInf><Ustrd>WOW 1</Ustrd></RmtInf></CdtTrfTxInf><CdtTrfTxInf><PmtId><InstrId>Payment 2</InstrId></PmtId><Amt><InstdAmt Ccy="EUR">123.83</InstdAmt></Amt><CdtrAgt><FinInstnId><BIC>SSKMDEMM</BIC></FinInstnId></CdtrAgt><Cdtr><Nm>Test</Nm></Cdtr><CdtrAcct><Id><IBAN>DE02701500000000594937</IBAN></Id></CdtrAcct><RmtInf><Ustrd>WOW 2</Ustrd></RmtInf></CdtTrfTxInf><CdtTrfTxInf><PmtId><InstrId>Payment 3</InstrId></PmtId><Amt><InstdAmt Ccy="EUR">69.00</InstdAmt></Amt><CdtrAgt><FinInstnId><BIC>SSKMDEMM</BIC></FinInstnId></CdtrAgt><Cdtr><Nm>Test</Nm></Cdtr><CdtrAcct><Id><IBAN>DE02701500000000594937</IBAN></Id></CdtrAcct><RmtInf><Ustrd>WOW 3</Ustrd></RmtInf></CdtTrfTxInf></PmtInf></pain.001.001.02></Document>`,
  );
});

test("check currency", () => {
  expect(
    createSepaXML({
      painVersion: "pain.001.001.02",
      id: "1",
      creationDate: dayjs.utc("2022-06-16").toDate(),
      initiatorName: "Test",
      positions: [
        {
          name: "Test",
          iban: "DE02701500000000594937",
          bic: "SSKMDEMM",
          requestedExecutionDate: dayjs.utc("2022-06-16").toDate(),
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
    }),
  ).toEqual(
    `<?xml version="1.0" encoding="UTF-8"?><Document xmlns="urn:iso:std:iso:20022:tech:xsd:pain.001.001.02" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="urn:iso:std:iso:20022:tech:xsd:pain.001.001.02 pain.001.001.02.xsd"><pain.001.001.02><GrpHdr><MsgId>1</MsgId><CreDtTm>2022-06-16T00:00:00</CreDtTm><BtchBookg>true</BtchBookg><NbOfTxs>3</NbOfTxs><CtrlSum>315.83</CtrlSum><Grpg>MIXD</Grpg><InitgPty><Nm>Test</Nm></InitgPty></GrpHdr><PmtInf><PmtInfId>123</PmtInfId><PmtMtd>TRF</PmtMtd><PmtTpInf><SvcLvl><Cd>SEPA</Cd></SvcLvl></PmtTpInf><ReqdExctnDt>2022-06-16</ReqdExctnDt><Dbtr><Nm>Test</Nm></Dbtr><DbtrAcct><Id><IBAN>DE02701500000000594937</IBAN></Id></DbtrAcct><DbtrAgt><FinInstnId><BIC>SSKMDEMM</BIC></FinInstnId></DbtrAgt><ChrgBr>SLEV</ChrgBr><CdtTrfTxInf><PmtId><InstrId>Payment 1 </InstrId></PmtId><Amt><InstdAmt Ccy="USD">123.00</InstdAmt></Amt><CdtrAgt><FinInstnId><BIC>SSKMDEMM</BIC></FinInstnId></CdtrAgt><Cdtr><Nm>Test</Nm></Cdtr><CdtrAcct><Id><IBAN>DE02701500000000594937</IBAN></Id></CdtrAcct><RmtInf><Ustrd>WOW 1</Ustrd></RmtInf></CdtTrfTxInf><CdtTrfTxInf><PmtId><InstrId>Payment 2</InstrId></PmtId><Amt><InstdAmt Ccy="USD">123.83</InstdAmt></Amt><CdtrAgt><FinInstnId><BIC>SSKMDEMM</BIC></FinInstnId></CdtrAgt><Cdtr><Nm>Test</Nm></Cdtr><CdtrAcct><Id><IBAN>DE02701500000000594937</IBAN></Id></CdtrAcct><RmtInf><Ustrd>WOW 2</Ustrd></RmtInf></CdtTrfTxInf><CdtTrfTxInf><PmtId><InstrId>Payment 3</InstrId></PmtId><Amt><InstdAmt Ccy="USD">69.00</InstdAmt></Amt><CdtrAgt><FinInstnId><BIC>SSKMDEMM</BIC></FinInstnId></CdtrAgt><Cdtr><Nm>Test</Nm></Cdtr><CdtrAcct><Id><IBAN>DE02701500000000594937</IBAN></Id></CdtrAcct><RmtInf><Ustrd>WOW 3</Ustrd></RmtInf></CdtTrfTxInf></PmtInf></pain.001.001.02></Document>`,
  );
});

test("check id error", () => {
  expect(() =>
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
      },
    ),
  ).toThrow(
    "Max length for sepaData.id is 35 (123456789123456789123456789123456789)",
  );
});

test("check iban validation", () => {
  expect(() =>
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
    }),
  ).toThrow("sepaData.positions[0].iban is not valid (Test)");
});

test("check bic validation", () => {
  expect(() =>
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
    }),
  ).toThrow("sepaData.positions[0].bic is not valid (Test)");
});

test("issue #172", () => {
  expect(
    createSepaXML(
      {
        painVersion: "pain.001.001.03",
        id: "Test1345",
        creationDate: dayjs.utc("2022-06-16").toDate(),
        initiatorName: "Test Company",
        positions: [
          {
            id: "Test123",
            batchBooking: false,
            iban: "DE02701500000000594937",
            bic: "Test",
            requestedExecutionDate: dayjs.utc("2022-06-16").toDate(),
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
      },
    ),
  ).toBe(
    `<?xml version="1.0" encoding="UTF-8"?><Document xmlns="urn:iso:std:iso:20022:tech:xsd:pain.001.001.03" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="urn:iso:std:iso:20022:tech:xsd:pain.001.001.03 pain.001.001.03.xsd"><CstmrCdtTrfInitn><GrpHdr><MsgId>Test1345</MsgId><CreDtTm>2022-06-16T00:00:00</CreDtTm><NbOfTxs>1</NbOfTxs><CtrlSum>230.00</CtrlSum><InitgPty><Nm>Test Company</Nm></InitgPty></GrpHdr><PmtInf><PmtInfId>Test123</PmtInfId><PmtMtd>TRF</PmtMtd><BtchBookg>false</BtchBookg><NbOfTxs>1</NbOfTxs><CtrlSum>230.00</CtrlSum><PmtTpInf><SvcLvl><Cd>SEPA</Cd></SvcLvl></PmtTpInf><ReqdExctnDt>2022-06-16</ReqdExctnDt><Dbtr><Nm>Pos 1</Nm></Dbtr><DbtrAcct><Id><IBAN>DE02701500000000594937</IBAN></Id></DbtrAcct><DbtrAgt><FinInstnId><BIC>Test</BIC></FinInstnId></DbtrAgt><ChrgBr>SLEV</ChrgBr><CdtTrfTxInf><PmtId><InstrId>123</InstrId><EndToEndId>lol</EndToEndId></PmtId><Amt><InstdAmt Ccy="EUR">230.00</InstdAmt></Amt><CdtrAgt><FinInstnId><BIC>Test</BIC></FinInstnId></CdtrAgt><Cdtr><Nm>Money Company</Nm></Cdtr><CdtrAcct><Id><IBAN>DE02701500000000594937</IBAN></Id></CdtrAcct><RmtInf><Ustrd>Money please</Ustrd></RmtInf></CdtTrfTxInf></PmtInf></CstmrCdtTrfInitn></Document>`,
  );
});

test("issue #287", () => {
  expect(
    createSepaXML(
      {
        painVersion: "pain.008.001.02",
        id: "Test1345",
        creationDate: dayjs.utc("2022-06-16").toDate(),
        initiatorName: "Test Company",
        positions: [
          {
            id: "Test123",
            batchBooking: false,
            iban: "DE02701500000000594937",
            requestedExecutionDate: dayjs.utc("2022-06-16").toDate(),
            name: "Pos 1",
            payments: [
              {
                id: "123",
                amount: 230,
                currency: "EUR",
                name: "Money Company",
                iban: "DE02701500000000594937",
                bic: "Test",
                remittanceInformation: "Money please",
                end2endReference: "lol",
              },
            ],
          },
        ],
      },
      {
        checkIBAN: true,
        checkBIC: true,
      },
    ),
  ).toBe(
    `<?xml version="1.0" encoding="UTF-8"?><Document xmlns="urn:iso:std:iso:20022:tech:xsd:pain.008.001.02" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="urn:iso:std:iso:20022:tech:xsd:pain.008.001.02 pain.008.001.02.xsd"><CstmrDrctDbtInitn><GrpHdr><MsgId>Test1345</MsgId><CreDtTm>2022-06-16T00:00:00</CreDtTm><NbOfTxs>1</NbOfTxs><CtrlSum>230.00</CtrlSum><InitgPty><Nm>Test Company</Nm></InitgPty></GrpHdr><PmtInf><PmtInfId>Test123</PmtInfId><PmtMtd>DD</PmtMtd><BtchBookg>false</BtchBookg><NbOfTxs>1</NbOfTxs><CtrlSum>230.00</CtrlSum><PmtTpInf><SvcLvl><Cd>SEPA</Cd></SvcLvl><LclInstrm><Cd/></LclInstrm></PmtTpInf><SeqTp/><ReqdColltnDt/><Cdtr><Nm>Pos 1</Nm></Cdtr><CdtrAcct><Id><IBAN>DE02701500000000594937</IBAN></Id></CdtrAcct><CdtrAgt><FinInstnId><BIC/></FinInstnId></CdtrAgt><CdtrSchmeId><Id><PrvtId><Othr><Id>Test123</Id><SchmeNm><Prtry>SEPA</Prtry></SchmeNm></Othr></PrvtId></Id></CdtrSchmeId><ChrgBr>SLEV</ChrgBr><CdtTrfTxInf><PmtId><InstrId>123</InstrId><EndToEndId>lol</EndToEndId></PmtId><Amt Ccy="EUR"><InstdAmt>230.00</InstdAmt></Amt><DrctDbtTx><MndtRltdInf><MndtId/><DtOfSgntr/></MndtRltdInf></DrctDbtTx><DbtrAcct><Id><IBAN>DE02701500000000594937</IBAN></Id></DbtrAcct><DbtrAgt><FinInstnId><BIC>Test</BIC></FinInstnId></DbtrAgt><Dbtr><Nm>Money Company</Nm></Dbtr><RmtInf><Ustrd>Money please</Ustrd></RmtInf></CdtTrfTxInf></PmtInf></CstmrDrctDbtInitn></Document>`,
  );
  expect(
    createSepaXML(
      {
        painVersion: "pain.008.001.02",
        id: "Test1345",
        creationDate: dayjs.utc("2022-06-16").toDate(),
        initiatorName: "Test Company",
        positions: [
          {
            id: "Test123",
            batchBooking: false,
            iban: "DE02701500000000594937",
            bic: "Test",
            requestedExecutionDate: dayjs.utc("2022-06-16").toDate(),
            name: "Pos 1",
            payments: [
              {
                id: "123",
                amount: 230,
                currency: "EUR",
                name: "Money Company",
                iban: "DE02701500000000594937",
                bic: "Test",
                remittanceInformation: "Money please",
                end2endReference: "lol",
              },
            ],
          },
        ],
      },
      {
        checkIBAN: true,
        checkBIC: false,
      },
    ),
  ).toBe(
    `<?xml version="1.0" encoding="UTF-8"?><Document xmlns="urn:iso:std:iso:20022:tech:xsd:pain.008.001.02" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="urn:iso:std:iso:20022:tech:xsd:pain.008.001.02 pain.008.001.02.xsd"><CstmrDrctDbtInitn><GrpHdr><MsgId>Test1345</MsgId><CreDtTm>2022-06-16T00:00:00</CreDtTm><NbOfTxs>1</NbOfTxs><CtrlSum>230.00</CtrlSum><InitgPty><Nm>Test Company</Nm></InitgPty></GrpHdr><PmtInf><PmtInfId>Test123</PmtInfId><PmtMtd>DD</PmtMtd><BtchBookg>false</BtchBookg><NbOfTxs>1</NbOfTxs><CtrlSum>230.00</CtrlSum><PmtTpInf><SvcLvl><Cd>SEPA</Cd></SvcLvl><LclInstrm><Cd/></LclInstrm></PmtTpInf><SeqTp/><ReqdColltnDt/><Cdtr><Nm>Pos 1</Nm></Cdtr><CdtrAcct><Id><IBAN>DE02701500000000594937</IBAN></Id></CdtrAcct><CdtrAgt><FinInstnId><BIC>Test</BIC></FinInstnId></CdtrAgt><CdtrSchmeId><Id><PrvtId><Othr><Id>Test123</Id><SchmeNm><Prtry>SEPA</Prtry></SchmeNm></Othr></PrvtId></Id></CdtrSchmeId><ChrgBr>SLEV</ChrgBr><CdtTrfTxInf><PmtId><InstrId>123</InstrId><EndToEndId>lol</EndToEndId></PmtId><Amt Ccy="EUR"><InstdAmt>230.00</InstdAmt></Amt><DrctDbtTx><MndtRltdInf><MndtId/><DtOfSgntr/></MndtRltdInf></DrctDbtTx><DbtrAcct><Id><IBAN>DE02701500000000594937</IBAN></Id></DbtrAcct><DbtrAgt><FinInstnId><BIC>Test</BIC></FinInstnId></DbtrAgt><Dbtr><Nm>Money Company</Nm></Dbtr><RmtInf><Ustrd>Money please</Ustrd></RmtInf></CdtTrfTxInf></PmtInf></CstmrDrctDbtInitn></Document>`,
  );
  expect(
    createSepaXML(
      {
        painVersion: "pain.008.001.02",
        id: "Test1345",
        creationDate: dayjs.utc("2022-06-16").toDate(),
        initiatorName: "Test Company",
        positions: [
          {
            id: "Test123",
            batchBooking: false,
            iban: "DE02701500000000594937",
            requestedExecutionDate: dayjs.utc("2022-06-16").toDate(),
            name: "Pos 1",
            payments: [
              {
                id: "123",
                amount: 230,
                currency: "EUR",
                name: "Money Company",
                iban: "DE02701500000000594937",
                bic: "Test",
                remittanceInformation: "Money please",
                end2endReference: "lol",
              },
            ],
          },
        ],
      },
      {
        checkIBAN: true,
        checkBIC: false,
      },
    ),
  ).toBe(
    `<?xml version="1.0" encoding="UTF-8"?><Document xmlns="urn:iso:std:iso:20022:tech:xsd:pain.008.001.02" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="urn:iso:std:iso:20022:tech:xsd:pain.008.001.02 pain.008.001.02.xsd"><CstmrDrctDbtInitn><GrpHdr><MsgId>Test1345</MsgId><CreDtTm>2022-06-16T00:00:00</CreDtTm><NbOfTxs>1</NbOfTxs><CtrlSum>230.00</CtrlSum><InitgPty><Nm>Test Company</Nm></InitgPty></GrpHdr><PmtInf><PmtInfId>Test123</PmtInfId><PmtMtd>DD</PmtMtd><BtchBookg>false</BtchBookg><NbOfTxs>1</NbOfTxs><CtrlSum>230.00</CtrlSum><PmtTpInf><SvcLvl><Cd>SEPA</Cd></SvcLvl><LclInstrm><Cd/></LclInstrm></PmtTpInf><SeqTp/><ReqdColltnDt/><Cdtr><Nm>Pos 1</Nm></Cdtr><CdtrAcct><Id><IBAN>DE02701500000000594937</IBAN></Id></CdtrAcct><CdtrAgt><FinInstnId><BIC/></FinInstnId></CdtrAgt><CdtrSchmeId><Id><PrvtId><Othr><Id>Test123</Id><SchmeNm><Prtry>SEPA</Prtry></SchmeNm></Othr></PrvtId></Id></CdtrSchmeId><ChrgBr>SLEV</ChrgBr><CdtTrfTxInf><PmtId><InstrId>123</InstrId><EndToEndId>lol</EndToEndId></PmtId><Amt Ccy="EUR"><InstdAmt>230.00</InstdAmt></Amt><DrctDbtTx><MndtRltdInf><MndtId/><DtOfSgntr/></MndtRltdInf></DrctDbtTx><DbtrAcct><Id><IBAN>DE02701500000000594937</IBAN></Id></DbtrAcct><DbtrAgt><FinInstnId><BIC>Test</BIC></FinInstnId></DbtrAgt><Dbtr><Nm>Money Company</Nm></Dbtr><RmtInf><Ustrd>Money please</Ustrd></RmtInf></CdtTrfTxInf></PmtInf></CstmrDrctDbtInitn></Document>`,
  );
  expect(() =>
    createSepaXML(
      {
        painVersion: "pain.008.001.02",
        id: "Test1345",
        creationDate: dayjs.utc("2022-06-16").toDate(),
        initiatorName: "Test Company",
        positions: [
          {
            id: "Test123",
            batchBooking: false,
            iban: "DE02701500000000594937",
            bic: "Test",
            requestedExecutionDate: dayjs.utc("2022-06-16").toDate(),
            name: "Pos 1",
            payments: [
              {
                id: "123",
                amount: 230,
                currency: "EUR",
                name: "Money Company",
                iban: "DE02701500000000594937",
                bic: "Test",
                remittanceInformation: "Money please",
                end2endReference: "lol",
              },
            ],
          },
        ],
      },
      {
        checkIBAN: true,
        checkBIC: true,
      },
    ),
  ).toThrow("sepaData.positions[0].bic is not valid (Test)");
});
