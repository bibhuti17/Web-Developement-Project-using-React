import React from "react";
import { Droppable } from "@hello-pangea/dnd";
import Ticket from "../Ticket/Ticket.jsx";
import { LaneContainer, LaneHeader, LaneTitle, LaneBody } from "./Lane.styles";

const Lane = React.memo(({ lane, tickets }) => {
    return (
        <Droppable droppableId={lane.id}>
            {(provided, snapshot) => (
                <LaneContainer
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    style={{
                        backgroundColor: snapshot.isDraggingOver ? "#111827" : "#1e293b",
                    }}
                >
                    <LaneHeader>
                        <LaneTitle>{lane.title}</LaneTitle>
                    </LaneHeader>
                    <LaneBody>
                        {tickets.map((ticket, index) => (
                            <Ticket key={ticket.id} ticket={ticket} index={index} />
                        ))}
                        {provided.placeholder}
                    </LaneBody>
                </LaneContainer>
            )}
        </Droppable>
    );
});

export default Lane;