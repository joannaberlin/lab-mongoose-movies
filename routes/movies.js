const router = require("express").Router();

const Movie = require('../models/Movie');
const Celebrity = require('../models/Celebrity');

router.get('/movies', (req, res, next) => {
  Movie.find().populate('cast')
    .then(moviesDB => {
      res.render('./movies/index', { moviesList: moviesDB });
    })
    .catch(err => {
      console.log(err);
    })
})

router.get('/movies', (req, res, next) => {
  res.render('./movies/index');
  //show movies from DB
})

router.get('/movies/new', (req, res, next) => {
  Celebrity.find()
    .then(celebrities => {
      res.render('./movies/new', { celebrities });
    })
    
  
})

router.get('/movies/:id', (req, res, next) => {
  const movieId = req.params.id;
  Movie.findById(movieId).populate('cast')
    .then(movieDB => {
      console.log(movieDB);
      res.render('./movies/show', { show: movieDB });
    })
    .catch(err => {
      console.log(err);
    })
});

router.post('/movies', (req, res, next) => {
  const { title, genre, plot, cast } = req.body;
  console.log(title, genre, plot, cast);
  Movie.create({
    title,
    genre,
    plot,
    cast
  })
  .then(createdMovie => {
    console.log(`This movie was just created: ${createdMovie}`);
    console.log(`/movies/${createdMovie._id}`);
    res.redirect('/movies');
  })
})

router.get('/movies/:id/edit', (req, res, next) => {
  Movie.findById(req.params.id).populate('cast')
    .then(movie => {
      console.log(movie);
      Celebrity.find().then(celebrities => {
        let options = '';
        let selected = '';
        celebrities.forEach(actor => {
          selected = movie.cast.map(el => el._id).includes(actor._id) ? ' selected' : '';
          options += `<option value="${actor._id}" ${selected}>${actor.name}</option>`;
        });
        console.log(options);
        res.render('movies/edit', { movie, options, });
      })
    })
    .catch(err => {
      next(err);
    })
});

router.post('/movies/:id', (req, res) => {
  const { title, genre, plot, cast } = req.body;
  Movie.findByIdAndUpdate(req.params.id, { title, genre, plot, cast })
    .then(() => {
      res.redirect('/movies');
    })
    .catch(err => {
      next(err);
    });
});

module.exports = router;