// src/api/fetchData.js
import config from '../config.json';

export const fetchSheetData = async () => {
  const { GSHEET, API_KEY } = config;

  try {
    // Step 1: Get all sheet names
    const sheetsUrl = `https://sheets.googleapis.com/v4/spreadsheets/${GSHEET}?fields=sheets(properties(title))&key=${API_KEY}`;
    const sheetsResponse = await fetch(sheetsUrl);
    const sheetsResult = await sheetsResponse.json();

    if (sheetsResult.error) {
      throw new Error(sheetsResult.error.message);
    }

    const sheetNames = sheetsResult.sheets.map(sheet => sheet.properties.title);

    // Step 2: Fetch data from all sheets in one request
    const ranges = sheetNames.map(sheetName => `${encodeURIComponent(sheetName)}!A:H`);
    const dataUrl = `https://sheets.googleapis.com/v4/spreadsheets/${GSHEET}/values:batchGet?ranges=${ranges.join('&ranges=')}&key=${API_KEY}`;
    const dataResponse = await fetch(dataUrl);
    const dataResult = await dataResponse.json();

    if (dataResult.error) {
      throw new Error(dataResult.error.message);
    }

    // Step 3: Process the data
    const data = [];

    dataResult.valueRanges.forEach(valueRange => {
      const sheetValues = valueRange.values;
      if (sheetValues && sheetValues.length > 1) {
        const keys = ['title', 'artist', 'date', 'pages', 'genre', 'summary', 'notes', 'coverImg'];
        const sheetData = sheetValues.slice(1).map(row =>
          row.reduce((obj, value, index) => ({ ...obj, [keys[index]]: value }), {})
        );
        data.push(...sheetData);
      }
    });

    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

