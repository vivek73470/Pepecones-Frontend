/** @format */

import React, { useState } from 'react';
import 'jodit/build/jodit.min.css';
import JoditEditor from 'jodit-react';
import { editorConfig } from '../../utils/EditorConfig';
import { setFetching } from '../../redux/reducer/fetching';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import './index.css';

const DescriptionEditer = () => {
  const [data, setData] = useState(content);
  const [image, setImage] = useState('');

  const dispatch = useDispatch();

  const getImageSrcs = (htmlContent) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, 'text/html');
    const imgElements = doc.querySelectorAll('img');
    const srcs = Array.from(imgElements).map((imgElement) =>
      imgElement.getAttribute('src'),
    );
    return srcs;
  };

  const handleChange = (value) => {
    const srcValues = getImageSrcs(value);

    const uploadPromises = [];

    srcValues.forEach((srcValue) => {
      const data = new FormData();
      data.append('file', srcValue);
      data.append('upload_preset', 'imageridedost');
      data.append('cloud_name', 'dlrgh9gam');

      dispatch(setFetching(true));

      const uploadPromise = fetch(
        'https://api.cloudinary.com/v1_1/dlrgh9gam/image/upload',
        {
          method: 'post',
          body: data,
        },
      )
        .then((res) => res.json())
        .then((cloudinaryData) => {
          value = value.replace(srcValue, cloudinaryData.secure_url);
          setImage(cloudinaryData.secure_url);
        })
        .catch((err) => {
          console.log(err);
          toast.error('Image Upload failed');
        });

      uploadPromises.push(uploadPromise);
    });

    Promise.all(uploadPromises)
      .then(() => {
        setContent(value);
        dispatch(setFetching(false));
      })
      .catch((err) => {
        console.log(err);
        toast.error('Image Upload failed');
        dispatch(setFetching(false));
      });
  };

  return (
    <JoditEditor
      value={data}
      config={editorConfig}
      onChange={handleChange}
      onBlur={(value, event) => console.log(event)}
    />
  );
};

export default DescriptionEditer;
