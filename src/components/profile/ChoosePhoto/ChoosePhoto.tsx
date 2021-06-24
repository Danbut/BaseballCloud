import styled from 'styled-components';
import { avatarBackgroundImage } from 'assets/images';
import { Box, Flex } from 'shared';
import { useState } from 'react';
import Auth from 'services/api';

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

const ChoosePhoto = () => {
  const [isUpload, setIsUpload] = useState(false);
  const [pictureInfo, setPictureInfo] = useState<File>();
  const [pictureUrl, setPictureUrl] = useState<string>();

  const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    // eslint-disable-next-line
    // @ts-ignore
    /* eslint-disable */ setPictureInfo(e.target.files[0]);
    setIsUpload(true);
  };

  return (
    <Flex as="form" flexDirection="column" alignItems="center" mb="23px">
      <Box
        mb="8px"
        overflow="hidden"
        borderRadius="50%"
        backgroundImage={
          pictureInfo
            ? `url(${URL.createObjectURL(pictureInfo)})`
            : `url(${avatarBackgroundImage})`
        }
        width="100px"
        height="100px"
        backgroundSize="cover"
        backgroundPosition="50% 50%"
      />
      {!isUpload && (
        <>
          <ChoosePhotoInput type="file" id="photo" onChange={onChange} />
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
                setPictureUrl(r);
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
              setPictureUrl(undefined);
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
