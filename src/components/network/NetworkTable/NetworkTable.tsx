/* eslint-disable react/jsx-props-no-spreading */
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Profile,
  useProfilesQuery,
  useUpdateFavoriteProfileMutation,
} from 'graph';
import getFullName from 'helpers/getFullName';
import React, { ReactNode, useEffect, useMemo, useState, VFC } from 'react';
import { usePagination, useTable } from 'react-table';
import { Flex, OutgoiningInput, Search, Select, Spinner, Text } from 'shared';
import styled from 'styled-components';
import { positions } from 'values';
import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons';
import { usePagination as usePaginationControl } from '@material-ui/lab/Pagination';

import useDebounce from 'hooks/useDebounce';
import toastr from 'toastr';
import { ProfilesDocument } from 'graph/generated';
import { makeVar } from '@apollo/client';

const filterVar = makeVar({});

const Table: VFC = () => {
  const [
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    pageCount,
    canPreviousPage,
    canNextPage,
    goToPage,
    setPageSize,
    setSchool,
    setTeam,
    setPosition,
    setAge,
    setFavorite,
    setPlayer,
    loading,
    totalCount,
  ] = useNetworkTable();

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { items } = usePaginationControl({
    count: pageCount,
  });

  return (
    <Datagrid>
      <div>
        <DatagridHeaderRow>
          <DatagridTitle>Network</DatagridTitle>
          <Filters>
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
            <Select
              items={CountRecordsOnPage}
              placeholder="Show"
              onChange={setPageSize}
              withoutNone
            />
          </Filters>
        </DatagridHeaderRow>
        <DatagridHeaderRow>
          <AvailablePlayer>
            Available Players ({totalCount ?? '-'})
          </AvailablePlayer>
          <Search onChange={setPlayer} />
        </DatagridHeaderRow>
      </div>
      {loading && (
        <Flex
          width="100%"
          height="100%"
          alignItems="center"
          justifyContent="center"
        >
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

          <Pagination>
            {items.map(({ page, type, selected, ...item }, index) => {
              let children: ReactNode | null = null;

              if (type === 'start-ellipsis' || type === 'end-ellipsis') {
                children = (
                  <>
                    {type === 'start-ellipsis' ? (
                      <PaginationButton
                        {...item}
                        onClick={() => goToPage(index - 1)}
                      >
                        ...
                      </PaginationButton>
                    ) : (
                      <PaginationButton
                        {...item}
                        onClick={() => goToPage(index + 1)}
                      >
                        ...
                      </PaginationButton>
                    )}
                  </>
                );
              } else if (type === 'page') {
                children = (
                  <PaginationButton
                    isActive={selected}
                    onClick={(e) => {
                      goToPage(index);
                      item.onClick(e);
                    }}
                  >
                    {page}
                  </PaginationButton>
                );
              } else {
                children = (
                  <>
                    {type === 'previous' ? (
                      <PaginationButton
                        onClick={(e) => {
                          goToPage(0);
                          item.onClick(e);
                        }}
                        isDisabled={!canPreviousPage}
                      >
                        «
                      </PaginationButton>
                    ) : (
                      <PaginationButton
                        onClick={(e) => {
                          goToPage(pageCount - 1);
                          item.onClick(e);
                        }}
                        isDisabled={!canNextPage}
                      >
                        »
                      </PaginationButton>
                    )}
                  </>
                );
              }
              // eslint-disable-next-line react/no-array-index-key
              return <li key={`key:${index}`}>{children}</li>;
            })}
          </Pagination>
        </>
      )}
    </Datagrid>
  );
};

