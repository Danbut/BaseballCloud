import styled from 'styled-components';
import { Flex } from 'shared';
import React, { useState, VFC } from 'react';
import Auth from 'services/api';
import Avatar from '../Avatar';

const ChoosePhotoInput = styled.input`
  display: none;
`;

const ChoosePhotoLabel = styled.label`
  display: inline-block;
  max-width: 100%;
  margin-bottom: 0;
  font-size: 14px;
  font-weight: 400;
  color: #788b99;
  white-space: nowrap;

  :hover {
    color: #48bbff;
    text-decoration: underline;
  }
`;

interface ChoosePhotoProps {
  onChange(r: string): void;
}

const ChoosePhoto: VFC<ChoosePhotoProps> = ({ onChange }) => {
  const [isUpload, setIsUpload] = useState(false);
  const [pictureInfo, setPictureInfo] = useState<File>();

  const onChangePhoto = (e: React.FormEvent<HTMLInputElement>) => {
    // eslint-disable-next-line
    // @ts-ignore
    /* eslint-disable */ setPictureInfo(e.target.files[0]);
    setIsUpload(true);
  };

  return (
    <Flex as="form" flexDirection="column" alignItems="center" mb="23px">
      <Avatar pictureUrl={pictureInfo && URL.createObjectURL(pictureInfo)} />
      {!isUpload && (
        <>
          <ChoosePhotoInput type="file" id="photo" onChange={onChangePhoto} />
          <ChoosePhotoLabel htmlFor="photo">Choose Photo</ChoosePhotoLabel>
        </>
      )}
      {isUpload && (
        <>
          <ChoosePhotoLabel as="a">{pictureInfo?.name}</ChoosePhotoLabel>
          <ChoosePhotoLabel
            as="a"
            onClick={() => {
              //@ts-ignore
              Auth.uploadPhoto(pictureInfo).then((r) => {
                onChange(r);
                setIsUpload(false);
              });
            }}
          >
            Upload Photo
          </ChoosePhotoLabel>
          <ChoosePhotoLabel
            as="a"
            onClick={() => {
              setPictureInfo(undefined);
              setIsUpload(false);
            }}
          >
            Cancel
          </ChoosePhotoLabel>
        </>
      )}
    </Flex>
  );
};

export default ChoosePhoto;
