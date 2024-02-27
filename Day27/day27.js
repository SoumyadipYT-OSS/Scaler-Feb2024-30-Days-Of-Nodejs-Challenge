const express = require('express')

const app = express()


app.use(express.json())


let courses = [
    {id: 1, programmingLanguage: 'C++'},
    {id: 2, programmingLanguage: 'C#'},
    {id: 3, programmingLanguage: 'JavaScript'},
    {id: 4, programmingLanguage: 'Python'},
    {id: 5, programmingLanguage: 'TypeScript'},
    {id: 6, programmingLanguage: 'Java'},
]


app.get('/', (req, res)=> {
    res.send('Hello from Scaler Topics')
})

app.get('/about', (req, res)=> {
    res.send('We Create Impact')
})

app.get('/contact', (req, res)=> {
    res.send('Contact us a abcd@abcd.com')
})

app.get('/courses', (req, res)=> {
    res.send(courses)
})



function authenticateAndAuthorize(roles) {
    return function (req, res, next) {
      const token = req.headers['authorization'];
      if (!token) {
        return res.status(403).send('A token is required for authentication');
      }
      try {
        const decoded = verifyToken(token);
        if (roles.includes(decoded.role)) {
          req.user = decoded;
          next();
        } else {
          return res.status(403).send('Forbidden: You do not have the required role');
        }
      } catch (err) {
        return res.status(401).send('Invalid Token');
      }
    }
  }
  
  // Use the middleware
  app.post('/courses', authenticateAndAuthorize(['admin']), (req, res) => {
    const course = {
      id: courses.length + 1,
      programmingLanguage: req.body.programmingLanguage
    }
  
    courses.push(course)
    res.send(course)
  });


  const PORT = process.env.PORT || 5400;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));