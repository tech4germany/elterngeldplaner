import { Button } from '@chakra-ui/react';
import { Container } from 'react-bootstrap';
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

export const LargeTitlePlus = styled.span`
  font-size: 18pt;
  text-align: left;
  font-weight: bold;
  margin-bottom: 10px;
  color: #805ad5;
`;
export const LargeTitleBonus = styled.span`
  font-size: 18pt;
  text-align: left;
  font-weight: bold;
  margin-bottom: 10px;
  color: #d53f8c;
`;

export const LargeTextBold = styled.div`
  font-size: 12.5pt;
  text-align: left;
  line-height: 1.5;
  font-weight: bold;
  color: ${(props) => props.color || 'black'};
`;

export const TextNormalSpan = styled.span`
  font-size: 11pt;
  text-align: left;
  line-height: 1.5;
  color: ${(props) => props.color || 'black'};
`;

export const TextNormal = styled.div`
  font-size: 11pt;
  text-align: left;
  line-height: 1.5;
  color: ${(props) => props.color || 'black'};
`;

export const TextSmall = styled.div`
  font-size: 10pt;
  text-align: left;
  line-height: 1.25;
  color: ${(props) => props.color || 'black'};
`;

export const TextSmallGray = styled.div`
  font-size: 10pt;
  text-align: center;
  font-weight: bold;
  line-height: 1.25;
  color: #707070;
`;

export const TextExtraSmall = styled.div`
  font-size: 9pt;
  text-align: left;
  line-height: 1.5;
  color: gray;
`;

export const TextBold = styled.span`
  font-size: 10.5pt;
  text-align: left;
  line-height: 1.5;
  font-weight: bold;
  color: ${(props) => props.color || 'black'};
`;

export const TextBasis = styled.span`
  font-size: 10.5pt;
  text-align: left;
  line-height: 1.5;
  font-weight: bold;
  color: #38a169;
`;

export const TextPlus = styled.span`
  font-size: 10.5pt;
  text-align: left;
  line-height: 1.5;
  font-weight: bold;
  color: #805ad5;
`;

export const TextBonus = styled.span`
  font-size: 10.5pt;
  text-align: left;
  line-height: 1.5;
  font-weight: bold;
  color: #d53f8c;
`;

// export const MainContainer = styled(Container)`
//   padding-left: 18px;
//   padding-right: 18px;
// `;

// export const MainButton = styled(Button)`
//   background-color: ${(props) => props.backgroundColor || 'gray'};
// `;
