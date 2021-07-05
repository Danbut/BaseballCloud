// eslint-disable-next-line
// @ts-nocheck
/* eslint-disable react/jsx-props-no-spreading */
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  FlightScopeDataRowType,
  useLeaderboardBattingQuery,
  useLeaderboardPitchingQuery,
  useUpdateFavoriteProfileMutation,
} from 'graph';
import React, { useMemo, useState, VFC } from 'react';
import { usePagination, useTable } from 'react-table';
import { Flex, OutgoiningInput, Select, Spinner, Text } from 'shared';
import styled from 'styled-components';
import { positions } from 'values';
import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons';

import useDebounce from 'hooks/useDebounce';
import { makeVar } from '@apollo/client';
import {
  LeaderboardBattingDocument,
  LeaderboardPitchingDocument,
} from 'graph/generated';

const filterVar = makeVar({});

const Table: VFC = () => {
  const [
    filter,
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    setSchool,
    setTeam,
    setPosition,
    setAge,
    setFavorite,
    setType,
    setDate,
    // eslint-disable-next-line
    loading,
  ] = useNetworkTable();

  return (
    <Datagrid>
      <div>
        <DatagridHeaderRow>
          <DatagridTitle>Leaderboard</DatagridTitle>
          <Filters>
            <Select items={dateSelect} placeholder="Date" onChange={setDate} />
            <OutgoiningInput
              placeholder="School"
              name="school"
              onChange={setSchool}
            />
            <OutgoiningInput
              placeholder="Team"
              name="team"
              onChange={setTeam}
            />
            <Select
              items={positions.map((p) => p.name)}
              placeholder="Position"
              onChange={setPosition}
            />
            <OutgoiningInput
              placeholder="Age"
              name="age"
              numeric
              onChange={setAge}
            />
            <Select
              items={favoriteSelect}
              placeholder="All"
              onChange={setFavorite}
              withoutNone
            />
          </Filters>
        </DatagridHeaderRow>
        <DatagridHeaderRow>
          <div>
            <TypeButton
              isActive={
                filter.type === 'exit_velocity' ||
                filter.type === 'carry_distance'
              }
              onClick={() => setType(battingTypes[0])}
            >
              Batting
            </TypeButton>
            <TypeButton
              isActive={
                filter.type === 'pitch_velocity' || filter.type === 'spin_rate'
              }
              onClick={() => setType(pitchingTypes[0])}
            >
              Pitching
            </TypeButton>
          </div>
          <Select
            items={
              filter.type === 'exit_velocity' ||
              filter.type === 'carry_distance'
                ? battingTypes
                : pitchingTypes
            }
            onChange={setType}
            value={
              filter.type === 'exit_velocity' ||
              filter.type === 'carry_distance'
                ? battingTypes[0]
                : pitchingTypes[0]
            }
            placeholder="Type"
          />
        </DatagridHeaderRow>
      </div>
      {loading && (
        <Flex
          width="100%"
          height="100%"
          alignItems="center"
          justifyContent="center"
        >
          {/* eslint-disable-next-line */}
          <Spinner loading={loading} />
        </Flex>
      )}
      {rows.length === 0 && (
        <Flex
          width="100%"
          height="100%"
          alignItems="center"
          justifyContent="center"
        >
          <Text fontSize="16px" color="#667784">
            There&apos;s no info yet!
          </Text>
        </Flex>
      )}
      {rows.length && (
        <>
          <DatagridTable {...getTableProps()}>
            <DatagridTableHeader>
              {headerGroups.map((headerGroup) => (
                <DatagridTableRow {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <td {...column.getHeaderProps()}>
                      {column.render('Header')}
                    </td>
                  ))}
                </DatagridTableRow>
              ))}
            </DatagridTableHeader>
            <tbody {...getTableBodyProps()}>
              {rows.map((row) => {
                prepareRow(row);
                return (
                  <DatagridTableRow {...row.getRowProps()}>
                    {row.cells.map((cell) => (
                      <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                    ))}
                  </DatagridTableRow>
                );
              })}
            </tbody>
          </DatagridTable>
        </>
      )}
    </Datagrid>
  );
};

const transformLeaderboardsDataToNetworkTableData = (
  leaderboards: FlightScopeDataRowType[]
) =>
  leaderboards.map((l) => ({
    age: l?.age,
    batter_name: l?.batter_name,
    distance: l?.distance,
    teams: l?.teams?.map((t) => t.name).join(),
    school: l?.school?.name,
    launch_angle: l?.launch_angle ?? '-',
    favorite: l?.favorite as boolean,
    pitch_type: l?.pitch_type,
    pitcher_name: l?.pitcher_name,
    spin_rate: l?.spin_rate,
    velocity: l?.velocity,
    exit_velocity: l?.exit_velocity,
    id: l.pitcher_datraks_id || l.batter_datraks_id,
  }));

