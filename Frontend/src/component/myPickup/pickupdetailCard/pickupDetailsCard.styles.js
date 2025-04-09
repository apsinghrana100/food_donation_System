import styled from "styled-components";

// Card Container
export const CardContainer = styled.div`
  width: 100%;
  max-width: 1000px;
  margin: 0px auto;
  background-color: #1f1f1f;
  color: #eee;
  border-radius: 16px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.6);
  padding: 20px;
  position: relative;
  font-family: 'Segoe UI', sans-serif;
  box-sizing: border-box;
`;

// Close Button
export const CloseButton = styled.button`
  position: absolute;
  top: 1px;
  right: 5px;
  background: #ff4d4d;
  color: #fff;
  border: none;
  border-radius: 50%;
  width: 25px;
  height: 25px;
  font-weight: bold;
  font-size: 18px;
  cursor: pointer;
  box-shadow: 0 0 8px rgba(255, 77, 77, 0.6);
  transition: 0.3s ease;

  &:hover {
    background: #ff1a1a;
    box-shadow: 0 0 12px rgba(255, 77, 77, 1);
  }
`;

// Status Progress Bar
export const StatusBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 40px;
  position: relative;
`;

// Status Step
export const StatusStep = styled.div`
  background-color: ${(props) =>
    props.color === "red"
      ? "#f44336"
      : props.color === "green"
      ? "#4caf50"
      : props.active
      ? "#4caf50"
      : "#333"};
  color: ${(props) =>
    props.color === "red" || props.color === "green"
      ? "#fff"
      : props.active
      ? "#fff"
      : "#aaa"};
  padding: 12px 20px;
  border-radius: 50px;
  font-weight: 600;
  font-size: 14px;
  transition: 0.3s ease;
  box-shadow: ${(props) =>
    props.color === "green"
      ? "0 0 8px #4caf50"
      : props.color === "red"
      ? "0 0 8px #f44336"
      : props.active
      ? "0 0 8px #4caf50"
      : "none"};

  @media screen and (max-width: 668px) {
    padding: 8px 10px;
    font-size: 12px;
  }

  @media screen and (max-width: 440px) {
    padding: 6px 8px;
    font-size: 8px;
  }
`;

export const StatusLine = styled.div`
  flex-grow: 1;
  height: 4px;
  background-color: #555;
  margin: 0 10px;
`;

// Details Wrapper
export const DetailsWrapper = styled.div`
  display: flex;
  gap: 30px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

// Post Details
export const PostDetails = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const PostImage = styled.img`
  width: 100%;
  border-radius: 12px;
  object-fit: cover;
  height: 250px;
`;

export const PostInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

export const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  color: #ccc;
`;

export const Label = styled.span`
  font-weight: 600;
  color: #999;
`;

export const Value = styled.span`
  color: #eee;
`;

// Picker Details
export const PickerDetails = styled.div`
  flex: 1;
  background-color: #2b2b2b;
  border-radius: 12px;
  padding: 25px;
  box-shadow: inset 0 0 8px rgba(0, 0, 0, 0.5);
`;

export const PickerTitle = styled.h3`
  text-align: center;
  margin-bottom: 20px;
  color: #4caf50;
`;

export const PickerImage = styled.img`
  display: block;
  margin: 0 auto 20px auto;
  width: 90px;
  height: 90px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid #4caf50;
`;

export const PickerInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

export const PickerRow = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  color: #ccc;
`;

export const PickerLabel = styled.span`
  font-weight: 600;
  color: #999;
`;

export const PickerValue = styled.span`
  color: #eee;
`;
