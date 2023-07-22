/* eslint @typescript-eslint/no-duplicate-enum-values: "off" */
import {
  type DeclarationAttributes,
  type ElementCompact,
  js2xml,
} from "xml-js";
import { isValidIBAN, isValidBIC } from "ibantools";

//#region Interfaces
export interface Options {
  /**
   * If the xml should be pretty printed
   * @default false
   */
  prettyPrint?: boolean;
  /**
   * Check if the IBAN is valid. (with IBANTools)
   * @default true
   */
  checkIBAN?: boolean;
  /**
   * Check if the BIC is valid. (with IBANTools)
   * @default true
   */
  checkBIC?: boolean;
}

export interface Payment {
  /** Max length is 35 */
  id: string;
  name: string;
  iban: string;
  bic: string;
  mandateId?: string;
  mandateSignatureDate?: Date;

  amount: number;
  /** Default is "EUR" */
  currency?: string;
  remittanceInformation: string;
  end2endReference?: string;
}

export interface GroupHeader {
  /** Max length is 35 */
  MsgId: string;
  CreDtTm: string; // Date YYYY-MM-DDThh:mm:ss
  NbOfTxs: number;
  CtrlSum: string; // number
  BtchBookg?: "true" | "false"; // boolean
  InitgPty: {
    /** Min length is 1 */
    /** Max length is 70 */
    Nm: string;
  };
  Grpg?: "MIXD";
}

export interface CreditorPayments {
  /** Max length is 35 */
  id: string;
  batchBooking?: boolean;
  /** When the payment should be executed */
  requestedExecutionDate: Date;
  collectionDate?: Date;

  name: string;
  iban: string;
  bic: string;

  payments: Payment[];
}

export interface SepaData {
  painVersion?: PAIN_VERSIONS;
  xmlVersion?: string;
  xmlEncoding?: string;
  xsiNamespace?: string;
  xsiXmls?: string;

  localInstrumentation?: LOCAL_INSTRUMENTATION;
  sequenceType?: SEQUENCE_TYPE;
  batchBooking?: boolean;

  /** Max length is 35 */
  id: string;
  creationDate: Date;
  /** Max length is 70 */
  initiatorName: string;

  positions: CreditorPayments[];
}
//#endregion

//#region enum | type
enum PAIN_TYPES {
  "pain.001.001.02" = "pain.001.001.02",
  "pain.001.003.02" = "pain.001.003.02",
  "pain.001.001.03" = "CstmrCdtTrfInitn",
  "pain.001.003.03" = "CstmrCdtTrfInitn",
  "pain.008.001.01" = "pain.008.001.01",
  "pain.008.003.01" = "pain.008.003.01",
  "pain.008.001.02" = "CstmrDrctDbtInitn",
  "pain.008.003.02" = "CstmrDrctDbtInitn",
}

export type PAIN_VERSIONS =
  | "pain.001.001.02"
  | "pain.001.003.02"
  | "pain.001.001.03"
  | "pain.001.003.03"
  | "pain.008.001.01"
  | "pain.008.003.01"
  | "pain.008.001.02"
  | "pain.008.003.02";

export type LOCAL_INSTRUMENTATION = "CORE" | "COR1" | "B2B";
export type SEQUENCE_TYPE = "FRST" | "RCUR" | "OOFF" | "FNAL";
//#endregion

//#region const
const XSI_NAMESPACE = "http://www.w3.org/2001/XMLSchema-instance";
const XSI_XMLS = "urn:iso:std:iso:20022:tech:xsd:";
const PAIN_VERSION = "pain.001.001.03";
const XML_VERSION = "1.0";
const XML_ENCODING = "UTF-8";
//#endregion

/**
 * Generate a SEPA XML file
 *
 * If the length of the values is longer than the max length, it will throw an error
 * or if checkIBAN or checkBIC is true, it will check if the IBAN or BIC is valid and throw an error if it is not
 */
export function createSepaXML(
  sepaData: SepaData,
  options: Options = { prettyPrint: false, checkBIC: true, checkIBAN: true },
): string {
  const painFormat = sepaData.painVersion ?? PAIN_VERSION;
  const painVersion =
    parseInt(
      painFormat.substring(painFormat.length, painFormat.length - 2),
      10,
    ) + (painFormat.indexOf("pain.008") === 0 ? 1 : 0);

  const declaration: { _attributes: DeclarationAttributes } = {
    _attributes: {
      version: sepaData.xmlVersion ?? XML_VERSION,
      encoding: sepaData.xmlEncoding ?? XML_ENCODING,
    },
  };

  checkLength(sepaData.id, "sepaData.id", 35);
  checkLength(sepaData.initiatorName, "sepaData.initiatorName", 70);

  const Document: ElementCompact = {
    _attributes: {
      xmlns: `${sepaData.xsiXmls ?? XSI_XMLS}${painFormat}`,
      "xmlns:xsi": sepaData.xsiNamespace ?? XSI_NAMESPACE,
      "xsi:schemaLocation": `${
        sepaData.xsiXmls ?? XSI_XMLS
      }${painFormat} ${painFormat}.xsd`,
    },
  };

  const GrpHdr = {
    MsgId: sepaData.id,
    CreDtTm: sepaData.creationDate.toISOString().substring(0, 19),
  } as GroupHeader;

  if (painVersion === 2) {
    GrpHdr.BtchBookg = (sepaData.batchBooking ?? true).toString() as
      | "true"
      | "false";
  }

  GrpHdr.NbOfTxs = sepaData.positions.reduce(
    (sum, item) => sum + item.payments.length,
    0,
  );
  GrpHdr.CtrlSum = sepaData.positions
    .reduce(
      (sum, item) =>
        sum + item.payments.reduce((sum, payment) => sum + payment.amount, 0),
      0,
    )
    .toFixed(2);

  if (painVersion === 2) {
    GrpHdr.Grpg = "MIXD";
  }

  GrpHdr.InitgPty = {
    Nm: sepaData.initiatorName,
  };

  Document[PAIN_TYPES[painFormat]] = {
    GrpHdr,
    PmtInf: getPmtInf(sepaData, painFormat, painVersion, options),
  };

  return js2xml(
    { _declaration: declaration, Document },
    { compact: true, spaces: options?.prettyPrint ? 2 : undefined },
  );
}

