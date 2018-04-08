This is a simple library to build DOM structures

Example:

```javascript
import * as MiSwDOM from "./MiSwDOM.js"

var element = new MiSwDOM.Element("div")
	.class("red circular label")
	.add(new MiSwDOM.Element("text", "Hello"))
	;
```
	