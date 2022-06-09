/**
 * Import application
 */
import config from "./config";
import BudoTicketTracker from "./budoTicketTracker";

/**
 * Init Budo tracker
 */
const ticketTracker = new BudoTicketTracker(
  "77c36df0-b308-e211-9b8d-a526e1ea2306", // Mudanya-Bursa
  "eb9a2e6c-dda7-e611-8a56-000c29f304a8", // Eminönü-İstanbul
  new Date("2022-06-11 08:00:00")
);

const checkInterval = async () => {
  const emptySeat = await ticketTracker.checkEmptySeat();
  emptySeat
    ? ticketTracker.emptySeatNotification()
    : setTimeout(() => checkInterval(), config.timeInterval);
};

checkInterval();
