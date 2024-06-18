import { useState } from 'react';
import { Analytics } from '@vercel/analytics/react';

import './App.css';
import CatImage from './CatImage';

const statusGroups = [
  {
    code: 100,
  },
  {
    code: 200,
  },
  {
    code: 300,
  },
  {
    code: 400,
  },
  {
    code: 500,
  },
];

const statusCodes = [
  { code: 100, name: 'Continue' },
  { code: 101, name: 'Switching Protocols' },
  { code: 102, name: 'Processing' },
  { code: 103, name: 'Early Hints' },
  { code: 200, name: 'OK' },
  { code: 201, name: 'Created' },
  { code: 202, name: 'Accepted' },
  { code: 203, name: 'Non-Authoritative Information' },
  { code: 204, name: 'No Content' },
  { code: 205, name: 'Reset Content' },
  { code: 206, name: 'Partial Content' },
  { code: 207, name: 'Multi-Status' },
  { code: 208, name: 'Already Reported' },
  { code: 214, name: 'Transformation Applied' },
  { code: 226, name: 'IM Used' },
  { code: 300, name: 'Multiple Choices' },
  { code: 301, name: 'Moved Permanently' },
  { code: 302, name: 'Found' },
  { code: 303, name: 'See Other' },
  { code: 304, name: 'Not Modified' },
  { code: 305, name: 'Use Proxy' },
  { code: 307, name: 'Temporary Redirect' },
  { code: 308, name: 'Permanent Redirect' },
  { code: 400, name: 'Bad Request' },
  { code: 401, name: 'Unauthorized' },
  { code: 402, name: 'Payment Required' },
  { code: 403, name: 'Forbidden' },
  { code: 404, name: 'Not Found' },
  { code: 405, name: 'Method Not Allowed' },
  { code: 406, name: 'Not Acceptable' },
  { code: 407, name: 'Proxy Authentication Required' },
  { code: 408, name: 'Request Timeout' },
  { code: 409, name: 'Conflict' },
  { code: 410, name: 'Gone' },
  { code: 411, name: 'Length Required' },
  { code: 412, name: 'Precondition Failed' },
  { code: 413, name: 'Payload Too Large' },
  { code: 414, name: 'Request-URI Too Long' },
  { code: 415, name: 'Unsupported Media Type' },
  { code: 416, name: 'Request Range Not Satisfiable' },
  { code: 417, name: 'Expectation Failed' },
  { code: 418, name: 'I’m a teapot' },
  { code: 420, name: 'Enhance Your Calm' },
  { code: 421, name: 'Misdirected Request' },
  { code: 422, name: 'Unprocessable Entity' },
  { code: 423, name: 'Locked' },
  { code: 424, name: 'Failed Dependency' },
  { code: 425, name: 'Too Early' },
  { code: 426, name: 'Upgrade Required' },
  { code: 428, name: 'Precondition Required' },
  { code: 429, name: 'Too Many Requests' },
  { code: 431, name: 'Request Header Fields Too Large' },
  { code: 444, name: 'No Response' },
  { code: 450, name: 'Blocked by Windows Parental Controls' },
  { code: 451, name: 'Unavailable For Legal Reasons' },
  { code: 497, name: 'HTTP Request Sent to HTTPS Port' },
  { code: 498, name: 'Token expired/invalid' },
  { code: 499, name: 'Client Closed Request' },
  { code: 500, name: 'Internal Server Error' },
  { code: 501, name: 'Not Implemented' },
  { code: 502, name: 'Bad Gateway' },
  { code: 503, name: 'Service Unavailable' },
  { code: 504, name: 'Gateway Timeout' },
  { code: 506, name: 'Variant Also Negotiates' },
  { code: 507, name: 'Insufficient Storage' },
  { code: 508, name: 'Loop Detected' },
  { code: 509, name: 'Bandwidth Limit Exceeded' },
  { code: 510, name: 'Not Extended' },
  { code: 511, name: 'Network Authentication Required' },
  { code: 521, name: 'Web Server Is Down' },
  { code: 522, name: 'Connection Timed Out' },
  { code: 523, name: 'Origin Is Unreachable' },
  { code: 525, name: 'SSL Handshake Failed' },
  { code: 530, name: 'Site Frozen' },
  { code: 599, name: 'Network Connect Timeout Error' },
];

function App() {
  const [statusShowing, setStatusShowing] = useState(0);
  const statusCodeLevelsList = statusGroups?.map((group) => group.code); // List of status codes by level
  const { groupLevelsObject } = groupStatusCodesByLevels(statusCodes); // Object of status codes ordered by level
  const statusCodesShowing =
    groupLevelsObject[statusCodeLevelsList[statusShowing]];

  const [shuffledArray, setShuffledArray] = useState(statusCodesShowing);

  const handleStatusLevelClick = (index) => {
    setStatusShowing(index);
    setShuffledArray(
      shuffleArray(groupLevelsObject[statusCodeLevelsList[index]])
    );
  };

  return (
    <>
      <h1>HTTP Cat</h1>
      <nav className='statusLevelsContainer'>
        {statusCodeLevelsList.map((code, index) => (
          <div key={code} onClick={() => handleStatusLevelClick(index)}>
            {code}
          </div>
        ))}
      </nav>

      <div className='imagesContainer'>
        {shuffledArray?.map((code) => (
          <CatImage key={code.code} {...code} />
        ))}
      </div>

      <Analytics />
    </>
  );
}

export default App;

// PRIVATE FUNCTIONS

/**
 * Group status codes by level
 * @param {Array} statusCodesList - list of status codes
 * @returns {Object} groupLevelsObject - object with status codes grouped by level
 */
const groupStatusCodesByLevels = (statusCodesList) => {
  const groupLevelsObject = {};

  statusCodesList.forEach((code) => {
    const level = Math.floor(code.code / 100) * 100;

    if (!groupLevelsObject[level]) {
      groupLevelsObject[level] = [];
    }

    groupLevelsObject[level].push(code);
  });

  return { groupLevelsObject };
};

/**
 * Shuffle an array
 * @param {Array} array - array to shuffle
 * @returns {Array} shuffledArray - shuffled array
 */
const shuffleArray = (array) => {
  // Clone the array to avoid modifying the original array
  const shuffledArray = [...array];

  for (let i = shuffledArray.length - 1; i > 0; i--) {
    // Generate a random index from 0 to i
    const j = Math.floor(Math.random() * (i + 1));

    // Swap elements at index i and j
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }

  return shuffledArray;
};
