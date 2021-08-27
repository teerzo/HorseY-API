const express = require('express');
const axios = require('axios');
const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const ZED_URL = "https://zed-ql.zed.run/graphql";
        const variables = {
            "first": 2,
            "input": {
                "location": {
                    "city": "Melbourne"
                }
            }
        }

        const query = `query ($input: GetRaceResultsInput, $before: String, $after: String, $first: Int, $last: Int) {
            getRaceResults(before: $before, after: $after, first: $first, last: $last, input: $input) {
              edges {
                cursor
                node {
                  country
                  city
                  name
                  length
                  startTime
                  fee
                  raceId
                  weather
                  status
                  class
                  prizePool {
                    first
                    second
                    third
                  }
                  horses {
                    horseId
                    finishTime
                    finalPosition
                    name
                    gate
                    ownerAddress
                    bloodline
                    gender
                    breedType
                    gen
                    coat
                    hexColor
                    imgUrl
                    class
                    stableName
                  }
                }
              }
              pageInfo {
                startCursor
                endCursor
                hasNextPage
                hasPreviousPage
              }
            }
          }`
        const headers = {
            'x-developer-secret': process.env.ZED_API_KEY
        };
        const response = await axios.post(ZED_URL, { query, variables }, headers);
        console.log('zed result', response);

        if (response.data) {
            res.status(200).json(response.data);
        }
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = { routeZed: router };