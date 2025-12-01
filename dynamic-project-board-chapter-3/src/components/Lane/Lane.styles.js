import styled from "styled-components";

export const LaneContainer = styled.div`
  background-color: #1e293b;
  border-radius: 8px;
  padding: 12px;
  min-width: 260px;
  max-width: 260px;
  display: flex;
  flex-direction: column;
`;

export const LaneHeader = styled.header`
  margin-bottom: 8px;
`;

export const LaneTitle = styled.h2`
  font-size: 16px;
  font-weight: 600;
`;

export const LaneBody = styled.div`
  margin-top: 8px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;
