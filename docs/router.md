current()
---------
Get the current route



**Returns**

*String*,  Current route

is(location)
------------
Check if the same route is the current one.



**Parameters**

**location**:  *String*,  Location string

go(route)
---------
Navigate to the specified route



**Parameters**

**route**:  *String*,  Route to be matched

back()
------
Back into the stacked route.


add(route, callback)
--------------------
Adds a new route function to respond on changes



**Parameters**

**route**:  *String*,  Route

**callback**:  *...*,  The desired behaviour ( Remember the req param )

