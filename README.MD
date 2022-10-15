#### THE ROUTES

#### Chained together(Because its a get and post request to the same endpoint)

1. app.get('/api/v1/tasks') -get all the tasks
2. app.post('/api/v1/tasks') -create a new task

#### Chained together(Because its a get ,put and delete request to the same endpoint)

1. app.get('/api/v1/tasks/:id') -get a specific single task
2. app.patch('/api/v1/tasks/:id') -update a task
3. app.get('/api/v1/tasks/:id') -delete a task
