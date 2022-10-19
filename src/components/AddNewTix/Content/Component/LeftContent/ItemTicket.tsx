import { AddClientItemTicket } from "./AddClientItemTicket";
import { ListItemServiceItemTicket } from "./ListItemServiceItemTicket";
export const ItemTicket = ({ indexAppt }) => {
  return (
    <>
      <AddClientItemTicket />
      <ListItemServiceItemTicket indexAppt={indexAppt} />
    </>
  );
};
