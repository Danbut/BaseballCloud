import EditProfile from 'components/EditProfile';
import Stats from 'components/Stats';
import { useCurrentProfileQuery } from 'generated';
import withAuth from 'hocs/withAuth';
import React, { VFC } from 'react';
import { ContentContainer } from 'shared';
import styled from 'styled-components';

const Main = styled.main`
  background: #788b99;
  flex: 2;
  overflow: auto;
  width: calc(100vw - 220px);
`;

const SummaryEvents = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const PitcherSummary = styled.div`
  display: flex;
  max-width: 100%;
  min-width: 0;
  flex-direction: column;
  background: #fff;
  margin: 16px;
  padding: 16px;
  border-radius: 8px;
  box-sizing: border-box;
  flex-grow: 1;
`;

const RecentEvents = styled.div`
  display: flex;
  overflow: hidden;
  max-width: 100%;
  min-width: 0;
  flex-direction: column;
  background: #fff;
  margin: 16px;
  padding: 16px;
  border-radius: 8px;
  box-sizing: border-box;
  flex-grow: 1;
`;

const Heading = styled.h3`
  text-align: center;
  font-size: 18px;
  font-weight: 900;
  color: #414f5a;
`;

const HeadingContainer = styled.div`
  display: flex;
`;

const Container = styled.div`
  display: flex;
  overflow: hidden;
  height: 100%;
`;

const Item = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px 24px 0 0;
`;

const ItemTitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
`;

const ItemTitle = styled.div`
  font-size: 16px;
  color: #667784;
`;

const ItemValue = styled.div`
  font-size: 16px;
  color: #667784;
  font-weight: 700;
`;

const ProgressBar = styled.div`
  max-width: 100%;
  height: 4px;
`;

const ProgressBarStyledPath = styled.path`
  stroke-dasharray: 0px, 100px;
  stroke-dashoffset: 0px;
  transition: stroke-dashoffset 0s ease 0s, stroke-dasharray 0s ease 0s,
    stroke linear 0s;
`;

const ProgressBarSVG = () => (
  <svg
    className="rc-progress-line "
    viewBox="0 0 100 1"
    preserveAspectRatio="none"
  >
    <path
      className="rc-progress-line-trail"
      d="M 0.5,0.5
      L 99.5,0.5"
      strokeLinecap="round"
      stroke="#eff1f3"
      strokeWidth="1"
      fillOpacity="0"
    />
    <ProgressBarStyledPath
      className="rc-progress-line-path"
      d="M 0.5,0.5
      L 99.5,0.5"
      strokeLinecap="round"
      stroke="#ffd01a"
      strokeWidth="1"
      fillOpacity="0"
    />
  </svg>
);

const EmptyMessage = styled.div`
  display: flex;
  color: #667784;
  font-size: 16px;
`;

const Profile: VFC = () => {
  /* eslint-disable */
  const { loading, data, error } = useCurrentProfileQuery();

  if (loading) return <p>...loading</p>;
  if (error) return <p>...error</p>;
  return (
    <ContentContainer
      background="white"
      justifyContent="space-between"
      overflow={['visible']}
    >
      <EditProfile />
      <Main>
        <SummaryEvents>
          <PitcherSummary>
            <HeadingContainer>
              <Heading>Top Batting Values</Heading>
            </HeadingContainer>
            <Container>
              <Item>
                <ItemTitleContainer>
                  <ItemTitle>Exit Velocity</ItemTitle>
                  <ItemValue>N/A</ItemValue>
                </ItemTitleContainer>
                <ProgressBar>
                  <ProgressBarSVG />
                </ProgressBar>
              </Item>
              <Item>
                <ItemTitleContainer>
                  <ItemTitle>Carry Distance</ItemTitle>
                  <ItemValue>N/A</ItemValue>
                </ItemTitleContainer>
                <ProgressBar>
                  <ProgressBarSVG />
                </ProgressBar>
              </Item>
              <Item>
                <ItemTitleContainer>
                  <ItemTitle>Launch Angle</ItemTitle>
                  <ItemValue>N/A</ItemValue>
                </ItemTitleContainer>
                <ProgressBar>
                  <ProgressBarSVG />
                </ProgressBar>
              </Item>
            </Container>
          </PitcherSummary>
        </SummaryEvents>
        <RecentEvents>
          <HeadingContainer>
            <Heading>Recent Session Report</Heading>
          </HeadingContainer>
          <EmptyMessage>No data currently linked to this profile</EmptyMessage>
        </RecentEvents>
        <Stats />
      </Main>
    </ContentContainer>
  );
};

export default withAuth(Profile);
