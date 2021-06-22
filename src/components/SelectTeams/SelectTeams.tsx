import { graphql } from '@apollo/client/react/hoc';
import { Team, TeamsDocument } from 'generated';
import React, { VFC } from 'react';
import { FloatingLabelMultiDropDown } from 'shared';

// export default graphql(TeamsDocument, {
//   props: {},
// })(SelectTeams);

// interface SelectTeamsProps {
//   placeholder: string;
//   teams: Readonly<Team>[];
//   value: Readonly<Team>[];
//   isActive: boolean;
//   onChange: (...args: any[]) => any;
//   onBlur: React.FocusEventHandler<HTMLInputElement>;
//   onFocus: React.FocusEventHandler<HTMLInputElement>;
// }

// const SelectTeams: VFC<SelectTeamsProps> = ({
//   placeholder,
//   teams,
//   value,
//   onChange,
//   onFocus,
//   onBlur,
//   isActive,
// }) => (
//   <FloatingLabelMultiDropDown
//     placeholder={placeholder}
//     items={teams}
//     values={value}
//     onChange={onChange}
//     onFocus={onFocus}
//     onBlur={onBlur}
//     isActive={isActive}
//   />
// );
