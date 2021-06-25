import React, { FC, ReactNode, useState, VFC } from 'react';
import styled from 'styled-components';
import { Tabs, TabList, Tab, TabPanel } from 'react-tabs';
import { Box, Flex } from 'shared';
import Comparison from '../Comparison';
import SessionReports from '../SessionReports';
import Log from '../Log';
import Charts from '../Charts';
import Summary from '../Summary';

const Stats = () => {
  const [activeTabIndex, setActiveTabIndex] = useState('0');
  const [activeSubTabIndex, setActiveSubTabIndex] = useState('0');

  const handleClickActiveTab = (e: React.MouseEvent<HTMLLIElement>) => {
    // eslint-disable-next-line
    // @ts-ignore
    /* eslint-disable */ setActiveTabIndex(e.target.dataset?.tab);
  };

  const handleCLickSubTab = (index: string) => {
    setActiveSubTabIndex(index);
  };

  console.log(activeTabIndex);
  console.log(activeSubTabIndex);

  const subTabs = new Map<string, ReactNode>();
  subTabs.set('0', <Summary />);
  subTabs.set('1', <Charts />);
  subTabs.set('2', <Log />);

  return (
    <Card bg="white" m="16px" p="16px" borderRadius="8px">
      <StyledTabs>
        <StyledTabList>
          <DropDownTab
            onClick={handleClickActiveTab}
            onClickSubTab={handleCLickSubTab}
            isActive={activeTabIndex === '0'}
          >
            Batting
          </DropDownTab>
          <StyledTab
            data-tab="1"
            onClick={handleClickActiveTab}
            isActive={activeTabIndex === '1'}
          >
            Session Reports
          </StyledTab>
          <StyledTab
            data-tab="2"
            onClick={handleClickActiveTab}
            isActive={activeTabIndex === '2'}
          >
            Comparison
          </StyledTab>
        </StyledTabList>

        <Flex height="100%" minHeight="420px">
          <TabPanel>{subTabs.get(activeSubTabIndex)}</TabPanel>
          <TabPanel>
            <SessionReports />
          </TabPanel>
          <TabPanel>
            <Comparison />
          </TabPanel>
        </Flex>
      </StyledTabs>
    </Card>
  );
};

// const StyledTabsPanel = styled(Flex)`
//   > * {
//     width: 100%;
//   }
// `;

const StyledTabs = styled(Tabs)`
  width: 100%;
  height: 100%;
`;

const StyledTab = styled(Tab)<{ isActive: boolean }>`
  font-size: 14px;
  font-weight: 700;
  color: #667784;
  padding: 8px;
  margin: 8px;
  border: 2px solid #788b99;
  border-radius: 40px;
  list-style: none;
  display: inline;
  :hover {
    background-color: #cbcccd;
  }
  ${({ isActive }) =>
    isActive ? `background-color: #667784; color: white;` : ''}
  position: relative;
  overflow: visible;
`;

const StyledTabList = styled(TabList)`
  padding: 0px;
`;

const DropDownTab: FC<{
  onClick(e: React.MouseEvent<HTMLLIElement>): void;
  isActive: boolean;
  children: string;
  onClickSubTab(index: string): void;
}> = ({ onClick, isActive, children, onClickSubTab }) => {
  const [isHover, setIsHover] = useState(false);
  return (
    <StyledTab
      data-tab="0"
      onClick={onClick}
      isActive={isActive}
      onMouseEnter={() => {
        setIsHover(true);
      }}
    >
      {children}

      {isHover && isActive ? (
        <DropDown>
          <DropDownMenu>
            <Option
              bg="white"
              p="8px 10px"
              mt="8px"
              mb="6px"
              color="#667784"
              onMouseDown={() => {
                setIsHover(false);
                onClickSubTab('0');
              }}
            >
              Summary
            </Option>
            <Option
              bg="white"
              p="8px 10px"
              mt="8px"
              mb="6px"
              color="#667784"
              onMouseDown={() => {
                setIsHover(false);
                onClickSubTab('1');
              }}
            >
              Charts
            </Option>
            <Option
              bg="white"
              p="8px 10px"
              mt="8px"
              mb="6px"
              color="#667784"
              onMouseDown={() => {
                setIsHover(false);
                onClickSubTab('2');
              }}
            >
              Log
            </Option>
          </DropDownMenu>
        </DropDown>
      ) : null}
    </StyledTab>
  );
};

const Option = styled(Box)`
  :focus {
    background-color: dodgerBlue;
    opacity: 0.1;
  }
  white-space: nowrap;
`;

const DropDown = styled(Box)`
  position: absolute;
  top: 100%;
  width: 100px;
`;

const DropDownMenu = styled.div`
  position: absolute;
  left: 0;
  top: 100%;

  box-sizing: border-box;
  z-index: 10;
  margin-top: 6px;
  box-shadow: 0 2px 7px 0 rgba(0, 0, 0, 0.1);
  border: solid 1px #eff1f3;
  border-radius: 4px;
  overflow: visible;
  background: white;
  right: 0;
`;

// eslint-disable-next-line
//@ts-ignore
DropDownTab.tabsRole = 'Tab';

const Card = styled(Flex)`
  box-sizing: border-box;
  flex-grow: 1;
`;

export default Stats;
