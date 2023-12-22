import styled from "styled-components"

export const LabelsContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 8px;
    padding-top: 56px;
`;

export const LabelWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: left;
    align-items: center;
    gap: 4px;
`;

export const LabelCircle = styled.div`
    display: block;
    background: ${props => props.color};
    border-radius: 50%;
    height: 8px;
    width: 8px;
`;


export const LabelText = styled.div`
    font-size: 8px;
`;