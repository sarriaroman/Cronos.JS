set(key, data)
--------------
Set data async into Storage



**Parameters**

**key**:  *String*,  Data Key

**data**:  *String*,  Data value

get(key)
--------
Gets the data async from the sotrage



**Parameters**

**key**:  *String*,  Data Key

**Returns**

*Promise*,  Q promise to receive the data

find(key, callback)
-------------------
Search implementation bases on HTML 5 find



**Parameters**

**key**:  *String*,  Data Key

**callback**:  *Function*,  Search function

**Returns**

*Promise*,  Q promise to receive the data

