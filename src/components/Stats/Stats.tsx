import React from 'react';
import styled from 'styled-components';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

// const Tab = styled.li`
//   font-size: 14px;
//   font-weight: 700;
//   color: #667784;
//   padding: 8px;
//   margin: 8px;
//   border: 2px solid #788b99;
//   border-radius: 40px;
//   :hover:after {
//     display: block;
//   }
//   :after {
//     content: '';
//     display: none;
//     position: absolute;
//     bottom: -2px;
//     right: 0;
//     left: 0;
//     height: 3px;
//     background-color: #48bbff;
//     box-shadow: 0 2px 4px 0 rgb(72 187 255 / 80%);
//   }
// `;

const Stats = () => (
  <Tabs>
    <TabList>
      <Tab>Title 1</Tab>
      <Tab>Title 2</Tab>
    </TabList>

    <TabPanel>
      <h2>Any content 1</h2>
    </TabPanel>
    <TabPanel>
      <h2>Any content 2</h2>
    </TabPanel>
  </Tabs>
);

export default Stats;
