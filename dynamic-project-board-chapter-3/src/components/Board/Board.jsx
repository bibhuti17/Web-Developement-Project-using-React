import React, { useEffect, useState, useCallback } from "react";
import { DragDropContext } from "@hello-pangea/dnd";
import Lane from "../Lane/Lane";
import {
    BoardContainer,
    BoardHeader,
    BoardTitle,
    LanesWrapper,
    StatusText,
} from "./Board.styles";

function Board() {
    const [data, setData] = useState(null);      // raw fetched data: lanes + tickets
    const [tickets, setTickets] = useState([]);  // mutable local state for DnD
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch once on mount – safe, standard pattern
    useEffect(() => {
        let cancelled = false;

        async function load() {
            try {
                const res = await fetch("/data/boardData.json");
                if (!res.ok) {
                    throw new Error("Failed to load boardData.json");
                }
                const json = await res.json();
                if (!cancelled) {
                    setData(json);
                    setTickets(json.tickets || []);
                    setLoading(false);
                }
            } catch (e) {
                if (!cancelled) {
                    setError(e);
                    setLoading(false);
                }
            }
        }

        load();

        return () => {
            cancelled = true;
        };
    }, []); // runs once, no cascading renders [web:49][web:55][web:84]

    const lanes = data?.lanes || [];

    const handleTicketMove = useCallback(
        (ticketId, targetLaneId, destinationIndex) => {
            setTickets((prevTickets) => {
                const current = [...prevTickets];
                const ticketIndex = current.findIndex((t) => t.id === ticketId);
                if (ticketIndex === -1) return prevTickets;

                const updatedTicket = { ...current[ticketIndex], laneId: targetLaneId };
                const withoutTicket = current.filter((t) => t.id !== ticketId);

                const targetTickets = withoutTicket.filter(
                    (t) => t.laneId === targetLaneId
                );
                const otherTickets = withoutTicket.filter(
                    (t) => t.laneId !== targetLaneId
                );

                const insertIndex = Math.min(destinationIndex, targetTickets.length);
                targetTickets.splice(insertIndex, 0, updatedTicket);

                return [...otherTickets, ...targetTickets];
            });
        },
        []
    );

    const handleDragEnd = useCallback(
        (result) => {
            const { source, destination, draggableId } = result;
            if (!destination) return;

            const sourceLaneId = source.droppableId;
            const destinationLaneId = destination.droppableId;

            if (
                sourceLaneId === destinationLaneId &&
                source.index === destination.index
            ) {
                return;
            }

            handleTicketMove(draggableId, destinationLaneId, destination.index);
        },
        [handleTicketMove]
    );

    if (loading) {
        return (
            <BoardContainer>
                <BoardHeader>
                    <BoardTitle>Dynamic Project Board</BoardTitle>
                </BoardHeader>
                <StatusText>Loading tickets...</StatusText>
            </BoardContainer>
        );
    }

    if (error) {
        return (
            <BoardContainer>
                <BoardHeader>
                    <BoardTitle>Dynamic Project Board</BoardTitle>
                </BoardHeader>
                <StatusText>Something went wrong loading data.</StatusText>
            </BoardContainer>
        );
    }

    return (
        <BoardContainer>
            <BoardHeader>
                <BoardTitle>Dynamic Project Board</BoardTitle>
            </BoardHeader>

            <DragDropContext onDragEnd={handleDragEnd}>
                <LanesWrapper>
                    {lanes.map((lane) => {
                        const laneTickets = tickets
                            .filter((ticket) => ticket.laneId === lane.id)
                            .sort((a, b) => a.id.localeCompare(b.id));
                        return <Lane key={lane.id} lane={lane} tickets={laneTickets} />;
                    })}
                </LanesWrapper>
            </DragDropContext>
        </BoardContainer>
    );
}

export default Board;
