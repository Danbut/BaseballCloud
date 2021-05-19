import { Profile } from 'graph';
import getFullName from 'helpers/getFullName';
import useDebounce from 'hooks/useDebounce';
import React, { useEffect, useState, VFC } from 'react';
import { SearchSuggestDropDown } from 'shared';

const SearchProfile: VFC<{
  profileNames: Profile[];
  onChange(result: Profile | string): void;
}> = ({ profileNames, onChange }) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const debouncedSearchTerm = useDebounce(searchTerm, 1000);

  useEffect(() => {
    onChange(
      profileNames.find(
        (p) =>
          getFullName(
            p?.first_name ? p?.first_name : '',
            p?.last_name ? p?.last_name : ''
          ) === debouncedSearchTerm
      ) ?? debouncedSearchTerm
    );
  }, [debouncedSearchTerm, onChange, profileNames]);

  return (
    <SearchSuggestDropDown
      items={
        profileNames.map((p) =>
          getFullName(
            p?.first_name ? p?.first_name : '',
            p?.last_name ? p?.last_name : ''
          )
        ) ?? []
      }
      value={searchTerm}
      onChange={(value: string) => setSearchTerm(value)}
    />
  );
};

export default SearchProfile;
