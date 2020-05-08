## easy-console

Just import the module in your project and start using like a normal console. ( with built in JSON stringify)

Do more with less.

```
import { ec } from "./src/index";

ec.log('Hello World');
// or
ec.l('Hello World');

const arrJ = [{ a: 10 }, { b: 'hello' }];
ec.l('log array of JSON ', arrJ);
```

No need to search for the console log output in your console, just view them all in one go.

```
ec.l('variable value',variable);
// some code...
ec.l('variable value',variable);
// some code..
ec.l('variable value',variable);

ec.history();
```

Dont want to clutter the console with log output, just use silent log feature.

```

ec.silentLog('variable value',variable); // won't log anything on console
// some code...
ec.sl('variable value',variable); // won't log anything on console
ec.history(); // log the history on console

```

#### Options

```
// to turn off all the logging, enabled by default
ec.isDebug = false;
// to turn off log saving - silent logs wont work, enabled by default
ec.isSave = false;
```
#### Recommended Usage

- Usage of 'sl' and history feature
```
ec.sl("log array of string ", arrS);
ec.history();
```