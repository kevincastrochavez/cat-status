/* eslint-disable react/prop-types */
import { useState } from 'react';

import './CatImage.css';

/**
 * Display a cat image with a status code
 * @param {number} code - status code
 * @param {string} name - name in picture
 * @returns {JSX.Element}
 */
function CatImage({ code, name }) {
  const [isCovered, setIsCovered] = useState(true);

  return (
    <div className='imageContainer' onClick={() => setIsCovered(false)}>
      {isCovered && (
        <div className='imageOverlay'>
          <p>{code}</p>
        </div>
      )}
      <img src={`https://http.cat/${code}.jpg`} alt={name} />
    </div>
  );
}

export default CatImage;
