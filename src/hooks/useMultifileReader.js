import { useState, useEffect, useRef } from 'react';

export const useMultifileReader = ({
  onloadCallback = () => {},
  readerMethod = 'readAsText',
} = {}) => {
  const [files, setFiles] = useState([]);

  const loading = useRef(false);
  const errors = useRef([]);
  const results = useRef([]);

  useEffect(() => {
    if (!files || !files.length) return;

    const handleError = (err) => {
      errors.current = [...errors.current, err];
    };

    files.forEach((file) => {
      const reader = new FileReader(file);

      // Event handlers
      reader.onloadstart = () => {
        loading.current = true;
      };

      reader.onload = ({ target: { result: fileResult } }) => {
        results.current = [...results.current, fileResult];
      };

      reader.onerror = (err) => {
        handleError(err);
      };

      reader.onloadend = () => {
        const totalCount = results.current.length + errors.current.length;
        if (totalCount >= files.length) {
          loading.current = false;
          onloadCallback([...results.current]);
          results.current = [];
        }
      };

      try {
        reader[readerMethod](file);
      } catch (err) {
        handleError(err);
      }
    });
  }, [files, onloadCallback, readerMethod]);

  return [
    { errors: errors.current, loading: loading.current, results: [...results.current] },
    setFiles,
  ];
};
