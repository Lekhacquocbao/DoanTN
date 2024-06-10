import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import GetToken from '~/Token/GetToken';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import styles from './AddPost.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const AddPost = () => {
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [thumbnail, setThumbnail] = useState('');

  const handleChangeContent = (value) => {
    setContent(value);
  };

  const handleChangeTitle = (event) => {
    setTitle(event.target.value);
  };

  const handleChangeThumbnail = (event) => {
    setThumbnail(event.target.value);
  };

  const handleSubmit = async () => {
    await axios
      .post(
        'http://localhost:8000/api/post/forum/add',
        {
          title: title,
          thumbnail: thumbnail,
          content: content,
        },
        {
          headers: {
            Authorization: `Bearer ${GetToken()}`,
          },
        },
      )
      .then((response) => {
        toast.success(response.data.message);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <div className={cx('addPostContainer')}>
      <div className={cx('formGroup')}>
        <label>Title:</label>
        <input value={title} onChange={handleChangeTitle} type="text" className={cx('formControl')} />
      </div>
      <div className={cx('formGroup')}>
        <label>Thumbnail URL:</label>
        <input value={thumbnail} onChange={handleChangeThumbnail} type="text" className={cx('formControl')} />
      </div>
      <div className={cx('formGroup')}>
        <label>Content:</label>
        <ReactQuill value={content} onChange={handleChangeContent} className={cx('formControl')} />
      </div>
      <button onClick={handleSubmit} className={cx('submitButton')}>
        Submit
      </button>
    </div>
  );
};

export default AddPost;