const battingColumns = [
  {
    Header: 'Rank',
    accessor: '' as const,
    Cell: (row: { row: { id: string } }) => (
      <div>{parseInt(row.row.id, 10) + 1}</div>
    ),
  },
  {
    Header: 'Batter Name',
    accessor: 'batter_name' as const,
    Cell: ({ value, row: { original } }) => (
      // eslint-disable-next-line
      <ProfileLink href={`/profile/${original?.id as string}`}>
        {value}
      </ProfileLink>
    ),
  },
  {
    Header: 'Age',
    accessor: 'age' as const,
  },
  {
    Header: 'School',
    accessor: 'school' as const,
  },
  {
    Header: 'Teams',
    accessor: 'teams' as const,
  },
  {
    Header: 'Exit Velocity',
    accessor: 'exit_velocity' as const,
  },

  {
    Header: 'Launch Angle',
    accessor: 'launch_angle' as const,
  },
  {
    Header: 'Distance',
    accessor: 'distance' as const,
  },
  {
    Header: 'Favorite',
    accessor: 'favorite' as const,
    // eslint-disable-next-line
    Cell: (props) => <UpdateFavorite {...props} />,
  },
] as const;

const pitchingColumns = [
  {
    Header: 'Rank',
    accessor: '' as const,
    Cell: (row: { row: { id: string } }) => (
      <div>{parseInt(row.row.id, 10) + 1}</div>
    ),
  },
  {
    Header: 'Pitcher Name',
    accessor: 'pitcher_name' as const,
    Cell: ({ value, row: { original } }) => (
      // eslint-disable-next-line
      <ProfileLink href={`/profile/${original?.id as string}`}>
        {value}
      </ProfileLink>
    ),
  },
  {
    Header: 'Age',
    accessor: 'age' as const,
  },
  {
    Header: 'School',
    accessor: 'school' as const,
  },
  {
    Header: 'Teams',
    accessor: 'teams' as const,
  },
  {
    Header: 'Pitch Type',
    accessor: 'pitch_type' as const,
  },

  {
    Header: 'Velocity',
    accessor: 'velocity' as const,
  },
  {
    Header: 'Spin Rate',
    accessor: 'spin_rate' as const,
  },
  {
    Header: 'Favorite',
    accessor: 'favorite' as const,
    // eslint-disable-next-line
    // @ts-ignore
    Cell: (props) => <UpdateFavorite {...props} />,
  },
] as const;

const favoriteSelect = ['All', 'Favorite'];

const dateSelect = ['Last Week', 'Last Month'];

const pitchingTypes = ['Pitch Velocity', 'Spin Rate'];
const battingTypes = ['Exit Velocity', 'Carry Distance'];

const UpdateFavorite = ({ row: { original } }) => {
  const filter = filterVar();
  const [updateFavorite] = useUpdateFavoriteProfileMutation({
    refetchQueries: [
      {
        query:
          filter.type === 'exit_velocity' || filter.type === 'carry_distance'
            ? LeaderboardBattingDocument
            : LeaderboardPitchingDocument,
        variables: {
          input: filter,
        },
      },
    ],
  });
  return (
    <>
      {/*   eslint-disable-next-line */}
      {original.favorite ? (
        <FontAwesomeIcon
          icon={faHeart}
          color="#48bbff"
          onClick={async () => {
            await updateFavorite({
              variables: {
                form: {
                  // eslint-disable-next-line
                  // @ts-ignore
                  // eslint-disable-next-line
                  profile_id: original.id,
                  favorite: false,
                },
              },
            });
            toastr.options = {
              positionClass: 'toast-top-full-width',
              hideDuration: 300,
              timeOut: 60000,
            };
            toastr.clear();
            setTimeout(() => toastr.success(`Set favorite`), 300);
          }}
        />
      ) : (
        <FontAwesomeIcon
          icon={farHeart}
          color="#48bbff"
          onClick={async () => {
            await updateFavorite({
              variables: {
                form: {
                  // eslint-disable-next-line
                  // @ts-ignore
                  // eslint-disable-next-line
                  profile_id: original.id,
                  favorite: true,
                },
              },
            });
            toastr.options = {
              positionClass: 'toast-top-full-width',
              hideDuration: 300,
              timeOut: 60000,
            };
            toastr.clear();
            setTimeout(() => toastr.success(`Unset favorite`), 300);
          }}
        />
      )}
    </>
  );
};

