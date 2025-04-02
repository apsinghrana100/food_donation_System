import styled from "styled-components";

export const Pcontainer = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
`;

export const Puppercontainer = styled.div`
  width: 100%;
  padding: 30px 10px;

  box-sizing: border-box;
  box-shadow: rgba(107, 180, 211, 0.12) 0px 2px 4px 0px,
    rgba(93, 161, 190, 0.32) 0px 2px 16px 0px;
`;

export const Pbottomcontainer = styled.div`
  width: 100%;
  /* padding: 15px 0; */
  box-shadow: rgba(241, 244, 245, 0.12) 0px 2px 4px 0px,
    rgba(11, 86, 118, 0.32) 0px 2px 16px 0px;

  /* display: flex; */
`;

export const PspanTag = styled.span`
  width: 50%;
  padding: 5px;
  border-radius: 3px;
  background-color: rgb(8, 101, 245);
  color: rgb(26, 38, 55);
`;
export const PcommonflexR = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 5px;
`;

export const PcommonflexC = styled.div`
  display: flex;
  flex-direction: column;

  gap: 10px;
  /* justify-content: space-around */
`;
export const PspanValue = styled.div`
  color: wheat;
`;

export const PspanValuecombine = styled(PcommonflexR)`
  width: 50%;
`;

export const PsortDiv = styled.div`
  width: 100%;
  padding: 15px;
  box-sizing: border-box;

  box-shadow: rgba(241, 244, 245, 0.12) 0px 2px 4px 0px,
    rgba(11, 86, 118, 0.32) 0px 2px 16px 0px;
`;

export const PsortDropdwon = styled.select`

`; 