const { Pizza } = require('../models');

const pizzaController = {
//method for finding all pizzas
    getAllPizza(req, res){
        Pizza.find({})
        .populate({
            path: 'comments',
            select: '-__v'
        })
        .select('-__v')
        .sort({ _id: -1 })
        .then(pizzaData => res.json(pizzaData))
        .catch(err => {
            console.log(err)
            res.status(400).json(err)
        });
    },
//method for find one pizza by id
    getPizzaById({ params }, res){
        Pizza.findOne({ _id: params.id })
        .populate({
            path: 'comments',
            select: '-__v'
        })
        .select('-__v')
        .then(pizzaData => {
            if(!pizzaData){
                res.status(404).json({message: 'No pizza found!'});
                return;
            }
            res.json(pizzaData)
        })
        .catch(err => {
            console.log(err)
            res.status(400).json(err)
        })
    },
//method for creating new pizza
    createPizza({ body }, res){
        Pizza.create(body)
        .then(pizzaData => res.json(pizzaData))
        .catch(err => res.status(400).json(err))
    },
//method for updating a pizza
    updatePizza({params, body}, res){
        Pizza.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
        .then(pizzaData => {
            if(!pizzaData){
                res.status(404).json({message: 'No pizza found!'})
                return
            }
            res.json(pizzaData)
        })
        .catch(err => res.status(400).json({message: `There was an err:${err}`}))
    },
    deletePizza({ params }, res){
        Pizza.findOneAndDelete({ _id: params.id })
        .then(pizzaData => {
            if(!pizzaData){
                res.status(404).json({message: 'No pizza found!'})
                return
            }
            res.json(pizzaData)
        })
        .catch(err => res.status(400).json(err))
    }
};

module.exports = pizzaController;