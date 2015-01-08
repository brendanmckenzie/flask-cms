# flask-cms
Very basic CMS functionality that works inline with any Flask app

At the moment it assumes that flask-cms will be sitting in a folder called `cms` next to your app and is bootstrapped like:

```python
from my_app import app
from cms import init_cms

init_cms(app)

app.run()
```