const TypeButton = styled.button<{ isActive: boolean }>`
  all: unset;
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

type NetworkFilter = {
  date?: string;
  school?: string;
  team?: string;
  position?: string;
  age?: number;
  favorite?: number;
  type: string;
};

const useNetworkFilter = (initState: NetworkFilter) => {
  const [filter, setFilter] = useState<NetworkFilter>(initState);

  const setSchool = (school: string) => {
    setFilter({ ...filter, ...{ school } });
  };

  const setTeam = (team: string) => {
    setFilter({ ...filter, ...{ team } });
  };

  const setPosition = (value: string) => {
    setFilter({
      ...filter,
      ...{
        position: positions.find(({ name }) => name === value)?.slug,
      },
    });
  };

  const setAge = (value: string) => {
    setFilter({ ...filter, ...{ age: parseInt(value, 10) } });
  };

  const setFavorite = (value: string) => {
    setFilter({
      ...filter,
      ...{ favorite: value === 'Favorite' ? 1 : undefined },
    });
  };

  const setType = (type: string) => {
    setFilter({ ...filter, ...{ type: type.replace(' ', '_').toLowerCase() } });
  };

  const setDate = (date: string) => {
    setFilter({
      ...filter,
      ...{
        date: date ? date.replace(' ', '_').toLowerCase() : null,
      },
    });
  };

  return [
    filter,
    setType,
    setSchool,
    setTeam,
    setPosition,
    setAge,
    setFavorite,
    setDate,
  ] as const;
};

const useNetworkTable = () => {
  const [
    filter,
    setType,
    setSchool,
    setTeam,
    setPosition,
    setAge,
    setFavorite,
    setDate,
  ] = useNetworkFilter({ type: 'exit_velocity' });

  const debouncedFilter = useDebounce(filter, 500);

  const {
    data: leaderboardsBatting,
    loadingBatting,
  } = useLeaderboardBattingQuery({
    variables: {
      input: debouncedFilter,
    },
    skip:
      debouncedFilter.type === 'pitch_velocity' ||
      debouncedFilter.type === 'spin_rate',
  });

  const {
    data: leaderboardsPitching,
    loadingPitching,
  } = useLeaderboardPitchingQuery({
    variables: {
      input: debouncedFilter,
    },
    skip:
      debouncedFilter.type === 'exit_velocity' ||
      debouncedFilter.type === 'carry_distance',
  });

  const columns = useMemo<
    typeof battingColumns | typeof pitchingColumns
  >(() => {
    if (
      debouncedFilter.type === 'exit_velocity' ||
      debouncedFilter.type === 'carry_distance'
    ) {
      return battingColumns;
      // eslint-disable-next-line
    } else {
      return pitchingColumns;
    }
  }, [debouncedFilter.type]);

  // eslint-disable-next-line
  const data = useMemo(() => {
    filterVar(debouncedFilter);
    return (
      // eslint-disable-next-line
      //@ts-ignore
      transformLeaderboardsDataToNetworkTableData(
        // eslint-disable-next-line
        // @ts-ignore
        (leaderboardsBatting?.leaderboard_batting?.leaderboard_batting ||
          // eslint-disable-next-line
          leaderboardsPitching?.leaderboard_pitching?.leaderboard_pitching) ??
          []
      )
    );
    // eslint-disable-next-line
  }, [
    // eslint-disable-next-line
    leaderboardsBatting?.leaderboard_batting?.leaderboard_batting,
    // eslint-disable-next-line
    leaderboardsPitching?.leaderboard_pitching?.leaderboard_pitching,
  ]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data }, usePagination);

  return [
    debouncedFilter,
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    setSchool,
    setTeam,
    setPosition,
    setAge,
    setFavorite,
    setType,
    setDate,
    loadingBatting || loadingPitching,
  ] as const;
};

const Datagrid = styled.div`
  table {
    border-collapse: separate;
    border-spacing: 0 4px;
  }
  width: 100%;
  height: 100%;
`;

const DatagridTitle = styled.div`
  font-size: 24px;
  font-weight: 400;
  text-align: center;
  color: #667784;
  word-break: keep-all;
`;

const DatagridHeaderRow = styled.div`
  padding: 16px;
  display: flex;
  justify-content: space-between;
`;

const DatagridTable = styled.table`
  width: 100%;
  margin: 16px;
`;

const DatagridTableHeader = styled.thead`
  > tr > th {
    background-color: transparent;
  }
`;

const DatagridTableRow = styled.tr`
  border-radius: 4px;
  background-color: #f7f8f9;
  line-height: 44px;
  margin-bottom: 4px;
`;

const ProfileLink = styled.a`
  all: unset;
`;

const Filters = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  justify-content: flex-end;
  flex-flow: row wrap;
  align-items: center;
  > div {
    margin-right: 20px;
  }
`;

export default Table;
