import config from "./config";
import iAxios from "./iAxios";
import qs from "qs";
import date from "date-and-time";
import { HTMLElement, parse } from "node-html-parser";
import TicketTracker from "./types/ticketTracker";
import { ticketWebsite } from "./types/ticketWeb";
import { budoVoyageRequest } from "./types/budoVoyageRequest";

class BudoTicketTracker implements TicketTracker {
  private budoWeb: ticketWebsite = {
    webBase: "https://budo.burulas.com.tr",
    ticketPath: "tr/Budo/Voyage",
  };

  private smsApi = {
    sendSMS: "https://api.netgsm.com.tr/sms/send/get",
  };

  constructor(
    public fromWhere: string,
    public toWhere: string,
    public ticketDate: Date
  ) {}

  async checkEmptySeat(): Promise<boolean> {
    try {
      const ticketDate = date.format(this.ticketDate, "DD.MM.YYYY");
      const ticketHour = date.format(this.ticketDate, "HH:mm");

      const { data, status } = await this.fetchTicketPage({
        radio: 0,
        Nereden: this.fromWhere,
        Nereye: this.toWhere,
        GidisTarihi: ticketDate,
      });
      if (status !== 200) throw new Error("TICKET.FETCH_ERROR");

      const parseHtml = parse(data);
      const voyage = parseHtml
        .querySelectorAll(".fromVoyage")
        .filter((v: HTMLElement) => v.toString().includes(ticketHour));

      return !voyage.toString().includes("Dolu");
    } catch (error) {
      return false;
    }
  }

  private fetchTicketPage(params: object) {
    return iAxios.post<budoVoyageRequest>(
      `${this.budoWeb.webBase}/${this.budoWeb.ticketPath}`,
      params,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
  }

  async emptySeatNotification(tryCount: number = 0): Promise<boolean> {
    try {
      if (tryCount === 3) return false;

      const { data } = await iAxios({
        method: "post",
        url: this.smsApi.sendSMS,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        data: qs.stringify({
          usercode: config.smsUser,
          password: config.smsPass,
          gsmno: config.smsTo,
          msgheader: config.smsTitle,
          message: `${this.ticketDate.toISOString()} tarihi için BUDO da boş koltuk buldummm! #${Math.random()}`,
        }),
      });

      if (!data.includes("00") && tryCount < 3)
        return this.emptySeatNotification(tryCount + 1);

      return data.includes("00");
    } catch (error) {
      return false;
    }
  }
}

export default BudoTicketTracker;
