import { WASocket } from "@whiskeysockets/baileys";
import { getWbot } from "../libs/wbot";
import Ticket from "../models/Ticket";
import { Store } from "../libs/store";

type Session = WASocket & {
  id?: number;
  store?: Store;
};

const GetTicketWbot = async (ticket: Ticket): Promise<Session> => {
  // Do not overwrite ticket.whatsappId if it's missing!
  // The whatsappId should be set when the ticket is created and remain unchanged.
  // This prevents the customer's number from being switched to a random WhatsApp account.
  
  if (!ticket.whatsappId) {
    throw new Error(
      `Ticket ${ticket.id} has no whatsappId assigned. ` +
      `This should be set during ticket creation. ` +
      `Check CreateTicketService to ensure whatsappId is properly assigned.`
    );
  }

  const wbot = getWbot(ticket.whatsappId);
  return wbot;
};

export default GetTicketWbot;
