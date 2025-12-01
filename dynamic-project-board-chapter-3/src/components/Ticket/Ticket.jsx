import React from "react";
import { Draggable } from "@hello-pangea/dnd";
import { TicketCard, TicketTitle, TicketDescription } from "./Ticket.styles";

const Ticket = React.memo(({ ticket, index }) => {
    return (
        <Draggable draggableId={ticket.id} index={index}>
            {(provided, snapshot) => (
                <TicketCard
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={{
                        ...provided.draggableProps.style,
                        backgroundColor: snapshot.isDragging ? "#111827" : "#0f172a",
                    }}
                >
                    <TicketTitle>{ticket.title}</TicketTitle>
                    <TicketDescription>{ticket.description}</TicketDescription>
                </TicketCard>
            )}
        </Draggable>
    );
});

export default Ticket;