This project sets up with yarn install.
To run the project use: yarn start

# NewFoundry - Challenge app
[]: # Language: markdown
[]: # Path: README.md

To install: 
yarn install

To run: 
yarn start

## Features
Search function that returns a list of results based on the search term and amount of lines require.



### The project is built using : 
    - react
    - material-ui (linear progress bar)
    - axios
    - XMLparser

### Data is fetched from the following file: alls_well_that_ends_well_ff.xml

## DATA FLOW CHART PROVIDED: 

    - https://whimsical.com/8LePrcVAybuZn7gdMtQJjw

Search is handled using O(n) time and O(n) space complexity.

## APP considerations: 

    XML data will need to be parsed to JSON - to handle parsing I used XMLparser and then set the data to state using useState.

    lines are displayed as a table of objects. These lines are obtained from the new JSON data using getElementsByTagName("value").

    Character names have multiple values that are searchable. To make the searchable names predictable I used the approach of creating buttons with set values 
    and would only show values that are available to be searched. This removes the necessity for the user to know the character name or naming convention found within the data 
    to find the correct character. 




## Notes: 

### Button Values: 
<div class="character-values-wrapper">
<button name="character" value="KING.">King of France</button>
<button name="character" value="DUKE.">Duke of Florence</button>
<button name="character" value="BER.">Bertram, Count of Roussillon</button>
<button name="character" value="LAF.">Lafew</button>
<button name="character" value="PAR.">Parolles</button>
<button name="character" value="STEW.">Rinaldo</button>
<button name="character" value="CLO.">Lavatch</button>
<button name="character" value="PAGE.">Countess&amp;#8217;s Page</button>
<button name="character" value="GENT.">Gentleman</button>
<button name="character" value="COUNT.">Countess of Roussillon</button>
<button name="character" value="HEL.">Helena</button>
<button name="character" value="WID.">An Old Widow of Florence</button>
<button name="character" value="DIA.">Diana</button>
<button name="character" value="MAR.">Mariana</button>
<button name="character" value="VIOL.">Violenta</button>
<button name="character" value="1. LORD.">First French Lord</button>
<button name="character" value="2. LORD.">Second French Lord</button>
<button name="character" value="3. LORD.">Third French Lord</button>
<button name="character" value="4. LORD.">Fourth French Lord</button>
<button name="character" value="1. LORD. DUM.">First French Lord Dumaine</button>
<button name="character" value="2. LORD. DUM.">Second French Lord Dumaine</button>
<button name="character" value="1. SOLD. AS INTERPRETER.">First Soldier as Interpreter</button>
<button name="character" value="2. SOLD.">Second Soldier</button>
<button name="character" value="MESS.">Messenger</button>
</div>