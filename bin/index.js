#! /usr/bin/env node

// removes warning: (https://github.com/netlify/cli/issues/4608#issuecomment-1223696635)
process.removeAllListeners("warning"); 
import inquirer from "inquirer";
import clear from 'clear';
dotenv.config()
