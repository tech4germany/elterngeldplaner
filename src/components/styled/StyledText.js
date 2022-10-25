import styled from 'styled-components';

export const LargeTitle = styled.h1`
  font-size: 18pt;
  text-align: left;
  font-weight: bold;
  margin-bottom: 14px;
  color: ${(props) => props.color || '#000000'};
`;

export const LargeTitleSpan = styled.span`
  font-size: 18pt;
  text-align: left;
  font-weight: bold;
  margin-bottom: 10px;
  color: ${(props) => props.color || '#000000'};
`;

export const LargeTextBold = styled.div`
  font-size: 12.5pt;
  text-align: left;
  line-height: 1.5;
  font-weight: bold;
  color: ${(props) => props.color || 'black'};
`;

export const NormalTextSpan = styled.span`
  font-size: 11pt;
  text-align: left;
  line-height: 1.5;
  color: ${(props) => props.color || 'black'};
`;

export const NormalText = styled.div`
  font-size: 11pt;
  text-align: left;
  line-height: 1.5;
  color: ${(props) => props.color || 'black'};
`;

export const NormalTextBold = styled.span`
  font-size: 11pt;
  text-align: left;
  line-height: 1.5;
  font-weight: bold;
  color: ${(props) => props.color || 'black'};
`;

export const SmallText = styled.div`
  font-size: 10pt;
  text-align: left;
  line-height: 1.25;
  color: ${(props) => props.color || 'black'};
`;

export const SmallTextGray = styled.div`
  font-size: 10pt;
  text-align: center;
  font-weight: bold;
  line-height: 1.25;
  color: #707070;
`;

export const ExtraSmallText = styled.div`
  font-size: 9pt;
  text-align: left;
  line-height: 1.5;
  color: gray;
`;
