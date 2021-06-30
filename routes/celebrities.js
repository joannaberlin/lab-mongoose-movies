const router = require("express").Router();

const Celebrity = require('../models/Celebrity');

router.get('/celebrities', (req, res, next) => {
  Celebrity.find()
    .then(celebritiesDB => {
      console.log(celebritiesDB);
      res.render('./celebrities/index', { celebritiesList: celebritiesDB });
    })
    .catch(err => {
      console.log(err)
    })
});

router.get('/celebrities/new', (req, res, next) => {
  Celebrity.find()
    .then(celebritiesFromDB => {
      res.render('./celebrities/new', { celebrities: celebritiesFromDB});
    })
    .catch(err => {
      console.log(err);
    })
});

router.get('/celebrities/:id', (req, res, next) => {
	//res.render('./celebrities/show');
  const celebrityId = req.params.id;
  Celebrity.findById(celebrityId)
    .then(celebrityFromDB => {
      console.log(celebrityFromDB);
      res.render('./celebrities/show', { show: celebrityFromDB });
    })
    .catch(err => {
      console.log(err);
    })
});



router.post('/celebrities', (req, res, next) => {
  //console.log(req.body);
  const { name, occupation, catchPhrase } = req.body;
  // console.log(name, occupation, catchPhrase);
  Celebrity.create({
    name,
    occupation,
    catchPhrase
  })
    .then(createdCelebrity => {
      console.log(`This celebrity was just created: ${createdCelebrity}`);
      res.redirect(`/celebrities/${createdCelebrity._id}`);
    })
});

router.post('/celebrities/:id/delete', (req, res, next) => {
  
  Celebrity.findByIdAndDelete({ _id: req.params.id })
    .then(() => {
      res.redirect('/celebrities');
    })
    .catch(err => {
      console.log(err);
    })
});

router.get('/celebrities/:id/edit', (req, res, next) => {
  Celebrity.findById(req.params.id)
    .then(celebrity => {
      res.render('celebrities/edit', { celebrity });
    })
    .catch(err => {
      next(err);
    })
});

router.post('/celebrities/:id/edit', (req, res, next) => {
  const celebrityId = req.params.id;
  const { name, occupation, catchPhrase } = req.body;
  Celebrity.findByIdAndUpdate(celebrityId, {
    name,
    occupation,
    catchPhrase
  })
    .then(() => {
      res.redirect(`/celebrities/${celebrityId}`);
    })
    .catch(err => {
      console.log(err);
    })
})

module.exports = router;
