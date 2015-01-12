# flask-cms
Very basic CMS functionality that works inline with any Flask app

At the moment it assumes that flask-cms will be sitting in a folder called `cms` next to your app and is bootstrapped like:

```python
from my_app import app
from cms import init_cms

init_cms(app, db='connection string')

app.run()
```

## Getting started

 1. Go to the project directory
 2. `git submodule add https://github.com/brendanmckenzie/flask-cms.git cms`
 3. Run the [SQL file](https://github.com/brendanmckenzie/flask-cms/blob/master/database/000_up_initial.sql) in `database` directory
 4. Add the above snippet to your application startup

## Assumptions
This module makes a few assumptions.

 1. You are running PostgreSQL and have run the SQL script in the database directory
 2. Your CMS templates are stored in a folder called `cms-content` under your main application's template directory
 3. Your authentication with flask is ensures that there is a `user` property on the `Flask.g` object, and that `user` object has an `admin` boolean that is `true`