const networkColumns = [
  {
    Header: 'Player Name',
    accessor: 'name' as const,
  },
  {
    Header: 'Session',
    accessor: 'session' as const,
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
    Header: 'Age',
    accessor: 'age' as const,
  },
  {
    Header: 'Favorite',
    accessor: 'favorite' as const,
    // eslint-disable-next-line
    // @ts-ignore
    Cell: ({ row: { original } }) => {
      const [updateFavorite] = useUpdateFavoriteProfileMutation({
        refetchQueries: [
          {
            query: ProfilesDocument,
            variables: {
              input: filterVar(),
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
    },
  },
];

const favoriteSelect = ['All', 'Favorite'];

const CountRecordsOnPage = ['10', '15', '20'];

const transformProfilesDataToNetworkTableData = (profiles: Profile[]) =>
  profiles.map((p) => ({
    name: getFullName(p.first_name as string, p.last_name as string),
    session: '-',
    school: p.school?.name as string,
    teams: p.teams?.map((t) => t?.name).join(),
    age: p.age as number,
    favorite: p.favorite as boolean,
    id: p.id,
  }));

type NetworkFilter = {
  school?: string;
  team?: string;
  position?: string;
  age?: number;
  favorite?: number;
  // eslint-disable-next-line
  profiles_count: number;
  offset: number;
};

const useNetworkFilter = (initState: NetworkFilter) => {
  const [filter, setFilter] = useState<NetworkFilter>(initState);

  const setOffset = (offset: number) => {
    setFilter({ ...filter, ...{ offset } });
  };

  const setSchool = (school: string) => {
    setFilter({ ...filter, ...{ school, offset: 0 } });
  };

  const setTeam = (team: string) => {
    setFilter({ ...filter, ...{ team, offset: 0 } });
  };

  const setPosition = (value: string) => {
    setFilter({
      ...filter,
      ...{
        position: positions.find(({ name }) => name === value)?.slug,
        offset: 0,
      },
    });
  };

  const setAge = (value: string) => {
    setFilter({ ...filter, ...{ age: parseInt(value, 10), offset: 0 } });
  };

  const setFavorite = (value: string) => {
    setFilter({
      ...filter,
      ...{ favorite: value === 'Favorite' ? 1 : undefined, offset: 0 },
    });
  };

  const setPageSize = (value: string) => {
    setFilter({
      ...filter,
      ...{ profiles_count: parseInt(value, 10), offset: 0 },
    });
  };

  const setPlayer = (value: string) => {
    setFilter({ ...filter, ...{ player_name: value, offset: 0 } });
  };

  return [
    filter,
    setOffset,
    setPageSize,
    setSchool,
    setTeam,
    setPosition,
    setAge,
    setFavorite,
    setPlayer,
  ] as const;
};

const useNetworkPagination = () => {
  const [pageCount, _setPageCount] = useState(0);
  const [canPreviousPage, _setCanPreviousPage] = useState(false);
  const [canNextPage, _setCanNextPage] = useState(false);

  const setPageCount = (totalCount: number, perPage: number) => {
    _setPageCount(Math.ceil(totalCount / perPage));
  };

  const setCanPreviousPage = (offset: number) => {
    _setCanPreviousPage(Boolean(offset));
  };

  const setCanNextPage = (
    totalCount: number,
    perPage: number,
    offset: number
  ) => {
    _setCanNextPage(!(totalCount - offset < perPage));
  };

  const goToPage = (
    perPage: number,
    index: number,
    setOffset: (offset: number) => void
  ) => {
    setOffset(perPage * index);
  };

  return [
    pageCount,
    canPreviousPage,
    canNextPage,
    setPageCount,
    setCanPreviousPage,
    setCanNextPage,
    goToPage,
  ] as const;
};

const useNetworkTable = () => {
  const [
    filter,
    setOffset,
    setPageSize,
    setSchool,
    setTeam,
    setPosition,
    setAge,
    setFavorite,
    setPlayer,
  ] = useNetworkFilter({
    profiles_count: 10,
    offset: 0,
  });

  const debouncedFilter = useDebounce(filter, 500);

  const { data: profiles, loading } = useProfilesQuery({
    variables: {
      input: debouncedFilter,
    },
  });

  const [
    pageCount,
    canPreviousPage,
    canNextPage,
    setPageCountDefault,
    setCanPreviousPage,
    setCanNextPage,
    goToPageDefault,
  ] = useNetworkPagination();

  const columns = useMemo<typeof networkColumns>(() => networkColumns, []);

  // eslint-disable-next-line
  const data = useMemo(() => {
    return transformProfilesDataToNetworkTableData(
      // eslint-disable-next-line
      //@ts-ignore
      profiles?.profiles?.profiles ?? []
    ); // eslint-disable-next-line
  }, [profiles?.profiles?.profiles]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    setPageSize: setPageSizeUI,
    // eslint-disable-next-line
    // @ts-ignor
  } = useTable({ columns, data }, usePagination);

  useEffect(() => {
    setPageSizeUI(filter.profiles_count);
    setPageCountDefault(
      profiles?.profiles?.total_count ?? 0,
      filter.profiles_count
    );
    setCanPreviousPage(filter.offset);
    setCanNextPage(
      profiles?.profiles?.total_count ?? 0,
      filter.profiles_count,
      filter.offset
    );
    filterVar(debouncedFilter);
    // eslint-disable-next-line
  }, [profiles?.profiles?.profiles]);

  const goToPage = (index: number) => {
    goToPageDefault(filter.profiles_count, index, setOffset);
  };

  return [
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    pageCount,
    canPreviousPage,
    canNextPage,
    goToPage,
    setPageSize,
    setSchool,
    setTeam,
    setPosition,
    setAge,
    setFavorite,
    setPlayer,
    loading,
    profiles?.profiles?.total_count,
  ] as const;
};

const Pagination = styled.ul`
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin: 16px 0;
  position: sticky;
  bottom: 0;
  align-self: flex-end;
  padding-left: 0;
  border: 0;
  list-style-type: none;
`;

const PaginationButton = styled.button<{
  isActive?: boolean;
  isDisabled?: boolean;
}>`
  all: unset;
  position: relative;
  float: left;
  padding: 6px 12px;
  color: #414f5a;
  border: none;
  text-decoration: none;
  border-radius: 4px;
  margin: 0 2px;
  background-color: #f7f8f9;
  margin-right: 0;
  ${({ isActive }) =>
    isActive
      ? 'background-color: #48bbff; color: #fff; pointer-events: none;'
      : ''}
  ${({ isDisabled }) =>
    isDisabled ? 'background-color: transparent; pointer-events: none;' : ''}
`;

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

const AvailablePlayer = styled.div`
  font-size: 18px;
  color: #414f5a;
  font-weight: 400;
  text-align: left;
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