function getPmtInf(
  sepaData: SepaData,
  painFormat: PAIN_VERSIONS,
  painVersion: number,
  options: Options,
) {
  return sepaData.positions.map((item, index) => {
    checkLength(item.id, `sepaData.positions[${index}].id`, 35);
    checkLength(item.name, `sepaData.positions[${index}].name`, 70);
    if (options?.checkIBAN && !isValidIBAN(item.iban)) {
      throw new Error(
        `sepaData.positions[${index}].iban is not valid (${item.iban})`,
      );
    }

    if (options?.checkBIC && !isValidBIC(item.bic)) {
      throw new Error(
        `sepaData.positions[${index}].bic is not valid (${item.bic})`,
      );
    }

    const pmtMtd = painFormat.indexOf("pain.001") === 0 ? "TRF" : "DD";
    const pmtInfData: ElementCompact = {
      PmtInfId: item.id,
      PmtMtd: pmtMtd,
    };

    if (painVersion === 3) {
      pmtInfData.BtchBookg = (item.batchBooking ?? true).toString();
      pmtInfData.NbOfTxs = item.payments.length;
      pmtInfData.CtrlSum = item.payments
        .reduce((sum, payment) => sum + payment.amount, 0)
        .toFixed(2);
    }

    pmtInfData.PmtTpInf = { SvcLvl: { Cd: "SEPA" } };

    if (pmtMtd === "DD") {
      pmtInfData.PmtTpInf.LclInstrm = {
        Cd: sepaData.localInstrumentation ?? "",
      };
      pmtInfData.SeqTp = sepaData.sequenceType ?? undefined;
      pmtInfData.ReqdColltnDt = item.collectionDate
        ?.toISOString()
        .substring(0, 10);

      pmtInfData.Cdtr = {
        Nm: item.name,
      };
      pmtInfData.CdtrAcct = {
        Id: {
          IBAN: item.iban,
        },
      };
      pmtInfData.CdtrAgt = { FinInstnId: { BIC: item.bic } };
      pmtInfData.CdtrSchmeId = {
        Id: {
          PrvtId: {
            Othr: {
              Id: item.id ?? "",
              SchmeNm: {
                Prtry: "SEPA",
              },
            },
          },
        },
      };
    } else {
      pmtInfData.ReqdExctnDt = item.requestedExecutionDate
        .toISOString()
        .substring(0, 10);

      pmtInfData.Dbtr = {
        Nm: item.name,
      };
      pmtInfData.DbtrAcct = {
        Id: {
          IBAN: item.iban,
        },
      };
      pmtInfData.DbtrAgt = { FinInstnId: { BIC: item.bic } };
    }

    pmtInfData.ChrgBr = "SLEV";

    pmtInfData.CdtTrfTxInf = getPayments(
      item.payments,
      painFormat,
      index,
      pmtMtd,
    );

    return pmtInfData;
  });
}

function getPayments(
  payments: Payment[],
  painFormat: PAIN_VERSIONS,
  index: number,
  pmtMtd: "TRF" | "DD",
) {
  return payments.map((payment, paymentIndex) => {
    checkLength(
      payment.id,
      `sepaData.positions[${index}].payments[${paymentIndex}].id`,
      35,
    );
    checkLength(
      payment.name,
      `sepaData.positions[${index}].payments[${paymentIndex}].name`,
      70,
    );

    const paymentData: ElementCompact = {
      PmtId: {
        InstrId: payment.id,
      },
    };

    if (payment.end2endReference) {
      paymentData.PmtId.EndToEndId = payment.end2endReference;
    } else if (PAIN_TYPES[painFormat] === PAIN_TYPES["pain.001.001.03"]) {
      throw new Error(
        `sepaData.positions[${index}].payments[${paymentIndex}].end2endReference is required with the selected pain version`,
      );
    }

    if (pmtMtd === "DD") {
      paymentData.Amt = {
        _attributes: { Ccy: payment.currency || "EUR" },
        InstdAmt: payment.amount.toFixed(2),
      };

      paymentData.DrctDbtTx = {
        MndtRltdInf: {
          MndtId: payment.mandateId ?? "",
          DtOfSgntr:
            payment.mandateSignatureDate?.toISOString().substring(0, 10) ?? "",
        },
      };

      paymentData.DbtrAcct = {
        Id: {
          IBAN: payment.iban,
        },
      };
      paymentData.DbtrAgt = {
        FinInstnId: { BIC: payment.bic },
      };
      paymentData.Dbtr = { Nm: payment.name };
    } else {
      paymentData.Amt = {
        InstdAmt: {
          _attributes: { Ccy: payment.currency || "EUR" },
          _text: payment.amount.toFixed(2),
        },
      };

      paymentData.CdtrAgt = {
        FinInstnId: { BIC: payment.bic },
      };
      paymentData.Cdtr = { Nm: payment.name };
      paymentData.CdtrAcct = {
        Id: {
          IBAN: payment.iban,
        },
      };
    }

    paymentData.RmtInf = { Ustrd: payment.remittanceInformation };

    return paymentData;
  });
}

function checkLength(value: string, name: string, length: number) {
  if (value.length > length) {
    throw new Error(`Max length for ${name} is ${length} (${value})`);
  }
}
