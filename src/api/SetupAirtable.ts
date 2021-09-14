import Airtable from 'airtable';

const BASE_ID = process.env.REACT_APP_AIRTABLE_BASE_ID
  ? process.env.REACT_APP_AIRTABLE_BASE_ID
  : 'app8ZbcPx7dkpOnP0';
const API_KEY = process.env.REACT_APP_AIRTABLE_API_KEY ? 
  process.env.REACT_APP_AIRTABLE_API_KEY : 'keyFnN1F856E2F2dO';

// create a new Airtable object in React
const airtableBase = new Airtable({ apiKey: API_KEY }).base(BASE_ID);

export default airtableBase;
