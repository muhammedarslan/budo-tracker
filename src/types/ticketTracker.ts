export default interface TicketTracker {
  fromWhere: string;
  toWhere: string;
  ticketDate: Date;

  checkEmptySeat(): Promise<boolean>;
  emptySeatNotification(): boolean | Promise<boolean>;
}
