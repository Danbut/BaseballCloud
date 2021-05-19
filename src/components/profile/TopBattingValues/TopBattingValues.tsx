import React, { useState, VFC } from 'react';
import { Select } from 'shared';
import styled from 'styled-components';

const sortValues = ['Distance', 'Launch Ange', 'Exit Velocity'] as const;

type SortType = typeof sortValues[number];

const TopBattingValues: VFC = () => {
  const [selected, setSelected] = useState<SortType>('Exit Velocity');
  return (
    <TopBattingValuesTable>
      <Header>
        <StyledSelect
          value={selected}
          items={(sortValues as unknown) as string[]}
          mask="Top Batting Values -"
          onChange={(v) => setSelected(v as SortType)}
          withoutNone
        />
      </Header>
      <Table>
        <Row>
          <Cell>Fastball</Cell>
          <Cell>-</Cell>
          <Cell>-</Cell>
        </Row>
        <Row>
          <Cell>Curveball</Cell>
          <Cell>-</Cell>
          <Cell>-</Cell>
        </Row>
        <Row>
          <Cell>Changeup</Cell>
          <Cell>-</Cell>
          <Cell>-</Cell>
        </Row>
        <Row>
          <Cell>Slider</Cell>
          <Cell>-</Cell>
          <Cell>-</Cell>
        </Row>
      </Table>
    </TopBattingValuesTable>
  );
};

const StyledSelect = styled(Select)`
  width: fit-content;
`;

const TopBattingValuesTable = styled.div``;

const Header = styled.div`
  display: flex;
  margin-bottom: 21px;
`;

const Table = styled.div`
  display: flex;
  flex-direction: column;
`;

const Row = styled.div`
  width: 100%;
  flex: 0 0 100%;
  align-items: center;
  border-radius: 4px;
  background-color: #f7f8f9;
  min-height: 44px;
  margin-bottom: 4px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
`;

const Cell = styled.div`
  display: flex;
  font-weight: 400;
  font-size: 14px;
  color: #414f5a;
`;

export default TopBattingValues;
