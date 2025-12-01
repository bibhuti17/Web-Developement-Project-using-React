import styled from "styled-components";

export const BoardContainer = styled.div`
  padding: 24px;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export const BoardHeader = styled.header`
  margin-bottom: 16px;
`;

export const BoardTitle = styled.h1`
  font-size: 24px;
  font-weight: 700;
`;

export const LanesWrapper = styled.div`
  margin-top: 16px;
  display: flex;
  gap: 16px;
  align-items: flex-start;
  overflow-x: auto;
  padding-bottom: 16px;
`;

export const StatusText = styled.p`
  margin-top: 16px;
`;
