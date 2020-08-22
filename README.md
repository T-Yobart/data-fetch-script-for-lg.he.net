# data-fetch-script-for-lg.he.net

## Overview

simple data fetch script for the lg.he.net lookin glass web gui. The script is set to iterate a single command over all available routers. 
Each iteration will add its results to output variables.

The script in the Master Branch fetches unique ASNs of IPV6 neighbors and logs duplicates once.  
Alternative is also available where output quantifies the amount of links for each neighbouring AS.

## how to use or edit

The script is simply meant to be used as a drop in for the dev-console of your browser (I wrote it whilst testing it on firefox).  
  
The code has been segmented into multiple functions for ease of edition, as follows:  

- iteration loop (over each router)
- Post Request
- sorting the answer
- wait for the cooldown to end
